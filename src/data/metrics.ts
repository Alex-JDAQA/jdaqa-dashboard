/**
 * QA metrics sourced from:
 * - Dev-QA Impact Dashboard Metrics (Confluence export, Jun 19 2026)
 * - Q1 QA Progress Report
 * - YouConnect Playwright suite (live counts)
 */

export const dashboardMeta = {
  title: "JDAQA Impact Dashboard",
  subtitle:
    "Portfolio quality & delivery metrics · YouConnect Production, YC Vendor Circle, Reporting Microservice & Parachute",
  partnershipStart: "January 1, 2026",
  reportingPeriod: "Jan – Jun 2026",
  lastUpdated: "June 19, 2026",
  team: "JDAQA",
  client: "RealWired",
};

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
  impactSubmetric?: string;
};

/** Current post-QA monthly close-out rate */
export const postQaIssueThroughput = {
  avgPerMonth: 24.2,
  total: 145,
  period: "Jan 2026 – Jun 2026",
};

/** 6-month total resolved impact — shown as submetric only */
export const totalResolvedImpact = {
  preQaTotal: 566,
  preQaPeriod: "Jul 2025 – Dec 2025",
  postQaTotalLabel: "1,231+",
  postQaPeriod: "Jan 2026 – Jun 2026",
  percentChange: 117,
};

export const manualCoverageSummary = {
  /** Xray Test Repository totals */
  testRepositoryTotal: 952,
  sprintTestingCases: 100,
  totalFormalTestCases: 952 - 100,
  /** Breakdown from Functional Testing folders */
  youConnectCoreWorkflows: 147,
  preconditions: 26,
  reportingMicroservice: 455,
  vendorManagement: 69,
  vendorCircle: 92,
  aiReviewForms: 59,
  functionalTestingTotal: 848,
};

export const kpiCards: KpiCard[] = [
  {
    id: "resolved-per-month",
    label: "Avg Issues Resolved / Month",
    value: postQaIssueThroughput.avgPerMonth,
    changeLabel: `${postQaIssueThroughput.total} total resolved · ${postQaIssueThroughput.period}`,
    subtext: "Post-QA monthly close-out rate",
    impactSubmetric: `${totalResolvedImpact.preQaTotal} → ${totalResolvedImpact.postQaTotalLabel} total resolved (+${totalResolvedImpact.percentChange}%) · ${totalResolvedImpact.preQaPeriod} vs ${totalResolvedImpact.postQaPeriod}`,
  },
  {
    id: "resolution-rate",
    label: "Portfolio Resolution Rate",
    value: 67.7,
    unit: "%",
    change: 96,
    changeLabel: "vs pre-QA (34.5%)",
    trend: "up",
    accent: "blue",
    subtext: "1,220 resolved of 1,803 created",
  },
  {
    id: "automation-coverage",
    label: "Critical Workflow Automation",
    value: 72,
    unit: "%",
    changeLabel: "70–75% estimated range",
    trend: "up",
    accent: "violet",
    subtext: "Request Lifecycle · Playwright",
  },
  {
    id: "manual-coverage",
    label: "Manual Coverage (Critical Flows)",
    value: 95,
    unit: "%",
    trend: "up",
    accent: "green",
    subtext: `${manualCoverageSummary.totalFormalTestCases} Xray test cases (repository total, excl. sprint testing)`,
  },
];

export type PortfolioMonth = {
  month: string;
  created: number;
  resolved: number;
  resolutionRate: number;
  period: "pre-qa" | "post-qa";
};

/** Combined portfolio monthly totals (YP + YCVC + RM + ARF) */
export const portfolioByMonth: PortfolioMonth[] = [
  { month: "Sep 25", created: 114, resolved: 123, resolutionRate: 108, period: "pre-qa" },
  { month: "Oct 25", created: 101, resolved: 169, resolutionRate: 167, period: "pre-qa" },
  { month: "Nov 25", created: 100, resolved: 89, resolutionRate: 89, period: "pre-qa" },
  { month: "Dec 25", created: 60, resolved: 66, resolutionRate: 110, period: "pre-qa" },
  { month: "Jan 26", created: 338, resolved: 82, resolutionRate: 24, period: "post-qa" },
  { month: "Feb 26", created: 287, resolved: 108, resolutionRate: 38, period: "post-qa" },
  { month: "Mar 26", created: 730, resolved: 415, resolutionRate: 57, period: "post-qa" },
  { month: "Apr 26", created: 211, resolved: 308, resolutionRate: 146, period: "post-qa" },
  { month: "May 26", created: 143, resolved: 184, resolutionRate: 129, period: "post-qa" },
  { month: "Jun 26", created: 94, resolved: 123, resolutionRate: 131, period: "post-qa" },
];

