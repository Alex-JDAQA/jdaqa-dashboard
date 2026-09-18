import type { SprintTicket } from "./sprintTickets";

/**
 * Leadership quality signals — Jira REST Sep 18, 2026.
 * Only metrics the changelog/JQL can actually support. Escaped-to-prod is omitted:
 * the Environment field is empty on every YTD bug, and prod/UAT labels mostly
 * match infrastructure tickets rather than customer escapes.
 */

export type QualityTicket = SprintTicket & {
  ageDays?: number;
  reporter?: string;
};

const XRAY = '("Test", "Test Execution", "Test Plan", "Test Set", "Precondition")';
const PROJECTS = "YP, YCVC, RM, ARF, RWT";

export const qualityMeta = {
  pulled: "September 18, 2026",
  window: "Jan – Sep 2026",
  /** Product-bug series already on the dashboard (infra excluded). */
  productBugsYtd: 184,
  portfolioDoneYtd: 1238,
};

/** Open High/Highest among product bugs created YTD — statusCategory != Done, infra excluded. */
export const openHighBugs: QualityTicket[] = [
  {
    key: "RWT-814",
    summary: "Bank of Tampa — Parachute Technical Review failed on File 3897",
    status: "To Do",
    priority: "Highest",
    category: "Bug",
    ageDays: 0,
    reporter: "Diego De Grandi",
    url: "https://realwired.atlassian.net/browse/RWT-814",
  },
  {
    key: "RWT-700",
    summary:
      "Enforce disable_log_in_as server-side -- the Log-In-As entry point ignores the setting",
    status: "In Progress",
    priority: "Highest",
    category: "Bug",
    ageDays: 14,
    reporter: "David Eloy",
    url: "https://realwired.atlassian.net/browse/RWT-700",
  },
  {
    key: "RWT-678",
    summary:
      "Parachute AI Review job dead-lettered after 3 retries — 'Appraisal PDF not found in S3'; review never delivered",
    status: "Review",
    priority: "Highest",
    category: "Bug",
    ageDays: 16,
    reporter: "Diego De Grandi",
    url: "https://realwired.atlassian.net/browse/RWT-678",
  },
  {
    key: "RWT-663",
    summary:
      "Oxford AMC — Create a Request Step 3: Save Request becomes permanently unresponsive after a required-field validation error is corrected",
    status: "QA Ready",
    priority: "Highest",
    category: "Bug",
    ageDays: 17,
    reporter: "Diego De Grandi",
    url: "https://realwired.atlassian.net/browse/RWT-663",
  },
  {
    key: "RWT-295",
    summary:
      "Property Record: _inactive dropdown values still selectable in Edit mode (e.g. Site Area UOM)",
    status: "To Do",
    priority: "Highest",
    category: "Bug",
    ageDays: 69,
    reporter: "Diego De Grandi",
    url: "https://realwired.atlassian.net/browse/RWT-295",
  },
];

/** Sprint 35 tickets currently in QA that had already left the QA lane (changelog). */
export const sprintQaBounceTickets: QualityTicket[] = [
  {
    key: "RWT-326",
    summary:
      "Vendor Circle – Documents replaced via the Vendor Updates tab are not retained in the vendor history panel",
    status: "QA In Progress",
    priority: "High",
    category: "Bug",
    url: "https://realwired.atlassian.net/browse/RWT-326",
  },
  {
    key: "RWT-512",
    summary: "Show a clear status on every review",
    status: "QA In Progress",
    priority: "Medium",
    category: "Story",
    url: "https://realwired.atlassian.net/browse/RWT-512",
  },
  {
    key: "RWT-663",
    summary:
      "Oxford AMC — Create a Request Step 3: Save Request becomes permanently unresponsive after a required-field validation error is corrected",
    status: "QA Ready",
    priority: "Highest",
    category: "Bug",
    url: "https://realwired.atlassian.net/browse/RWT-663",
  },
  {
    key: "RWT-804",
    summary:
      "Citation links resolve to nothing when the appraisal prints its folio in the running head — 0 of 130 pages mapped on the dev review",
    status: "QA In Progress",
    priority: "Medium",
    category: "Sub-task",
    url: "https://realwired.atlassian.net/browse/RWT-804",
  },
];

export const severityMix = {
  openHigh: 31,
  openHighest: 5,
  openHighAndHighest: 36,
  productOpenYtd: 84,
  medianAgeDays: 46,
  agedOver30: 23,
  agedOver60: 16,
  waitingPastQaHigh: 10,
  jql: `project in (${PROJECTS}) AND issuetype = Bug AND created >= "2026-01-01" AND statusCategory != Done AND priority in (Highest, High) AND issuetype NOT IN ${XRAY}`,
  sourceNote:
    'Jira REST Sep 18, 2026: YTD-created product bugs still open with priority Highest (5) or High (31) = 36. Median age 46 days; 23 ≥30 days; 16 ≥60 days. 10 of the 36 are already in Ready for PROD (post-QA wait, not a QA-queue item). Excludes documented Aug/Sep infrastructure tickets. Pre-2026 High leftovers (YP-27, YP-31) are out of the partnership window.',
};

