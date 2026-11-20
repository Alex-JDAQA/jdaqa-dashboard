/**
 * Ongoing QA velocity metrics.
 * Point-in-time 6-month pre/post report frozen at git tag: point-in-time-6mo-contract
 *
 * Sources:
 * - Project throughput Jan 1–Nov 20 2026: Jira REST, project = RWT only.
 *   Excludes Xray artifacts by their real issue-type names — "Test" (not "Xray Test"),
 *   Test Execution / Test Plan / Test Set / Precondition. The green series counts
 *   status CHANGED TO ("Ready for PROD", Done) in the calendar month. A ticket
 *   that entered both columns in the same month counts once.
 *   Counted Nov 20, 2026. November is through the 20th.
 * - QA close-outs: assignee WAS the JDAQA accounts through October. QA Owner
 *   (customfield_10630) is empty on every one of those Done tickets. November counts
 *   a Done ticket once if a JDAQA account was the assignee or is the QA Owner.
 *   The developer stays the assignee. Eve as QA Owner is not in the JDAQA set.
 * - Sprint: Sprint 44 (board 271, Nov 16 – Nov 23), the single active sprint. QA tester is QA Owner (customfield_10630). Assignee stays the developer.
 * - Team: Alex Norwood, Chester Cabia, Marvis Medrano, Rishi Kumar (ORM epic RWT-107)
 * - Coverage / automation inventory: Xray + YouConnect Playwright suite
 */

import {
  ormAutomationEpic,
  ormCompletedModules,
  sprintCurrentDeliveredTickets,
  parachuteAutomationEpic,
  parachuteAutomationTasks,
  sprintInQaTickets,
  type SprintTicket,
} from "./sprintTickets";

export type { SprintTicket } from "./sprintTickets";
export {
  ormAutomationEpic,
  sprintCurrentDeliveredTickets,
  sprintDeliveredTickets,
  sprintInQaTickets,
  sprintOrmAutomationInSprint,
  isHighPriority,
} from "./sprintTickets";

export type ViewMode = "sprint" | "ytd";
export type YtdSubView = "overview" | "automation";

export const dashboardMeta = {
  title: "JDAQA Dashboard",
  partnershipStart: "January 1, 2026",
  reportingPeriod: "Sprint 44 · Nov 16 – Nov 23 · YTD through Nov 20, 2026",
  lastUpdated: "November 20, 2026",
  team: "JDAQA",
  client: "RealWired",
  archiveTag: "point-in-time-6mo-contract",
  meetingCadence: "Bi-weekly with Ed",
};

/** Account IDs for JDAQA testers.
 * Through October 2026, QA-lane close-outs use assignee WAS these ids. QA Owner is empty on every one of those Done tickets.
 * From November, a close-out also counts when QA Owner (customfield_10630) is one of these people. The developer stays the assignee.
 */
export const qaAssigneeAccountIds = [
  "712020:5085ca47-c432-421e-9b43-03ed76c1f0f1", // Alex Norwood (active)
  "712020:b10ccd52-f0b3-4a52-b6da-285cb8352b30", // Alex Norwood (legacy assignee history)
  "712020:3928f4f1-270a-41a8-9bd7-d2da1ebaf5c7", // Chester Cabia
  "712020:74309a28-b6a3-48f1-87cc-9d4c7d7f133b", // Marvis Medrano (Jira: Marvs)
  "712020:c3aefbf1-a2de-4f47-888e-aa420021a8fd", // Rishi Kumar
] as const;

export const qaTeam = [
  {
    id: "alex",
    name: "Alex Norwood",
    role: "QA lead",
    accountId: "712020:5085ca47-c432-421e-9b43-03ed76c1f0f1",
    legacyAccountIds: ["712020:b10ccd52-f0b3-4a52-b6da-285cb8352b30"],
  },
  {
    id: "chester",
    name: "Chester Cabia",
    role: "QA",
    accountId: "712020:3928f4f1-270a-41a8-9bd7-d2da1ebaf5c7",
  },
  {
    id: "marvis",
    name: "Marvis Medrano",
    role: "QA",
    accountId: "712020:74309a28-b6a3-48f1-87cc-9d4c7d7f133b",
    note: "Jira display name: Marvs Medrano",
  },
  {
    id: "rishi",
    name: "Rishi Kumar",
    role: "QA",
    accountId: "712020:c3aefbf1-a2de-4f47-888e-aa420021a8fd",
  },
] as const;

export type KpiCard = {
  id: string;
  label: string;
  value: string | number;
  unit?: string;
  change?: number;
  changeLabel?: string;
  trend?: "up" | "down" | "neutral";
  /** A decrease is the favorable move, so a down trend stays green. */
  lowerIsBetter?: boolean;
  /** Leadership target for this metric. `label` is the displayed goal, such as "10%". */
  goal?: { value: number; label: string };
  accent?: "blue" | "green" | "amber" | "violet" | "danger";
  /** One-line meaning, shown under the title. */
  description?: string;
  subtext?: string;
  /** Short context lines under the value. No trend color — used when the number moves with volume. */
  contextLines?: string[];
  /** Quarter figures replace the single hero number when set. */
  quarters?: KpiQuarter[];
  tickets?: SprintTicket[];
  ticketsLabel?: string;
};

export type KpiQuarter = {
  label: string;
  /** Display value, including a % sign when the metric is a rate. */
  value: string;
  /** Chart value. Rates are the percent number, not a fraction. */
  numeric: number;
  note?: string;
  /** Replaces the card subtext while this quarter is selected. */
  detail?: string;
  current?: boolean;
  /**
   * Full product-bug mix for this quarter, including the metric's own slice.
   * Counts sum to the quarter's product-bug total.
   */
  mix?: KpiShareSlice[];
};

export type KpiShareSlice = {
  label: string;
  count: number;
};
export type PortfolioMonth = {
  month: string;
  created: number;
  resolved: number;
  resolutionRate: number;
};

/**
 * RWT Consolidated monthly throughput. Jira REST Nov 20, 2026.
 * Xray artifacts excluded ("Test", Test Execution, Test Plan, Test Set, Precondition).
 * Created = created in the calendar month. Resolved = status CHANGED TO
 * ("Ready for PROD", Done) DURING that calendar month (last day inclusive).
 * A ticket that entered both columns in the same month is counted once.
 * November is through Nov 20. 113 of October's 415 created tickets are the
 * Oct 29 YC Security & Tech Debt register (epic RWT-1195 plus 112 children).
 * None of those entered Ready for PROD or Done in October. Delivery for the
 * old YP, YCVC, RM, and ARF projects is tracked on this board.
 */
export const portfolioByMonth: PortfolioMonth[] = [
  { month: "Jan 26", created: 1, resolved: 0, resolutionRate: 0 },
  { month: "Feb 26", created: 1, resolved: 0, resolutionRate: 0 },
  { month: "Mar 26", created: 8, resolved: 0, resolutionRate: 0 },
  { month: "Apr 26", created: 7, resolved: 0, resolutionRate: 0 },
  { month: "May 26", created: 26, resolved: 7, resolutionRate: 27 },
  { month: "Jun 26", created: 179, resolved: 77, resolutionRate: 43 },
  { month: "Jul 26", created: 178, resolved: 132, resolutionRate: 74 },
  { month: "Aug 26", created: 256, resolved: 122, resolutionRate: 48 },
  { month: "Sep 26", created: 237, resolved: 141, resolutionRate: 59 },
  { month: "Oct 26", created: 415, resolved: 234, resolutionRate: 56 },
  { month: "Nov 26", created: 303, resolved: 198, resolutionRate: 65 },
];

/** Chart window. January–April stay in the year total; RWT intake then was 17 created and none reached Ready for PROD or Done. */
export const throughputChartMonths = portfolioByMonth.filter(
  (row) => !["Jan", "Feb", "Mar", "Apr"].includes(row.month.slice(0, 3)),
);

/** Rolling portfolio entries into Ready for PROD or Done. A ticket in both columns the same month counts once. Not QA-lane specific. */
const portfolioResolvedYtd = portfolioByMonth.reduce((sum, m) => sum + m.resolved, 0);
const portfolioCreatedYtd = portfolioByMonth.reduce((sum, m) => sum + m.created, 0);

export const issueThroughputSummary = {
  avgResolvedPerMonth:
    Math.round((portfolioResolvedYtd / portfolioByMonth.length) * 10) / 10,
  totalResolvedYtd: portfolioResolvedYtd,
  totalCreatedYtd: portfolioCreatedYtd,
  resolutionRatePercent:
    Math.round((portfolioResolvedYtd / portfolioCreatedYtd) * 1000) / 10,
  /** Distinct tickets that entered Ready for PROD or Done at least once YTD. */
  uniqueReachedReadyForProdOrDoneYtd: 847,
  /** YTD-created tickets that entered Ready for PROD or Done during the window. */
  ytdCreatedReachedReadyForProdOrDone: 846,
  /** YTD-created tickets sitting in Ready for PROD or Done on the Nov 20 count. */
  currentlyReadyForProdOrDoneOfCreatedYtd: 836,
  period: "Jan 2026 – Nov 20, 2026",
  sourceNote:
    'Jira REST /rest/api/3/search/approximate-count on Nov 20, 2026. RWT only. Created: project = RWT AND created >= "2026-01-01" AND created < "2026-11-21" AND issuetype NOT IN ("Test", "Test Execution", "Test Plan", "Test Set", "Precondition") = 1,611. Monthly series is status CHANGED TO ("Ready for PROD", Done) DURING each calendar month, November through the 20th (Jan 0, Feb 0, Mar 0, Apr 0, May 7, Jun 77, Jul 132, Aug 122, Sep 141, Oct 234, Nov 198; sum 911). Same-month Done-only counts: May 7, Jun 72, Jul 82, Aug 117, Sep 109, Oct 227, Nov 165. Unique YTD CHANGED TO ("Ready for PROD", Done) DURING ("2026-01-01", "2026-11-20") = 847. YTD-created tickets that entered either column in that window = 846. status in ("Ready for PROD", Done) among YTD-created on Nov 20 = 836. parent = RWT-1195 AND created >= "2026-10-01" AND created < "2026-11-01" = 112 children; the epic itself was created Oct 29, so the October register is 113. None of those entered either column in October. parent = RWT-1195 AND created >= "2026-11-01" AND created < "2026-11-21" = 8. parent = RWT-1195 AND status CHANGED TO ("Ready for PROD", Done) DURING ("2026-11-01", "2026-11-20") = 6. October created on this pull is 415; the Oct 30 file held 404 for created < "2026-10-31", and that same window is now 415. The 11 are not children of RWT-1195. November created by type: Task 169, Story 88, Bug 27, Epic 12, Sub-task 4, Tech Debt 3. Quarterly Ready for PROD or Done vs intake: Q1 0/10 = 0%, Q2 84/212 = 39.6%, Q3 395/671 = 58.9%, Q4 432/718 = 60.2% (Oct 1–Nov 20, register included). Outside the October register, October is 234/302 = 77.5%.',
};

/**
 * QA-lane resolved throughput. A ticket moved to Done in the YTD window and a
 * JDAQA tester handled it.
 * Through October the tester is assignee WAS the five JDAQA account IDs.
 * QA Owner is empty on every one of those Done tickets (0 through Oct 30).
 * November also counts current QA Owner in those same accounts, because the
 * developer stays the assignee. A ticket that matches both is counted once.
 * Eve (account 712020:7f20ae5d-d02e-4a35-b817-73590e53fdf5) is QA Owner on 16
 * tickets and is not in this set. resolutiondate is empty on most RWT tickets.
 * Jira REST Nov 20, 2026.
 */
