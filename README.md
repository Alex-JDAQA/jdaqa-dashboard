# JDA QA Dashboard

Ongoing QA velocity dashboard for the JDA QA team's partnership with RealWired on **YouConnect**.

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

Edit values manually (pull from Jira / Playwright reports as needed), then rebuild. There is no live refresh path yet.

Key exports:

- **sprintKpiCards** — current sprint operational KPIs
- **ytdKpiCards** — year-to-date leadership KPIs
- **portfolioByMonth** — project throughput (created vs Done)
- **portfolioByProject** — per-project YTD throughput drill-down
- **bugsByMonth** / **bugsByProject** — YTD bug trend + per-project drill-down
- **sprintBugMetrics** — sprint bug snapshot
- **automationRunResults** — latest suite run outcomes
- **projectCoverageKpis** — per-project overall coverage %

## Views

| View | Description |
|------|-------------|
| **Sprint** | Current operational snapshot — in QA right now, prior sprint delivered, bugs, ORM summary |
| **Year-to-Date → Overview** | Leadership view — throughput chart, YTD bug trends, coverage summary |
| **Year-to-Date → Automation** | Automation hub — 85% target bar, ORM progress, run results, per-project automation |

## Point-in-time archive

The original 6-month pre/post impact report is frozen at git tag:

```
point-in-time-6mo-contract
```

Check it out anytime without affecting the live ongoing dashboard:

```bash
git show point-in-time-6mo-contract
git checkout point-in-time-6mo-contract
```

Push the tag to share the archive remotely:

```bash
git push origin point-in-time-6mo-contract
```

## Build for Production

```bash
npm run build
npm run preview
```

## Deploy to GitHub Pages

This repo includes a GitHub Actions workflow that builds and deploys on every push to `main`. Edit `src/data/metrics.ts`, commit, and push — the site redeploys automatically.
