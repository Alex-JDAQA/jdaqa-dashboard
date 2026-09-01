/**
 * Ongoing QA velocity metrics.
 * Point-in-time 6-month pre/post report frozen at git tag: point-in-time-6mo-contract
 *
 * Sources:
 * - Portfolio throughput Jan–Aug 2026: live Jira (YP, YCVC, RM, ARF, RWT) Sep 1 2026.
 *   Excludes Xray artifacts by their real issue-type names — "Test" (not "Xray Test"),
 *   Test Execution / Test Plan / Test Set / Precondition. The earlier filter missed
 *   1,281 YP "Test" issues and inflated the resolution rate.
 * - Sprint: Sprint 33 (board 271, Aug 31 – Sep 7), the single active sprint; it carries
 *   work from both boards (Projects & Features and YP+VC+Onboarding)
 * - Team: Alex Norwood, Chester Cabia, Marvis Medrano, Rishi Kumar (ORM epic RWT-107)
 * - Coverage / automation inventory: Xray + YouConnect Playwright suite
 */

import {
  ormAutomationEpic,
  ormCompletedModules,
  sprintCurrentDeliveredTickets,
  sprintInQaTickets,
  sprintOrmAutomationInSprint,
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
  reportingPeriod: "Sprint 33 · Aug 31 – Sep 7 · Jan – Aug 2026",
  lastUpdated: "September 1, 2026",
  team: "JDAQA",
  client: "RealWired",
  archiveTag: "point-in-time-6mo-contract",
  meetingCadence: "Bi-weekly with Ed",
};

/** Account IDs used in assignee WAS JQL — includes legacy IDs for full QA-lane history */
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
  accent?: "blue" | "green" | "amber" | "violet";
  subtext?: string;
  tickets?: SprintTicket[];
  ticketsLabel?: string;
};
export type PortfolioMonth = {
  month: string;
  created: number;
  resolved: number;
  resolutionRate: number;
};

/**
 * Combined portfolio monthly totals across all five projects
 * (YP + YCVC + RM + ARF + RWT). Live Jira pull Sep 1, 2026, excluding Xray
 * artifacts ("Test", Test Execution, Test Plan, Test Set, Precondition).
 * Created = created in month; resolved = moved to Done in month.
 *
 * RWT is included from here on: the four original projects went dormant through
 * June as delivery consolidated into RWT, so a YP-only series no longer tracks
 * where the work is. Jul/Aug are almost entirely RWT.
 */
export const portfolioByMonth: PortfolioMonth[] = [
  { month: "Jan 26", created: 155, resolved: 78, resolutionRate: 50 },
  { month: "Feb 26", created: 153, resolved: 102, resolutionRate: 67 },
  { month: "Mar 26", created: 216, resolved: 172, resolutionRate: 80 },
  { month: "Apr 26", created: 120, resolved: 231, resolutionRate: 193 },
  { month: "May 26", created: 113, resolved: 149, resolutionRate: 132 },
  { month: "Jun 26", created: 233, resolved: 179, resolutionRate: 77 },
  { month: "Jul 26", created: 179, resolved: 86, resolutionRate: 48 },
  { month: "Aug 26", created: 256, resolved: 119, resolutionRate: 46 },
];

export type ThroughputMonth = {
  month: string;
  created: number;
  resolved: number;
};

export type PortfolioByProject = {
  projectId: string;
  projectName: string;
  shortName: string;
  ytdCreated: number;
  ytdResolved: number;
  /** Month-by-month split, where a verified per-month pull exists */
  months?: ThroughputMonth[];
  note?: string;
};

/** Per-project YTD throughput drill-down — live Jira Sep 1, 2026, Xray artifacts excluded */
export const portfolioByProject: PortfolioByProject[] = [
  {
    projectId: "rwt",
    projectName: "RWT Consolidated",
    shortName: "RWT",
    ytdCreated: 656,
    ytdResolved: 292,
    months: [
      { month: "Jan", created: 1, resolved: 0 },
      { month: "Feb", created: 1, resolved: 0 },
      { month: "Mar", created: 8, resolved: 0 },
      { month: "Apr", created: 7, resolved: 0 },
      { month: "May", created: 26, resolved: 11 },
      { month: "Jun", created: 179, resolved: 80 },
      { month: "Jul", created: 178, resolved: 82 },
      { month: "Aug", created: 256, resolved: 119 },
    ],
  },
  {
    projectId: "rm",
    projectName: "Reporting Microservice",
    shortName: "RM",
    ytdCreated: 299,
    ytdResolved: 315,
    note: "Dormant since June — intake moved to RWT. Resolved exceeds created because the backlog was drained.",
  },
  {
    projectId: "arf",
    projectName: "Parachute / AI Review Forms",
    shortName: "ARF",
    ytdCreated: 194,
    ytdResolved: 135,
    note: "Dormant since July — Parachute work now tracked in RWT.",
  },
  {
    projectId: "ycvc",
    projectName: "YC Vendor Circle",
    shortName: "YCVC",
    ytdCreated: 158,
    ytdResolved: 262,
    note: "Dormant since June — Vendor Circle work now tracked in RWT.",
  },
  {
    projectId: "yp",
    projectName: "YouConnect Production",
    shortName: "YP",
    ytdCreated: 118,
    ytdResolved: 112,
    note: "Dormant since June. Excludes 1,281 Xray 'Test' artifacts that the previous filter counted as throughput.",
  },
];