export const executiveSummary = {
  narrative:
    "Since January 1, 2026, the team is closing out an average of 24.2 issues per month (145 total across Jan–Jun 2026). Comparing equivalent 6-month windows, total issues resolved increased from 566 to 1,231+ — a 117% increase in overall throughput.",
  preQa: {
    avgResolvedPerMonth: 54,
    resolutionRate: 34.5,
    totalCreated: 1877,
    totalResolved: 648,
  },
  postQa: {
    avgResolvedPerMonth: postQaIssueThroughput.avgPerMonth,
    resolutionRate: 67.7,
    totalCreated: 1803,
    totalResolved: postQaIssueThroughput.total,
  },
  inflectionPoint: "April 2026 — resolved volume exceeds created volume and remains ahead through current reporting window.",
};

export type BusinessImpactPillar = {
  id: string;
  title: string;
  metric: string;
  metricDetail?: string;
  description: string;
  accent: "blue" | "green" | "violet" | "amber";
};

/** Executive narrative for CTO / leadership — sourced from portfolio Jira metrics */
export const businessImpact = {
  summary:
    "Since January 1, 2026, JDAQA has helped RealWired close work faster relative to intake, double comparable resolution throughput, and build structured coverage across the products that drive revenue.",
  pillars: [
    {
      id: "throughput",
      title: "Portfolio Throughput",
      metric: `+${totalResolvedImpact.percentChange}%`,
      metricDetail: `${totalResolvedImpact.preQaTotal} → ${totalResolvedImpact.postQaTotalLabel} resolved`,
      description:
        "Equivalent 6-month windows show more than double the issues closed portfolio-wide after QA joined.",
      accent: "green",
    },
    {
      id: "closure-rate",
      title: "Issue Closure Rate",
      metric: "67.7%",
      metricDetail: "vs 34.5% pre-QA",
      description:
        "The team now resolves roughly two of every three opened issues — up from one in three before QA.",
      accent: "blue",
    },
    {
      id: "coverage",
      title: "Release Protection",
      metric: `${manualCoverageSummary.totalFormalTestCases}`,
      metricDetail: "Xray test cases · 95% critical flows",
      description:
        "Formal test coverage across YouConnect, Vendor Circle, Reporting Microservice, and Parachute protects core appraisal workflows.",
      accent: "violet",
    },
    {
      id: "automation",
      title: "Regression Safety Net",
      metric: "~72%",
      metricDetail: "Request Lifecycle automated",
      description:
        "Playwright automation on the end-to-end request lifecycle reduces release risk on the highest-impact business paths.",
      accent: "amber",
    },
  ] as BusinessImpactPillar[],
  inflectionPoint: executiveSummary.inflectionPoint,
  forwardLook:
    "Next phase: CI/CD integration, ORM automation rollout, and closing remaining manual gaps — scaling quality without scaling headcount.",
};

export type BugMetric = {
  label: string;
  preQaTotal: number;
  preQaMonthly: number;
  postQaTotal: number;
  postQaMonthly: number;
  changePercent: number;
  trend: "up" | "down";
  interpretation: string;
};

export const bugMetrics: BugMetric[] = [
  {
    label: "Bugs Detected",
    preQaTotal: 25,
    preQaMonthly: 3.9,
    postQaTotal: 32,
    postQaMonthly: 5.7,
    changePercent: 46,
    trend: "up",
    interpretation: "Higher detection reflects improved QA thoroughness and earlier defect identification.",
  },
  {
    label: "Bugs Resolved",
    preQaTotal: 34,
    preQaMonthly: 5.3,
    postQaTotal: 26,
    postQaMonthly: 4.7,
    changePercent: -11,
    trend: "down",
    interpretation: "Resolution pace is catching up as portfolio throughput scales across multiple active projects.",
  },
];

