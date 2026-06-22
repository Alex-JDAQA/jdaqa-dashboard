# JDA QA Dashboard

A modern QA metrics dashboard for the JDA QA team’s partnership with RealWired on YouConnect.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Updating Metrics

All dashboard data lives in a single file:

```
src/data/metrics.ts
```

Replace the placeholder values with your Confluence metrics:

- **KPI cards** — top-level summary numbers
- **throughputByMonth** — monthly stories tested, test cases executed, defects, releases
- **manualTestCoverage** — coverage by functional area
- **automationSuites** — Playwright/Cypress suite breakdown
- **milestones** — partnership timeline events

## Sections

| Section | Description |
|---------|-------------|
| KPI Grid | Stories tested, defects, pass rate, automation % |
| QA Throughput | Monthly activity trend chart |
| Automation Overview | Overall automation progress vs target |
| Test Coverage by Area | Manual vs automated breakdown per module |
| Automation Test Suites | Suite status, pass rates, test counts |
| Partnership Timeline | 6-month milestone history |

## Build for Production

```bash
npm run build
npm run preview
```

The built files will be in `dist/` — deploy to any static host (Netlify, Vercel, internal server, etc.).

## Deploy to GitHub Pages (free)

This repo includes a GitHub Actions workflow that builds and deploys on every push to `main`.

### One-time setup

1. Create a new **public** GitHub repository (any name — the workflow uses the repo name for the URL path).

2. Push this project:

```bash
git init
git add .
git commit -m "Initial commit: JDA QA Impact Dashboard"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

3. In the GitHub repo, go to **Settings → Pages**:
   - **Source:** GitHub Actions (not “Deploy from a branch”)

4. After the first workflow run finishes, the site will be live at:

```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

Example: repo `jda-qa-dashboard` → `https://yourname.github.io/jda-qa-dashboard/`

### Updating the live dashboard

Edit `src/data/metrics.ts`, commit, and push to `main`. GitHub Actions rebuilds and redeploys automatically.

### Local preview with Pages base path

```bash
VITE_BASE_PATH=/YOUR_REPO_NAME/ npm run build
npm run preview
```

## Share Your Confluence Data

Drop your Confluence export (PDF, CSV, or paste the metrics) and the values in `src/data/metrics.ts` can be updated to match exactly.