/** Rolling portfolio close-out (Done column) — not QA-lane specific */
const portfolioResolvedYtd = portfolioByMonth.reduce((sum, m) => sum + m.resolved, 0);
const portfolioCreatedYtd = portfolioByMonth.reduce((sum, m) => sum + m.created, 0);

export const issueThroughputSummary = {
  avgResolvedPerMonth:
    Math.round((portfolioResolvedYtd / portfolioByMonth.length) * 10) / 10,
  totalResolvedYtd: portfolioResolvedYtd,
  totalCreatedYtd: portfolioCreatedYtd,
  resolutionRatePercent:
    Math.round((portfolioResolvedYtd / portfolioCreatedYtd) * 1000) / 10,
  period: "Jan 2026 – Aug 2026",
};

/**
 * QA-lane resolved throughput — Done issues ever assigned to JDAQA (assignee WAS).
 * Counts tickets that passed through QA even if reassigned back to dev before close.
 * Verified live Jira pull Aug 21, 2026.
 */
export const qaResolvedJql = `project in (YP, YCVC, RM, ARF) AND status = Done AND resolved >= "2026-01-01" AND (assignee WAS "712020:5085ca47-c432-421e-9b43-03ed76c1f0f1" OR assignee WAS "712020:b10ccd52-f0b3-4a52-b6da-285cb8352b30" OR assignee WAS "712020:3928f4f1-270a-41a8-9bd7-d2da1ebaf5c7" OR assignee WAS "712020:74309a28-b6a3-48f1-87cc-9d4c7d7f133b" OR assignee WAS "712020:c3aefbf1-a2de-4f47-888e-aa420021a8fd") AND issuetype NOT IN ("Xray Test", "Test Execution", "Test Plan", "Test Set", "Precondition")`;

/**
 * Still on the pre-fix basis: four projects only, and the "Xray Test" exclusion
 * that never matched the real "Test" issue type. Re-running it across all five
 * projects with the corrected exclusion gives 157. Awaiting sign-off before
 * restating this KPI.
 */
const qaResolvedYtd = 174;
const qaResolvedMonths = portfolioByMonth.length;

export const qaIssueThroughputSummary = {
  avgResolvedPerMonth:
    Math.round((qaResolvedYtd / qaResolvedMonths) * 10) / 10,
  totalResolvedYtd: qaResolvedYtd,
  period: "Jan 2026 – Aug 2026",
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
    id: "resolved-per-month",
    label: "Avg QA Issues Resolved / Month",
    value: qaIssueThroughputSummary.avgResolvedPerMonth,
    changeLabel: `${qaIssueThroughputSummary.totalResolvedYtd} QA-resolved YTD · ${qaIssueThroughputSummary.period}`,
    accent: "blue",
  },
  {
    id: "resolution-rate",
    label: "Project Resolution Rate",
    value: issueThroughputSummary.resolutionRatePercent,
    unit: "%",
    changeLabel: `${issueThroughputSummary.totalResolvedYtd.toLocaleString()} Done ÷ ${issueThroughputSummary.totalCreatedYtd.toLocaleString()} created · ${issueThroughputSummary.period}`,
    accent: "green",
    subtext:
      "Restated: now spans all five projects and excludes Xray 'Test' artifacts. Not comparable to the 73.9% shown before the filter fix.",
  },
  {
    id: "automation-coverage",
    label: "Critical Workflow Automation",
    value: 95,
    unit: "%",
    change: 23,
    changeLabel: "from 72%",
    trend: "up",
    accent: "violet",
    subtext: "YouConnect Request Lifecycle · see Automation sub-tab",
  },
  {
    id: "manual-coverage",
    label: "Manual Coverage (Critical Flows)",
    value: 95,
    unit: "%",
    trend: "up",
    accent: "amber",
    subtext: `${manualCoverageSummary.totalFormalTestCases} formal Xray cases (excl. sprint testing)`,
  },
];

/** @deprecated use ytdKpiCards */
export const monthlyKpiCards = ytdKpiCards;

/** @deprecated use ytdKpiCards */
export const kpiCards = ytdKpiCards;

/**
 * Delivery metrics — Sprint 33, the single active sprint (board 271). Named sprints
 * are back as the reporting unit now that Sprint 33 carries work from both boards
 * (Projects & Features and YP+VC+Onboarding).
 *
 * Sprint 33 runs one week, so the pace benchmark is the prior one-week window
 * (Aug 24–30 = 34 close-outs) rather than a two-week window, which would compare
 * unequal durations.
 */
