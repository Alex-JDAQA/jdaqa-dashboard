/**
 * Ongoing QA velocity metrics.
 * Point-in-time 6-month pre/post report frozen at git tag: point-in-time-6mo-contract
 *
 * Sources:
 * - Portfolio throughput Jan–Sep 2026: Jira REST (YP, YCVC, RM, ARF, RWT) Sep 18 2026.
 *   Excludes Xray artifacts by their real issue-type names — "Test" (not "Xray Test"),
 *   Test Execution / Test Plan / Test Set / Precondition. Resolved = status CHANGED TO Done
 *   in the month (resolutiondate is often empty on this site).
 * - Sprint: Sprint 35 (board 271, Sep 14 – Sep 21), the single active sprint
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
  reportingPeriod: "Sprint 35 · Sep 14 – Sep 21 · Jan – Sep 2026",
  lastUpdated: "September 18, 2026",
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
  /** One-line meaning, shown under the title. */
  description?: string;
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
 * (YP + YCVC + RM + ARF + RWT). Jira REST pull Sep 18, 2026, excluding Xray
 * artifacts ("Test", Test Execution, Test Plan, Test Set, Precondition).
 * Created = created in month; resolved = status CHANGED TO Done in month.
 *
 * RWT is included from here on: the four original projects went dormant through
 * June as delivery consolidated into RWT, so a YP-only series no longer tracks
 * where the work is. Jul–Sep are almost entirely RWT.
 */