export const qaResolvedJql = `project in (YP, YCVC, RM, ARF, RWT) AND status CHANGED TO Done DURING ("2026-01-01", "2026-11-20") AND ((assignee WAS "712020:5085ca47-c432-421e-9b43-03ed76c1f0f1" OR assignee WAS "712020:b10ccd52-f0b3-4a52-b6da-285cb8352b30" OR assignee WAS "712020:3928f4f1-270a-41a8-9bd7-d2da1ebaf5c7" OR assignee WAS "712020:74309a28-b6a3-48f1-87cc-9d4c7d7f133b" OR assignee WAS "712020:c3aefbf1-a2de-4f47-888e-aa420021a8fd") OR "QA Owner" in ("712020:5085ca47-c432-421e-9b43-03ed76c1f0f1", "712020:b10ccd52-f0b3-4a52-b6da-285cb8352b30", "712020:3928f4f1-270a-41a8-9bd7-d2da1ebaf5c7", "712020:74309a28-b6a3-48f1-87cc-9d4c7d7f133b", "712020:c3aefbf1-a2de-4f47-888e-aa420021a8fd")) AND issuetype NOT IN ("Test", "Test Execution", "Test Plan", "Test Set", "Precondition")`;

/** Unique tickets matching qaResolvedJql. Monthly close-outs sum to 402 (8 tickets Done in more than one month, all before November). */
const qaResolvedYtd = 394;
const qaResolvedMonths = portfolioByMonth.length;

/**
 * QA-lane flow by month. January–October closed = assignee WAS JDAQA and status CHANGED TO Done.
 * November closed = that assignee test OR QA Owner is a JDAQA tester. Counted once.
 * Reached QA uses the same split. Lane statuses are unused before June.
 * November is through Nov 20. October reached QA was recounted at 75 (the Oct 30 file had 72).
 */
export const qaLaneByMonth = [
  { month: "Jan 26", reachedQa: 0, closed: 2, boardDone: 79 },
  { month: "Feb 26", reachedQa: 0, closed: 4, boardDone: 111 },
  { month: "Mar 26", reachedQa: 0, closed: 59, boardDone: 175 },
  { month: "Apr 26", reachedQa: 0, closed: 48, boardDone: 232 },
  { month: "May 26", reachedQa: 0, closed: 34, boardDone: 147 },
  { month: "Jun 26", reachedQa: 49, closed: 40, boardDone: 172 },
  { month: "Jul 26", reachedQa: 88, closed: 37, boardDone: 86 },
  { month: "Aug 26", reachedQa: 51, closed: 48, boardDone: 117 },
  { month: "Sep 26", reachedQa: 65, closed: 26, boardDone: 110 },
  { month: "Oct 26", reachedQa: 75, closed: 73, boardDone: 227 },
  { month: "Nov 26", reachedQa: 32, closed: 31, boardDone: 165 },
] as const;

/** Months with a real QA-lane arrival count. Jan–May statuses were not in use. */
const qaLaneActiveMonths = qaLaneByMonth.filter((m) => m.reachedQa > 0);
const qaReachedActiveTotal = qaLaneActiveMonths.reduce((sum, m) => sum + m.reachedQa, 0);

const round1 = (n: number) => Math.round(n * 10) / 10;

const quarterDefs = [
  { label: "Q1", months: ["Jan", "Feb", "Mar"] },
  { label: "Q2", months: ["Apr", "May", "Jun"] },
  { label: "Q3", months: ["Jul", "Aug", "Sep"] },
  { label: "Q4", months: ["Oct", "Nov", "Dec"] },
] as const;

function inQuarter(monthLabel: string, months: readonly string[]) {
  return months.includes(monthLabel.slice(0, 3));
}

/** Average monthly QA-lane close-outs in each quarter. Q4 is October plus November 1–20. */
export const qaResolvedByQuarter = quarterDefs.map((quarter) => {
  const rows = qaLaneByMonth.filter((row) => inQuarter(row.month, quarter.months));
  const total = rows.reduce((sum, row) => sum + row.closed, 0);
  return {
    label: quarter.label,
    total,
    months: rows.length,
    avgPerMonth: rows.length ? round1(total / rows.length) : 0,
    partial: quarter.label === "Q4",
  };
});

/** Ready for PROD or Done entries ÷ tickets created, summed inside each quarter. A ticket in both columns the same month counts once. */
export const closeoutByQuarter = quarterDefs.map((quarter) => {
  const rows = portfolioByMonth.filter((row) => inQuarter(row.month, quarter.months));
  const created = rows.reduce((sum, row) => sum + row.created, 0);
  const resolved = rows.reduce((sum, row) => sum + row.resolved, 0);
  return {
    label: quarter.label,
    created,
    resolved,
    rate: created ? round1((resolved / created) * 100) : 0,
    partial: quarter.label === "Q4",
  };
});

function formatQuarterNumber(n: number) {
  return Number.isInteger(n) ? String(n) : n.toFixed(1);
}

export const qaIssueThroughputSummary = {
  avgResolvedPerMonth:
    Math.round((qaResolvedYtd / qaResolvedMonths) * 10) / 10,
  totalResolvedYtd: qaResolvedYtd,
  monthlyCloseoutsYtd: 402,
  avgReachedPerMonth:
    Math.round((qaReachedActiveTotal / qaLaneActiveMonths.length) * 10) / 10,
  reachedMonths: qaLaneActiveMonths.length,
  reachedPeriod: "Jun 2026 – Nov 20, 2026",
  period: "Jan 2026 – Nov 20, 2026",
  byQuarter: qaResolvedByQuarter,
  sourceNote:
    'Jira REST Nov 20, 2026. Close-outs January–October are assignee WAS the five JDAQA account IDs and status CHANGED TO Done: Jan 2, Feb 4, Mar 59, Apr 48, May 34, Jun 40, Jul 37, Aug 48, Sep 26, Oct 73. "QA Owner" in those accounts AND status CHANGED TO Done DURING ("2026-01-01", "2026-10-30") = 0. November DURING ("2026-11-01", "2026-11-20"): assignee WAS = 29, QA Owner in the JDAQA accounts = 14, either = 31. The two that have a QA Owner and were never assigned to JDAQA are RWT-1389 (Marvs Medrano, assignee Jose Rivas) and RWT-1430 (Marvs Medrano, assignee Jose Rivas). Nov 16–20, after Sprint 44 opened: assignee WAS = 5, QA Owner = 1, either = 6. QA Owner is set on 50 tickets for Alex (2), Chester (24), or Marvis (24). Rishi has none. Eve is QA Owner on 16 other tickets and is not counted. Unique YTD matching qaResolvedJql = 394. Monthly close-outs sum to 402; 8 tickets moved to Done in two months, all before November. Quarter averages: Q1 21.7 (65/3), Q2 40.7 (122/3), Q3 37 (111/3), Q4 52 (104/2). Reached QA January–October is status CHANGED TO ("QA Ready", "QA In Progress") AND assignee WAS JDAQA: Jun 49, Jul 88, Aug 51, Sep 65, Oct 75 (Oct 1–30 recount was 72 on the Oct 30 file). November reached QA uses assignee WAS OR QA Owner = 32 (assignee 22, QA Owner 26).',
};

export const manualCoverageSummary = {
  testRepositoryTotal: 979,
  sprintTestingCases: 100,
  totalFormalTestCases: 979 - 100,
  youConnectCoreWorkflows: 147,
  preconditions: 26,
  reportingMicroservice: 455,
  vendorManagement: 69,
  vendorCircle: 92,
  aiReviewForms: 62,
  parachuteStandalone: 24,
  functionalTestingTotal: 875,
};

/** Year-to-date KPIs — primary leadership view for Ed */
export const ytdKpiCards: KpiCard[] = [
  {
    id: "resolved-per-quarter",
    label: "Avg QA Issues Resolved",
    value: qaIssueThroughputSummary.avgResolvedPerMonth,
    quarters: qaResolvedByQuarter.map((quarter) => ({
      label: quarter.label,
      value: formatQuarterNumber(quarter.avgPerMonth),
      numeric: quarter.avgPerMonth,
      note: quarter.partial ? "Oct–Nov 20" : undefined,
      detail:
        quarter.label === "Q4"
          ? "Average of October (73, assignee history) and November (31). November counts a Done ticket once when a JDAQA tester was the assignee or is the QA Owner. The developer stays the assignee."
          : undefined,
      current: quarter.label === "Q4",
    })),
    accent: "blue",
    subtext: "Per month in the quarter",
  },
  {
    id: "resolution-rate",
    label: "Ready for PROD or Done vs Intake",
    value: issueThroughputSummary.resolutionRatePercent,
    unit: "%",
    quarters: closeoutByQuarter
      .filter((quarter) => quarter.label !== "Q1")
      .map((quarter) => ({
        label: quarter.label,
        value: `${formatQuarterNumber(quarter.rate)}%`,
        numeric: quarter.rate,
        note: quarter.partial ? "through Nov 20 · incl. register" : undefined,
        current: quarter.label === "Q4",
      })),
    accent: "green",
    subtext: "Entered either column ÷ created · RWT",
  },
];

/** @deprecated use ytdKpiCards */
export const monthlyKpiCards = ytdKpiCards;

/** @deprecated use ytdKpiCards */
export const kpiCards = ytdKpiCards;

/**
 * Delivery metrics — Sprint 44, the single active sprint (board 271).
 * Pace is measured against Sprint 43 close-outs (Nov 9–16).
 * QA Owner (customfield_10630) is who tests a ticket. Assignee stays the developer.
 */
export const sprintMeta = {
  previousSprint: {
    name: "Sprint 43",
    range: "Nov 9 – Nov 16, 2026",
    status: "closed" as const,
    deliveredItems: 25,
    deliveredStoryPoints: 0,
  },
  currentSprint: {
    name: "Sprint 44",
    range: "Nov 16 – Nov 23, 2026",
    status: "active" as const,
    /** Sprint 44 items outside Done and Won't Do */
    boardOpenItems: 154,
    /** Past To Do, and not Done or Won't Do */
    boardInFlightItems: 113,
    deliveredItems: sprintCurrentDeliveredTickets.length,
    daysElapsed: 5,
    daysTotal: 8,
  },
  sourceUrl:
    "https://realwired.atlassian.net/jira/software/c/projects/RWT/boards",
};

/** Sprint 44 column load — Jira REST Nov 20, 2026 (`sprint = 1967` by status, 186 items, Xray excluded) */
export const sprintPipeline = [
  { stage: "To Do", items: 41, meaning: "In the sprint, not started", highlight: false },
  { stage: "In Progress", items: 14, meaning: "Underway in dev", highlight: false },
  { stage: "Review", items: 31, meaning: "Code complete, in review", highlight: false },
  {
    stage: "QA Ready / QA In Progress",
    items: 1,
    meaning: "Handed to QA — primary QA load signal. Tester is the QA Owner.",
    highlight: true,
  },
  { stage: "Ready for Stage", items: 25, meaning: "Awaiting stage deploy", highlight: false },
  { stage: "Ready for PROD", items: 34, meaning: "Awaiting prod deploy", highlight: false },
  { stage: "Blocked", items: 2, meaning: "Blocked in the sprint", highlight: false },
  { stage: "Hold", items: 6, meaning: "Parked by product / client", highlight: false },
  { stage: "Won't Do", items: 11, meaning: "Closed without doing", highlight: false },
  { stage: "Done", items: 21, meaning: "Still on this sprint and Done. 42 moved to Done this window.", highlight: false },
];

const sprintPacePercent = Math.round(
  (sprintMeta.currentSprint.deliveredItems / sprintMeta.previousSprint.deliveredItems) * 100,
);