export const sprintMeta = {
  previousSprint: {
    name: "Aug 24 – 30 window",
    range: "Aug 24 – Aug 30, 2026",
    status: "closed" as const,
    deliveredItems: 34,
    deliveredStoryPoints: 0,
  },
  currentSprint: {
    name: "Sprint 33",
    range: "Aug 31 – Sep 7, 2026",
    status: "active" as const,
    /** Sprint 33 items outside Done */
    boardOpenItems: 90,
    /** Sprint 33 items past the To Do backlog and not yet Done — work in flight */
    boardInFlightItems: 55,
    deliveredItems: sprintCurrentDeliveredTickets.length,
    daysElapsed: 2,
    daysTotal: 7,
  },
  sourceUrl:
    "https://realwired.atlassian.net/jira/software/c/projects/RWT/boards",
};

/** Sprint 33 column load — live Jira Sep 1, 2026 (`sprint in openSprints()` by status, 108 items) */
export const sprintPipeline = [
  { stage: "To Do", items: 35, meaning: "In the sprint, not started", highlight: false },
  { stage: "In Progress", items: 22, meaning: "Underway in dev", highlight: false },
  { stage: "Review", items: 10, meaning: "Code complete, in review", highlight: false },
  {
    stage: "QA Ready / QA In Progress",
    items: 15,
    meaning: "Handed to QA — primary QA load signal",
    highlight: true,
  },
  { stage: "Ready for Stage", items: 1, meaning: "Awaiting stage deploy", highlight: false },
  { stage: "Ready for PROD", items: 2, meaning: "Awaiting prod deploy", highlight: false },
  { stage: "Blocked", items: 1, meaning: "Needs unblocking", highlight: false },
  { stage: "Hold", items: 4, meaning: "Parked by product / client", highlight: false },
  { stage: "Done", items: 18, meaning: "Closed in or before this sprint", highlight: false },
];

const sprintPacePercent = Math.round(
  (sprintMeta.currentSprint.deliveredItems / sprintMeta.previousSprint.deliveredItems) * 100,
);

export const sprintThroughput = {
  deliveredItems: sprintMeta.currentSprint.deliveredItems,
  /** Prior two-week window's close-outs — the pace benchmark for a Kanban lane */
  benchmarkItems: sprintMeta.previousSprint.deliveredItems,
  percentOfBenchmark: sprintPacePercent,
  daysElapsed: sprintMeta.currentSprint.daysElapsed,
  daysTotal: sprintMeta.currentSprint.daysTotal,
  boardInFlightItems: sprintMeta.currentSprint.boardInFlightItems,
  sourceNote:
    'Jira (verified Sep 1, 2026): `project = RWT AND status CHANGED TO Done AFTER "2026-08-31 14:50"` = 7 items, 6 of them Sprint 33 tickets. Benchmark: the same query over Aug 24–30 = 34. Sprint 33 load: 108 items, 55 in flight, 15 in QA.',
  contextNote:
    "Sprint 33 is a one-week sprint (Aug 31 – Sep 7), so pace is measured against the prior one-week window's 34 close-outs rather than the Aug 17–31 two-week figure of 68 — comparing a week against a fortnight would understate pace by half.",
};

export const sprintOrmProgress = {
  epic: ormAutomationEpic.key,
  epicTitle: ormAutomationEpic.title,
  epicUrl: ormAutomationEpic.url,
  /** Live Jira Sep 1, 2026 — `parent = RWT-107` (28 child tasks). */
  totalModules: 28,
  done: 27,
  inQa: 1,
  inProgress: 0,
  todo: 0,
  /** Modules closed in the prior window (Aug 24 – 30) */
  priorWindowDelivered: [
    "KReports",
    "Geocode status",
    "Transaction Report",
    "Notes",
  ],
  /** Sprint 33 epic progress */
  currentWindowDone: ["User Management"],
  currentWindowInQa: ["st_VendorLetters (QA In Progress)"],
  currentWindowInProgress: [],
  /** Epic To Do modules still queued */
  backlogTodo: [],
  /** All RWT-107 children in Done */
  completedModules: ormCompletedModules,
  contextNote:
    "Epic RWT-107 is effectively complete: 27 of 28 modules Done, with only st_VendorLetters left in QA. The To Do backlog is empty — User Management and Transaction Report both closed since the last update.",
};