export const portfolioByMonth: PortfolioMonth[] = [
  { month: "Jan 26", created: 155, resolved: 79, resolutionRate: 51 },
  { month: "Feb 26", created: 153, resolved: 111, resolutionRate: 73 },
  { month: "Mar 26", created: 216, resolved: 185, resolutionRate: 86 },
  { month: "Apr 26", created: 120, resolved: 241, resolutionRate: 201 },
  { month: "May 26", created: 113, resolved: 159, resolutionRate: 141 },
  { month: "Jun 26", created: 233, resolved: 180, resolutionRate: 77 },
  { month: "Jul 26", created: 179, resolved: 86, resolutionRate: 48 },
  { month: "Aug 26", created: 256, resolved: 125, resolutionRate: 49 },
  { month: "Sep 26", created: 148, resolved: 72, resolutionRate: 49 },
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

/** Per-project YTD throughput drill-down — Jira REST Sep 18, 2026, Xray artifacts excluded */
export const portfolioByProject: PortfolioByProject[] = [
  {
    projectId: "rwt",
    projectName: "RWT Consolidated",
    shortName: "RWT",
    ytdCreated: 804,
    ytdResolved: 370,
    months: [
      { month: "Jan", created: 1, resolved: 0 },
      { month: "Feb", created: 1, resolved: 0 },
      { month: "Mar", created: 8, resolved: 0 },
      { month: "Apr", created: 7, resolved: 0 },
      { month: "May", created: 26, resolved: 11 },
      { month: "Jun", created: 179, resolved: 80 },
      { month: "Jul", created: 178, resolved: 82 },
      { month: "Aug", created: 256, resolved: 125 },
      { month: "Sep", created: 148, resolved: 72 },
    ],
  },
  {
    projectId: "rm",
    projectName: "Reporting Microservice",
    shortName: "RM",
    ytdCreated: 299,
    ytdResolved: 337,
    note: "Dormant since June — intake moved to RWT. Resolved exceeds created because the backlog was drained.",
  },
  {
    projectId: "arf",
    projectName: "Parachute / AI Review Forms",
    shortName: "ARF",
    ytdCreated: 194,
    ytdResolved: 150,
    note: "Dormant since July — Parachute work now tracked in RWT.",
  },
  {
    projectId: "ycvc",
    projectName: "YC Vendor Circle",
    shortName: "YCVC",
    ytdCreated: 158,
    ytdResolved: 264,
    note: "Dormant since June — Vendor Circle work now tracked in RWT.",
  },
  {
    projectId: "yp",
    projectName: "YouConnect Production",
    shortName: "YP",
    ytdCreated: 118,
    ytdResolved: 117,
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
  /** Distinct tickets that moved to Done at least once YTD (re-Done tickets counted once). */
  uniqueChangedToDoneYtd: 1167,
  /** YTD-created tickets that are currently Done — the "how much of this year's work is finished" number. */
  currentlyDoneOfCreatedYtd: 995,
  stillOpenOfCreatedYtd: 578,
  period: "Jan 2026 – Sep 2026",
  sourceNote:
    'Jira REST Sep 18, 2026. Created: project in (YP, YCVC, RM, ARF, RWT) AND created >= "2026-01-01" AND created < "2026-10-01" AND issuetype NOT IN ("Test", "Test Execution", "Test Plan", "Test Set", "Precondition") = 1,573. Monthly Done uses status CHANGED TO Done in each month (sum 1,238). Unique YTD CHANGED TO Done DURING ("2026-01-01", "2026-10-01") = 1,167. Currently Done among YTD-created = 995. resolutiondate is not used.',
};

/**
 * QA-lane resolved throughput — tickets that moved to Done and were ever assigned
 * to JDAQA (assignee WAS). Counts tickets that passed through QA even if
 * reassigned back to dev before close.
 * Verified Jira REST Sep 18, 2026. Uses status CHANGED TO Done — resolutiondate
 * is empty on most RWT tickets and undercounted this series at 157.
 */
export const qaResolvedJql = `project in (YP, YCVC, RM, ARF, RWT) AND status CHANGED TO Done DURING ("2026-01-01", "2026-10-01") AND (assignee WAS "712020:5085ca47-c432-421e-9b43-03ed76c1f0f1" OR assignee WAS "712020:b10ccd52-f0b3-4a52-b6da-285cb8352b30" OR assignee WAS "712020:3928f4f1-270a-41a8-9bd7-d2da1ebaf5c7" OR assignee WAS "712020:74309a28-b6a3-48f1-87cc-9d4c7d7f133b" OR assignee WAS "712020:c3aefbf1-a2de-4f47-888e-aa420021a8fd") AND issuetype NOT IN ("Test", "Test Execution", "Test Plan", "Test Set", "Precondition")`;

/** Unique tickets matching qaResolvedJql. Monthly close-outs sum to 309 (26 tickets Done in more than one month). */
const qaResolvedYtd = 283;
const qaResolvedMonths = portfolioByMonth.length;

export const qaIssueThroughputSummary = {
  avgResolvedPerMonth:
    Math.round((qaResolvedYtd / qaResolvedMonths) * 10) / 10,
  totalResolvedYtd: qaResolvedYtd,
  monthlyCloseoutsYtd: 309,
  period: "Jan 2026 – Sep 2026",
  sourceNote:
    'Jira REST Sep 18, 2026: qaResolvedJql = 283 unique tickets (Jan 2, Feb 4, Mar 67, Apr 50, May 38, Jun 45, Jul 37, Aug 48, Sep 18). The old 157 used resolved >= "2026-01-01", which is empty on most RWT tickets after June.',
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
    description:
      "Typical monthly volume of tickets that passed through the QA lane and were closed.",
    changeLabel: `${qaIssueThroughputSummary.totalResolvedYtd} QA-lane tickets to Done YTD · ${qaIssueThroughputSummary.period}`,
    accent: "blue",
    subtext: "Ever assigned to JDAQA, then moved to Done. Not the whole delivery board.",
  },
  {
    id: "resolution-rate",
    label: "Close-out vs Intake",
    value: issueThroughputSummary.resolutionRatePercent,
    unit: "%",
    description:
      "Done-column close-outs this year as a share of tickets created this year.",
    changeLabel: `${issueThroughputSummary.totalResolvedYtd.toLocaleString()} Done ÷ ${issueThroughputSummary.totalCreatedYtd.toLocaleString()} created · ${issueThroughputSummary.period}`,
    accent: "green",
    subtext: `${issueThroughputSummary.currentlyDoneOfCreatedYtd.toLocaleString()} of this year's tickets (${Math.round((issueThroughputSummary.currentlyDoneOfCreatedYtd / issueThroughputSummary.totalCreatedYtd) * 1000) / 10}%) are currently Done · ${issueThroughputSummary.stillOpenOfCreatedYtd.toLocaleString()} still open.`,
  },
  {
    id: "automation-coverage",
    label: "Critical Workflow Automation",
    value: 100,
    unit: "%",
    description:
      "Playwright coverage of YouConnect Request Lifecycle and Auth — the flows that cannot fail in production.",
    change: 28,
    changeLabel: "from 72%",
    trend: "up",
    accent: "violet",
    subtext: "See Automation sub-tab for the module inventory and latest run.",
  },
  {
    id: "manual-coverage",
    label: "Manual Coverage (Critical Flows)",
    value: 95,
    unit: "%",
    description:
      "Share of critical product flows with a formal Xray test case, excluding throwaway sprint testing.",
    trend: "up",
    accent: "amber",
    subtext: `${manualCoverageSummary.totalFormalTestCases} formal Xray cases across the five projects.`,
  },
];

/** @deprecated use ytdKpiCards */
export const monthlyKpiCards = ytdKpiCards;

/** @deprecated use ytdKpiCards */
export const kpiCards = ytdKpiCards;

/**
 * Delivery metrics — Sprint 35, the single active sprint (board 271).
 * One-week sprint; pace is measured against Sprint 34 close-outs (Sep 8–14).
 */
export const sprintMeta = {
  previousSprint: {
    name: "Sprint 34",
    range: "Sep 8 – Sep 14, 2026",
    status: "closed" as const,
    deliveredItems: 24,
    deliveredStoryPoints: 0,
  },
  currentSprint: {
    name: "Sprint 35",
    range: "Sep 14 – Sep 21, 2026",
    status: "active" as const,
    /** Sprint 35 items outside Done */
    boardOpenItems: 151,
    /** Sprint 35 items past the To Do backlog and not yet Done — work in flight */
    boardInFlightItems: 107,
    deliveredItems: sprintCurrentDeliveredTickets.length,
    daysElapsed: 5,
    daysTotal: 7,
  },
  sourceUrl:
    "https://realwired.atlassian.net/jira/software/c/projects/RWT/boards",
};

/** Sprint 35 column load — Jira REST Sep 18, 2026 (`sprint = 1897` by status, 207 items) */
export const sprintPipeline = [
  { stage: "To Do", items: 44, meaning: "In the sprint, not started", highlight: false },
  { stage: "In Progress", items: 27, meaning: "Underway in dev", highlight: false },
  { stage: "Review", items: 9, meaning: "Code complete, in review", highlight: false },
  {
    stage: "QA Ready / QA In Progress",
    items: 10,
    meaning: "Handed to QA — primary QA load signal",
    highlight: true,
  },
  { stage: "Ready for Stage", items: 25, meaning: "Awaiting stage deploy", highlight: false },
  { stage: "Ready for PROD", items: 28, meaning: "Awaiting prod deploy", highlight: false },
  { stage: "Blocked", items: 6, meaning: "Needs unblocking", highlight: false },
  { stage: "Hold", items: 2, meaning: "Parked by product / client", highlight: false },
  { stage: "Done", items: 56, meaning: "Closed in or before this sprint", highlight: false },
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
    'Jira REST (Sep 18, 2026): `project = RWT AND status CHANGED TO Done AFTER "2026-09-14 15:05"` = 31 items. Benchmark: Sprint 34 window `status CHANGED TO Done DURING ("2026-09-08 14:45", "2026-09-14 14:32")` = 24. Sprint 35 load: 207 items, 107 in flight, 10 in QA.',
  contextNote:
    "Sprint 35 is a one-week sprint (Sep 14 – Sep 21), so pace is measured against Sprint 34's 24 close-outs rather than a two-week window.",
};

export const sprintOrmProgress = {
  epic: ormAutomationEpic.key,
  epicTitle: ormAutomationEpic.title,
  epicUrl: ormAutomationEpic.url,
  /** Jira REST Sep 18, 2026 — `parent = RWT-107` (28 child tasks). */
  totalModules: 28,
  done: 28,
  inQa: 0,
  inProgress: 0,
  todo: 0,
  priorWindowDelivered: ["st_VendorLetters"],
  currentWindowDone: [],
  currentWindowInQa: [],
  currentWindowInProgress: [],
  backlogTodo: [],
  completedModules: ormCompletedModules,
  contextNote:
    "Epic RWT-107 is complete: all 28 modules are Done. No ORM automation tasks remain in Sprint 35.",
};

export const sprintKpiCards: KpiCard[] = [
  {
    id: "qa-queue",
    label: "In QA Right Now",
    value: sprintInQaTickets.length,
    changeLabel: `${sprintInQaTickets.length} tickets · QA Ready / QA In Progress · Sprint 35`,
    subtext:
      "Down from 15 in Sprint 33. Mix of Vendor Circle defects, Parachute Workbook Editor, and session/guardrail stories — 3 High (RWT-685, RWT-661, RWT-326).",
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
    trend: "up",
    tickets: sprintCurrentDeliveredTickets,
    ticketsLabel: `Tickets moved to Done`,
  },
  {
    id: "bugs-sprint",
    label: "Bugs Detected in September",
    value: 20,
    changeLabel: "Created Sep 1 – Sep 18 · 4 Done",
    subtext:
      "Product bugs only — excludes 4 infrastructure tickets (nginx CIDR/HSTS, yo-176 env, parachute-ui/api test-image failures).",
    accent: "blue",
  },
  {
    id: "orm-automation",
    label: `Automation Tasks · ${sprintMeta.currentSprint.name}`,
    value: sprintOrmAutomationInSprint.length,
    unit: "tasks",
    changeLabel: `Epic ${ormAutomationEpic.key} · ${sprintOrmProgress.done}/${sprintOrmProgress.totalModules} modules Done`,
    subtext: `Jira REST: parent = ${ormAutomationEpic.key} — epic complete, none in the open sprint`,
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
  periodLabel: "September, month to date (product bugs)",
  periodRange: "Sep 1 – Sep 18, 2026",
  detected: 20,
  resolved: 4,
  openFromPeriod: 16,
  resolutionRatePercent: 20,
  sourceNote:
    'Jira REST Sep 18, 2026: project in (YP, YCVC, RM, ARF, RWT) AND issuetype = Bug AND created >= "2026-09-01" AND created < "2026-10-01" returns 24, less 4 infrastructure tickets (RWT-766 nginx CIDR/HSTS, RWT-691 yo-176 env, RWT-677 parachute-ui Playwright image, RWT-675 parachute-api test path).',
  contextNote:
    "20 product bugs created in September so far; 4 Done, 16 still open. Heaviest cluster is security/audit (download identity, masquerade, disable_log_in_as, role-event audit). Open product headlines include RWT-814 (Bank of Tampa Parachute Technical Review), RWT-705 (unauthenticated download entry points), and RWT-700 (Log-In-As ignores disable_log_in_as).",
  tickets: [
    {
      key: "RWT-814",
      summary:
        "Bank of Tampa — Parachute Technical Review failed on File 3897",
      status: "To Do",
      created: "2026-09-17",
      reporter: "Diego De Grandi",
      url: "https://realwired.atlassian.net/browse/RWT-814",
    },
    {
      key: "RWT-788",
      summary:
        "Overall Grade (Weighted) does not calculate when a review is completed by an external review vendor",
      status: "To Do",
      created: "2026-09-15",
      reporter: "Diego De Grandi",
      url: "https://realwired.atlassian.net/browse/RWT-788",
    },
    {
      key: "RWT-780",
      summary:
        "Vendor Circle — vendor update notification emails are not reaching the Vendor Credential Administrator",
      status: "To Do",
      created: "2026-09-15",
      reporter: "Diego De Grandi",
      url: "https://realwired.atlassian.net/browse/RWT-780",
    },
    {
      key: "RWT-768",
      summary:
        "Fifth Third: vendor linked to the wrong Vendor Circle profile — circle shows another vendor's data",
      status: "Done",
      created: "2026-09-14",
      reporter: "Diego De Grandi",
      url: "https://realwired.atlassian.net/browse/RWT-768",
    },
    {
      key: "RWT-763",
      summary:
        "Vendor letters still branded \"Capital Community Bank\" (9 of 9) after the Accordia rebrand",
      status: "To Do",
      created: "2026-09-12",
      reporter: "David Eloy",
      url: "https://realwired.atlassian.net/browse/RWT-763",
    },
    {
      key: "RWT-762",
      summary:
        "Vendor Circle still points at ccbank.realwired.com after the Accordia rebrand",
      status: "In Progress",
      created: "2026-09-12",
      reporter: "David Eloy",
      url: "https://realwired.atlassian.net/browse/RWT-762",
    },
    {
      key: "RWT-716",
      summary:
        "MLP bugs tracking",
      status: "In Progress",
      created: "2026-09-09",
      reporter: "Ademir Mazer Junior",
      url: "https://realwired.atlassian.net/browse/RWT-716",
    },
    {
      key: "RWT-705",
      summary:
        "Download entry points that bypass authentication or the download token",
      status: "To Do",
      created: "2026-09-03",
      reporter: "David Eloy",
      url: "https://realwired.atlassian.net/browse/RWT-705",
    },
    {
      key: "RWT-701",
      summary:
        "Mark masquerade sessions in the audit trail -- events are attributed to the substituted user with no marker",
      status: "In Progress",
      created: "2026-09-03",
      reporter: "David Eloy",
      url: "https://realwired.atlassian.net/browse/RWT-701",
    },
    {
      key: "RWT-700",
      summary:
        "Enforce disable_log_in_as server-side -- the Log-In-As entry point ignores the setting",
      status: "In Progress",
      created: "2026-09-03",
      reporter: "David Eloy",
      url: "https://realwired.atlassian.net/browse/RWT-700",
    },
    {
      key: "RWT-699",
      summary:
        "Role-event audit defects: duplicate, mislabelled and overstated Rights Removed events (MUFG)",
      status: "To Do",
      created: "2026-09-03",
      reporter: "David Eloy",
      url: "https://realwired.atlassian.net/browse/RWT-699",
    },
    {
      key: "RWT-698",
      summary:
        "Download routes do not record the acting identity -- 293 of 420 downloads unattributed (MUFG)",
      status: "To Do",
      created: "2026-09-03",
      reporter: "David Eloy",
      url: "https://realwired.atlassian.net/browse/RWT-698",
    },
    {
      key: "RWT-696",
      summary:
        "Duplicate st_vendor records created in the same millisecond — root cause behind RWT-205 (Horizon \"Henry Shortall\")",
      status: "To Do",
      created: "2026-09-03",
      reporter: "David Eloy",
      url: "https://realwired.atlassian.net/browse/RWT-696",
    },
    {
      key: "RWT-692",
      summary:
        "Check if the token is being refreshed by the API",
      status: "Done",
      created: "2026-09-03",
      reporter: "Ademir Mazer Junior",
      url: "https://realwired.atlassian.net/browse/RWT-692",
    },
    {
      key: "RWT-690",
      summary:
        "Citizens Business Bank — Vendor Profile History panel: forwarded email's \"To\" address is replaced with the vendor's email and the send fails (regression since ~8/25/26)",
      status: "To Do",
      created: "2026-09-03",
      reporter: "Diego De Grandi",
      url: "https://realwired.atlassian.net/browse/RWT-690",
    },
    {
      key: "RWT-689",
      summary:
        "UCBI - Parachute review PDF: USPAP checklist row 8 returns unanswered and footer page numbers understate the real page count",
      status: "Review",
      created: "2026-09-02",
      reporter: "Marvs Medrano",
      url: "https://realwired.atlassian.net/browse/RWT-689",
    },
    {
      key: "RWT-679",
      summary:
        "Renasant Bank — strip decimal places from Premise-level currency keywords rendered into Report Summary Template Docs",
      status: "To Do",
      created: "2026-09-01",
      reporter: "Diego De Grandi",
      url: "https://realwired.atlassian.net/browse/RWT-679",
    },
    {
      key: "RWT-678",
      summary:
        "Parachute AI Review job dead-lettered after 3 retries — 'Appraisal PDF not found in S3'; review never delivered",
      status: "Review",
      created: "2026-09-01",
      reporter: "Diego De Grandi",
      url: "https://realwired.atlassian.net/browse/RWT-678",
    },
    {
      key: "RWT-676",
      summary:
        "Parachute Standalone: the SPA cannot send its session cookie to the API — wildcard CORS defeats credentials",
      status: "Done",
      created: "2026-09-01",
      reporter: "Luiz Roland",
      url: "https://realwired.atlassian.net/browse/RWT-676",
    },
    {
      key: "RWT-674",
      summary:
        "Fifth Third Bank – Forwarding email auto-changing to vendor address + send error on request 254713",
      status: "Done",
      created: "2026-09-01",
      reporter: "Trey Cavaliere",
      url: "https://realwired.atlassian.net/browse/RWT-674",
    },
  ],
};

export const sprintNarrative = {
  description:
    "Sprint 35 view focuses on QA queue depth, quality signals (bounce-back, open High, time in QA), bugs detected this month, and ORM automation module progress.",
  highlight:
    "Sprint 35 (Sep 14 – Sep 21), day 5 of 7: 31 items moved to Done against Sprint 34's 24, 10 tickets sitting in QA (4 of them returned after leaving), and 20 product bugs created in September (4 Done). ORM epic RWT-107 is complete — 28 of 28 modules Done.",
  contextNote:
    "Sprint 35 is the single active sprint on board 271 (207 items). A large Ready for Stage / Ready for PROD pile (53 tickets) sits past QA. The QA queue is 10, down from 15 in Sprint 33.",
};

export const throughputNarrative = {
  label: "Project throughput",
  description:
    "Created vs resolved measures overall project intake and Done-column close-outs across all five projects — YP, YCVC, RM, ARF and RWT — not tickets moving through the QA test lane.",
  highlight:
    "YTD close-out vs intake is 78.7% (1,238 Done ÷ 1,573 created). Of tickets created this year, 995 (63.3%) are currently Done. RWT now accounts for 804 of the created total and every close-out since August.",
  contextNote:
    "Jira REST as of Sep 18, 2026. Resolved uses status CHANGED TO Done (resolutiondate is often empty). Filter excludes Xray artifacts by their real issue-type name ('Test', not 'Xray Test'). Unique tickets that reached Done YTD = 1,167; the 1,238 monthly sum counts 71 tickets Done in more than one month. July: 179 created · 86 resolved (48%). August: 256 created · 125 resolved (49%). September MTD: 148 created · 72 resolved (49%) — intake is still outpacing close-outs.",
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
 * (YP + YCVC + RM + ARF + RWT), Jira REST pull Sep 18, 2026.
 *
 * Detected = Created date in month; resolved = currently status Done.
 * August excludes 8 infrastructure tickets; September excludes 4.
 */
export const bugsByMonth: BugMonth[] = [
  { month: "Jan 26", detected: 7, resolved: 4 },
  { month: "Feb 26", detected: 2, resolved: 2 },
  { month: "Mar 26", detected: 25, resolved: 21 },
  { month: "Apr 26", detected: 12, resolved: 11 },
  { month: "May 26", detected: 14, resolved: 11 },
  { month: "Jun 26", detected: 27, resolved: 8 },
  { month: "Jul 26", detected: 42, resolved: 23 },
  { month: "Aug 26", detected: 35, resolved: 16 },
  { month: "Sep 26", detected: 20, resolved: 4 },
];

export type BugsByProject = {
  projectId: string;
  projectName: string;
  shortName: string;
  months: BugMonth[];
};

/**
 * Per-project YTD bug drill-down — Jira REST Sep 18, 2026. ARF is absent because no
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
      { month: "Jul", detected: 42, resolved: 23 },
      { month: "Aug", detected: 35, resolved: 16 },
      { month: "Sep", detected: 20, resolved: 4 },
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