/** Reference periods used across portfolio pre/post-QA comparisons */
export const qaPeriodReference = {
  qaStartDate: "January 1, 2026",
  postQaPeriod: "Jan 2026 – Jun 2026",
  portfolioPreQaPeriod: "Jan 2025 – Dec 2025",
  note: "Pre-QA windows vary by project based on when tracking began. Post-QA begins when JDAQA joined on Jan 1, 2026.",
};

export type ProjectSummary = {
  id: string;
  name: string;
  shortName: string;
  preQaPeriod: string;
  postQaPeriod: string;
  preQaResolved: number;
  postQaResolved: number;
  preQaResolutionRate: number;
  postQaResolutionRate: number;
  resolvedChangePercent: number;
  testCases?: number;
  xrayArtifacts?: number;
  passRate?: number;
  featureAreas?: number;
  coverageHighlight: string;
};

export const projectSummaries: ProjectSummary[] = [
  {
    id: "yp",
    name: "YouConnect Production",
    shortName: "YP",
    preQaPeriod: "Jan 2025 – Dec 2025",
    postQaPeriod: "Jan 2026 – Jun 2026",
    preQaResolved: 359,
    postQaResolved: 527,
    preQaResolutionRate: 35.3,
    postQaResolutionRate: 45.5,
    resolvedChangePercent: 47,
    xrayArtifacts: 1004,
    coverageHighlight:
      "Central Xray container with 1,004+ test artifacts spanning Vendor Circle, Reporting Microservice, AI Review, and regression scenarios.",
  },
  {
    id: "ycvc",
    name: "YC Vendor Circle",
    shortName: "YCVC",
    preQaPeriod: "Jan 2025 – Dec 2025",
    postQaPeriod: "Jan 2026 – Jun 2026",
    preQaResolved: 82,
    postQaResolved: 260,
    preQaResolutionRate: 13.5,
    postQaResolutionRate: 161.5,
    resolvedChangePercent: 217,
    testCases: 162,
    passRate: 100,
    featureAreas: 13,
    coverageHighlight:
      "162 test cases across 13 feature areas — deepest coverage in Report Submission, Credentials, and Vendor Eligibility.",
  },
  {
    id: "rm",
    name: "Reporting Microservice",
    shortName: "RM",
    preQaPeriod: "Jun 2025 – Dec 2025",
    postQaPeriod: "Jan 2026 – Jun 2026",
    preQaResolved: 207,
    postQaResolved: 304,
    preQaResolutionRate: 84.8,
    postQaResolutionRate: 103,
    resolvedChangePercent: 47,
    testCases: 117,
    passRate: 100,
    featureAreas: 8,
    coverageHighlight:
      "117 test cases across 8 areas — heaviest coverage in Report Submission, KPI/Order Validation, and Dashboard analytics.",
  },
  {
    id: "arf",
    name: "Parachute / AI Review Forms",
    shortName: "ARF",
    preQaPeriod: "Oct 2025 – Dec 2025",
    postQaPeriod: "Jan 2026 – Jun 2026",
    preQaResolved: 0,
    postQaResolved: 129,
    preQaResolutionRate: 0,
    postQaResolutionRate: 68.3,
    resolvedChangePercent: 0,
    testCases: 9,
    passRate: 100,
    featureAreas: 3,
    coverageHighlight:
      "AI Review workflow coverage via YP-1653 — enablement, submission, cancellation, notifications, and large CAD/PDF processing.",
  },
];

export type ManualCoverageArea = {
  area: string;
  description: string;
  priority: "critical" | "high" | "medium";
  status?: "done" | "todo";
};

export type ManualCoverageGroup = {
  folder: string;
  testCases: number;
  subtitle?: string;
  areas: ManualCoverageArea[];
};