export const sprintThroughput = {
  deliveredItems: sprintMeta.currentSprint.deliveredItems,
  /** Prior sprint's close-outs — the pace benchmark */
  benchmarkItems: sprintMeta.previousSprint.deliveredItems,
  percentOfBenchmark: sprintPacePercent,
  daysElapsed: sprintMeta.currentSprint.daysElapsed,
  daysTotal: sprintMeta.currentSprint.daysTotal,
  boardInFlightItems: sprintMeta.currentSprint.boardInFlightItems,
  sourceNote:
    "Jira REST (Nov 20, 2026): `project = RWT AND issuetype NOT IN (\"Test\", \"Test Execution\", \"Test Plan\", \"Test Set\", \"Precondition\") AND status CHANGED TO Done AFTER \"2026-11-16 08:03\"` = 42. Benchmark: Sprint 43 window `status CHANGED TO Done DURING (\"2026-11-09 10:57\", \"2026-11-16 08:03\")` = 25. Jira evaluated these times in America/New_York. Sprint 44 started 2026-11-16T13:03:26Z and Sprint 43 started 2026-11-09T15:57:50Z. Sprint 44 load: 186 items, 113 in flight, 1 in QA. 11 are Won't Do. All 42 Done transitions are still Done. 21 of them are still in the Sprint 44 Done column.",
  contextNote:
    "Sprint 44 runs Nov 16 – Nov 23. Pace is measured against Sprint 43's 25 close-outs. QA Owner is who tests a ticket. The developer stays the assignee.",
};

export const sprintOrmProgress = {
  epic: ormAutomationEpic.key,
  epicTitle: ormAutomationEpic.title,
  epicUrl: ormAutomationEpic.url,
  /** Jira REST Nov 20, 2026 — `parent = RWT-107` (28 child tasks, all Done). */
  totalModules: 28,
  done: 28,
  inQa: 0,
  inProgress: 0,
  todo: 0,
  priorWindowDelivered: [],
  currentWindowDone: [],
  currentWindowInQa: [],
  currentWindowInProgress: [],
  backlogTodo: [],
  completedModules: ormCompletedModules,
  contextNote:
    "Epic RWT-107 is complete: all 28 modules are Done. No ORM automation tasks are in Sprint 44.",
};

export const sprintKpiCards: KpiCard[] = [
  {
    id: "qa-queue",
    label: "In QA Right Now",
    value: sprintInQaTickets.length,
    changeLabel: `QA Owner Alex Norwood · QA In Progress · ${sprintMeta.currentSprint.name}`,
    subtext:
      "QA Owner is who tests the ticket. The developer stays the assignee. This epic has not left the QA lane.",
    contextLines: [
      "47 Sprint 44 tickets have a QA Owner",
      "Chester Cabia 17 · Marvs Medrano 18 · eve 11 · Alex Norwood 1",
      "39 of those are already Ready for Stage or Ready for PROD",
    ],
    accent: "amber",
    tickets: sprintInQaTickets,
    ticketsLabel: "Tickets in QA",
  },
  {
    id: "sprint-delivered",
    label: `Tickets Moved to Done · ${sprintMeta.currentSprint.name}`,
    value: sprintCurrentDeliveredTickets.length,
    unit: "tickets",
    changeLabel: `Day ${sprintMeta.currentSprint.daysElapsed} of ${sprintMeta.currentSprint.daysTotal} · prior sprint closed ${sprintMeta.previousSprint.deliveredItems}`,
    accent: "green",
    tickets: sprintCurrentDeliveredTickets,
    ticketsLabel: "Tickets moved to Done",
  },
  {
    id: "bugs-sprint",
    label: "Bugs Detected in November",
    value: 19,
    changeLabel: "Nov 1–20 · 2 Done",
    subtext:
      "4 were filed after Sprint 44 opened. 4 High or Highest are still open: RWT-1586 (Highest), RWT-1528 (Highest), RWT-1590, and RWT-1407. Epic RWT-1195 added 5 more November bugs, and the Greenfield Organics sample epic RWT-1504 added 3. Neither set is in this count.",
    accent: "blue",
  },
  {
    id: "orm-automation",
    label: `Automation Tasks · ${sprintMeta.currentSprint.name}`,
    value: parachuteAutomationTasks.filter((task) => task.status !== "Done").length,
    unit: "tasks",
    changeLabel: `Epic ${parachuteAutomationEpic.key} · ${parachuteAutomationTasks.filter((task) => task.status === "Done").length}/${parachuteAutomationTasks.length} Done`,
    subtext:
      "Parachute Standalone Playwright. 17 Done, 1 in Review, 2 In Progress, 1 on Hold, 2 To Do. The epic is in the Sprint 44 QA lane, QA Owner Alex Norwood. One child, RWT-1097, is in this sprint and is In Progress.",
    accent: "violet",
    tickets: parachuteAutomationTasks,
    ticketsLabel: "RWT-953 tasks",
  },
];

export type BugTicket = {
  key: string;
  summary: string;
  status: string;
  created: string;
  reporter: string;
  url: string;
};

export type BugPeriodMetrics = {
  periodLabel: string;
  periodRange: string;
  detected: number;
  resolved: number;
  openFromPeriod: number;
  resolutionRatePercent: number | null;
  sourceNote: string;
  contextNote: string;
  tickets?: BugTicket[];
};

export const sprintBugMetrics: BugPeriodMetrics = {
  periodLabel: "November, month to date (product bugs)",
  periodRange: "Nov 1 – Nov 20, 2026",
  detected: 19,
  resolved: 2,
  openFromPeriod: 17,
  resolutionRatePercent: 11,
  sourceNote:
    "Jira REST Nov 20, 2026: project in (YP, YCVC, RM, ARF, RWT) AND issuetype = Bug AND created >= \"2026-11-01\" AND created < \"2026-11-21\" AND (parent is EMPTY OR parent not in (RWT-1195, RWT-1504)) AND issuetype NOT IN (\"Test\", \"Test Execution\", \"Test Plan\", \"Test Set\", \"Precondition\") = 19. Resolved means status is Done (2: RWT-1340, RWT-1430). Excluded: parent = RWT-1195 (5 bugs created in November) and parent = RWT-1504 (Greenfield Organics E-Commerce Platform sample epic, 3 bugs). 4 product bugs were created after Sprint 44 opened on Nov 16 at 8:03 AM ET (RWT-1586, RWT-1590, RWT-1594, RWT-1624).",
  contextNote:
    "19 product bugs through Nov 20. 2 are Done, including the High upload failure RWT-1340. 4 High or Highest are still open: RWT-1586 (Highest, United Community Bank vendor connections), RWT-1528 (Highest, non-admin user changes), RWT-1590, and RWT-1407. RWT-1433 is Ready for Stage. Separately, epic RWT-1195 has 5 November bugs, and sample epic RWT-1504 has 3. None of those 8 are in this count.",
  tickets: [
  {
    key: "RWT-1624",
    summary: "Signing: after a failed seal, the signature stays on the Technical document and Sign & finalize stays disabled, so the reviewer can't sign again (QA_Test2, potentially global)",
    status: "To Do",
    created: "2026-11-19",
    reporter: "Marvs Medrano",
    url: "https://realwired.atlassian.net/browse/RWT-1624",
  },
  {
    key: "RWT-1594",
    summary: "KReports scheduler: a report email that some recipients got shows \"Send Error\", and a resend sends it to them again",
    status: "To Do",
    created: "2026-11-18",
    reporter: "Leandro Kondo",
    url: "https://realwired.atlassian.net/browse/RWT-1594",
  },
  {
    key: "RWT-1590",
    summary: "A field turned off for mass update can still be changed by a hand-made request",
    status: "To Do",
    created: "2026-11-17",
    reporter: "Estevao",
    url: "https://realwired.atlassian.net/browse/RWT-1590",
  },
  {
    key: "RWT-1586",
    summary: "United Community Bank (UCBI): no vendors connected to Vendor Circle — client cannot vet about 1,400 vendor updates",
    status: "To Do",
    created: "2026-11-17",
    reporter: "Diego De Grandi",
    url: "https://realwired.atlassian.net/browse/RWT-1586",
  },
  {
    key: "RWT-1533",
    summary: "Review Detail: Source pane sometimes never loads the appraisal and stays on \"Loading source…\" / \"Page 1 of …\" (parachute-dev)",
    status: "To Do",
    created: "2026-11-13",
    reporter: "Alex Norwood",
    url: "https://realwired.atlassian.net/browse/RWT-1533",
  },
  {
    key: "RWT-1528",
    summary: "Non-admin users can change any user, including making themselves admin, through the Employees module",
    status: "Review",
    created: "2026-11-13",
    reporter: "Estevao",
    url: "https://realwired.atlassian.net/browse/RWT-1528",
  },
  {
    key: "RWT-1520",
    summary: "General API \"order report uploaded\" webhook not sent on report reupload or Job Manager upload",
    status: "To Do",
    created: "2026-11-13",
    reporter: "Leandro Kondo",
    url: "https://realwired.atlassian.net/browse/RWT-1520",
  },
  {
    key: "RWT-1503",
    summary: "Vendor web forms: comments can be posted on requests the vendor or reviewer isn't engaged on",
    status: "To Do",
    created: "2026-11-12",
    reporter: "Leandro Kondo",
    url: "https://realwired.atlassian.net/browse/RWT-1503",
  },
  {
    key: "RWT-1498",
    summary: "Technical workbook: \"Add finding\" saves a severity a finding does not have (\"flagged\", \"fail\", \"pass\") and no status",
    status: "To Do",
    created: "2026-11-11",
    reporter: "Marvs Medrano",
    url: "https://realwired.atlassian.net/browse/RWT-1498",
  },
  {
    key: "RWT-1435",
    summary: "Parachute Configure: a reviewer-only user sees the Technical Review Template card and gets a raw \"HttpAdapter… failed with status 403\" error (since RWT-537)",
    status: "To Do",
    created: "2026-11-10",
    reporter: "Marvs Medrano",
    url: "https://realwired.atlassian.net/browse/RWT-1435",
  },
  {
    key: "RWT-1434",
    summary: "Parachute review Activity: correcting the Review date records the raw {{review_date}} placeholder as the previous value (since RWT-872, all covers)",
    status: "To Do",
    created: "2026-11-10",
    reporter: "Marvs Medrano",
    url: "https://realwired.atlassian.net/browse/RWT-1434",
  },
  {
    key: "RWT-1433",
    summary: "Request reupload actions: Reupload Report, Reupload Report and Invoice and Reupload Invoice run from a plain GET link with no CSRF token and no role check (every bank)",
    status: "Ready for Stage",
    created: "2026-11-10",
    reporter: "Leandro Kondo",
    url: "https://realwired.atlassian.net/browse/RWT-1433",
  },
  {
    key: "RWT-1432",
    summary: "Parachute Standalone: a report replaced while a review is running gets the old report's review",
    status: "To Do",
    created: "2026-11-10",
    reporter: "Luiz Roland",
    url: "https://realwired.atlassian.net/browse/RWT-1432",
  },
  {
    key: "RWT-1430",
    summary: "Effective date of value falls back to the report date when the appraisal states none",
    status: "Done",
    created: "2026-11-10",
    reporter: "Jose Rivas",
    url: "https://realwired.atlassian.net/browse/RWT-1430",
  },
  {
    key: "RWT-1423",
    summary: "Refactor YC and VC services to resolve memory limit failures on high-license vendor imports - YC",
    status: "To Do",
    created: "2026-11-09",
    reporter: "henrique",
    url: "https://realwired.atlassian.net/browse/RWT-1423",
  },
  {
    key: "RWT-1410",
    summary: "Production RM refuses Standalone review completions (review_id required) — ship the Reporter fix, then replay the dropped orders",
    status: "To Do",
    created: "2026-11-05",
    reporter: "Luiz Roland",
    url: "https://realwired.atlassian.net/browse/RWT-1410",
  },
  {
    key: "RWT-1407",
    summary: "Vendor Letters: Preview entry point returns a request's filled-in vendor letter to anyone not logged in, looked up by sequential file number (potentially global)",
    status: "To Do",
    created: "2026-11-05",
    reporter: "eve",
    url: "https://realwired.atlassian.net/browse/RWT-1407",
  },
  {
    key: "RWT-1391",
    summary: "KReports scheduler: overlapping passes send the same scheduled report twice",
    status: "To Do",
    created: "2026-11-04",
    reporter: "eve",
    url: "https://realwired.atlassian.net/browse/RWT-1391",
  },
  {
    key: "RWT-1340",
    summary: "Banc of California formally PacWest — Upload failure on 143mb file",
    status: "Done",
    created: "2026-11-03",
    reporter: "Trey Cavaliere",
    url: "https://realwired.atlassian.net/browse/RWT-1340",
  },
  ],
};

