import { appendFile, mkdir, writeFile } from "node:fs/promises";
import { setTimeout as delay } from "node:timers/promises";
import { pathToFileURL } from "node:url";
import { chromium } from "playwright";
import { projects } from "../src/data/portfolio.ts";

const wakeButtonName = /^Yes, get this app back up!$/i;

export function getStreamlitProjects(entries) {
  return validateProjects(
    entries.filter((project) => new URL(project.url).hostname.endsWith(".streamlit.app")),
  );
}

export function validateProjects(entries) {
  if (!entries.length) throw new Error("No apps configured.");
  const urls = new Set();
  for (const project of entries) {
    const url = new URL(project.url);
    if (
      url.protocol !== "https:" ||
      !url.hostname.endsWith(".streamlit.app") ||
      url.username ||
      url.password ||
      url.port ||
      url.search ||
      url.hash ||
      url.pathname !== "/" ||
      !project.appHeading?.trim() ||
      urls.has(project.url)
    ) {
      throw new Error(`Invalid app check configuration: ${project.slug}`);
    }
    urls.add(project.url);
  }
  return entries;
}

function isStreamlitFrame(frame) {
  try {
    const url = new URL(frame.url());
    return (
      url.protocol === "https:" &&
      (url.hostname.endsWith(".streamlit.app") || url.hostname === "share.streamlit.io")
    );
  } catch {
    return false;
  }
}

export async function visitProject(page, project, options = {}) {
  const now = options.now ?? Date.now;
  const pause = options.pause ?? delay;
  const timeoutMs = options.timeoutMs ?? 120_000;
  const response = await page.goto(project.url, {
    waitUntil: "domcontentloaded",
    timeout: 45_000,
  });
  const deadline = now() + timeoutMs;
  let woke = false;

  while (now() < deadline) {
    for (const frame of page.frames().filter(isStreamlitFrame)) {
      let hasException;
      let ready;
      let asleep;
      try {
        hasException = await frame.locator('[data-testid="stException"]').first().isVisible();
        ready = await frame
          .getByRole("heading", { name: project.appHeading, level: 1 })
          .first()
          .isVisible();
        asleep = await frame.getByRole("button", { name: wakeButtonName }).isVisible();
      } catch {
        // An iframe can be replaced while a sleeping app boots.
        continue;
      }
      if (hasException) throw new Error("app-exception");
      if (ready) return { woke };
      if (asleep && !woke) {
        await frame.getByRole("button", { name: wakeButtonName }).click({ timeout: 10_000 });
        woke = true;
        options.onWake?.();
      }
    }
    await pause(1_000);
  }
  throw new Error(response && !response.ok() ? `http-${response.status()}` : "app-not-ready");
}

export async function checkProject(browser, project, options = {}) {
  const visit = options.visit ?? visitProject;
  const pause = options.pause ?? delay;
  const started = Date.now();
  let woke = false;
  let error = "browser-error";
  for (let attempt = 1; attempt <= 2; attempt++) {
    let context;
    try {
      // Each attempt starts without saved logins, cookies, or form values.
      context = await browser.newContext();
      const page = await context.newPage();
      const result = await visit(page, project, { onWake: () => (woke = true) });
      return {
        title: project.title,
        slug: project.slug,
        url: project.url,
        status: "ready",
        woke: woke || result.woke,
        attempts: attempt,
        checkedAt: new Date().toISOString(),
        durationMs: Date.now() - started,
      };
    } catch (caught) {
      // Store a category only, never page contents, form payloads, or login data.
      error = /^(http-\d{3}|app-exception|app-not-ready)$/.test(caught?.message)
        ? caught.message
        : "navigation-or-browser-error";
    } finally {
      await context?.close().catch(() => {});
    }
    if (attempt === 1) await pause(5_000);
  }
  return {
    title: project.title,
    slug: project.slug,
    url: project.url,
    status: "failed",
    woke,
    attempts: 2,
    checkedAt: new Date().toISOString(),
    durationMs: Date.now() - started,
    error,
  };
}

export async function checkProjects(browser, entries, options = {}) {
  validateProjects(entries);
  const results = new Array(entries.length);
  let next = 0;
  await Promise.all(
    Array.from({ length: Math.min(2, entries.length) }, async () => {
      while (next < entries.length) {
        const index = next++;
        results[index] = await checkProject(browser, entries[index], options);
        console.log(`${results[index].status.toUpperCase()}: ${entries[index].title}`);
      }
    }),
  );
  return results;
}

const escapeCell = (text) => String(text).replace(/[|\r\n]/g, " ");

async function main() {
  const apps = getStreamlitProjects(projects);
  if (process.argv.includes("--list")) {
    console.log(
      JSON.stringify(apps.map(({ title, url, appHeading }) => ({ title, url, appHeading }))),
    );
    return;
  }
  const browser = await chromium.launch({ headless: true });
  let results;
  try {
    results = await checkProjects(browser, apps);
  } finally {
    await browser.close();
  }
  const failed = results.filter((result) => result.status === "failed");
  const summary = [
    "## Streamlit app checks",
    "",
    "| App | Result | Wake button used | Attempts |",
    "| --- | --- | --- | --- |",
    ...results.map(
      (result) =>
        `| ${escapeCell(result.title)} | ${result.status}${result.error ? ` (${result.error})` : ""} | ${result.woke ? "Yes" : "No"} | ${result.attempts} |`,
    ),
    "",
  ].join("\n");
  await mkdir("app-check-results", { recursive: true });
  await writeFile("app-check-results/results.json", JSON.stringify(results, null, 2) + "\n");
  await writeFile("app-check-results/summary.md", summary);
  if (process.env.GITHUB_STEP_SUMMARY) await appendFile(process.env.GITHUB_STEP_SUMMARY, summary);
  if (failed.length) process.exitCode = 1;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch(() => {
    console.error(
      "App checks could not complete. Check dependency and browser installation steps.",
    );
    process.exitCode = 1;
  });
}