/** Xray Test Repository — Functional Testing folders (excl. Sprint Testing) */
export const manualCoverageGroups: ManualCoverageGroup[] = [
  {
    folder: "Core Workflows",
    testCases: 147,
    subtitle: "YouConnect request lifecycle · YP-native Xray tests",
    areas: [
      {
        area: "Login & Authentication",
        description:
          "LO and JM login flows, forgot username/password, blank/invalid credentials, session persistence after tab close, error messaging.",
        priority: "critical",
      },
      {
        area: "Request Wizard (LO Submission)",
        description:
          "End-to-end steps 1–5: property address lookup, new property creation, coordinate mapping, request type selection (regular vs non-regular), multi-request-type forms, document upload, and final submission. Includes validation and cancel/back navigation at every step.",
        priority: "critical",
      },
      {
        area: "Request Management (JM Side)",
        description:
          "JM views/accepts/rejects submitted requests, rejection with custom reason, LO resubmission, email notifications on request assignment, role-based access controls (non-JM/non-Admin cannot accept).",
        priority: "critical",
      },
      {
        area: "Vendor Solicitation & Bidding",
        description:
          "Solicitation launch, Options A (open bid), B (set due date), C (set fee), D (direct engagement), bid response submission, bid acceptance, document visibility settings, and eligibility enforcement.",
        priority: "critical",
      },
      {
        area: "Vendor Report Submission Webform",
        description:
          "Webform display, engagement letter and appraisal bid downloads, vendor/JM discussion panel, invoice and report upload, appraised value entry, file size validation (150MB), oversized file handling, field validation, and submission confirmation.",
        priority: "critical",
      },
      {
        area: "Review Workflow",
        description:
          "Accept for review, assign internal review (auto-accept and manual modes), no review needed, undo no-review, review completion, re-open review, review approval, request completion, and request re-open.",
        priority: "critical",
      },
      {
        area: "Corrections & Revisions",
        description:
          "JM requests corrections with/without requiring a revised upload, vendor re-upload flows, cancellation of correction requests, 3+ correction cycles, report submission panel updates.",
        priority: "high",
        status: "todo",
      },
      {
        area: "Navigation & UI",
        description:
          "LO and JM navigation to all screens (Requests, Properties, Vendors, Reports, Report Summaries, Portfolio/Projects, Home/Support).",
        priority: "medium",
        status: "todo",
      },
    ],
  },
  {
    folder: "Preconditions",
    testCases: 26,
    subtitle: "Shared setup steps used across functional workflows",
    areas: [
      {
        area: "Shared Preconditions",
        description:
          "Reusable test preconditions and setup steps that support execution across Core Workflows and related functional suites.",
        priority: "high",
      },
    ],
  },
  {
    folder: "Reporting Microservice",
    testCases: 455,
    areas: [
      {
        area: "Report Submission & Corrections",
        description: "File uploads, form validation, reupload flows, JM correction requests, report panels, and vendor revised reports.",
        priority: "critical",
      },
      {
        area: "KPI & Order Validation",
        description: "Order counts, filters, sort order, duplicate handling, cancelled order exclusion, and period comparisons.",
        priority: "critical",
      },
      {
        area: "Dashboard — Overview",
        description: "Completed orders, average turnaround time, activity charts, multi-bank filters, and organization metrics.",
        priority: "high",
      },
      {
        area: "Dashboard — Transactions",
        description: "Total client fee, average client fee per order, order volume charts, and transaction fee breakdowns.",
        priority: "high",
      },
      {
        area: "Dashboard — Billing & Invoicing",
        description: "Billing cycle views, billing model display, revenue sorting, date filters, and invoice history.",
        priority: "high",
      },
      {
        area: "Dashboard — RW Ledger",
        description: "RW transaction/system fee, total client fee, average client fee per order, and fee analysis charts.",
        priority: "high",
      },
      {
        area: "AI Review",
        description: "Category enablement, Send for AI Review, cancellation, email notifications, and large CAD PDF processing.",
        priority: "critical",
      },
      {
        area: "Vendor Webform (Report Flow)",
        description: "Webform display, engagement letter downloads, invoice uploads, oversized file handling, and discussion panel.",
        priority: "critical",
      },
    ],
  },
  {
    folder: "Vendor Management",
    testCases: 69,
    areas: [
      {
        area: "Vendor Management (Admin)",
        description: "List views, exports, role-based visibility, grading, custom status controls, and admin vendor operations.",
        priority: "high",
      },
    ],
  },
  {
    folder: "Vendor Circle",
    testCases: 92,
    areas: [
      {
        area: "Registration & Onboarding",
        description: "Account creation, invite flows, personal info, addresses, specialties, and coverage areas.",
        priority: "high",
      },
      {
        area: "Credentials & Compliance",
        description: "License uploads, E&O insurance, W-9, renewals, expiration tracking, and admin notifications.",
        priority: "critical",
      },
      {
        area: "Vendor Status & Eligibility",
        description: "Approval states, license validation, national vendor flags, duplicate checks, and override rules.",
        priority: "critical",
      },
      {
        area: "Solicitation & Bidding",
        description: "Options A/B/C, bid responses, document visibility settings, and eligibility checks.",
        priority: "critical",
      },
      {
        area: "Report Submission & Webform",
        description: "End-to-end vendor report and webform submission workflows.",
        priority: "critical",
      },
      {
        area: "Multi-Bank Operations",
        description: "Bank 2 invites, cross-bank bids, multi-bank profiles, and bid submissions across banks.",
        priority: "critical",
      },
    ],
  },
  {
    folder: "AI Review Forms",
    testCases: 59,
    subtitle: "Parachute / AI Review Forms",
    areas: [
      {
        area: "AI Review Workflow",
        description: "Form enablement by category, order submission, cancellation, email notifications, and large CAD/PDF processing.",
        priority: "critical",
      },
      {
        area: "Large File / CAD PDF Handling",
        description: "Large architectural PDF processing, technical review scenarios, and simultaneous processing checks.",
        priority: "critical",
      },
      {
        area: "YouConnect Integration",
        description: "AI Review request flow from YouConnect, status updates, and user-facing workflow validation.",
        priority: "critical",
      },
    ],
  },
];