export const sprintNarrative = {
  description:
    "Sprint 44 view focuses on QA queue depth, who the QA Owner is, quality signals (bounce-back, open High, time in QA), bugs detected this month, and Parachute automation progress.",
  highlight:
    "Sprint 44 (Nov 16 – Nov 23), day 5 of 8: 42 items moved to Done against Sprint 43's 25, 1 ticket in QA (QA Owner Alex Norwood, not a return visit), and 19 product bugs created in November through the 20th (2 Done). Parachute Playwright epic RWT-953 is 17 of 23 Done.",
  contextNote:
    "Sprint 44 is the single active sprint on board 271 (186 items). Ready for Stage / Ready for PROD is 59 tickets. The QA queue is 1. QA Owner is set on 47 sprint tickets; the developer stays the assignee. Epic RWT-1195 has 15 High or Highest bugs still not Done in this sprint, kept out of the product-bug count.",
};

export const throughputNarrative = {
  label: "Project throughput",
  description:
    "Created vs Ready for PROD or Done measures RWT Consolidated intake and tickets that entered either column. A ticket that entered both in the same month is counted once. QA-lane movement is separate.",
  highlight:
    "YTD Ready for PROD or Done vs intake is 56.5% (911 entries ÷ 1,611 created). November, through the 20th, is 198 ÷ 303 (65.3%). October is 234 ÷ 415 (56.4%). 113 of October's created tickets are the Oct 29 security register under RWT-1195, and none of them reached either column in October. Outside that register, October is 234 ÷ 302 (77.5%). Of tickets created this year, 846 (52.5%) reached Ready for PROD or Done at least once through Nov 20.",
  contextNote:
    "Counted Nov 20, 2026. RWT Consolidated, May–November. Green bars use status CHANGED TO (\"Ready for PROD\", Done) during the calendar month. November runs through Nov 20. Filter excludes Xray artifacts by their real issue-type name ('Test', not 'Xray Test'). Unique tickets that reached either column YTD = 847; the 911 monthly sum counts 64 tickets in more than one month. January–April had none. October created is 415 on this pull; the Oct 30 file held 404. Those 11 extra tickets are not children of RWT-1195. November intake is 169 tasks, 88 stories, 27 bugs, 12 epics, 4 sub-tasks, and 3 tech-debt tickets. Eight of the 303 are children of RWT-1195, and six children of that epic entered Ready for PROD or Done in November.",
};

/** Monthly bug snapshot */
export const monthlyBugMetrics: BugPeriodMetrics = {
  periodLabel: "June – mid July",
  periodRange: "Jun 1 – Jul 13, 2026",
  detected: 4,
  resolved: 7,
  openFromPeriod: 3,
  resolutionRatePercent: null,
  sourceNote:
    "Static YP Bug-type snapshot grouped by Jira Created date (detected = created in period).",
  contextNote:
    "YP Bug-type count for Jun–mid Jul (Alpine Bank order 422, Mass Update Select All, VBR Fee Quote $0 still open). Prefer sprint bug counts for Ed bi-weeklies.",
};

/** Default to sprint cadence for Ed meetings */
export const bugPeriodMetrics = sprintBugMetrics;

export type ProjectCoverageKpi = {
  id: string;
  name: string;
  shortName: string;
  overallCoveragePercent: number;
  manualCoveragePercent: number;
  /** Application-wide automation coverage */
  automationCoveragePercent: number;
  /** Critical-workflow automation coverage (when distinct from app-wide) */
  criticalWorkflowAutomationPercent?: number;
  testCases?: number;
  xrayArtifacts?: number;
  automationTests?: number;
  automationTestsPrevious?: number;
  /** Shown when tests live in another suite (e.g. YouConnect Playwright) */
  automationTestsLabel?: string;
  highlight: string;
  automationNote?: string;
};

export const projectCoverageKpis: ProjectCoverageKpi[] = [
  {
    id: "yp",
    name: "YouConnect Production",
    shortName: "YP",
    overallCoveragePercent: 95,
    manualCoveragePercent: 95,
    automationCoveragePercent: 86,
    criticalWorkflowAutomationPercent: 100,
    xrayArtifacts: 1004,
    automationTests: 294,
    automationTestsPrevious: 159,
    highlight:
      "App-wide 86% of the 28-module automation program (21 full, 6 partial, 1 none). Critical Request Lifecycle + Auth at 100% (up from 72%).",
    automationNote:
      "294 Playwright tests · 86% of in-scope modules (Full=1 / Partial=0.5 / None=0) · 100% critical workflow (Request Lifecycle + Auth). Email Templates is the open module.",
  },
  {
    id: "ycvc",
    name: "YC Vendor Circle",
    shortName: "YCVC",
    overallCoveragePercent: 88,
    manualCoveragePercent: 88,
    automationCoveragePercent: 0,
    testCases: 162,
    highlight:
      "162 manual cases across 13 feature areas — deepest in Report Submission, Credentials, and Vendor Eligibility.",
    automationNote: "Automation expansion queued behind ORM / YouConnect.",
  },
  {
    id: "rm",
    name: "Reporting Microservice",
    shortName: "RM",
    overallCoveragePercent: 85,
    manualCoveragePercent: 85,
    automationCoveragePercent: 0,
    testCases: 117,
    highlight: "117 cases across 8 areas.",
    automationNote: "Automation for RM is backlog — capacity currently on YouConnect + ORM prep.",
  },
  {
    id: "arf",
    name: "Parachute / AI Review Forms",
    shortName: "ARF",
    overallCoveragePercent: 70,
    manualCoveragePercent: 70,
    automationCoveragePercent: 100,
    testCases: 62,
    automationTestsLabel: "YouConnect suite",
    highlight:
      "YouConnect-embedded Parachute order workflow is fully automated (RWT-430 + RWT-490). 62 manual Xray cases remain for Template Editor and regression. Distinct from Parachute Standalone.",
    automationNote:
      "100% of the YouConnect Parachute order program: Order, One Step, Cancel, re-upload/revision, and Completion. Playwright lives in the YouConnect suite (not a separate ARF count). Template Editor is still manual Xray. Parachute Standalone is the card below.",
  },
  {
    id: "parachute-standalone",
    name: "Parachute Standalone",
    shortName: "PSA",
    overallCoveragePercent: 50,
    manualCoveragePercent: 50,
    automationCoveragePercent: 0,
    testCases: 24,
    highlight:
      "4 of 8 product areas have manual Xray cases (epic RWT-310), distinct from ARF: Start a Review / intake (12), in-product report view (2), Workbook Editor (4), Organization (6). Uncovered: authentication, app chrome / navigation, Reviews list, and sign & finalize. 24 cases total.",
    automationNote:
      "No automation yet — the product is still in build and the suite would churn against it.",
  },
];

export type BugMonth = {
  month: string;
  detected: number;
  resolved: number;
};

/**
 * Portfolio-wide YTD product-bug counts — Bug issue type across all five projects
 * (YP + YCVC + RM + ARF + RWT).
 * Jira REST Nov 20, 2026. Detected counts for Jan–Sep match the Oct 30 file.
 *
 * Detected = Created date in month; resolved = currently status Done.
 * August excludes 8 infrastructure tickets; September excludes 4.
 * October and November exclude epic RWT-1195. November also excludes sample epic RWT-1504.
 * October is 42, including RWT-1316, RWT-1321, and RWT-1323 filed Oct 30.
 * The October write-up below is the Oct 30 read of 39.
 */
export const bugsByMonth: BugMonth[] = [
  { month: "Jan 26", detected: 7, resolved: 4 },
  { month: "Feb 26", detected: 2, resolved: 2 },
  { month: "Mar 26", detected: 25, resolved: 21 },
  { month: "Apr 26", detected: 12, resolved: 11 },
  { month: "May 26", detected: 14, resolved: 12 },
  { month: "Jun 26", detected: 27, resolved: 11 },
  { month: "Jul 26", detected: 42, resolved: 26 },
  { month: "Aug 26", detected: 35, resolved: 21 },
  { month: "Sep 26", detected: 39, resolved: 25 },
  { month: "Oct 26", detected: 42, resolved: 23 },
  { month: "Nov 26", detected: 19, resolved: 2 },
];

export type BugMixSlice = {
  label: string;
  count: number;
};

export type BugBriefStat = {
  label: string;
  value: number;
  hint: string;
};

export type BugBriefLine = {
  label: string;
  issue: string;
  status: string;
};

export type BugBriefTheme = {
  id: string;
  title: string;
  count: number;
  summary: string;
  /** A few sentences on the product area these bugs sit in. */
  area?: string;
  lines: BugBriefLine[];
};

export type BugBriefWatch = {
  key: string;
  url: string;
  priority: string;
  status: string;
  summary: string;
};

/** One month's readable bug write-up. Add the next month as another entry. */
export type MonthlyBugBrief = {
  id: string;
  monthLabel: string;
  rangeLabel: string;
  detected: number;
  done: number;
  priorMonthLabel: string;
  priorMonthDetected: number;
  headline: string;
  sourceNote: string;
  stats: BugBriefStat[];
  severity: BugMixSlice[];
  pipeline: BugMixSlice[];
  themes: BugBriefTheme[];
  watch: BugBriefWatch[];
};

/**
 * Monthly product-bug reads. November is the Nov 20 Jira REST pull (19 bugs, 2 Done).
 * October stays the Oct 30 read of 39. Epic RWT-1195 and sample epic RWT-1504 are
 * excluded from the counts and shown as their own themes.
 */
