import assert from "node:assert/strict";
import test from "node:test";
import { projects } from "../src/data/portfolio.ts";
import {
  checkProject,
  checkProjects,
  getStreamlitProjects,
  validateProjects,
  visitProject,
} from "./check-streamlit-apps.mjs";

const apps = getStreamlitProjects(projects);
const project = apps[0];

function fakeFrame(state) {
  return {
    url: () => project.url,
    locator: () => ({ first: () => ({ isVisible: async () => state.exception ?? false }) }),
    getByRole(role) {
      const locator = {
        first: () => locator,
        isVisible: async () => (role === "heading" ? state.ready : state.asleep),
        click: async () => {
          assert.equal(role, "button");
          state.clicks = (state.clicks ?? 0) + 1;
          state.asleep = false;
          if (state.wakeWorks) state.ready = true;
        },
      };
      return locator;
    },
  };
}

function fakePage(state) {
  return {
    goto: async () => ({ ok: () => true }),
    frames: () => [fakeFrame(state)],
  };
}

function clockOptions() {
  let time = 0;
  return { timeoutMs: 3_000, now: () => time, pause: async (ms) => (time += ms) };
}

test("all configured apps have valid, unique public URLs and ready headings", () => {
  assert.ok(validateProjects(apps).length > 0);
  for (const invalid of [
    { ...project, url: "https://example.com/" },
    { ...project, url: project.url + "?token=private" },
    { ...project, appHeading: "" },
  ]) {
    assert.throws(() => validateProjects([invalid]));
  }
  assert.throws(() => validateProjects([project, project]));
});

test("HTTP 200 without the rendered app times out instead of passing", async () => {
  await assert.rejects(visitProject(fakePage({}), project, clockOptions()), /app-not-ready/);
});

test("daily checks include Ask My Photo and exclude non-Streamlit portfolio projects", () => {
  assert.ok(apps.some((app) => app.url === "https://ask-my-photo.streamlit.app/"));
  assert.ok(projects.some((entry) => entry.slug === "joboffermaster"));
  assert.equal(
    apps.some((app) => app.slug === "joboffermaster"),
    false,
  );
  assert.ok(apps.every((app) => new URL(app.url).hostname.endsWith(".streamlit.app")));
});

test("a sleeping app is woken and verified before passing", async () => {
  const state = { asleep: true, wakeWorks: true };
  const result = await visitProject(fakePage(state), project, clockOptions());
  assert.deepEqual(result, { woke: true });
  assert.equal(state.clicks, 1);
});

test("a sleep page can be woken even when its initial HTTP response is not 200", async () => {
  const state = { asleep: true, wakeWorks: true };
  const page = fakePage(state);
  page.goto = async () => ({ ok: () => false, status: () => 503 });
  assert.deepEqual(await visitProject(page, project, clockOptions()), { woke: true });
});

test("a wake click without a ready app fails and is not repeatedly clicked", async () => {
  const state = { asleep: true };
  await assert.rejects(visitProject(fakePage(state), project, clockOptions()), /app-not-ready/);
  assert.equal(state.clicks, 1);
});

test("a rendered heading with a Streamlit exception fails", async () => {
  await assert.rejects(
    visitProject(fakePage({ ready: true, exception: true }), project, clockOptions()),
    /app-exception/,
  );
});

test("a failed attempt retries in a fresh context and closes both contexts", async () => {
  let opened = 0;
  let closed = 0;
  const browser = {
    newContext: async () => {
      opened++;
      return { newPage: async () => ({}), close: async () => closed++ };
    },
  };
  const result = await checkProject(browser, project, {
    pause: async () => {},
    visit: async (_page, _project, { onWake }) => {
      if (opened === 1) {
        onWake();
        throw new Error("app-not-ready");
      }
      return { woke: false };
    },
  });
  assert.equal(result.status, "ready");
  assert.equal(result.attempts, 2);
  assert.equal(result.woke, true);
  assert.equal(closed, 2);
});

test("one broken app does not stop the other apps and errors omit private details", async () => {
  const browser = {
    newContext: async () => ({ newPage: async () => ({}), close: async () => {} }),
  };
  const results = await checkProjects(browser, apps, {
    pause: async () => {},
    visit: async (_page, target) => {
      if (target.slug === project.slug) throw new Error("private server detail");
      return { woke: false };
    },
  });
  assert.equal(results.length, apps.length);
  assert.equal(results[0].status, "failed");
  assert.equal(results[0].error, "navigation-or-browser-error");
  assert.equal(results.filter((result) => result.status === "ready").length, apps.length - 1);
  assert.equal(JSON.stringify(results).includes("private server detail"), false);
});