export type RequestLifecycleWorkflow = {
  phase: number;
  stage: string;
  description: string;
  workflows: string[];
  specFiles: number;
  testCases: number;
};

/** Request Lifecycle automation — mapped to Playwright spec structure */
export const requestLifecycleWorkflows: RequestLifecycleWorkflow[] = [
  {
    phase: 1,
    stage: "Request Creation",
    description: "Loan Officer initiates a new appraisal request through the creation wizard.",
    workflows: [
      "Loan Officer request creation workflow",
      "Request wizard field validation",
      "Request submission and confirmation",
    ],
    specFiles: 1,
    testCases: 3,
  },
  {
    phase: 2,
    stage: "JM Queue & Review",
    description: "Job Manager reviews incoming requests from the queue.",
    workflows: [
      "Job Manager queue navigation",
      "Request list filtering and selection",
      "Request detail review and handling",
    ],
    specFiles: 1,
    testCases: 7,
  },
  {
    phase: 3,
    stage: "Accept / Reject",
    description: "Job Manager accepts or rejects requests via one-step and two-step flows.",
    workflows: [
      "One-step request acceptance",
      "Two-step request acceptance",
      "Two-step request rejection",
    ],
    specFiles: 3,
    testCases: 5,
  },
  {
    phase: 4,
    stage: "Vendor Solicitation",
    description: "Vendor outreach and bid collection across all solicitation options.",
    workflows: [
      "Vendor solicitation Option A",
      "Vendor solicitation Option B",
      "Vendor solicitation Option C",
      "Vendor solicitation Option D",
      "Vendor bid validation and submission",
      "Vendor engagement acceptance",
    ],
    specFiles: 4,
    testCases: 19,
  },
  {
    phase: 5,
    stage: "Report Submission",
    description: "Vendor submits reports, invoices, and revised delivery dates.",
    workflows: [
      "Vendor report and invoice submission",
      "Report upload and form validation",
      "Revised delivery date workflows",
    ],
    specFiles: 2,
    testCases: 3,
  },
  {
    phase: 6,
    stage: "Report Review & Completion",
    description: "Internal/external review paths through approval and request completion.",
    workflows: [
      "Review workflows (internal / external / no review)",
      "Report review acceptance",
      "Report review approval",
      "Report review completion",
      "Request completion",
      "Disputed report correction / revision flows",
    ],
    specFiles: 6,
    testCases: 11,
  },
  {
    phase: 7,
    stage: "Engagement Cancellation",
    description: "Cancel active vendor engagements when a request is withdrawn.",
    workflows: [
      "Engagement cancellation flows",
      "Cancellation confirmation and status updates",
    ],
    specFiles: 1,
    testCases: 3,
  },
];

export const requestLifecycleSummary = {
  totalPhases: 7,
  specFiles: 18,
  testCases: 51,
  coverageEstimate: "70–75%",
  framework: "Playwright",
};

export type AutomationSuite = {
  suite: string;
  specFiles: number;
  testCases: number;
  status: "active" | "in-progress" | "planned";
  framework: "Playwright";
  workflows: string[];
  coverageNote?: string;
};