export const monthlyBugBriefs: MonthlyBugBrief[] = [
  {
    id: "2026-11",
    monthLabel: "November 2026",
    rangeLabel: "Nov 1–20",
    detected: 19,
    done: 2,
    priorMonthLabel: "October",
    priorMonthDetected: 42,
    headline:
      "19 product bugs through Nov 20, down from October's 42 on the chart, all filed in RWT. Eight are Parachute. Two are Done, including the High Banc of California upload. Four High or Highest bugs are still open. Epic RWT-1195 added 5 security bugs this month, and the Greenfield Organics sample epic RWT-1504 added 3. Those 8 stay out of the 19.",
    sourceNote:
      'Jira REST Nov 20, 2026: project in (YP, YCVC, RM, ARF, RWT) AND issuetype = Bug AND created >= "2026-11-01" AND created < "2026-11-21" AND (parent is EMPTY OR parent not in (RWT-1195, RWT-1504)) AND issuetype NOT IN ("Test", "Test Execution", "Test Plan", "Test Set", "Precondition") = 19, all RWT. Done means status Done (2: RWT-1340, RWT-1430). Grouping: label Parachute, Standalone, or parachute, or a Parachute summary = 8; label CS and not VC = 1; label VC = 2; the other 8 have no Parachute, CS, or VC label. Excluded: parent = RWT-1195 = 5 (RWT-1436 Highest, RWT-1530 High, RWT-1390 High, RWT-1501 Medium, RWT-1440 Low) and parent = RWT-1504 = 3 sample bugs. Severity of the 19: Highest 2, High 3, Medium 12, Low 2. Status: Done 2, Ready for Stage 1, Review 1, To Do 15.',
    stats: [
      { label: "Reported", value: 19, hint: "October's chart finished at 42" },
      { label: "Done", value: 2, hint: "Upload failure and a Parachute date fix" },
      { label: "High, still open", value: 4, hint: "2 Highest and 2 High" },
      { label: "Left out", value: 8, hint: "5 security-register, 3 sample-epic" },
    ],
    severity: [
      { label: "Highest", count: 2 },
      { label: "High", count: 3 },
      { label: "Medium", count: 12 },
      { label: "Low", count: 2 },
    ],
    pipeline: [
      { label: "Done", count: 2 },
      { label: "Ready for Stage", count: 1 },
      { label: "Review", count: 1 },
      { label: "To Do", count: 15 },
    ],
    themes: [
      {
        id: "parachute",
        title: "Parachute",
        count: 8,
        summary: "Standalone reviews, the workbook, and one completion that production refuses.",
        area: "One is Done. None of the eight are High.",
        lines: [
          { label: "Signing", issue: "After a failed seal, the signature stays and Sign & finalize stays disabled", status: "To Do" },
          { label: "Source pane", issue: "Sometimes never loads the appraisal", status: "To Do" },
          { label: "Add finding", issue: "Saves a severity a finding does not have", status: "To Do" },
          { label: "Configure", issue: "A reviewer-only user gets a raw 403", status: "To Do" },
          { label: "Review date", issue: "Correcting it records the raw {{review_date}} placeholder", status: "To Do" },
          { label: "Replaced report", issue: "A report swapped mid-review keeps the old review", status: "To Do" },
          { label: "Effective date", issue: "Falls back to the report date when the appraisal states none", status: "Done" },
          { label: "Completions", issue: "Production refuses Standalone review completions", status: "To Do" },
        ],
      },
      {
        id: "customer",
        title: "Customer bank",
        count: 1,
        summary: "One named-bank bug, and it is Done.",
        lines: [
          { label: "Banc of California", issue: "Upload fails on a 143 MB file", status: "Done · High" },
        ],
      },
      {
        id: "vendor-circle",
        title: "Vendor Circle",
        count: 2,
        summary: "Neither is Done. United Community Bank is Highest and still To Do.",
        lines: [
          { label: "United Community Bank", issue: "No vendors connected, so about 1,400 updates cannot be vetted", status: "To Do · Highest" },
          { label: "Vendor import", issue: "High-license imports hit a memory limit", status: "To Do" },
        ],
      },
      {
        id: "youconnect",
        title: "YouConnect, no bank label",
        count: 8,
        summary: "Not Parachute, and not labeled as a customer or Vendor Circle bug.",
        area: "Three are High or Highest and still open. The reupload bug is Ready for Stage.",
        lines: [
          { label: "Employees", issue: "A non-admin can change any user, including making themselves admin", status: "Review · Highest" },
          { label: "Mass update", issue: "A field turned off can still be changed by a hand-made request", status: "To Do · High" },
          { label: "Vendor letters", issue: "Preview returns a filled-in letter to anyone not logged in", status: "To Do · High" },
          { label: "Reupload", issue: "Report and invoice reupload run from a GET link with no CSRF token", status: "Ready for Stage" },
          { label: "Web form", issue: "Comments can be posted on requests the vendor is not engaged on", status: "To Do" },
          { label: "Webhook", issue: "\"Order report uploaded\" is not sent on reupload", status: "To Do" },
          { label: "KReports", issue: "A delivered email shows Send Error, and a resend sends it again", status: "To Do" },
          { label: "KReports", issue: "Overlapping passes send the same scheduled report twice", status: "To Do" },
        ],
      },
      {
        id: "security-register",
        title: "Security register, excluded",
        count: 5,
        summary: "Filed in November under epic RWT-1195. None are in the 19.",
        area: "One is Highest and two are High. All five are still To Do.",
        lines: [
          { label: "Document links", issue: "API download links work without a login and accept any signature", status: "To Do · Highest" },
          { label: "Credentials", issue: "Vendor Circle's repository stores AWS passwords in plain text", status: "To Do · High" },
          { label: "SQL", issue: "public_download builds its access check from unescaped request values", status: "To Do · High" },
          { label: "Email attachments", issue: "Any logged-in user with the link can download them", status: "To Do" },
          { label: "SSO", issue: "Login can match a deleted duplicate user", status: "To Do" },
        ],
      },
      {
        id: "sample-epic",
        title: "Sample epic, excluded",
        count: 3,
        summary: "Greenfield Organics is a sample epic, RWT-1504, not a RealWired product.",
        area: "These three stay out of the 19. One is High and In Progress.",
        lines: [
          { label: "Search", issue: "Returns stale results after product updates", status: "Review" },
          { label: "Images", issue: "Product images do not load on Safari mobile", status: "To Do" },
          { label: "Cart", issue: "Total is wrong when several discount codes are applied", status: "In Progress · High" },
        ],
      },
    ],
    watch: [
      {
        key: "RWT-1586",
        url: "https://realwired.atlassian.net/browse/RWT-1586",
        priority: "Highest",
        status: "To Do",
        summary: "United Community Bank has no vendors connected to Vendor Circle, so the client cannot vet about 1,400 updates.",
      },
      {
        key: "RWT-1528",
        url: "https://realwired.atlassian.net/browse/RWT-1528",
        priority: "Highest",
        status: "Review",
        summary: "A non-admin can change any user through Employees, including making themselves an admin.",
      },
      {
        key: "RWT-1590",
        url: "https://realwired.atlassian.net/browse/RWT-1590",
        priority: "High",
        status: "To Do",
        summary: "A field turned off for mass update can still be changed by a hand-made request.",
      },
      {
        key: "RWT-1407",
        url: "https://realwired.atlassian.net/browse/RWT-1407",
        priority: "High",
        status: "To Do",
        summary: "Vendor letter preview returns a request's filled-in letter to anyone who is not logged in.",
      },
      {
        key: "RWT-1436",
        url: "https://realwired.atlassian.net/browse/RWT-1436",
        priority: "Highest",
        status: "To Do",
        summary: "Security register: document download links from the API work without a login and accept any signature.",
      },
      {
        key: "RWT-1390",
        url: "https://realwired.atlassian.net/browse/RWT-1390",
        priority: "High",
        status: "To Do",
        summary: "Security register: public_download builds its document access check from unescaped request values.",
      },
    ],
  },
  {
    id: "2026-10",
    monthLabel: "October 2026",
    rangeLabel: "Oct 1–30",
    detected: 39,
    done: 17,
    priorMonthLabel: "September",
    priorMonthDetected: 39,
    headline:
      "39 product bugs through Oct 30, matching September, all filed in RWT. Seventeen are the Parachute integration and 17 are Done, including the only Highest. Four High bugs are still open. Epic RWT-1195 added 90 security and dependency bugs on Oct 29. Those are excluded from the 39: 42 Dependabot findings are Won't Do, and 14 other High or Highest findings are still To Do, including an unauthenticated SQL injection.",
    sourceNote:
      'Jira REST Oct 30, 2026: project in (YP, YCVC, RM, ARF, RWT) AND issuetype = Bug AND created >= "2026-10-01" AND created < "2026-10-31" AND (parent is EMPTY OR parent != RWT-1195) = 39, all RWT. Done means status Done (17). No documented infrastructure keys in this set. Grouping: parent in (RWT-832, RWT-833), label Parachute or Standalone, or a Parachute / AI Review summary = 17; label CS excluding Vendor Circle (parent RWT-224 or label VC) = 10; Vendor Circle = 3; the other 9 have no parent and no CS, VC, or Parachute label. Excluded: parent = RWT-1195 = 90 bugs (48 Dependabot, of which 42 are Won\'t Do and 6 critical CVEs are still To Do; 14 non-Dependabot High or Highest are To Do, including RWT-1196 and RWT-1197). The Nov 20 chart counts 42 October product bugs and 23 Done. The three added tickets, all filed Oct 30, are RWT-1316 and RWT-1321 (Parachute workbook) and RWT-1323 (vendor mass update). This write-up stays the Oct 30 read.',
    stats: [
      { label: "Reported", value: 39, hint: "September finished at 39" },
      { label: "Done", value: 17, hint: "3 of the 17 closed with no QA required" },
      { label: "Security register", value: 90, hint: "Excluded · 42 Dependabot are Won't Do" },
      { label: "High, still open", value: 4, hint: "None are Highest" },
    ],
    severity: [
      { label: "Highest", count: 1 },
      { label: "High", count: 9 },
      { label: "Medium", count: 24 },
      { label: "Low", count: 5 },
    ],
    pipeline: [
      { label: "Done", count: 17 },
      { label: "Ready for PROD", count: 1 },
      { label: "Ready for Stage", count: 3 },
      { label: "Review", count: 1 },
      { label: "In Progress", count: 5 },
      { label: "Hold", count: 1 },
      { label: "To Do", count: 11 },
    ],
    themes: [
      {
        id: "parachute",
        title: "Parachute integration",
        count: 17,
        summary: "YouConnect orders and the Parachute app itself.",
        area: "Nine are Done. The open High is a Bedrock call that can pin a worker for up to 28 hours.",
        lines: [
          { label: "Address", issue: "Shows an address the bank never entered", status: "Done" },
          { label: "Sign-in", issue: "Screen flashes before it knows you are signed in", status: "Done" },
          { label: "Cancel", issue: "Can't cancel a review from YouConnect", status: "To Do" },
          { label: "Client name", issue: "Cover still shows a merge token", status: "Done" },
          { label: "Review type", issue: "Admin order also creates a Technical review", status: "Done · High" },
          { label: "Property type", issue: "Category and type joined with an underscore", status: "Done" },
          { label: "Role copy", issue: "Says the role is granted directly", status: "Done" },
          { label: "Deadline", issue: "A miss never tells YouConnect", status: "Done · High" },
          { label: "Reviews list", issue: "A signed review's lock icons shove the badges out of line", status: "Done" },
          { label: "AI worker", issue: "A Bedrock call that never returns can pin a worker for 28 hours", status: "To Do · High" },
          { label: "Second order", issue: "A replay for the same appraisal leaves YouConnect at Initiated", status: "Done" },
          { label: "Draft copy", issue: "The attached draft is called the signed document", status: "To Do" },
          { label: "Org logo", issue: "Bank Admin gets a 403 uploading the organization logo", status: "Ready for Stage" },
          { label: "Page cites", issue: "Cited pages come from the engine page table", status: "In Progress" },
          { label: "Signed letter", issue: "HTML in the signer name renders as markup", status: "In Progress" },
          { label: "Template", issue: "Hiding a group's first subsection prints its letter twice", status: "To Do" },
          { label: "Source pane", issue: "Previous page jumps back to page 1 after a scroll", status: "To Do" },
        ],
      },
      {
        id: "customer",
        title: "Customer bank issues",
        count: 10,
        summary: "Eight named banks, plus two YouConnect issues.",
        area: "Seven of the eight bank bugs are Done. Washington Trust is High and in progress. The JM notification picker is waiting on stage.",
        lines: [
          { label: "NBT Bank", issue: "Engagement acceptance error", status: "Done · Highest" },
          { label: "Renasant Bank", issue: "Scheduled reports not sending", status: "Done · High" },
          { label: "Valley National", issue: "LO bid selection doesn't stick", status: "Done" },
          { label: "Stock Yards", issue: "Solicitation timer doesn't hold", status: "Done" },
          { label: "Horizon Farm Credit", issue: "Studio relabel wouldn't complete", status: "Done" },
          { label: "Builders Capital", issue: "Vendor email address missing", status: "Done · High" },
          { label: "Oxford", issue: "Map shows other banks' properties with AMC Mode on", status: "Done · High" },
          { label: "Washington Trust", issue: "Vendor Circle link in the email expires immediately", status: "In Progress · High" },
          { label: "YouConnect", issue: "JM notification picker lists the wrong people", status: "Ready for Stage" },
          { label: "YouConnect", issue: "Credential overrides missing from the change log", status: "In Progress" },
        ],
      },
      {
        id: "vendor-circle",
        title: "Vendor Circle",
        count: 3,
        summary: "None are Done. Vendor Merge is waiting on stage. The notification bug is on Hold.",
        lines: [
          { label: "Vendor Merge", issue: "No link in admin navigation", status: "Ready for Stage" },
          { label: "Notifications", issue: "Unmonitored vendors still email the credential admin", status: "Hold · High" },
          { label: "Merged vendor", issue: "A merged-away profile still opens by URL", status: "To Do" },
        ],
      },
      {
        id: "other",
        title: "No epic or customer label",
        count: 9,
        summary: "Not on a Parachute epic, and not labeled as a customer or Vendor Circle bug.",
        area: "One is Done. Notes search is Ready for PROD. The open High is a scheduled-report job that stays stuck for 24 hours after a crash.",
        lines: [
          { label: "Section delete", issue: "Deleting a section has no undo", status: "Done" },
          { label: "Notes", issue: "Advanced Search never opens", status: "Ready for PROD" },
          { label: "Credentials", issue: "Vendor-type expiration overrides are ignored", status: "To Do" },
          { label: "Credentials", issue: "Blank vendor status skips liability and the master agreement", status: "To Do" },
          { label: "Web form", issue: "Date validation returns HTTP 500", status: "To Do" },
          { label: "API accounts", issue: "The list page sends users away with no unauthorized message", status: "To Do" },
          { label: "Front end", issue: "Minified JavaScript cannot be regenerated from source", status: "In Progress" },
          { label: "Vendor updates", issue: "Non-monitored vendors still create updates from a cached config", status: "Review" },
          { label: "Scheduled reports", issue: "A crashed job stays stuck for 24 hours", status: "To Do · High" },
        ],
      },
      {
        id: "security-register",
        title: "Security register, excluded",
        count: 90,
        summary: "Filed Oct 29 under epic RWT-1195, from findings Henrique recorded while doing other YouConnect work.",
        area: "42 Dependabot findings are Won't Do. Six critical dependency CVEs are still To Do. Fourteen other High or Highest findings are To Do, led by an unauthenticated SQL injection and a deploy key that any branch workflow can reach.",
        lines: [
          { label: "SQL injection", issue: "Unauthenticated getDocument entry point", status: "To Do · Highest" },
          { label: "Deploy key", issue: "SSH key reachable from any branch workflow", status: "To Do · Highest" },
          { label: "IDOR", issue: "download.php checks access before it loads the record", status: "To Do · High" },
          { label: "Public download", issue: "fromAdmin=1 skips the token check", status: "To Do · High" },
          { label: "Dependabot", issue: "48 dependency findings, 42 marked Won't Do", status: "6 critical still To Do" },
        ],
      },
    ],
    watch: [
      {
        key: "RWT-960",
        url: "https://realwired.atlassian.net/browse/RWT-960",
        priority: "High",
        status: "Hold",
        summary: "Vendor Circle still emails the credential admin about vendors that are not monitored.",
      },
      {
        key: "RWT-1018",
        url: "https://realwired.atlassian.net/browse/RWT-1018",
        priority: "High",
        status: "To Do",
        summary: "A Bedrock call that never returns can pin an AI Review worker for up to 28 hours.",
      },
      {
        key: "RWT-1186",
        url: "https://realwired.atlassian.net/browse/RWT-1186",
        priority: "High",
        status: "In Progress",
        summary: "Washington Trust's vendor circle link expires as soon as the email goes out.",
      },
      {
        key: "RWT-1313",
        url: "https://realwired.atlassian.net/browse/RWT-1313",
        priority: "High",
        status: "To Do",
        summary: "When a scheduled job crashes, Run Scheduled Reports stays stuck for 24 hours.",
      },
      {
        key: "RWT-1196",
        url: "https://realwired.atlassian.net/browse/RWT-1196",
        priority: "Highest",
        status: "To Do",
        summary: "Security register: SQL injection in the unauthenticated getDocument entry point.",
      },
      {
        key: "RWT-1197",
        url: "https://realwired.atlassian.net/browse/RWT-1197",
        priority: "Highest",
        status: "To Do",
        summary: "Security register: the deploy role and SSH key are reachable from any branch workflow.",
      },
    ],
  },
];