export const defectsPerDoneByMonth = [
  { month: "Jan 26", bugs: 7, done: 79, rate: 0.089 },
  { month: "Feb 26", bugs: 2, done: 111, rate: 0.018 },
  { month: "Mar 26", bugs: 25, done: 185, rate: 0.135 },
  { month: "Apr 26", bugs: 12, done: 241, rate: 0.05 },
  { month: "May 26", bugs: 14, done: 159, rate: 0.088 },
  { month: "Jun 26", bugs: 27, done: 180, rate: 0.15 },
  { month: "Jul 26", bugs: 42, done: 86, rate: 0.488 },
  { month: "Aug 26", bugs: 35, done: 125, rate: 0.28 },
  { month: "Sep 26", bugs: 20, done: 72, rate: 0.278 },
];

export const defectsPerDone = {
  ytdBugs: 184,
  ytdDone: 1238,
  ytdRate: 0.149,
  sepRate: 0.278,
  sprintBugsCreated: 4,
  sprintDone: 31,
  sprintRate: 0.129,
  sourceNote:
    'Jira REST Sep 18, 2026: product bugs created in period (bugsByMonth) ÷ issues with status CHANGED TO Done in period (portfolioByMonth). YTD 184 ÷ 1,238 = 0.149. September MTD 20 ÷ 72 = 0.278. Sprint 35 window: 4 product bugs created since Sep 14 (RWT-814, RWT-788, RWT-780, RWT-768) ÷ 31 Done.',
};

/**
 * YouConnect product defect volume — not escaped-to-prod.
 * Include: YP bugs + RWT bugs labeled YP or YC.
 * Exclude: MUFG / Onboarding labels, Vendor Circle (VC), ORM, Parachute
 * Standalone parent RWT-310, Vendor Circle parent RWT-224, ORM parent RWT-107,
 * documented infra keys.
 */
export const youConnectVolume = {
  bugs: 80,
  productBugsYtd: 184,
  sharePercent: 43.5,
  open: 39,
  unresolvedPercent: 48.8,
  ypCount: 29,
  rwtCount: 51,
  jql: `(project = YP OR (project = RWT AND labels in (YP, YC))) AND issuetype = Bug AND created >= "2026-01-01" AND labels not in (MUFG, Onboarding, VC, Standalone, ORM) AND (parent is EMPTY OR parent not in (RWT-310, RWT-224, RWT-107)) AND issuetype NOT IN ${XRAY}`,
  sourceNote:
    'Jira REST Sep 18, 2026: YouConnect product bugs = YP Bug tickets plus RWT Bugs labeled YP or YC (80). Excludes MUFG and Onboarding labels, VC/Standalone/ORM labels, parents RWT-310 / RWT-224 / RWT-107, and documented infra. Share of the 184 YTD product-bug series = 80 ÷ 184 = 43.5%. Still open (statusCategory != Done) = 39 ÷ 80 = 48.8%. Not escaped-to-prod — Environment is empty.',
};

export const qaBounce = {
  enteredQaYtd: 362,
  bouncedYtd: 62,
  bounceRatePercent: 17.1,
  sprintInQa: 10,
  sprintReturnedToQa: 4,
  jql: `project in (${PROJECTS}) AND status WAS IN ("QA Ready", "QA In Progress") AFTER "2026-01-01" AND issuetype NOT IN ${XRAY}`,
  sourceNote:
    'Jira REST changelog Sep 18, 2026: 362 issues entered QA Ready / QA In Progress YTD. A bounce is a later return to that lane after leaving it (QA Ready ↔ QA In Progress is not a bounce). 62 bounced (17.1%). Sprint 35: 4 of 10 currently in QA are return visits (RWT-326, RWT-512, RWT-663, RWT-804).',
};

export const timeInQa = {
  completedVisits: 418,
  visitsAtLeastOneHour: 267,
  subMinuteVisits: 121,
  medianHoursAll: 6.8,
  medianHoursGe1h: 32.3,
  medianDaysGe1h: 1.3,
  sourceNote:
    'Jira REST changelog Sep 18, 2026 on the 362 issues that entered QA YTD. Time in QA = consecutive time in QA Ready / QA In Progress until the ticket left that lane. Median of 267 visits lasting ≥1 hour = 32.3 hours (1.3 days). 121 of 418 completed visits were sub-minute board clicks and are excluded from the median. resolutiondate is not used.',
};

export const postQaWait = {
  readyForStage: 25,
  readyForProd: 28,
  total: 53,
  highBugsInReadyForProd: 10,
  sourceNote:
    'Jira REST Sep 18, 2026: project = RWT AND sprint in openSprints() AND status in ("Ready for Stage", "Ready for PROD") = 53. Ten of the 36 open High/Highest product bugs sit in Ready for PROD — past QA, waiting on deploy.',
};
