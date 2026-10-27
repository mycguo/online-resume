# Charles’s Studio portfolio

A production-ready Next.js portfolio with the selected Studio design, responsive project cards, searchable projects, and individual project pages. The public site contains eight real projects, with JobOfferMaster first:

- [JobOfferMaster](https://joboffermaster.com/)
- [YouTube RAG](https://youtube-videos-rag.streamlit.app/)
- [AI Knowledge Assistant](https://ai-personal-assistant.streamlit.app/)
- [Media RAG](https://media-rag.streamlit.app/)
- [Ask My Photo](https://ask-my-photo.streamlit.app/)
- [Stedi API Request Runner](https://stedi-api.streamlit.app/)
- [AI Events](https://ai-events.streamlit.app/)
- [Podcast to LinkedIn](https://podcast-linkedin.streamlit.app/)

The demo concepts and design comparison pages have been removed. Studio is the only design; older `?draft=` links also display Studio.

## Deploy immediately from this folder

```sh
npx vercel@latest --prod
```

Sign in if prompted, select your Vercel account/team, and create or link a project. Use the current directory as the project root. The configuration selects Next.js, installs dependencies with `npm ci`, builds with `npm run build`, and pins Node.js to 22.x. Vercel builds from the local source, so this method does not require pushing to GitHub first.

No API keys, database, or user-configured environment variables are required. The portfolio links to your Streamlit applications; their backends continue to run on Streamlit.

Official instructions: [Vercel CLI deployments](https://vercel.com/docs/cli/deploy), [Vercel configuration](https://vercel.com/docs/project-configuration/vercel-json), and [supported Node.js versions](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions).

## Deploy through GitHub instead

Push these files to the repository, then import it with **Add New → Project** in Vercel. Select the repository root and accept the detected Next.js settings. Vercel uses `vercel.json` and `package.json`; leave the output directory at its default.

The existing `online-resume` Vercel project is connected to `mycguo/online-resume` and deploys the `main` branch automatically. Its public address is <https://online-resume-liart.vercel.app/>. The application files must be committed and pushed; deploying a README-only commit produces no application to serve.

## Run and verify locally

Requires Node.js 22.x. Use `nvm use` if you have nvm installed.

```sh
npm ci
npm run check
npm run dev
```

Open <http://127.0.0.1:3000>. To serve the production build, run `npm start`. If port 3000 is already occupied, use `npm start -- --port 3100`.

`npm run check` runs formatting, offline app-checker tests, TypeScript, and production-build checks. Dependencies and fonts are pinned in `package-lock.json`; the fonts are bundled locally and do not require a Google Fonts request during the build.

## Manual Streamlit checks

The scheduled GitHub Actions workflow has been removed. App checks can still be run manually from a development environment.

The checker reads the seven Streamlit app URLs and their `appHeading` markers from `src/data/portfolio.ts`, including Ask My Photo. Projects hosted elsewhere, such as JobOfferMaster, are excluded from this Streamlit-specific check. It opens each app in Chromium, waits for the expected live heading inside Streamlit's iframe, and clicks only Streamlit's **Yes, get this app back up!** button if the app is sleeping. Visits use fresh browser contexts. The checker does not submit forms, connect accounts, call healthcare APIs, generate articles, or run event scrapes. A successful HTTP response alone is not a passing check.

Two apps are checked at a time, with one retry per failed app. JSON and Markdown results are saved locally in `app-check-results/`; page contents, screenshots, cookies, and form values are not saved. A failed app makes the command exit unsuccessfully while the other apps are still checked.

For manual execution from a development environment:

```sh
npx playwright install chromium
npm run apps:check
```

To list configured targets without visiting them, run `npm run apps:check -- --list`. Run `npm run test:app-checks` for the offline checker tests.

## Customize your content

Edit `src/data/portfolio.ts` to update your name, bio, public contact links, and projects. Empty contact fields stay hidden. Add a project using the existing `Project` shape; a detail page, project count, categories, and sitemap entry are generated from that data. The array order controls the display order. Streamlit projects also need an `appHeading` matching their public interface for the manual checker; other projects do not.

Preview artwork is original illustrative HTML/CSS. It is labeled as an illustrative preview and is not a screenshot of the linked application.

## Search and social sharing

Search indexing is enabled. The app provides `robots.txt`, `sitemap.xml`, canonical URLs, and a generated Open Graph image. URLs use Vercel’s `VERCEL_PROJECT_PRODUCTION_URL` automatically, with `VERCEL_URL` as a fallback. Keep access to Vercel’s system environment variables enabled in the project settings.

If you later use another host or want to override the public domain, optionally set `NEXT_PUBLIC_SITE_URL` to the complete public URL, such as `https://your-domain.com`, and rebuild. Local builds without a public URL omit sitemap entries and canonical URLs.

## Content verification

Project descriptions were checked against their public interfaces on October 11, 2026. Media RAG offers audio/video upload and indexing through TwelveLabs, library search, evidence clips, and cited answers. Stedi’s public interface offers endpoint selection, editable JSON, usage indicators, and single/all-request modes. AI Events exposes separate region/source workspaces and event organization controls. Podcast to LinkedIn exposes a connection-gated source, transcription, article, image, and publication workflow.

No media or documents were uploaded, AI questions submitted, healthcare API requests executed, LinkedIn accounts connected, content published, event scrapes triggered, or administration pages accessed. Model outputs and private implementations have not been audited. The AI Knowledge Assistant entry avoids claiming a specific deployed model version because its public page mentions a fallback.

## Validation

JobOfferMaster and Ask My Photo were added after inspecting their public interfaces. JobOfferMaster is the first item in the collection. Ask My Photo is included in the manual Streamlit checker, while JobOfferMaster is excluded from that Streamlit-specific check. Both use original illustrative artwork rather than screenshots of users' data.

For the eight-project update, formatting, nine offline checker tests, TypeScript, and the production build passed. Both new project pages, live links, and illustrations were checked on desktop and at 320 px. Search finds Ask My Photo, and both new illustrations fit their card and detail-page frames without horizontal overflow.

Verified locally on October 11, 2026: clean locked dependency installation, formatting, TypeScript, and production build passed. All six project pages and their live links were checked. Category filters, search, empty-result recovery, and keyboard shortcuts passed browser checks. Desktop, 390 px mobile, and 320 px mobile layouts were reviewed; the checked layouts have no horizontal overflow, and all six illustrations fit their frames at 320 px. The old template/demo routes return 404. Robots metadata, sitemap response, share image, and public-domain selection were also checked.