export type BugsByProject = {
  projectId: string;
  projectName: string;
  shortName: string;
  months: BugMonth[];
};

/**
 * Per-project YTD bug drill-down. Jira REST Nov 20, 2026.
 * October product bugs are 42 and November's are 19, all RWT, after excluding epic RWT-1195
 * and, in November, sample epic RWT-1504. ARF is absent because no Bug-type tickets were
 * filed against it this year; its defects were logged in YP or, from June, in RWT.
 */
export const bugsByProject: BugsByProject[] = [
  {
    projectId: "rwt",
    projectName: "RWT Consolidated",
    shortName: "RWT",
    months: [
      { month: "Jan", detected: 0, resolved: 0 },
      { month: "Feb", detected: 0, resolved: 0 },
      { month: "Mar", detected: 0, resolved: 0 },
      { month: "Apr", detected: 0, resolved: 0 },
      { month: "May", detected: 2, resolved: 2 },
      { month: "Jun", detected: 26, resolved: 10 },
      { month: "Jul", detected: 42, resolved: 26 },
      { month: "Aug", detected: 35, resolved: 21 },
      { month: "Sep", detected: 39, resolved: 25 },
      { month: "Oct", detected: 42, resolved: 23 },
      { month: "Nov", detected: 19, resolved: 2 },
    ],
  },
  {
    projectId: "yp",
    projectName: "YouConnect Production",
    shortName: "YP",
    months: [
      { month: "Jan", detected: 5, resolved: 2 },
      { month: "Feb", detected: 2, resolved: 2 },
      { month: "Mar", detected: 7, resolved: 6 },
      { month: "Apr", detected: 4, resolved: 4 },
      { month: "May", detected: 11, resolved: 9 },
      { month: "Jun", detected: 1, resolved: 1 },
      { month: "Jul", detected: 0, resolved: 0 },
      { month: "Aug", detected: 0, resolved: 0 },
      { month: "Sep", detected: 0, resolved: 0 },
      { month: "Oct", detected: 0, resolved: 0 },
      { month: "Nov", detected: 0, resolved: 0 },
    ],
  },
  {
    projectId: "ycvc",
    projectName: "YC Vendor Circle",
    shortName: "YCVC",
    months: [
      { month: "Jan", detected: 0, resolved: 0 },
      { month: "Feb", detected: 0, resolved: 0 },
      { month: "Mar", detected: 14, resolved: 12 },
      { month: "Apr", detected: 3, resolved: 3 },
      { month: "May", detected: 0, resolved: 0 },
      { month: "Jun", detected: 0, resolved: 0 },
      { month: "Jul", detected: 0, resolved: 0 },
      { month: "Aug", detected: 0, resolved: 0 },
      { month: "Sep", detected: 0, resolved: 0 },
      { month: "Oct", detected: 0, resolved: 0 },
      { month: "Nov", detected: 0, resolved: 0 },
    ],
  },
  {
    projectId: "rm",
    projectName: "Reporting Microservice",
    shortName: "RM",
    months: [
      { month: "Jan", detected: 2, resolved: 2 },
      { month: "Feb", detected: 0, resolved: 0 },
      { month: "Mar", detected: 4, resolved: 3 },
      { month: "Apr", detected: 5, resolved: 4 },
      { month: "May", detected: 1, resolved: 1 },
      { month: "Jun", detected: 0, resolved: 0 },
      { month: "Jul", detected: 0, resolved: 0 },
      { month: "Aug", detected: 0, resolved: 0 },
      { month: "Sep", detected: 0, resolved: 0 },
      { month: "Oct", detected: 0, resolved: 0 },
      { month: "Nov", detected: 0, resolved: 0 },
    ],
  },
];

export type AutomationRunResult = {
  suite: string;
  passed: number;
  failed: number;
  flaky?: number;
  skipped: number;
  passRate: number;
  date: string;
  source: string;
  status: "passing" | "unstable" | "failing" | "planned";
  note?: string;
};

export type AutomationRunSpec = {
  file: string;
  passed: number;
  failed: number;
  flaky: number;
  skipped: number;
  note?: string;
};

/** YouConnect full regression — 2026-10-20 CI run (stage.realwired.com). */
export const latestPlaywrightRun = {
  title: "YouConnect — Playwright Run",
  subtitle: "Full regression suite · CI mode · headless · Chromium · 1 retry",
  environment: "stage.realwired.com",
  startedAt: "2026-10-20 18:55 UTC",
  durationMin: 208.4,
  totalTests: 299,
  passed: 270,
  failed: 5,
  flaky: 3,
  skipped: 21,
  passRatePercent: 97.1,
  passRateNote: "270/278 executed (excluding skipped)",
  updateNote: "Full regression on stage, 20 Oct 2026 (GitHub Actions run 39478846592). 5 failures. 1 is the same known bug, RWT-497. Zip County search (RWT-314) passed, and Parachute standalone now switches on and off on stage. Transaction Report file 10136 shows Vendor Fee 1234.56 while the request fee fields are blank, so the 6 later tests in that spec did not run. Cancel Engagement and its partial-fee invoice upload both timed out, and the disputed-report flow never opened the vendor popup. Two known defects stay quarantined and count as passed: sorting the Emails list by To, and the Vendor Letters post-delete redirect.",
  failureBreakdown: [
    {
      count: 1,
      label: "Known bug — RWT-497",
      detail: "Loan Officer still gets an Order ERIS button on a Property with no modal.",
    },
    {
      count: 1,
      label: "Transaction Report fee",
      detail: "File 10136 Vendor Fee is 1234.56 on the report and 0 on the request (partial fee and fee quote are blank, assignment Complete). The test says that can be benign when the request is a BWM order. The other 6 tests in that spec are serial, so they did not run.",
    },
    {
      count: 2,
      label: "Cancel engagement timed out",
      detail: "Cancel Engagement waited 150 seconds and the request status field never became visible. Upload Partial Fee Invoice waited 180 seconds for the search button. Cancel Engagement with a partial fee passed.",
    },
    {
      count: 1,
      label: "Disputed report",
      detail: "Asked for corrections never opened the vendor selection popup. The retry timed out loading the request list.",
    },
  ],
  flakyNote: "3 recovered on retry — Report Summary create and the revised delivery date (the page closed mid-click on a vendor link), and Revision Report Submission (the request list timed out loading).",
  reportSource: "GitHub Actions run 39478846592 · results.json · https://github.com/RealWired/YouConnect/actions/runs/39478846592",
};

export const automationRunResults: AutomationRunResult[] = [
  {
    suite: "Request Lifecycle",
    passed: 46,
    failed: 3,
    flaky: 2,
    skipped: 0,
    passRate: 90,
    date: "Oct 20 2026",
    source: "CI · stage.realwired.com",
    status: "unstable",
    note: "Cancel Engagement and the partial-fee invoice upload timed out. Disputed report never opened the vendor popup. Revision Report Submission and the revised delivery date recovered on retry",
  },
  {
    suite: "Authentication",
    passed: 21,
    failed: 0,
    flaky: 0,
    skipped: 2,
    passRate: 100,
    date: "Oct 20 2026",
    source: "CI · stage.realwired.com",
    status: "passing",
    note: "Admin, JM, and LO setup passed · 2 skipped (invalid password, lockout)",
  },
  {
    suite: "General Settings",
    passed: 8,
    failed: 0,
    flaky: 0,
    skipped: 0,
    passRate: 100,
    date: "Oct 20 2026",
    source: "CI · stage.realwired.com",
    status: "passing",
    note: "Default Filter By Status passed. Parachute standalone now switches on and off on stage",
  },
  {
    suite: "Module regression",
    passed: 195,
    failed: 2,
    flaky: 1,
    skipped: 19,
    passRate: 98,
    date: "Oct 20 2026",
    source: "CI · stage.realwired.com",
    status: "unstable",
    note: "RWT-497 is still red. Zip County Basic and Advanced Search passed. Transaction Report file 10136 Vendor Fee does not match the request. Report Summary create recovered on retry. Bulk bid send/cancel stayed skipped (opt-in)",
  },
];

