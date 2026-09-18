# JDA QA Dashboard

Ongoing QA velocity dashboard for the JDA QA team's partnership with RealWired on **YouConnect**.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Updating Metrics

The dashboard is still a static Vite app. Numbers live in:

```
src/data/metrics.ts
src/data/sprintTickets.ts
```

Refresh them in Cursor against **Jira REST** (`mcp-atlassian`), not Rovo. Ask: “refresh the QA dashboard from Jira REST.” The agent runs the JQL below, then edits those files. There is no live browser fetch (that would expose the API token).

Automation / Playwright run results are still pasted from CI reports.

### Jira REST connection

Local only — the token is not in this repo:

- Site: `https://realwired.atlassian.net`
- MCP: `mcp-atlassian` in `~/.cursor/mcp.json` (launches `~/.cursor/jira-mcp-launch.sh`)
- Credentials: `~/.config/jira-mcp/env` (`JIRA_URL`, `JIRA_USERNAME`, `JIRA_API_TOKEN`)

If search starts failing with 401, the Atlassian email in that file must match the account that created the token (for this site: `alex@realwired.com`).

### Canonical JQL

Exclude Xray artifacts everywhere: `"Test", "Test Execution", "Test Plan", "Test Set", "Precondition"`.

| Slice | Query |
| --- | --- |
| Open sprint | `project = RWT AND sprint in openSprints()` |
| In QA | same, plus `status in ("QA Ready", "QA In Progress")` |
| Sprint Done | `project = RWT AND sprint in openSprints() AND status = Done` |
| ORM epic | `parent = RWT-107` |
| Portfolio created in a month | `project in (YP, YCVC, RM, ARF, RWT) AND created >= "YYYY-MM-01" AND created < "YYYY-MM-01" AND issuetype NOT IN ("Test", "Test Execution", "Test Plan", "Test Set", "Precondition")` |
| Portfolio Done in a month | `status CHANGED TO Done` in that month, same project + issue-type filter. Do not trust `resolutiondate` here. |
| QA-lane resolved | `qaResolvedJql` in `src/data/metrics.ts` — `status CHANGED TO Done` in the YTD window AND assignee WAS the five JDAQA account IDs. Do not use `resolved` / `resolutiondate`; that field is empty on most RWT tickets. |
| Bugs in a month | `issuetype = Bug` across the five projects by created date; August still excludes the documented infrastructure tickets |
| Open High / Highest | Same bug filter, `created >= "2026-01-01" AND statusCategory != Done AND priority in (Highest, High)` |
| QA bounce-back | Changelog on issues where `status WAS IN ("QA Ready", "QA In Progress") AFTER "2026-01-01"` — a later return after leaving the lane |
| Time in QA | Same changelog set; median consecutive time in the QA lane, visits ≥1 hour |

Board **271** is the RWT Consolidated delivery board. Reporting window stays January–YTD unless someone asks to change it.

Key exports:

- **sprintKpiCards** — current sprint operational KPIs
- **ytdKpiCards** — year-to-date leadership KPIs
- **qualityMetrics** (`src/data/qualityMetrics.ts`) — severity, bounce-back, time-in-QA, defects per Done
- **portfolioByMonth** — project throughput (created vs Done)
- **portfolioByProject** — per-project YTD throughput drill-down
- **bugsByMonth** / **bugsByProject** — YTD bug trend + per-project drill-down
- **sprintBugMetrics** — sprint bug snapshot
- **automationRunResults** — latest suite run outcomes
- **projectCoverageKpis** — per-project overall coverage %

## Views

| View | Description |
|------|-------------|
| **Sprint** | Current operational snapshot — in QA right now, quality signals, bugs, ORM summary |
| **Year-to-Date → Overview** | Leadership view — quality signals, throughput chart, YTD bug trends, coverage summary |
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