/** Counts from YouConnect Playwright suite (Jun 2026) */
export const automationSuites: AutomationSuite[] = [
  {
    suite: "Request Lifecycle",
    specFiles: 18,
    testCases: 51,
    status: "active",
    framework: "Playwright",
    workflows: [
      "Request creation",
      "JM queue & review",
      "Accept / reject flows",
      "Vendor solicitation (A/B/C/D)",
      "Report submission & revised delivery",
      "Review, approval & completion",
      "Disputed corrections",
      "Engagement cancellation",
    ],
  },
  {
    suite: "Authentication",
    specFiles: 3,
    testCases: 19,
    status: "active",
    framework: "Playwright",
    workflows: ["Login (3 roles + invalid creds)", "Forgot password", "Forgot username"],
  },
  {
    suite: "General Settings",
    specFiles: 1,
    testCases: 2,
    status: "active",
    framework: "Playwright",
    workflows: ["Default filter by status"],
  },
  {
    suite: "Module Smoke Tests",
    specFiles: 4,
    testCases: 4,
    status: "in-progress",
    framework: "Playwright",
    workflows: ["Accounts", "Documents", "Zip Code Mgmt", "Field Templates"],
    coverageNote: "Starting point — initial smoke specs only; broader module coverage still in progress.",
  },
  {
    suite: "ORM Regression",
    specFiles: 0,
    testCases: 0,
    status: "planned",
    framework: "Playwright",
    workflows: ["Scope defined", "Backlog prepared", "Rollout validation planned"],
  },
  {
    suite: "CI/CD Integration",
    specFiles: 0,
    testCases: 0,
    status: "in-progress",
    framework: "Playwright",
    workflows: ["Ephemeral env execution", "Test data strategy", "Health endpoint validation"],
  },
];

export const automationSummary = {
  totalSpecFiles: 26,
  totalAutomatedTests: 76,
  criticalWorkflowAutomationMin: 70,
  criticalWorkflowAutomationMax: 75,
  criticalWorkflowAutomationMid: 72,
  manualCriticalCoverage: 95,
  requestLifecycleSmoke: "Completed",
  ormAutomationStatus: "Prepared",
  frameworksInUse: ["Playwright"],
  ciIntegrated: false,
  ciStatus: "Research & planning in progress",
  stabilizationFocus: [
    "PHP timing/render flake reduction",
    "Synchronization & execution reliability",
    "Lifecycle workflow consistency",
  ],
};

export const automatedWorkflows = [
  "Login (3 roles + invalid credential validation)",
  "Forgot password / username validation",
  "Loan Officer request creation workflow",
  "Job Manager queue and request handling",
  "Request acceptance / rejection flows",
  "Vendor solicitation workflows",
  "Vendor bid validation and submission",
  "Vendor engagement acceptance",
  "Vendor report and invoice submission",
  "Revised delivery date workflows",
  "Engagement cancellation flows",
  "Review workflows (internal / external / no review)",
  "Approval and completion flows",
  "Disputed report correction / revision flows",
];

export type Milestone = {
  date: string;
  title: string;
  description: string;
};

export const milestones: Milestone[] = [
  {
    date: "Jan 2026",
    title: "JDAQA Partnership Begins",
    description:
      "QA team onboarded to RealWired portfolio — YouConnect Production, YCVC, Reporting Microservice, and Parachute.",
  },
  {
    date: "Q1 2026",
    title: "Request Lifecycle Automation",
    description:
      "Playwright framework established with ~70–75% automation across critical business workflows and ~95% manual coverage.",
  },
  {
    date: "Q1 2026",
    title: "YCVC & RM Manual Coverage",
    description:
      "162 Vendor Circle and 117 Reporting Microservice test cases completed — 100% passing across 21 feature areas.",
  },
  {
    date: "Apr 2026",
    title: "Portfolio Inflection Point",
    description:
      "Resolved volume exceeds created volume portfolio-wide — backlog reduction trend begins.",
  },
  {
    date: "Q2 2026",
    title: "ARF Release Support",
    description:
      "Major QA bandwidth allocated to AI Review Forms release — rapid regression, API validation, evolving acceptance criteria.",
  },
  {
    date: "Jun 2026",
    title: "Stabilization & CI/CD Planning",
    description:
      "Shift from expansion to regression reliability, ORM automation prep, and CI/CD integration research.",
  },
];