export const automationRunSpecDetails: AutomationRunSpec[] = [
  {
    file: "request-lifecycle/cancel-engagement/cancel-enagement.spec.js",
    passed: 1,
    failed: 2,
    flaky: 0,
    skipped: 0,
    note: "Cancel Engagement timed out waiting for the request status. Upload Partial Fee Invoice timed out waiting for the search button. Cancel with a partial fee passed",
  },
  {
    file: "modules/eris-report/eris-report-smoke.spec.js",
    passed: 7,
    failed: 1,
    flaky: 0,
    skipped: 0,
    note: "RWT-497 canary still red — Loan Officer Order button renders, but the modal handler is missing",
  },
  {
    file: "modules/k-reports/transaction-report.spec.js",
    passed: 3,
    failed: 1,
    flaky: 0,
    skipped: 6,
    note: "File 10136 Vendor Fee is 1234.56 on the report and 0 on the request (partial fee and fee quote are blank). The test says that can be benign when the request is a BWM order. The other 6 tests are serial and did not run",
  },
  {
    file: "request-lifecycle/report-review/report-disputedANDcorrections.spec.js",
    passed: 0,
    failed: 1,
    flaky: 1,
    skipped: 0,
    note: "Asked for corrections never opened the vendor selection popup; the retry timed out loading the request list. Revision Report Submission recovered on retry",
  },
  {
    file: "modules/report-summaries/report-summaries-crud.spec.js",
    passed: 6,
    failed: 0,
    flaky: 1,
    skipped: 0,
    note: "Create from a request in review recovered on retry — the page closed mid-click on a vendor link",
  },
  {
    file: "request-lifecycle/report-submission/report-deliverydate-revised.spec.js",
    passed: 0,
    failed: 0,
    flaky: 1,
    skipped: 0,
    note: "Recovered on retry — the page closed mid-click on a vendor link",
  },
  {
    file: "fixtures/auth.setup.admin.js",
    passed: 1,
    failed: 0,
    flaky: 0,
    skipped: 0,
  },
  {
    file: "fixtures/auth.setup.loan-officer.js",
    passed: 1,
    failed: 0,
    flaky: 0,
    skipped: 0,
  },
  {
    file: "fixtures/auth.setup.job-manager.js",
    passed: 1,
    failed: 0,
    flaky: 0,
    skipped: 0,
  },
  {
    file: "auth/forgot-password.spec.js",
    passed: 7,
    failed: 0,
    flaky: 0,
    skipped: 0,
  },
  {
    file: "auth/forgot-username.spec.js",
    passed: 7,
    failed: 0,
    flaky: 0,
    skipped: 0,
  },
  {
    file: "auth/login.spec.js",
    passed: 4,
    failed: 0,
    flaky: 0,
    skipped: 2,
    note: "2 skipped (invalid password, lockout)",
  },
  {
    file: "GeneralSettings/DefaultFilterByStatus.spec.js",
    passed: 2,
    failed: 0,
    flaky: 0,
    skipped: 0,
  },
  {
    file: "GeneralSettings/ParachuteStandaloneSwitch.spec.js",
    passed: 6,
    failed: 0,
    flaky: 0,
    skipped: 0,
    note: "Stage accepted a valid organization ID, kept it across a new session, and switching off left the ID in place",
  },
  {
    file: "modules/api-accounts/api-accounts-crud-smoke.spec.js",
    passed: 9,
    failed: 0,
    flaky: 0,
    skipped: 0,
  },
  {
    file: "modules/bank-holidays/bank-holidays-crud-smoke.spec.js",
    passed: 5,
    failed: 0,
    flaky: 0,
    skipped: 0,
  },
  {
    file: "modules/bank-holidays/bank-holidays-search-smoke.spec.js",
    passed: 5,
    failed: 0,
    flaky: 0,
    skipped: 0,
  },
  {
    file: "modules/comments/comments-thread-presence-smoke.spec.js",
    passed: 1,
    failed: 0,
    flaky: 0,
    skipped: 0,
  },
  {
    file: "modules/comments/comments-thread-smoke.spec.js",
    passed: 3,
    failed: 0,
    flaky: 0,
    skipped: 0,
  },
  {
    file: "modules/data-msa/data-msa-crud-smoke.spec.js",
    passed: 6,
    failed: 0,
    flaky: 0,
    skipped: 0,
  },
  {
    file: "modules/documents/documents-create-validation.spec.js",
    passed: 1,
    failed: 0,
    flaky: 0,
    skipped: 0,
  },
  {
    file: "modules/documents/documents-lifecycle-smoke.spec.js",
    passed: 1,
    failed: 0,
    flaky: 0,
    skipped: 0,
  },
  {
    file: "modules/emails/emails-access-gate.spec.js",
    passed: 3,
    failed: 0,
    flaky: 0,
    skipped: 0,
  },
  {
    file: "modules/emails/emails-history-subpanel.spec.js",
    passed: 6,
    failed: 0,
    flaky: 0,
    skipped: 0,
  },
  {
    file: "modules/emails/emails-list-smoke.spec.js",
    passed: 10,
    failed: 0,
    flaky: 0,
    skipped: 0,
    note: "Sorting by To is quarantined and counts as passed: ORDER BY to_addrs_names matches no column",
  },
  {
    file: "modules/emails/emails-resend-wiring.spec.js",
    passed: 8,
    failed: 0,
    flaky: 0,
    skipped: 0,
  },
  {
    file: "modules/geocode-status/geocode-status-list-search.spec.js",
    passed: 14,
    failed: 0,
    flaky: 0,
    skipped: 0,
  },
  {
    file: "modules/geocode-status/geocode-status-vendor-lifecycle.spec.js",
    passed: 2,
    failed: 0,
    flaky: 0,
    skipped: 0,
  },
  {
    file: "modules/k-reports/k-reports-crud.spec.js",
    passed: 10,
    failed: 0,
    flaky: 0,
    skipped: 0,
  },
  {
    file: "modules/k-reports/k-reports-search.spec.js",
    passed: 5,
    failed: 0,
    flaky: 0,
    skipped: 0,
  },
  {
    file: "modules/k-reports/k-reports-smoke.spec.js",
    passed: 1,
    failed: 0,
    flaky: 0,
    skipped: 0,
  },
  {
    file: "modules/market-area/market-area-crud-smoke.spec.js",
    passed: 6,
    failed: 0,
    flaky: 0,
    skipped: 1,
    note: "1 skipped — a Logical Routing rule with a blank Request Type blocks the assigned-area fallback",
  },
  {
    file: "modules/notes/notes-crud.spec.js",
    passed: 8,
    failed: 0,
    flaky: 0,
    skipped: 0,
  },
  {
    file: "modules/notes/notes-search-indexing.spec.js",
    passed: 5,
    failed: 0,
    flaky: 0,
    skipped: 2,
    note: "2 skipped — Advanced Search does not render for Notes on stage",
  },
  {
    file: "modules/notes/notes-sorting.spec.js",
    passed: 4,
    failed: 0,
    flaky: 0,
    skipped: 0,
  },
  {
    file: "modules/password-management/password-management-load-smoke.spec.js",
    passed: 4,
    failed: 0,
    flaky: 0,
    skipped: 0,
  },
  {
    file: "modules/password-management/password-management-save-smoke.spec.js",
    passed: 2,
    failed: 0,
    flaky: 0,
    skipped: 0,
  },
  {
    file: "modules/solicitation/solicitation-detail-smoke.spec.js",
    passed: 1,
    failed: 0,
    flaky: 0,
    skipped: 0,
  },
  {
    file: "modules/solicitation/solicitation-list-search-smoke.spec.js",
    passed: 1,
    failed: 0,
    flaky: 0,
    skipped: 0,
  },
  {
    file: "modules/st-field-templates/st-field-templates-advanced-search.spec.js",
    passed: 1,
    failed: 0,
    flaky: 0,
    skipped: 0,
  },
  {
    file: "modules/st-field-templates/st-field-templates-crud.spec.js",
    passed: 2,
    failed: 0,
    flaky: 0,
    skipped: 0,
  },
  {
    file: "modules/st-field-templates/st-field-templates-smoke.spec.js",
    passed: 1,
    failed: 0,
    flaky: 0,
    skipped: 0,
  },
  {
    file: "modules/st-logical-routing/logical-routing-crud.spec.js",
    passed: 6,
    failed: 0,
    flaky: 0,
    skipped: 0,
  },
  {
    file: "modules/st-logical-routing/logical-routing-duplicate-guard.spec.js",
    passed: 3,
    failed: 0,
    flaky: 0,
    skipped: 0,
  },
  {
    file: "modules/user-management/group-users-crud.spec.js",
    passed: 1,
    failed: 0,
    flaky: 0,
    skipped: 0,
  },
  {
    file: "modules/user-management/role-permissions.spec.js",
    passed: 2,
    failed: 0,
    flaky: 0,
    skipped: 0,
  },
  {
    file: "modules/user-management/roles-crud.spec.js",
    passed: 1,
    failed: 0,
    flaky: 0,
    skipped: 0,
  },
  {
    file: "modules/user-management/users-crud.spec.js",
    passed: 1,
    failed: 0,
    flaky: 0,
    skipped: 0,
  },
  {
    file: "modules/user-management/users-deactivate.spec.js",
    passed: 1,
    failed: 0,
    flaky: 0,
    skipped: 0,
  },
  {
    file: "modules/user-management/users-list-search.spec.js",
    passed: 1,
    failed: 0,
    flaky: 0,
    skipped: 0,
  },
  {
    file: "modules/vendor/vendor-create-edit-smoke.spec.js",
    passed: 1,
    failed: 0,
    flaky: 0,
    skipped: 0,
  },
  {
    file: "modules/vendor/vendor-create-validation.spec.js",
    passed: 1,
    failed: 0,
    flaky: 0,
    skipped: 0,
  },
  {
    file: "modules/vendor/vendor-search-smoke.spec.js",
    passed: 1,
    failed: 0,
    flaky: 0,
    skipped: 1,
    note: "1 skipped — license search needs a Credentials record, out of smoke scope",
  },
  {
    file: "modules/vendor/vendor-solicitation-visibility.spec.js",
    passed: 2,
    failed: 0,
    flaky: 0,
    skipped: 1,
    note: "1 skipped — selectability matrix needs licence and BankConfig fixtures",
  },
  {
    file: "modules/vendor-letters/vendor-letters-crud-smoke.spec.js",
    passed: 5,
    failed: 0,
    flaky: 0,
    skipped: 0,
    note: "Post-delete redirect is quarantined and counts as passed: delete goes to EmailTemplates instead of the Vendor Letters list",
  },
  {
    file: "modules/vendor-letters/vendor-letters-preview-smoke.spec.js",
    passed: 1,
    failed: 0,
    flaky: 0,
    skipped: 0,
  },
  {
    file: "modules/zip-code-management/zip-code-management-regression.spec.js",
    passed: 6,
    failed: 0,
    flaky: 0,
    skipped: 0,
    note: "RWT-314 canaries passed — Zip County Basic and Advanced Search both returned rows",
  },
  {
    file: "modules/st-appraisal/request-list-advanced-search.spec.js",
    passed: 2,
    failed: 0,
    flaky: 0,
    skipped: 0,
  },
  {
    file: "modules/st-appraisal/request-list-detail-smoke.spec.js",
    passed: 2,
    failed: 0,
    flaky: 0,
    skipped: 0,
  },
  {
    file: "modules/st-appraisal/request-list-smoke.spec.js",
    passed: 4,
    failed: 0,
    flaky: 0,
    skipped: 0,
  },
  {
    file: "modules/st-appraisal/request-list-sort-smoke.spec.js",
    passed: 1,
    failed: 0,
    flaky: 0,
    skipped: 0,
  },
  {
    file: "modules/user-management/role-permissions-enforcement.spec.js",
    passed: 1,
    failed: 0,
    flaky: 0,
    skipped: 0,
  },
  {
    file: "modules/View-Edit-properties/View_Edit_Properties.spec.js",
    passed: 6,
    failed: 0,
    flaky: 0,
    skipped: 0,
  },
  {
    file: "request-lifecycle/request-creation-wizard/request-creation.spec.js",
    passed: 3,
    failed: 0,
    flaky: 0,
    skipped: 0,
  },
  {
    file: "request-lifecycle/request-list/request-review.spec.js",
    passed: 7,
    failed: 0,
    flaky: 0,
    skipped: 0,
  },
  {
    file: "modules/bulk-bid/bulk-bid-lifecycle.spec.js",
    passed: 4,
    failed: 0,
    flaky: 0,
    skipped: 0,
  },
  {
    file: "modules/bulk-bid/bulk-bid-send-cancel-lifecycle.spec.js",
    passed: 0,
    failed: 0,
    flaky: 0,
    skipped: 8,
    note: "Opt-in only — mutates shared stage data, so the send/cancel chain did not run",
  },
  {
    file: "modules/st-field-templates/st-field-templates-request-integration.spec.js",
    passed: 1,
    failed: 0,
    flaky: 0,
    skipped: 0,
  },
  {
    file: "request-lifecycle/report-review/report-review-acceptance.spec.js",
    passed: 1,
    failed: 0,
    flaky: 0,
    skipped: 0,
  },
  {
    file: "request-lifecycle/report-review/report-review-approval.spec.js",
    passed: 1,
    failed: 0,
    flaky: 0,
    skipped: 0,
  },
  {
    file: "request-lifecycle/report-review/report-review-completion.spec.js",
    passed: 1,
    failed: 0,
    flaky: 0,
    skipped: 0,
  },
  {
    file: "request-lifecycle/report-review/report-review.spec.js",
    passed: 5,
    failed: 0,
    flaky: 0,
    skipped: 0,
  },
  {
    file: "request-lifecycle/report-review/request-complete.spec.js",
    passed: 1,
    failed: 0,
    flaky: 0,
    skipped: 0,
  },
  {
    file: "request-lifecycle/report-submission/report-submission.spec.js",
    passed: 2,
    failed: 0,
    flaky: 0,
    skipped: 0,
  },
  {
    file: "request-lifecycle/request-actions/accept-request-onestep.spec.js",
    passed: 3,
    failed: 0,
    flaky: 0,
    skipped: 0,
  },
  {
    file: "request-lifecycle/request-actions/accept-request-twostep.spec.js",
    passed: 1,
    failed: 0,
    flaky: 0,
    skipped: 0,
  },
  {
    file: "request-lifecycle/request-actions/reject-request-twostep.spec.js",
    passed: 1,
    failed: 0,
    flaky: 0,
    skipped: 0,
  },
  {
    file: "request-lifecycle/vendor-solicitation/vendor-solicitation-a.spec.js",
    passed: 5,
    failed: 0,
    flaky: 0,
    skipped: 0,
  },
  {
    file: "request-lifecycle/vendor-solicitation/vendor-solicitation-b.spec.js",
    passed: 5,
    failed: 0,
    flaky: 0,
    skipped: 0,
  },
  {
    file: "request-lifecycle/vendor-solicitation/vendor-solicitation-c.spec.js",
    passed: 5,
    failed: 0,
    flaky: 0,
    skipped: 0,
  },
  {
    file: "request-lifecycle/vendor-solicitation/vendor-solicitation-d.spec.js",
    passed: 4,
    failed: 0,
    flaky: 0,
    skipped: 0,
  },
];