export const sprintKpiCards: KpiCard[] = [
  {
    id: "qa-queue",
    label: "In QA Right Now",
    value: sprintInQaTickets.length,
    changeLabel: `${sprintInQaTickets.length} tickets · QA Ready / QA In Progress · Sprint 33`,
    subtext:
      "Up from 5 two weeks ago — 13 of the 15 are Parachute Standalone stories (login, nav, Workbook Editor) that landed in QA together",
    accent: "amber",
    tickets: sprintInQaTickets,
    ticketsLabel: "Tickets in QA",
  },
  {
    id: "sprint-delivered",
    label: `Tickets Moved to Done · ${sprintMeta.currentSprint.name}`,
    value: sprintCurrentDeliveredTickets.length,
    unit: "tickets",
    changeLabel: `Day ${sprintMeta.currentSprint.daysElapsed} of ${sprintMeta.currentSprint.daysTotal} · prior window closed ${sprintMeta.previousSprint.deliveredItems}`,
    accent: "green",
    trend: "up",
    tickets: sprintCurrentDeliveredTickets,
    ticketsLabel: `Tickets moved to Done`,
  },
  {
    id: "bugs-sprint",
    label: "Bugs Detected in August",
    value: 35,
    changeLabel: "Created Aug 1 – Aug 31 · 13 Done",
    subtext:
      "Product bugs only — excludes 8 infrastructure/DevOps tickets (Splunk log forwarder, ORM dev env, site-slowness and version-control items)",
    accent: "blue",
  },
  {
    id: "orm-automation",
    label: `Automation Tasks · ${sprintMeta.currentSprint.name}`,
    value: sprintOrmAutomationInSprint.length,
    unit: "tasks",
    changeLabel: `Epic ${ormAutomationEpic.key} · ${sprintOrmProgress.currentWindowDone.length} Done · ${sprintOrmProgress.currentWindowInQa.length} in QA · ${sprintOrmProgress.currentWindowInProgress.length} in dev`,
    subtext: `Jira: parent = ${ormAutomationEpic.key}, modules active in the ${sprintMeta.currentSprint.name}`,
    accent: "violet",
    tickets: sprintOrmAutomationInSprint,
    ticketsLabel: "Window automation tasks",
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
  periodLabel: "August, full month (product bugs)",
  periodRange: "Aug 1 – Aug 31, 2026",
  detected: 35,
  resolved: 13,
  openFromPeriod: 22,
  resolutionRatePercent: 37,
  sourceNote:
    'Detected = RWT Bug tickets by Created date (verified Sep 1): project = RWT AND issuetype = Bug AND created >= "2026-08-01" AND created < "2026-09-01" returns 43, less 8 infrastructure tickets (RWT-415/416/417 Splunk log forwarder, RWT-488 ORM dev env, RWT-620/626 site slowness, RWT-625 version control, RWT-662 service refactor).',
  contextNote:
    "35 product bugs created in August; 13 Done, 22 still open. RWT-424 is kept in the count because it hit a client UAT site. Heaviest clusters: Records Retention (4), vendor MFA/2FA security (3), and the KReports scheduler (3, all found by code review). The open headline is RWT-447, an unauthenticated SQL injection in vendor 2FA that appears to allow full MFA bypass; RWT-663 (Oxford AMC save deadlock) and RWT-589 (UCBI Parachute form unusable) are the other Highest-priority items still in flight.",
  tickets: [
    {
      key: "RWT-420",
      summary:
        "Cathay - Records Retention: a restored record can never be deleted again (restore sets an unclearable per-record legal hold)",
      status: "Done",
      created: "2026-08-04",
      reporter: "Diego De Grandi",
      url: "https://realwired.atlassian.net/browse/RWT-420",
    },
    {
      key: "RWT-424",
      summary:
        "SouthState UAT site (jasonsouthstate062024.realwired.com) removed by the 2026-07-30 prod folder cleanup — restored from archive 2026-07-31 (retroactive record)",
      status: "Done",
      created: "2026-08-05",
      reporter: "Diego De Grandi",
      url: "https://realwired.atlassian.net/browse/RWT-424",
    },
    {
      key: "RWT-428",
      summary:
        "Stock Yards Bank (syb) — Review Type Setup rejects a Review Fee with a decimal value — due 8/19/26",
      status: "Done",
      created: "2026-08-06",
      reporter: "Diego De Grandi",
      url: "https://realwired.atlassian.net/browse/RWT-428",
    },
    {
      key: "RWT-432",
      summary:
        "Records Retention: master enable/disable switch (System Admin only, off by default)",
      status: "Done",
      created: "2026-08-06",
      reporter: "Diego De Grandi",
      url: "https://realwired.atlassian.net/browse/RWT-432",
    },
    {
      key: "RWT-446",
      summary:
        "Vendor MFA security code — remove plaintext exposure from UI, reports, audit trail and logs (mask on display, not on persistence; feature-flagged, super-admin exempt)",
      status: "Done",
      created: "2026-08-06",
      reporter: "Ademir Mazer Junior",
      url: "https://realwired.atlassian.net/browse/RWT-446",
    },
    {
      key: "RWT-447",
      summary:
        "Unauthenticated SQL injection in vendor 2FA verification (pincode) — appears to allow full MFA bypass",
      status: "To Do",
      created: "2026-08-06",
      reporter: "Ademir Mazer Junior",
      url: "https://realwired.atlassian.net/browse/RWT-447",
    },
    {
      key: "RWT-453",
      summary:
        "Records Retention: Monthly Report Recipients won't persist, blocking enable (deadlock)",
      status: "Done",
      created: "2026-08-07",
      reporter: "Marvs Medrano",
      url: "https://realwired.atlassian.net/browse/RWT-453",
    },
    {
      key: "RWT-454",
      summary: "Records Retention: Record Retention Management page throws Database failure",
      status: "Done",
      created: "2026-08-07",
      reporter: "Marvs Medrano",
      url: "https://realwired.atlassian.net/browse/RWT-454",
    },
    {
      key: "RWT-457",
      summary:
        "Prosperity Bank — Vendor Circle import fails with 'Failed to retrieve data from Circle. HTTP 500' for vendor Colleen Blumenthal",
      status: "Done",
      created: "2026-08-07",
      reporter: "Diego De Grandi",
      url: "https://realwired.atlassian.net/browse/RWT-457",
    },
    {
      key: "RWT-463",
      summary:
        "Vendor MFA security code — stop feeding the field-level audit trail and KReports (st_Solicitation & st_ReviewSolicitation)",
      status: "To Do",
      created: "2026-08-10",
      reporter: "Ademir Mazer Junior",
      url: "https://realwired.atlassian.net/browse/RWT-463",
    },
    {
      key: "RWT-465",
      summary:
        "Community Bank / CBNA (File #1366) — Parachute Technical Review generated but not retrievable and cannot be re-ordered (recurrence of the fixed RWT-371 defect)",
      status: "Done",
      created: "2026-08-11",
      reporter: "Diego De Grandi",
      url: "https://realwired.atlassian.net/browse/RWT-465",
    },
    {
      key: "RWT-467",
      summary:
        "Washington Trust Bank (WaTrust) — Run Scheduled Reports job hung on the 8/11/2026 run, still not completing (ZD 8757)",
      status: "Review",
      created: "2026-08-12",
      reporter: "Diego De Grandi",
      url: "https://realwired.atlassian.net/browse/RWT-467",
    },
    {
      key: "RWT-483",
      summary:
        "Request Wizard Step 2 — Add Parcel does nothing after the required Parcel # field is deleted",
      status: "To Do",
      created: "2026-08-14",
      reporter: "Diego De Grandi",
      url: "https://realwired.atlassian.net/browse/RWT-483",
    },
    {
      key: "RWT-486",
      summary:
        "SECURITY - Review Type Setup save accepts submissions from non-admin users (system wide)",
      status: "To Do",
      created: "2026-08-14",
      reporter: "Diego De Grandi",
      url: "https://realwired.atlassian.net/browse/RWT-486",
    },
    {
      key: "RWT-491",
      summary: "Parachute AI Review button not available on 1-step request types during review",
      status: "Done",
      created: "2026-08-17",
      reporter: "Diego De Grandi",
      url: "https://realwired.atlassian.net/browse/RWT-491",
    },
    {
      key: "RWT-492",
      summary:
        "Review Assignment Not Accepted Reminder email only goes to the JM, never to the Reviewer (all clients)",
      status: "To Do",
      created: "2026-08-17",
      reporter: "Diego De Grandi",
      url: "https://realwired.atlassian.net/browse/RWT-492",
    },
    {
      key: "RWT-497",
      summary:
        'Loan Officer gets a non-functional "Order ERIS report" button on Property records (button and modal use different gates)',
      status: "To Do",
      created: "2026-08-18",
      reporter: "Marvs Medrano",
      url: "https://realwired.atlassian.net/browse/RWT-497",
    },
    {
      key: "RWT-546",
      summary:
        "KReports scheduler: catch(Error) never clears the 'P' status, causing infinite retry and permanent starvation of all later reports (kschedulingcronhandler.php:147-149)",
      status: "To Do",
      created: "2026-08-18",
      reporter: "David Eloy",
      url: "https://realwired.atlassian.net/browse/RWT-546",
    },
    {
      key: "RWT-547",
      summary:
        "KReports initializeScheduledReports(): undefined variable makes setSchedulerStatus() a silent no-op (UPDATE ... WHERE id='') (kschedulingcronhandler.php:58)",
      status: "To Do",
      created: "2026-08-18",
      reporter: "David Eloy",
      url: "https://realwired.atlassian.net/browse/RWT-547",
    },
    {
      key: "RWT-574",
      summary:
        "KReports scheduler: failed report emails are saved as status='sent' — Send() return value discarded and $exceptions never enabled (kschedulingcronhandler.php:331-350)",
      status: "To Do",
      created: "2026-08-19",
      reporter: "David Eloy",
      url: "https://realwired.atlassian.net/browse/RWT-574",
    },
    {
      key: "RWT-578",
      summary:
        "Logical Routing does not evaluate all selected criteria — requests route to the wrong Job Manager (all banks)",
      status: "Done",
      created: "2026-08-20",
      reporter: "Diego De Grandi",
      url: "https://realwired.atlassian.net/browse/RWT-578",
    },
    {
      key: "RWT-589",
      summary:
        "United Community Bank — Parachute review form: checkboxes can't be ticked and reviewer comment fields can't be focused - UCBI",
      status: "In Progress",
      created: "2026-08-21",
      reporter: "Marvs Medrano",
      url: "https://realwired.atlassian.net/browse/RWT-589",
    },
    {
      key: "RWT-616",
      summary:
        "S&T Bank (applies to all clients) — add Prior Appraisal Value and Prior Appraised Date to the do-not-clone field list used by Copy All in Request Wizard Portfolio mode (ZD 8689)",
      status: "To Do",
      created: "2026-08-24",
      reporter: "Diego De Grandi",
      url: "https://realwired.atlassian.net/browse/RWT-616",
    },
    {
      key: "RWT-617",
      summary:
        "Page No. column added to the request-details table, and page footers disagree with the real page count",
      status: "Done",
      created: "2026-08-24",
      reporter: "Diego De Grandi",
      url: "https://realwired.atlassian.net/browse/RWT-617",
    },
    {
      key: "RWT-619",
      summary:
        "KReports result grid: sorting by a CustomFunction fee column silently empties the report (Vendor Fee, 2% or $2.50 min)",
      status: "To Do",
      created: "2026-08-24",
      reporter: "Marvs Medrano",
      url: "https://realwired.atlassian.net/browse/RWT-619",
    },
    {
      key: "RWT-621",
      summary:
        "Prosperity Bank — resent Appraisal Ready & Review Complete emails use a different subject line and drop the 'File #' wording",
      status: "In Progress",
      created: "2026-08-25",
      reporter: "Diego De Grandi",
      url: "https://realwired.atlassian.net/browse/RWT-621",
    },
    {
      key: "RWT-623",
      summary:
        "Remove the code that allow the Vendor Primary email to be overwritten by the Office Bidder email upon credential request",
      status: "Done",
      created: "2026-08-25",
      reporter: "Diego De Grandi",
      url: "https://realwired.atlassian.net/browse/RWT-623",
    },
    {
      key: "RWT-624",
      summary:
        "Enable change log auditing for all remaining un-audited fields on the Request record",
      status: "To Do",
      created: "2026-08-25",
      reporter: "Diego De Grandi",
      url: "https://realwired.atlassian.net/browse/RWT-624",
    },
    {
      key: "RWT-652",
      summary: 'Emails list: sorting by "To" empties the list instead of reordering it',
      status: "To Do",
      created: "2026-08-28",
      reporter: "Marvs Medrano",
      url: "https://realwired.atlassian.net/browse/RWT-652",
    },
    {
      key: "RWT-659",
      summary:
        "Request Comment attachments are duplicated into the Request Documents subpanel once a Request Document has been uploaded (ZD 8946 — South State Bank, global)",
      status: "To Do",
      created: "2026-08-31",
      reporter: "Diego De Grandi",
      url: "https://realwired.atlassian.net/browse/RWT-659",
    },
    {
      key: "RWT-660",
      summary:
        "Workflow does not auto-advance after a vendor report upload, and Engagement Confirmation Date is written repeatedly to the change log (TXGLO, potentially global)",
      status: "To Do",
      created: "2026-08-31",
      reporter: "Diego De Grandi",
      url: "https://realwired.atlassian.net/browse/RWT-660",
    },
    {
      key: "RWT-663",
      summary:
        "Oxford AMC — Create a Request Step 3: Save Request becomes permanently unresponsive after a required-field validation error is corrected",
      status: "In Progress",
      created: "2026-08-31",
      reporter: "Diego De Grandi",
      url: "https://realwired.atlassian.net/browse/RWT-663",
    },
    {
      key: "RWT-666",
      summary:
        "Prosperity Bank — XSRF error page on YouConnect auto log out since SSO was turned on (ZD 9003)",
      status: "To Do",
      created: "2026-08-31",
      reporter: "Diego De Grandi",
      url: "https://realwired.atlassian.net/browse/RWT-666",
    },
    {
      key: "RWT-668",
      summary:
        "Portfolio/Project: a project whose requests are all in an active bulk solicitation disappears from the project list and search",
      status: "To Do",
      created: "2026-08-31",
      reporter: "Marvs Medrano",
      url: "https://realwired.atlassian.net/browse/RWT-668",
    },
    {
      key: "RWT-669",
      summary:
        "Beacon Bank — outbound notifications still sent from the pre-rebrand no-reply@berkshirebank.realwired.com address",
      status: "To Do",
      created: "2026-08-31",
      reporter: "Diego De Grandi",
      url: "https://realwired.atlassian.net/browse/RWT-669",
    },
  ],
};

export const sprintNarrative = {
  description:
    "Sprint 33 view focuses on QA queue depth, bugs detected in the month, and ORM automation module progress.",
  highlight:
    "Sprint 33 (Aug 31 – Sep 7), day 2 of 7: 7 items already moved to Done against the prior week's 34, 15 tickets sitting in QA, and 35 product bugs created in August (13 Done). ORM epic RWT-107 is now at 27 of 28 modules — only st_VendorLetters is left, and it is in QA.",
  contextNote:
    "Sprint 33 is the single active sprint and already carries work from both boards (Projects & Features and YP+VC+Onboarding), so it is the whole picture rather than one lane of it. The QA queue tripled to 15 because the Parachute Standalone story set reached QA together.",
};

export const throughputNarrative = {
  label: "Project throughput",
  description:
    "Created vs resolved measures overall project intake and Done-column close-outs across all five projects — YP, YCVC, RM, ARF and RWT — not tickets moving through the QA test lane.",
  highlight:
    "YTD resolution rate is 78.3% (1,116 Done ÷ 1,425 created). RWT now accounts for 656 of the created total and every close-out since July.",
  contextNote:
    "Live Jira as of Sep 1, 2026. Two corrections land here: the filter now excludes Xray artifacts by their real issue-type name ('Test', not 'Xray Test'), removing 1,281 YP test cases that were being counted as product throughput; and RWT is included, so the series follows the work as it consolidated. July: 179 created · 86 resolved (48%). August: 256 created · 119 resolved (46%) — intake is outpacing close-outs as the Parachute and onboarding scope lands.",
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
    automationCoveragePercent: 83,
    criticalWorkflowAutomationPercent: 95,
    xrayArtifacts: 1004,
    automationTests: 159,
    automationTestsPrevious: 76,
    highlight:
      "App-wide automation at 83%; critical Request Lifecycle workflows at 95% (up from 72%).",
    automationNote:
      "159 Playwright tests (+109% from 76) · 83% app-wide automation · 95% critical workflow coverage (Request Lifecycle).",
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
    automationCoveragePercent: 0,
    testCases: 62,
    highlight:
      "62 manual cases across Order Parachute, One Step Process, Template Editor Regression, and ARF tickets.",
    automationNote: "Broader automation coverage still outstanding.",
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
 * (YP + YCVC + RM + ARF + RWT), live Jira pull Sep 1, 2026.
 *
 * Rebuilt on a single consistent source. The previous series was split — early
 * months counted YP bugs and later months counted RWT bugs — which made the trend
 * line meaningless. Detected = Created date in month; resolved = status Done.
 * August excludes 8 infrastructure tickets; every other month is unfiltered.
 */
export const bugsByMonth: BugMonth[] = [
  { month: "Jan 26", detected: 7, resolved: 4 },
  { month: "Feb 26", detected: 2, resolved: 2 },
  { month: "Mar 26", detected: 25, resolved: 21 },
  { month: "Apr 26", detected: 12, resolved: 11 },
  { month: "May 26", detected: 14, resolved: 11 },
  { month: "Jun 26", detected: 27, resolved: 8 },
  { month: "Jul 26", detected: 42, resolved: 22 },
  { month: "Aug 26", detected: 35, resolved: 13 },
];

export type BugsByProject = {
  projectId: string;
  projectName: string;
  shortName: string;
  months: BugMonth[];
};

/**
 * Per-project YTD bug drill-down — live Jira Sep 1, 2026. ARF is absent because no
 * Bug-type tickets were filed against it this year; its defects were logged in YP
 * or, from June, in RWT.
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
      { month: "May", detected: 2, resolved: 1 },
      { month: "Jun", detected: 26, resolved: 7 },
      { month: "Jul", detected: 42, resolved: 22 },
      { month: "Aug", detected: 35, resolved: 13 },
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

/** YouConnect full regression — 2026-08-26 CI run (stage.realwired.com) */
export const latestPlaywrightRun = {
  title: "YouConnect — Playwright Run",
  subtitle: "Full regression suite · CI mode · headless · Chromium · 1 retry",
  environment: "stage.realwired.com",
  startedAt: "2026-08-26",
  durationMin: 100.3,
  totalTests: 113,
  passed: 105,
  failed: 3,
  flaky: 3,
  skipped: 2,
  passRatePercent: 94.6,
  passRateNote: "105/111 executed (excluding skipped)",
  updateNote:
    "The Aug 19 re-run reproduced the same counts as the Jul 14 baseline. market-area-crud-smoke:266 is fixed & verified (8/8 passed on re-run) — root cause: the requests-list search was left in Advanced mode, and it now switches to Basic Search first. Only the two RWT-314 canaries remain red.",
  failureBreakdown: [
    {
      count: 2,
      label: "Expected failures",
      detail:
        "Zip County Basic & Advanced Search tests are kept running as canaries for product bug RWT-314; they turn green when it ships.",
    },
    {
      count: 1,
      label: "Real bug — now fixed",
      detail:
        "market-area-crud-smoke:266 (request routes to the Assigned Area's Job Manager). Fixed after this run and verified 8/8.",
    },
  ],
  flakyNote:
    "3 recovered on retry — login (LO), cancel-engagement, revision-report. Staging-timing flakes the single retry caught.",
  reportSource:
    "Generated from results.json · traces, videos, and screenshots in local playwright/test-results/html-report",
};

export const automationRunResults: AutomationRunResult[] = [
  {
    suite: "Request Lifecycle",
    passed: 49,
    failed: 0,
    flaky: 2,
    skipped: 0,
    passRate: 100,
    date: "Aug 19 2026",
    source: "CI · stage.realwired.com",
    status: "unstable",
    note: "2 flaky on retry — cancel-engagement, revision-report",
  },
  {
    suite: "Authentication",
    passed: 20,
    failed: 0,
    flaky: 1,
    skipped: 2,
    passRate: 100,
    date: "Aug 19 2026",
    source: "CI · stage.realwired.com",
    status: "unstable",
    note: "LO login flaky on retry · 2 skipped (invalid password, lockout)",
  },
  {
    suite: "General Settings",
    passed: 2,
    failed: 0,
    skipped: 0,
    passRate: 100,
    date: "Aug 19 2026",
    source: "CI · stage.realwired.com",
    status: "passing",
  },
  {
    suite: "Module Smoke Tests",
    passed: 34,
    failed: 3,
    flaky: 0,
    skipped: 0,
    passRate: 92,
    date: "Aug 19 2026",
    source: "CI · stage.realwired.com",
    status: "unstable",
    note: "2 RWT-314 canaries expected · market-area:266 fixed since run",
  },
];

export const automationRunSpecDetails: AutomationRunSpec[] = [
  {
    file: "modules/market-area/market-area-crud-smoke.spec.js",
    passed: 6,
    failed: 1,
    flaky: 0,
    skipped: 0,
    note: "market-area-crud-smoke:266 failed — fixed & verified 8/8 since run",
  },
  {
    file: "modules/zip-code-management/zip-code-management-regression.spec.js",
    passed: 4,
    failed: 2,
    flaky: 0,
    skipped: 0,
    note: "RWT-314 canaries — Basic & Advanced Search expected failures",
  },
  {
    file: "auth/login.spec.js",
    passed: 3,
    failed: 0,
    flaky: 1,
    skipped: 2,
    note: "LO login recovered on retry",
  },
  {
    file: "request-lifecycle/cancel-engagement/cancel-enagement.spec.js",
    passed: 2,
    failed: 0,
    flaky: 1,
    skipped: 0,
  },
  {
    file: "request-lifecycle/report-review/report-disputedANDcorrections.spec.js",
    passed: 1,
    failed: 0,
    flaky: 1,
    skipped: 0,
    note: "Revision Report Submission recovered on retry",
  },
  {
    file: "modules/api-accounts/api-accounts-crud-smoke.spec.js",
    passed: 9,
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
    file: "modules/View-Edit-properties/View_Edit_Properties.spec.js",
    passed: 6,
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
    file: "request-lifecycle/report-review/report-review.spec.js",
    passed: 5,
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
  {
    file: "request-lifecycle/request-creation-wizard/request-creation.spec.js",
    passed: 3,
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
    file: "GeneralSettings/DefaultFilterByStatus.spec.js",
    passed: 2,
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
    file: "modules/documents/documents-list-smoke.spec.js",
    passed: 1,
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
    file: "modules/st-field-templates/st-field-templates-smoke.spec.js",
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
    file: "request-lifecycle/report-review/request-complete.spec.js",
    passed: 1,
    failed: 0,
    flaky: 0,
    skipped: 0,
  },
  {
    file: "request-lifecycle/report-submission/report-deliverydate-revised.spec.js",
    passed: 1,
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
    file: "fixtures/auth.setup.admin.js",
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
    file: "fixtures/auth.setup.loan-officer.js",
    passed: 1,
    failed: 0,
    flaky: 0,
    skipped: 0,
  },
];

export const automationRunSummary = {
  totalPassed: latestPlaywrightRun.passed,
  totalFailed: latestPlaywrightRun.failed,
  totalFlaky: latestPlaywrightRun.flaky,
  totalSkipped: latestPlaywrightRun.skipped,
  overallPassRate: latestPlaywrightRun.passRatePercent,
  totalSpecFiles: automationRunSpecDetails.length,
  totalAutomatedTests: latestPlaywrightRun.totalTests,
  /** YouConnect application-wide automation */
  appWideAutomationPercent: 83,
  appWideAutomationTargetPercent: 85,
  /** YouConnect critical workflow automation (Request Lifecycle) */
  criticalWorkflowAutomationMin: 95,
  criticalWorkflowAutomationMax: 95,
  criticalWorkflowAutomationMid: 95,
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
  manualCriticalCoverage: 95,
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
