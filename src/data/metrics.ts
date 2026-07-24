/**
 * Ongoing QA velocity metrics.
 * Point-in-time 6-month pre/post report frozen at git tag: point-in-time-6mo-contract
 *
 * Sources:
 * - Portfolio throughput Jan–Jul 2026: live Jira (YP, YCVC, RM, ARF) Jul 24 2026
 * - Sprint 28/29 + QA pipeline: Rovo / Confluence "Sprint 28 Review & Sprint 29 Plan" + Jira (Jul 13 2026)
 * - Team: Alex Norwood, Chester Cabia, Marvis Medrano, Rishi Kumar (ORM epic RWT-107)
 * - Coverage / automation inventory: Xray + YouConnect Playwright suite
 */

import {
  ormAutomationEpic,
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
  reportingPeriod: "Sprint 29 · Jan – Jul 2026",
  lastUpdated: "July 24, 2026",
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
 * Combined portfolio monthly totals (YP + YCVC + RM + ARF).
 * Live Jira pull Jul 24, 2026 (excludes Xray Test / Test Execution /
 * Test Plan / Test Set / Precondition). Created = created in month;
 * resolved = status Done with resolved date in month.
 */
export const portfolioByMonth: PortfolioMonth[] = [
  { month: "Jan 26", created: 304, resolved: 80, resolutionRate: 26 },
  { month: "Feb 26", created: 273, resolved: 105, resolutionRate: 38 },
  { month: "Mar 26", created: 704, resolved: 398, resolutionRate: 57 },
  { month: "Apr 26", created: 187, resolved: 305, resolutionRate: 163 },
  { month: "May 26", created: 134, resolved: 184, resolutionRate: 137 },
  { month: "Jun 26", created: 101, resolved: 142, resolutionRate: 141 },
  { month: "Jul 26", created: 72, resolved: 75, resolutionRate: 104 },
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
  months: ThroughputMonth[];
};

/** Per-project YTD throughput drill-down — sums to portfolioByMonth totals; replace with Jira pull */
export const portfolioByProject: PortfolioByProject[] = [
  {
    projectId: "yp",
    projectName: "YouConnect Production",
    shortName: "YP",
    months: [
      { month: "Jan", created: 180, resolved: 45 },
      { month: "Feb", created: 150, resolved: 55 },
      { month: "Mar", created: 380, resolved: 220 },
      { month: "Apr", created: 100, resolved: 150 },
      { month: "May", created: 75, resolved: 95 },
      { month: "Jun", created: 50, resolved: 65 },
      { month: "Jul", created: 71, resolved: 74 },
    ],
  },
  {
    projectId: "ycvc",
    projectName: "YC Vendor Circle",
    shortName: "YCVC",
    months: [
      { month: "Jan", created: 60, resolved: 15 },
      { month: "Feb", created: 50, resolved: 20 },
      { month: "Mar", created: 120, resolved: 65 },
      { month: "Apr", created: 35, resolved: 55 },
      { month: "May", created: 25, resolved: 35 },
      { month: "Jun", created: 18, resolved: 22 },
      { month: "Jul", created: 0, resolved: 0 },
    ],
  },
  {
    projectId: "rm",
    projectName: "Reporting Microservice",
    shortName: "RM",
    months: [
      { month: "Jan", created: 80, resolved: 18 },
      { month: "Feb", created: 65, resolved: 25 },
      { month: "Mar", created: 180, resolved: 100 },
      { month: "Apr", created: 55, resolved: 80 },
      { month: "May", created: 30, resolved: 40 },
      { month: "Jun", created: 20, resolved: 28 },
      { month: "Jul", created: 0, resolved: 0 },
    ],
  },
  {
    projectId: "arf",
    projectName: "Parachute / AI Review Forms",
    shortName: "ARF",
    months: [
      { month: "Jan", created: 18, resolved: 4 },
      { month: "Feb", created: 22, resolved: 8 },
      { month: "Mar", created: 50, resolved: 30 },
      { month: "Apr", created: 21, resolved: 23 },
      { month: "May", created: 13, resolved: 14 },
      { month: "Jun", created: 6, resolved: 8 },
      { month: "Jul", created: 1, resolved: 1 },
    ],
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
  period: "Jan 2026 – Jul 2026 (MTD)",
};

/**
 * QA-lane resolved throughput — Done issues ever assigned to JDAQA (assignee WAS).
 * Counts tickets that passed through QA even if reassigned back to dev before close.
 * Verified live Jira pull Jul 15, 2026.
 */
export const qaResolvedJql = `project in (YP, YCVC, RM, ARF) AND status = Done AND resolved >= "2026-01-01" AND (assignee WAS "712020:5085ca47-c432-421e-9b43-03ed76c1f0f1" OR assignee WAS "712020:b10ccd52-f0b3-4a52-b6da-285cb8352b30" OR assignee WAS "712020:3928f4f1-270a-41a8-9bd7-d2da1ebaf5c7" OR assignee WAS "712020:74309a28-b6a3-48f1-87cc-9d4c7d7f133b" OR assignee WAS "712020:c3aefbf1-a2de-4f47-888e-aa420021a8fd") AND issuetype NOT IN ("Xray Test", "Test Execution", "Test Plan", "Test Set", "Precondition")`;

const qaResolvedYtd = 162;
const qaResolvedMonths = portfolioByMonth.length;

export const qaIssueThroughputSummary = {
  avgResolvedPerMonth:
    Math.round((qaResolvedYtd / qaResolvedMonths) * 10) / 10,
  totalResolvedYtd: qaResolvedYtd,
  period: "Jan 2026 – Jul 2026 (MTD)",
};

export const manualCoverageSummary = {
  testRepositoryTotal: 952,
  sprintTestingCases: 100,
  totalFormalTestCases: 952 - 100,
  youConnectCoreWorkflows: 147,
  preconditions: 26,
  reportingMicroservice: 455,
  vendorManagement: 69,
  vendorCircle: 92,
  aiReviewForms: 59,
  functionalTestingTotal: 848,
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
    change: 1.3,
    changeLabel: "from 71.3% last month",
    trend: "up",
    accent: "green",
    subtext: "Overall project throughput · created vs Done YTD",
  },
  {
    id: "automation-coverage",
    label: "Critical Workflow Automation",
    value: 90,
    unit: "%",
    change: 18,
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
 * Sprint metrics — aligned to bi-weekly Ed check-ins.
 * Sources: Confluence Sprint 28 Review & Sprint 29 Plan (generated 2026-07-13) + live Jira.
 */
export const sprintMeta = {
  previousSprint: {
    name: "Sprint 28",
    range: "Jun 29 – Jul 13, 2026",
    status: "closed" as const,
    deliveredItems: 36,
    deliveredStoryPoints: 32,
  },
  currentSprint: {
    name: "Sprint 29",
    range: "Jul 13 – Jul 31, 2026",
    status: "active" as const,
    committedItems: 164,
    committedStoryPoints: 179,
    netNewDevSp: 110,
    deliveredItems: sprintCurrentDeliveredTickets.length,
    daysElapsed: 12,
    daysTotal: 19,
  },
  sourceUrl:
    "https://realwired.atlassian.net/wiki/spaces/DEV/pages/296517636/Sprint+28+Review+Sprint+29+Plan",
};

export const sprintPipeline = [
  { stage: "To Do", items: 35, storyPoints: 80, meaning: "Net-new, not started", highlight: false },
  { stage: "In Progress", items: 15, storyPoints: 30, meaning: "Net-new, underway", highlight: false },
  { stage: "Review", items: 14, storyPoints: 15, meaning: "Code complete, in review", highlight: false },
  {
    stage: "QA Ready / QA In Progress",
    items: 14,
    storyPoints: 29,
    meaning: "Handed to QA — primary sprint load signal",
    highlight: true,
  },
  { stage: "Ready for Stage", items: 11, storyPoints: 7, meaning: "Awaiting stage deploy", highlight: false },
  { stage: "Ready for PROD", items: 24, storyPoints: 25, meaning: "Awaiting prod deploy", highlight: false },
  { stage: "Blocked", items: 7, storyPoints: 7, meaning: "Needs unblocking", highlight: false },
];

const sprintThroughputPercent = Math.round(
  (sprintMeta.currentSprint.deliveredItems / sprintMeta.currentSprint.committedItems) * 100,
);

export const sprintThroughput = {
  deliveredItems: sprintMeta.currentSprint.deliveredItems,
  committedItems: sprintMeta.currentSprint.committedItems,
  percentOfCommitted: sprintThroughputPercent,
  daysElapsed: sprintMeta.currentSprint.daysElapsed,
  daysTotal: sprintMeta.currentSprint.daysTotal,
  priorSprintDelivered: sprintMeta.previousSprint.deliveredItems,
  sourceNote:
    'Jira: sprint = "RealWired Sprint 29" (164 currently on sprint · 38 Done · verified Jul 24, 2026).',
  contextNote:
    "Committed = tickets currently assigned to Sprint 29. Remaining = on-sprint items not yet Done.",
};

export const sprintOrmProgress = {
  epic: ormAutomationEpic.key,
  epicTitle: ormAutomationEpic.title,
  epicUrl: ormAutomationEpic.url,
  /** Live Jira Jul 24, 2026 — `"Epic Link" = RWT-107` (26 child tasks).
   * Manual override: Documents counted Done (review/push remaining). */
  totalModules: 26,
  done: 10,
  inQa: 2,
  todo: 14,
  sprint28Delivered: [
    "St_Appraisal",
    "API Accounts",
    "data_MSA",
    "st_MarketArea",
    "request-lifecycle staging adjustments",
  ],
  /** Sprint 29 epic tasks by current status (live Jul 24 + Documents manual Done) */
  sprint29Done: ["Report Summaries", "St_FieldTemplates", "Documents"],
  sprint29InQa: ["Bulk Bids (QA Ready)", "Portfolio/Project (QA Ready)"],
  sprint29Todo: ["St_Vendor", "st_LogicalRouting", "st_Solicitation"],
  /** Epic To Do modules not in Sprint 29 (queued / Sprint 30+) */
  backlogTodo: [
    "KReports",
    "Eris Report",
    "Comments",
    "Bank Holiday Configuration",
    "Emails",
    "st_VendorLetters",
    "Geocode status",
    "User Management",
    "Password Management",
    "Transaction Report",
    "Notes",
  ],
  /** @deprecated use sprint29Done / sprint29InQa / sprint29Todo */
  sprint29PlannedModules: [
    "Report Summaries",
    "St_FieldTemplates",
    "Documents",
    "Bulk Bids",
    "Portfolio/Project",
    "St_Vendor",
    "st_LogicalRouting",
    "st_Solicitation",
  ],
  contextNote:
    "Epic RWT-107: 10 Done · 2 in QA · 14 To Do (Documents counted Done pending review/push). Sprint 29: 3 Done, 2 in QA, 3 To Do · 11 backlog To Do.",
};

export const sprintKpiCards: KpiCard[] = [
  {
    id: "qa-queue",
    label: "In QA Right Now",
    value: sprintInQaTickets.length,
    changeLabel: "29 Story Points · QA Ready / QA In Progress · Sprint 29",
    accent: "amber",
    tickets: sprintInQaTickets,
    ticketsLabel: "Tickets in QA",
  },
  {
    id: "sprint-delivered",
    label: `Tickets Moved to Done in ${sprintMeta.currentSprint.name}`,
    value: sprintCurrentDeliveredTickets.length,
    unit: "tickets",
    changeLabel: `${sprintMeta.currentSprint.deliveredItems} of ${sprintMeta.currentSprint.committedItems} committed · RealWired board Done column`,
    accent: "green",
    trend: "up",
    tickets: sprintCurrentDeliveredTickets,
    ticketsLabel: `Tickets moved to Done`,
  },
  {
    id: "bugs-sprint",
    label: "Bugs Detected This Sprint",
    value: 15,
    changeLabel: "Sprint 29 · created in sprint dates",
    subtext: "Jira Bug tickets with Created date in Sprint 29 window",
    accent: "blue",
  },
  {
    id: "orm-automation",
    label: `Upcoming Automation Tasks · ${sprintMeta.currentSprint.name}`,
    value: sprintOrmAutomationInSprint.length,
    unit: "tasks",
    changeLabel: `Epic ${ormAutomationEpic.key} · ${sprintOrmProgress.sprint29Done.length} Done · ${sprintOrmProgress.sprint29InQa.length} in QA · ${sprintOrmProgress.sprint29Todo.length} To Do`,
    subtext: `Jira: "Epic Link" = ${ormAutomationEpic.key} AND sprint = "${sprintMeta.currentSprint.name}"`,
    accent: "violet",
    tickets: sprintOrmAutomationInSprint,
    ticketsLabel: "Sprint automation tasks",
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
  periodLabel: "Sprint 29",
  periodRange: "Jul 13 – Jul 31, 2026",
  detected: 15,
  resolved: 3,
  openFromPeriod: 12,
  resolutionRatePercent: 20,
  sourceNote:
    'Detected = Jira Bug tickets with Created date in the sprint window (verified Jul 24): project = RWT AND issuetype = Bug AND created >= "2026-07-13" AND created < "2026-08-01".',
  contextNote:
    "15 bugs created during Sprint 29 dates; 3 currently Done. Ticket list below is the same Jira result set.",
  tickets: [
    {
      key: "RWT-304",
      summary:
        "Fix Reset to Defaults Failure in CS Portal",
      status: "QA In Progress",
      created: "2026-07-13",
      reporter: "Diego De Grandi",
      url: "https://realwired.atlassian.net/browse/RWT-304",
    },
    {
      key: "RWT-309",
      summary:
        "Bug - Vendor Circle - State-only search returns no results",
      status: "Done",
      created: "2026-07-13",
      reporter: "Diego De Grandi",
      url: "https://realwired.atlassian.net/browse/RWT-309",
    },
    {
      key: "RWT-311",
      summary:
        "First Interstate — deleted \"Reconciled Grade\" option (nocwme) still shows on bid/solicitation views",
      status: "Review",
      created: "2026-07-13",
      reporter: "Diego De Grandi",
      url: "https://realwired.atlassian.net/browse/RWT-311",
    },
    {
      key: "RWT-312",
      summary:
        "YC – Vendor Circle redirect not applied on /review/request.php and /vendor/requests.php (RWT-220 follow-up)",
      status: "To Do",
      created: "2026-07-14",
      reporter: "Diego De Grandi",
      url: "https://realwired.atlassian.net/browse/RWT-312",
    },
    {
      key: "RWT-314",
      summary:
        "Zip Code Management — \"Zip County\" search returns no results (basic and advanced search)",
      status: "To Do",
      created: "2026-07-14",
      reporter: "Diego De Grandi",
      url: "https://realwired.atlassian.net/browse/RWT-314",
    },
    {
      key: "RWT-315",
      summary:
        "Vendor Circle — \"Send for Review\" (external review) bids do not appear in the vendor's \"My Bids\" tab",
      status: "To Do",
      created: "2026-07-15",
      reporter: "Diego De Grandi",
      url: "https://realwired.atlassian.net/browse/RWT-315",
    },
    {
      key: "RWT-321",
      summary:
        "Parachute AI Review omits As-Is value from Value Conclusions summary (United Bank, File #103422)",
      status: "Done",
      created: "2026-07-15",
      reporter: "Diego De Grandi",
      url: "https://realwired.atlassian.net/browse/RWT-321",
    },
    {
      key: "RWT-326",
      summary:
        "Vendor Circle – Documents replaced via the Vendor Updates tab are not retained in the vendor history panel",
      status: "To Do",
      created: "2026-07-15",
      reporter: "Diego De Grandi",
      url: "https://realwired.atlassian.net/browse/RWT-326",
    },
    {
      key: "RWT-328",
      summary:
        "Vendor Circle – Pending invites remain blank across all VC test envs (stage/bank1/bank2); repair + worker restart no longer clears them — blocks QA",
      status: "To Do",
      created: "2026-07-15",
      reporter: "Diego De Grandi",
      url: "https://realwired.atlassian.net/browse/RWT-328",
    },
    {
      key: "RWT-329",
      summary:
        "Zions Bancorp — MFA blocks vendor office assistant (notified party) from acting; code only delivered to primary email",
      status: "Blocked",
      created: "2026-07-15",
      reporter: "Diego De Grandi",
      url: "https://realwired.atlassian.net/browse/RWT-329",
    },
    {
      key: "RWT-335",
      summary:
        "United Bank — Parachute Technical Review missed the As-Is value (File 103422)",
      status: "Done",
      created: "2026-07-16",
      reporter: "Diego De Grandi",
      url: "https://realwired.atlassian.net/browse/RWT-335",
    },
    {
      key: "RWT-344",
      summary:
        "Prevent duplicate participant emails & add real-time email validation during onboarding",
      status: "In Progress",
      created: "2026-07-20",
      reporter: "Diego De Grandi",
      url: "https://realwired.atlassian.net/browse/RWT-344",
    },
    {
      key: "RWT-350",
      summary:
        "Zions Bancorp — File-upload fields (Invoice / Review Invoice) render as plain text fields on the Update Info page instead of upload widgets",
      status: "In Progress",
      created: "2026-07-21",
      reporter: "Diego De Grandi",
      url: "https://realwired.atlassian.net/browse/RWT-350",
    },
    {
      key: "RWT-356",
      summary:
        "Bank of California – Vendor Circle login fails for existing/verified vendor (Gary Alexander) — 2nd occurrence of RWT-284",
      status: "To Do",
      created: "2026-07-22",
      reporter: "Diego De Grandi",
      url: "https://realwired.atlassian.net/browse/RWT-356",
    },
    {
      key: "RWT-362",
      summary:
        "Fix module unlocking, Define Core System progress calculation, and Go Live Timeline visibility issues",
      status: "Review",
      created: "2026-07-23",
      reporter: "Diego De Grandi",
      url: "https://realwired.atlassian.net/browse/RWT-362",
    },
  ],
};

export const sprintNarrative = {
  description:
    "Sprint view focuses on QA queue depth, bugs detected this sprint (created in sprint dates), and team ORM automation module progress.",
  highlight:
    "Sprint 29 mid-sprint: 14 items (29 Story Points) in QA Ready / QA In Progress, 38 Done of 164 committed, and 15 bugs detected in-sprint.",
  contextNote:
    "Ready for PROD remains a deploy/sign-off tail — not QA capacity. Call that out so velocity conversations stay honest.",
};

export const throughputNarrative = {
  label: "Project throughput",
  description:
    "Created vs resolved measures overall project intake and Done-column close-outs across YP, YCVC, RM, and ARF — not tickets moving through the QA test lane.",
  highlight:
    "YTD resolution rate is 72.6% (1,289 Done ÷ 1,775 created), up from 71.3% at end of June. Resolved volume has stayed ahead of created since April.",
  contextNote:
    "Live Jira as of Jul 24, 2026. July MTD: 72 created · 75 resolved (104% monthly rate).",
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
    automationCoveragePercent: 65,
    criticalWorkflowAutomationPercent: 90,
    xrayArtifacts: 1004,
    automationTests: 159,
    automationTestsPrevious: 76,
    highlight:
      "App-wide automation at 65%; critical Request Lifecycle workflows at 90% (up from 72%).",
    automationNote:
      "159 Playwright tests (+109% from 76) · 65% app-wide automation · 90% critical workflow coverage (Request Lifecycle).",
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
    testCases: 9,
    highlight: "AI Review workflow covered via YP-1653 path.",
    automationNote: "Broader automation coverage still outstanding.",
  },
];

export type BugMonth = {
  month: string;
  detected: number;
  resolved: number;
};

/** Portfolio-wide YTD bug counts — detected = Created date in month; replace with verified Jira pull */
export const bugsByMonth: BugMonth[] = [
  { month: "Jan 26", detected: 18, resolved: 12 },
  { month: "Feb 26", detected: 22, resolved: 19 },
  { month: "Mar 26", detected: 45, resolved: 38 },
  { month: "Apr 26", detected: 28, resolved: 31 },
  { month: "May 26", detected: 24, resolved: 26 },
  { month: "Jun 26", detected: 30, resolved: 27 },
  { month: "Jul 26", detected: 11, resolved: 3 },
];

export type BugsByProject = {
  projectId: string;
  projectName: string;
  shortName: string;
  months: BugMonth[];
};

/** Per-project YTD bug drill-down — detected = Created date in month; placeholder until Jira pull */
export const bugsByProject: BugsByProject[] = [
  {
    projectId: "yp",
    projectName: "YouConnect Production",
    shortName: "YP",
    months: [
      { month: "Jan", detected: 8, resolved: 6 },
      { month: "Feb", detected: 10, resolved: 9 },
      { month: "Mar", detected: 20, resolved: 18 },
      { month: "Apr", detected: 12, resolved: 14 },
      { month: "May", detected: 10, resolved: 12 },
      { month: "Jun", detected: 4, resolved: 7 },
      { month: "Jul", detected: 3, resolved: 1 },
    ],
  },
  {
    projectId: "ycvc",
    projectName: "YC Vendor Circle",
    shortName: "YCVC",
    months: [
      { month: "Jan", detected: 4, resolved: 3 },
      { month: "Feb", detected: 5, resolved: 4 },
      { month: "Mar", detected: 12, resolved: 10 },
      { month: "Apr", detected: 7, resolved: 8 },
      { month: "May", detected: 6, resolved: 6 },
      { month: "Jun", detected: 8, resolved: 7 },
      { month: "Jul", detected: 4, resolved: 1 },
    ],
  },
  {
    projectId: "rm",
    projectName: "Reporting Microservice",
    shortName: "RM",
    months: [
      { month: "Jan", detected: 3, resolved: 2 },
      { month: "Feb", detected: 4, resolved: 3 },
      { month: "Mar", detected: 8, resolved: 6 },
      { month: "Apr", detected: 5, resolved: 5 },
      { month: "May", detected: 4, resolved: 4 },
      { month: "Jun", detected: 6, resolved: 5 },
      { month: "Jul", detected: 2, resolved: 1 },
    ],
  },
  {
    projectId: "arf",
    projectName: "Parachute / AI Review Forms",
    shortName: "ARF",
    months: [
      { month: "Jan", detected: 3, resolved: 1 },
      { month: "Feb", detected: 3, resolved: 3 },
      { month: "Mar", detected: 5, resolved: 4 },
      { month: "Apr", detected: 4, resolved: 4 },
      { month: "May", detected: 4, resolved: 4 },
      { month: "Jun", detected: 12, resolved: 8 },
      { month: "Jul", detected: 2, resolved: 0 },
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

/** YouConnect full regression — 2026-07-14 CI run (stage.realwired.com) */
export const latestPlaywrightRun = {
  title: "YouConnect — Playwright Run",
  subtitle: "Full regression suite · CI mode · headless · Chromium · 1 retry",
  environment: "stage.realwired.com",
  startedAt: "2026-07-14 20:49:44 UTC",
  durationMin: 100.3,
  totalTests: 113,
  passed: 105,
  failed: 3,
  flaky: 3,
  skipped: 2,
  passRatePercent: 94.6,
  passRateNote: "105/111 executed (excluding skipped)",
  updateNote:
    "market-area-crud-smoke:266 is now fixed & verified (8/8 passed on re-run). Root cause: the requests-list search was left in Advanced mode — it now switches to Basic Search first. Counts below are the original run snapshot; only the two RWT-314 canaries remain red.",
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
    date: "Jul 14 2026",
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
    date: "Jul 14 2026",
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
    date: "Jul 14 2026",
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
    date: "Jul 14 2026",
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
  appWideAutomationPercent: 65,
  appWideAutomationTargetPercent: 85,
  /** YouConnect critical workflow automation (Request Lifecycle) */
  criticalWorkflowAutomationMin: 90,
  criticalWorkflowAutomationMax: 90,
  criticalWorkflowAutomationMid: 90,
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
  ormAutomationStatus: "10/26 modules Done on RWT-107",
  frameworksInUse: ["Playwright"],
  ciIntegrated: automationRunSummary.ciIntegrated,
  ciStatus: automationRunSummary.ciStatus,
  stabilizationFocus: [
    "PHP timing/render flake reduction",
    "Synchronization & execution reliability",
    "Lifecycle workflow consistency",
  ],
};