/**
 * YouConnect app-wide automation inventory — Sep 18 2026.
 *
 * Scope: the 28 modules in the YouConnect automation program (ORM briefs +
 * Auth + Requests + General Settings). This is not every screen in Sugar —
 * Construction, Comps, Evaluations, Workgroups, Next Request, vendor licenses /
 * types, and extra addresses are out of the program (no QA access, unused, or
 * never briefed) and are not in the denominator.
 *
 * Depth (a smoke spec is not "the module is done"):
 *   full    = 1.0  brief/contract automated (CRUD, search, or the real workflow)
 *   partial = 0.5  list/load/one-setting only, or the main product action is still manual
 *   none    = 0    no Playwright spec
 *
 * Score = 21 full + 6 partial + 1 none = 24.0 / 28 = 86%.
 * Critical stays step-binary on Request Lifecycle + Auth and is not averaged in.
 */
export type AppWideCoverageDepth = "full" | "partial" | "none";

export const youConnectAppWideAreas: {
  id: string;
  name: string;
  depth: AppWideCoverageDepth;
  note: string;
}[] = [
  { id: "requests", name: "Requests (lifecycle + list)", depth: "full", note: "Create through complete, plus list search/sort/detail" },
  { id: "auth", name: "Auth", depth: "full", note: "Login, forgot password, forgot username" },
  { id: "vendors", name: "Vendors", depth: "full", note: "Create/edit/search/validation" },
  { id: "vendor-letters", name: "Vendor letters", depth: "full", note: "CRUD + preview; PDF merge still manual" },
  { id: "properties", name: "Properties / Accounts", depth: "full", note: "List/read/create/edit/delete/search" },
  { id: "documents", name: "Documents", depth: "full", note: "Upload → search → delete" },
  { id: "notes", name: "Notes", depth: "full", note: "CRUD + search + sort" },
  { id: "comments", name: "Comments", depth: "full", note: "Request thread post/reply/delete" },
  { id: "emails", name: "Emails", depth: "full", note: "Resend tool list/search/sort/history/gate" },
  { id: "users", name: "Users / roles / groups", depth: "full", note: "CRUD, deactivate, permissions" },
  { id: "api-accounts", name: "API accounts", depth: "full", note: "CRUD + search + sort" },
  { id: "k-reports", name: "K Reports", depth: "full", note: "Build/run/search + Transaction Report" },
  { id: "report-summaries", name: "Report summaries", depth: "full", note: "Create from review, search, update, sort, delete" },
  { id: "field-templates", name: "Field templates", depth: "full", note: "CRUD + search + request integration" },
  { id: "logical-routing", name: "Logical routing", depth: "full", note: "CRUD + duplicate guard" },
  { id: "msa", name: "MSA", depth: "full", note: "CRUD + search + sort" },
  { id: "bank-holidays", name: "Bank holidays", depth: "full", note: "CRUD + search + Date Needed gray-out" },
  { id: "geocode", name: "Geocode status", depth: "full", note: "Read list + vendor geocode round trip" },
  { id: "portfolio", name: "Portfolio / projects", depth: "full", note: "List/search/detail + send/cancel" },
  { id: "bulk-bids", name: "Bulk bids", depth: "full", note: "Send/cancel lifecycle" },
  { id: "parachute", name: "AI Parachute review", depth: "full", note: "Order / one-step / cancel / completion" },
  { id: "market-area", name: "Market area", depth: "partial", note: "CRUD smoke only" },
  { id: "zip-codes", name: "Zip code management", depth: "partial", note: "Module smoke; request-picker search is still a known gap (RWT-314)" },
  { id: "solicitation-module", name: "Solicitation module list", depth: "partial", note: "List/search smoke. Bid workflow is under Requests." },
  { id: "password-mgmt", name: "Password management", depth: "partial", note: "Page load + max-length save. Policy enforcement is manual." },
  { id: "bank-config", name: "General Settings", depth: "partial", note: "Default Filter By Status only — not the rest of Bank Config" },
  { id: "eris", name: "ERIS reports", depth: "partial", note: "List/search/gates. Placing an ERIS order is out of scope." },
  { id: "email-templates", name: "Email templates", depth: "none", note: "In the program; no spec yet" },
];

/** YouConnect-embedded Parachute / AI Review (ARF) — not Parachute Standalone. */
export const arfAutomationAreas: {
  id: string;
  name: string;
  depth: AppWideCoverageDepth;
  note: string;
}[] = [
  { id: "order", name: "Order Parachute", depth: "full", note: "Admin / Tech / Both from a request · RWT-430" },
  { id: "one-step", name: "One Step Process", depth: "full", note: "One-step client order + cancel · RWT-490" },
  { id: "cancel-revision", name: "Cancel / re-upload / revision", depth: "full", note: "Cancel while running; re-upload and revision re-enable the order" },
  { id: "completion", name: "Completion", depth: "full", note: "Admin, Tech, and both — draft, download, email" },
  { id: "template-editor", name: "Template Editor", depth: "none", note: "Still manual Xray regression — not in the ORM Parachute briefs" },
];

const APP_WIDE_DEPTH_WEIGHT: Record<AppWideCoverageDepth, number> = {
  full: 1,
  partial: 0.5,
  none: 0,
};

const appWideCoverageScore = youConnectAppWideAreas.reduce(
  (sum, area) => sum + APP_WIDE_DEPTH_WEIGHT[area.depth],
  0,
);

export const appWideCoverageBreakdown = {
  areaCount: youConnectAppWideAreas.length,
  full: youConnectAppWideAreas.filter((a) => a.depth === "full").length,
  partial: youConnectAppWideAreas.filter((a) => a.depth === "partial").length,
  none: youConnectAppWideAreas.filter((a) => a.depth === "none").length,
  score: appWideCoverageScore,
  percent: Math.round((appWideCoverageScore / youConnectAppWideAreas.length) * 100),
  scopeNote:
    "28 modules in the YouConnect automation program (ORM + Auth + Requests + General Settings). Full credit for a completed contract, half for smoke, zero if there is no spec. Not Construction, Comps, Evaluations, or other surfaces outside that program.",
};

/**
 * Critical = 15 / 15 request-lifecycle steps plus auth core (login,
 * forgot-password, forgot-username) = 100%. Out of this number: skipped auth
 * negatives (invalid password, lockout). AI Parachute is in the app-wide
 * inventory, not in this critical step list.
 */
export const automationRunSummary = {
  totalPassed: latestPlaywrightRun.passed,
  totalFailed: latestPlaywrightRun.failed,
  totalFlaky: latestPlaywrightRun.flaky,
  totalSkipped: latestPlaywrightRun.skipped,
  overallPassRate: latestPlaywrightRun.passRatePercent,
  totalSpecFiles: automationRunSpecDetails.length,
  totalAutomatedTests: latestPlaywrightRun.totalTests,
  /** YouConnect application-wide automation — derived from youConnectAppWideAreas */
  appWideAutomationPercent: appWideCoverageBreakdown.percent,
  appWideAutomationPrevious: 83,
  appWideAutomationTargetPercent: 85,
  /** YouConnect critical workflow automation (Request Lifecycle + Auth) */
  criticalWorkflowLabel: "Request Lifecycle + Auth",
  criticalWorkflowAutomationMin: 100,
  criticalWorkflowAutomationMax: 100,
  criticalWorkflowAutomationMid: 100,
  criticalWorkflowAutomationPrevious: 72,
  criticalWorkflowAutomationTargetPercent: 100,
  /** @deprecated use appWideAutomationTargetPercent */
  targetAutomationPercent: 85,
  ciIntegrated: true,
  ciStatus: `${latestPlaywrightRun.title} · ${latestPlaywrightRun.startedAt} · ${latestPlaywrightRun.durationMin} min`,
  note: latestPlaywrightRun.updateNote,
};

export const automationSummary = {
  totalSpecFiles: automationRunSummary.totalSpecFiles,
  totalAutomatedTests: automationRunSummary.totalAutomatedTests,
  criticalWorkflowAutomationMin: automationRunSummary.criticalWorkflowAutomationMin,
  criticalWorkflowAutomationMax: automationRunSummary.criticalWorkflowAutomationMax,
  criticalWorkflowAutomationMid: automationRunSummary.criticalWorkflowAutomationMid,
  manualCriticalCoverage: 100,
  requestLifecycleSmoke: "Completed",
  ormAutomationStatus: `${sprintOrmProgress.done}/${sprintOrmProgress.totalModules} modules Done on RWT-107`,
  frameworksInUse: ["Playwright"],
  ciIntegrated: automationRunSummary.ciIntegrated,
  ciStatus: automationRunSummary.ciStatus,
  stabilizationFocus: [
    "PHP timing/render flake reduction",
    "Synchronization & execution reliability",
    "Lifecycle workflow consistency",
  ],
};
