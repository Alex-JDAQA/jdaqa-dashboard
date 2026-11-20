import type { KpiCard, KpiQuarter } from "./metrics";
import type { SprintTicket } from "./sprintTickets";

/**
 * Leadership quality signals — YTD figures Jira REST Nov 20, 2026.
 * Bounce-back and time in QA stay the Oct 30 changelog count.
 * Sprint 44 figures refreshed Nov 20, 2026. QA tester is QA Owner (customfield_10630).
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
  pulled: "November 20, 2026",
  window: "Jan – Nov 20, 2026",
  /** Product-bug series on the dashboard (infra, epic RWT-1195, and November sample epic RWT-1504 excluded). */
  productBugsYtd: 264,
  portfolioDoneYtd: 1594,
};

/** Open Highest product bugs created YTD that are still not Done — infra and RWT-1195 excluded. */
export const openHighBugs: QualityTicket[] = [
  {
    key: "RWT-447",
    summary:
      "Unauthenticated SQL injection in vendor 2FA verification (pincode) — appears to allow full MFA bypass",
    status: "Won't Do",
    priority: "Highest",
    category: "Bug",
    ageDays: 106,
    reporter: "Ademir Mazer Junior",
    url: "https://realwired.atlassian.net/browse/RWT-447",
  },
  {
    key: "RWT-463",
    summary:
      "Vendor MFA security code — stop feeding the field-level audit trail and KReports (st_Solicitation & st_ReviewSolicitation)",
    status: "Won't Do",
    priority: "Highest",
    category: "Bug",
    ageDays: 102,
    reporter: "Ademir Mazer Junior",
    url: "https://realwired.atlassian.net/browse/RWT-463",
  },
  {
    key: "RWT-814",
    summary: "Bank of Tampa — Parachute Technical Review failed on File 3897",
    status: "Review",
    priority: "Highest",
    category: "Bug",
    ageDays: 64,
    reporter: "Trey Cavaliere",
    url: "https://realwired.atlassian.net/browse/RWT-814",
  },
  {
    key: "RWT-1528",
    summary:
      "Non-admin users can change any user, including making themselves admin, through the Employees module",
    status: "Review",
    priority: "Highest",
    category: "Bug",
    ageDays: 7,
    reporter: "Estevao",
    url: "https://realwired.atlassian.net/browse/RWT-1528",
  },
  {
    key: "RWT-1586",
    summary:
      "United Community Bank (UCBI): no vendors connected to Vendor Circle — client cannot vet about 1,400 vendor updates",
    status: "To Do",
    priority: "Highest",
    category: "Bug",
    ageDays: 3,
    reporter: "Diego De Grandi",
    url: "https://realwired.atlassian.net/browse/RWT-1586",
  },
];

/** Sprint 41 tickets currently in QA that had already left the QA lane (changelog). None on Oct 30. */
export const sprintQaBounceTickets: QualityTicket[] = [];

export const severityMix = {
  openHigh: 30,
  openHighest: 5,
  openHighAndHighest: 35,
  productOpenYtd: 106,
  medianAgeDays: 94,
  agedOver30: 28,
  agedOver60: 25,
  waitingPastQaHigh: 11,
  jql: `project in (${PROJECTS}) AND issuetype = Bug AND created >= "2026-01-01" AND created < "2026-11-21" AND status != Done AND priority in (Highest, High) AND key not in (RWT-415, RWT-416, RWT-417, RWT-424, RWT-488, RWT-620, RWT-625, RWT-626, RWT-766, RWT-691, RWT-677, RWT-675) AND (parent is EMPTY OR parent not in (RWT-1195, RWT-1504)) AND issuetype NOT IN ${XRAY}`,
  sourceNote:
    'Jira REST Nov 20, 2026: YTD-created product bugs still not Done with priority Highest (5) or High (30) = 35. Median age 94 days (n=35); 28 ≥30 days; 25 ≥60 days. 11 of the 35 are Ready for PROD and 6 are Ready for Stage. Four are Won\'t Do (RWT-447, RWT-463, RWT-284, RWT-486) and still count because open means status != Done. Ready for PROD is in the Done status category, so statusCategory would hide the 11. Excludes documented Aug/Sep infrastructure tickets, epic RWT-1195, and November sample epic RWT-1504. RWT-899, Highest on the Oct 30 list, is now Done. Pre-2026 High leftovers (YP-27, YP-31) are out of the partnership window.',
};

/**
 * Sprint quality card — product bugs on the active sprint that are still not Done
 * and marked High or Highest. Not the YTD open-High set.
 * Sprint 44 (id 1967, board 271, Nov 16–23). Epic RWT-1195 and infrastructure key RWT-626 are excluded.
 */
export const sprintOpenHigh = {
  sprintName: "Sprint 44",
  sprintId: 1967,
  openHigh: 13,
  openHighest: 5,
  openHighAndHighest: 18,
  medianAgeDays: 72,
  readyForProd: 3,
  jql: `project in (${PROJECTS}) AND sprint = 1967 AND issuetype = Bug AND status != Done AND priority in (Highest, High) AND (parent is EMPTY OR parent != RWT-1195) AND key != RWT-626`,
  sourceNote:
    "Jira REST Nov 20, 2026: Sprint 44 (id 1967, Nov 16–23) product bugs with status != Done and priority Highest or High = 18 (5 Highest, 13 High), after excluding epic RWT-1195 and infrastructure key RWT-626. Median age 72 days (middle pair 66 and 78). Three High bugs are Ready for PROD (RWT-861, RWT-788, RWT-705). Two Highest are Won't Do (RWT-463, RWT-447) and still count because open means status != Done. Separately, 15 High or Highest bugs under epic RWT-1195 are in this sprint and not Done, including 6 Highest dependency tickets already Ready for PROD. RWT-626 (Valley National Bank site slowness) is High and in Review, and stays out as documented infrastructure.",
};

/** Sprint 44 product bugs still not Done at High or Highest — Jira REST Nov 20, 2026. Epic RWT-1195 and RWT-626 excluded. */
export const sprintOpenHighBugs: QualityTicket[] = [
  {
    key: "RWT-447",
    summary: "Unauthenticated SQL injection in vendor 2FA verification (pincode) — appears to allow full MFA bypass",
    status: "Won't Do",
    priority: "Highest",
    category: "Bug",
    ageDays: 106,
    reporter: "Ademir Mazer Junior",
    url: "https://realwired.atlassian.net/browse/RWT-447",
  },
  {
    key: "RWT-463",
    summary: "Vendor MFA security code — stop feeding the field-level audit trail and KReports (st_Solicitation & st_ReviewSolicitation)",
    status: "Won't Do",
    priority: "Highest",
    category: "Bug",
    ageDays: 102,
    reporter: "Ademir Mazer Junior",
    url: "https://realwired.atlassian.net/browse/RWT-463",
  },
  {
    key: "RWT-814",
    summary: "Bank of Tampa — Parachute Technical Review failed on File 3897",
    status: "Review",
    priority: "Highest",
    category: "Bug",
    ageDays: 64,
    reporter: "Trey Cavaliere",
    url: "https://realwired.atlassian.net/browse/RWT-814",
  },
  {
    key: "RWT-1528",
    summary: "Non-admin users can change any user, including making themselves admin, through the Employees module",
    status: "Review",
    priority: "Highest",
    category: "Bug",
    ageDays: 7,
    reporter: "Estevao",
    url: "https://realwired.atlassian.net/browse/RWT-1528",
  },
  {
    key: "RWT-1586",
    summary: "United Community Bank (UCBI): no vendors connected to Vendor Circle — client cannot vet about 1,400 vendor updates",
    status: "To Do",
    priority: "Highest",
    category: "Bug",
    ageDays: 3,
    reporter: "Diego De Grandi",
    url: "https://realwired.atlassian.net/browse/RWT-1586",
  },
  {
    key: "RWT-326",
    summary: "Vendor Circle – Documents replaced via the Vendor Updates tab are not retained in the vendor history panel",
    status: "Ready for Stage",
    priority: "High",
    category: "Bug",
    ageDays: 128,
    reporter: "Missie Guillette",
    qaOwner: "Chester Cabia",
    url: "https://realwired.atlassian.net/browse/RWT-326",
  },
  {
    key: "RWT-368",
    summary: "VBR panel Reconciled Grade reads from Vendor Record, not Vendor Type Record — stale grade platform-wide",
    status: "Ready for Stage",
    priority: "High",
    category: "Bug",
    ageDays: 119,
    reporter: "Trey Cavaliere",
    qaOwner: "eve",
    url: "https://realwired.atlassian.net/browse/RWT-368",
  },
  {
    key: "RWT-381",
    summary: "Splunk HEC token stored in plaintext Lambda env var (sugarcrm-log-forwarder-prod)",
    status: "Hold",
    priority: "High",
    category: "Bug",
    ageDays: 115,
    reporter: "David Eloy",
    url: "https://realwired.atlassian.net/browse/RWT-381",
  },
  {
    key: "RWT-546",
    summary: "KReports scheduler: catch(Error) never clears the 'P' status, causing infinite retry and permanent starvation of all later reports (kschedulingcronhandler.php:147-149)",
    status: "Ready for Stage",
    priority: "High",
    category: "Bug",
    ageDays: 94,
    reporter: "David Eloy",
    qaOwner: "eve",
    url: "https://realwired.atlassian.net/browse/RWT-546",
  },
  {
    key: "RWT-574",
    summary: "KReports scheduler: failed report emails are saved as status='sent' — Send() return value discarded and $exceptions never enabled (kschedulingcronhandler.php:331-350)",
    status: "Ready for Stage",
    priority: "High",
    category: "Bug",
    ageDays: 93,
    reporter: "David Eloy",
    qaOwner: "eve",
    url: "https://realwired.atlassian.net/browse/RWT-574",
  },
  {
    key: "RWT-624",
    summary: "Enable change log auditing for all remaining un-audited fields on the Request record",
    status: "In Progress",
    priority: "High",
    category: "Bug",
    ageDays: 87,
    reporter: "Zach Sebastian",
    qaOwner: "Marvs Medrano",
    url: "https://realwired.atlassian.net/browse/RWT-624",
  },
  {
    key: "RWT-705",
    summary: "Download entry points that bypass authentication or the download token",
    status: "Ready for PROD",
    priority: "High",
    category: "Bug",
    ageDays: 78,
    reporter: "David Eloy",
    url: "https://realwired.atlassian.net/browse/RWT-705",
  },
  {
    key: "RWT-788",
    summary: "Overall Grade (Weighted) does not calculate when a review is completed by an external review vendor",
    status: "Ready for PROD",
    priority: "High",
    category: "Bug",
    ageDays: 66,
    reporter: "Zach Sebastian",
    qaOwner: "Marvs Medrano",
    url: "https://realwired.atlassian.net/browse/RWT-788",
  },
  {
    key: "RWT-861",
    summary: "External review re-submitted via Review Submission web form after Reopen Review does not preserve the prior review (not moved to Original Review or History)",
    status: "Ready for PROD",
    priority: "High",
    category: "Bug",
    ageDays: 58,
    reporter: "Zach Sebastian",
    qaOwner: "Chester Cabia",
    url: "https://realwired.atlassian.net/browse/RWT-861",
  },
  {
    key: "RWT-960",
    summary: "Vendor Circle — vendor updates from non-monitored vendors still email the Vendor Credential Administrator",
    status: "Review",
    priority: "High",
    category: "Bug",
    ageDays: 43,
    reporter: "Chester Cabia",
    url: "https://realwired.atlassian.net/browse/RWT-960",
  },
  {
    key: "RWT-1161",
    summary: "Vendor credential expiration: vendor-type \"Required / Not required\" overrides are ignored by the expiration job when vendor types are on (potentially all vendor-type banks)",
    status: "To Do",
    priority: "High",
    category: "Bug",
    ageDays: 28,
    reporter: "Marvs Medrano",
    url: "https://realwired.atlassian.net/browse/RWT-1161",
  },
  {
    key: "RWT-1162",
    summary: "Vendor credential expiration: General Liability, Auto Liability and Master Agreement are never checked for vendors with a blank vendor status, and use the vendor-level status when vendor types are on",
    status: "To Do",
    priority: "High",
    category: "Bug",
    ageDays: 28,
    reporter: "Marvs Medrano",
    url: "https://realwired.atlassian.net/browse/RWT-1162",
  },
  {
    key: "RWT-1313",
    summary: "When a scheduled job crashes, \"Run Scheduled Reports\" stays stuck for 24 hours and no scheduled reports go out",
    status: "Ready for Stage",
    priority: "High",
    category: "Bug",
    ageDays: 22,
    reporter: "Estevao",
    qaOwner: "Marvs Medrano",
    url: "https://realwired.atlassian.net/browse/RWT-1313",
  },
];

export const defectsPerDoneByMonth = [
  { month: "Jan 26", bugs: 7, done: 79, rate: 0.089 },
  { month: "Feb 26", bugs: 2, done: 111, rate: 0.018 },
  { month: "Mar 26", bugs: 25, done: 175, rate: 0.143 },
  { month: "Apr 26", bugs: 12, done: 232, rate: 0.052 },
  { month: "May 26", bugs: 14, done: 147, rate: 0.095 },
  { month: "Jun 26", bugs: 27, done: 172, rate: 0.157 },
  { month: "Jul 26", bugs: 42, done: 86, rate: 0.488 },
  { month: "Aug 26", bugs: 35, done: 117, rate: 0.299 },
  { month: "Sep 26", bugs: 39, done: 110, rate: 0.355 },
  { month: "Oct 26", bugs: 42, done: 227, rate: 0.185 },
  { month: "Nov 26", bugs: 19, done: 165, rate: 0.115 },
];

export const defectsPerDone = {
  ytdBugs: 264,
  ytdDone: 1594,
  ytdRate: 0.166,
  sepRate: 0.355,
  sprintBugsCreated: 4,
  sprintDone: 42,
  sprintRate: 0.095,
  sourceNote:
    'Jira REST Nov 20, 2026: product bugs created in period (bugsByMonth; epic RWT-1195 excluded, and November also excludes sample epic RWT-1504) ÷ issues with status CHANGED TO Done across YP, YCVC, RM, ARF, and RWT, Xray types excluded. YTD 264 ÷ 1,594 = 0.166. September 39 ÷ 110 = 0.355. October 42 ÷ 227 = 0.185. November, through the 20th, 19 ÷ 165 = 0.115. The 1,594 is the unique YTD CHANGED TO Done count, not the monthly sum. Sprint 44 moved 42 issues to Done by Nov 20; 4 product bugs were created after the sprint opened on Nov 16 at 8:03 AM ET, excluding epics RWT-1195 and RWT-1504. 4 ÷ 42 = 0.095. Project throughput on the overview is a separate RWT-only series.',
};

/**
 * YouConnect product defect volume — not escaped-to-prod.
 * Include: YP bugs + RWT bugs labeled YP or YC.
 * Exclude: MUFG / Onboarding labels, Vendor Circle (VC), ORM, Parachute
 * Standalone parent RWT-310, Vendor Circle parent RWT-224, ORM parent RWT-107,
 * documented infra keys.
 */
export const youConnectVolume = {
  bugs: 82,
  productBugsYtd: 264,
  sharePercent: 31.1,
  open: 25,
  unresolvedPercent: 30.5,
  ypCount: 20,
  rwtCount: 62,
  jql: `(project = YP OR (project = RWT AND labels in (YP, YC))) AND issuetype = Bug AND created >= "2026-01-01" AND created < "2026-11-21" AND labels not in (MUFG, Onboarding, VC, Standalone, ORM) AND (parent is EMPTY OR parent not in (RWT-310, RWT-224, RWT-107, RWT-1195, RWT-1504)) AND key not in (RWT-415, RWT-416, RWT-417, RWT-424, RWT-488, RWT-620, RWT-625, RWT-626, RWT-766, RWT-691, RWT-677, RWT-675) AND issuetype NOT IN ${XRAY}`,
  sourceNote:
    'Jira REST Nov 20, 2026: YouConnect product bugs = YP Bug tickets plus RWT Bugs labeled YP or YC (82 after documented infra, epic RWT-1195, and sample epic RWT-1504). Excludes MUFG and Onboarding labels, VC/Standalone/ORM labels, parents RWT-310 / RWT-224 / RWT-107 / RWT-1195 / RWT-1504, and documented infra. Jira `labels not in` also drops unlabeled YP bugs. YP 20, RWT 62. Share of the 264 YTD product-bug series = 82 ÷ 264 = 31.1%. Still not Done (status != Done) = 25 ÷ 82 = 30.5%. Not escaped-to-prod — Environment is empty.',
};

export const qaBounce = {
  enteredQaYtd: 524,
  bouncedYtd: 86,
  bounceRatePercent: 16.4,
  sprintInQa: 1,
  sprintReturnedToQa: 0,
  jql: `project in (${PROJECTS}) AND status WAS IN ("QA Ready", "QA In Progress") AFTER "2026-01-01" AND issuetype NOT IN ${XRAY}`,
  sourceNote:
    'Jira REST changelog Oct 30, 2026: 524 issues first entered QA Ready / QA In Progress in 2026. History records the lane as both "QA In Progress" and "QA in Progress"; both count. "Ready for QA" and "QA" do not. A bounce is a later return after leaving for any other column. Moving between the two QA statuses is not a bounce. Q1–Q3 include a return that left QA for Blocked or Hold. Q4 counts Hold and does not count a return that left QA for Blocked, from either QA Ready or QA In Progress. 86 bounced under that split (16.4%). Quarters: Q2 8/84, Q3 75/318, Q4 3/122 (RWT-780 and RWT-928 left for Ready for Stage; RWT-868 left QA Ready for Hold). Sprint 44 QA lane on Nov 20: 0 of 1 currently in QA is a return visit (RWT-953, QA Owner Alex Norwood; it entered QA Ready on Oct 8 and has not left the lane).',
};

/**
 * Rest of the YouConnect-share denominator. Jira REST Oct 30, 2026.
 * First match wins, and YouConnect is taken first so 9/34, 18/53, 43/116, and 6/39 stay exact.
 * Parachute: parent in (RWT-832, RWT-833, RWT-310), label Parachute or Standalone, or a
 * summary containing Parachute or AI Review. Vendor Circle: parent RWT-224, label VC, or
 * project YCVC. Customer banks: label CS. MUFG: label MUFG. Client self-serve: parent
 * RWT-60 or label ClientSelfServeCenter. Reporting: project RM or label RM. Onboarding:
 * label Onboarding. Other has none of those. Q4 includes the Oct 30 bugs RWT-1316,
 * RWT-1321, and RWT-1323, plus November product bugs through the 20th.
 */
const youConnectShareMix = {
  Q1: [
    { label: "Vendor Circle", count: 14 },
    { label: "YouConnect", count: 9 },
    { label: "Reporting", count: 6 },
    { label: "Other", count: 4 },
    { label: "Onboarding", count: 1 },
  ],
  Q2: [
    { label: "YouConnect", count: 18 },
    { label: "Client self-serve", count: 11 },
    { label: "Reporting", count: 9 },
    { label: "Vendor Circle", count: 5 },
    { label: "Other", count: 5 },
    { label: "Customer banks", count: 3 },
    { label: "Parachute", count: 1 },
    { label: "Onboarding", count: 1 },
  ],
  Q3: [
    { label: "YouConnect", count: 43 },
    { label: "Customer banks", count: 20 },
    { label: "Parachute", count: 16 },
    { label: "Vendor Circle", count: 15 },
    { label: "MUFG", count: 8 },
    { label: "Other", count: 8 },
    { label: "Client self-serve", count: 6 },
  ],
  Q4: [
    { label: "Parachute", count: 26 },
    { label: "YouConnect", count: 12 },
    { label: "Other", count: 10 },
    { label: "Customer banks", count: 8 },
    { label: "Vendor Circle", count: 5 },
  ],
};

function quarterPoint(
  label: KpiQuarter["label"],
  numeric: number,
  unit: "percent" | "days",
  note?: string,
): KpiQuarter {
  const rounded = Math.round(numeric * 10) / 10;
  const text = Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
  return {
    label,
    numeric: rounded,
    value: unit === "percent" ? `${text}%` : text,
    note: note ?? (label === "Q4" ? "through Nov 20" : undefined),
    current: label === "Q4",
  };
}

/**
 * Same five signals, split by quarter. Status ratios Jira REST Nov 20, 2026.
 * Open High and YouConnect use bugs created in the quarter.
 * Bounce uses the quarter a ticket first entered QA in 2026, last counted Oct 30.
 * Time in QA uses visits that started in the quarter and lasted at least an hour, last counted Oct 30.
 * Q4 status ratios run Oct 1–Nov 20. Bounce and time in QA stay Oct 1–30.
 * QA Ready / QA In Progress were unused before June, so Q1 bounce and time are empty.
 */
export const qualityQuarterCards: KpiCard[] = [
  {
    id: "open-high-quarter",
    label: "Open High / Highest",
    value: 0,
    quarters: [
      quarterPoint("Q1", (1 / 7) * 100, "percent"),
      quarterPoint("Q2", (10 / 19) * 100, "percent"),
      quarterPoint("Q3", (15 / 44) * 100, "percent"),
      quarterPoint("Q4", (9 / 36) * 100, "percent"),
    ],
    accent: "danger",
    subtext: "Still-open bugs created in the quarter",
  },
  {
    id: "youconnect-share-quarter",
    label: "YouConnect share",
    value: 31.4,
    quarters: [
      { ...quarterPoint("Q1", (9 / 34) * 100, "percent"), mix: youConnectShareMix.Q1 },
      { ...quarterPoint("Q2", (18 / 53) * 100, "percent"), mix: youConnectShareMix.Q2 },
      { ...quarterPoint("Q3", (43 / 116) * 100, "percent"), mix: youConnectShareMix.Q3 },
      { ...quarterPoint("Q4", (12 / 61) * 100, "percent"), mix: youConnectShareMix.Q4 },
    ],
    accent: "blue",
    subtext: "YouConnect defects among product bugs",
  },
  {
    id: "youconnect-open-quarter",
    label: "YouConnect still open",
    value: 30.3,
    quarters: [
      quarterPoint("Q1", 0, "percent"),
      quarterPoint("Q2", (1 / 18) * 100, "percent"),
      quarterPoint("Q3", (16 / 43) * 100, "percent"),
      quarterPoint("Q4", (8 / 12) * 100, "percent"),
    ],
    accent: "amber",
    subtext: "YouConnect bugs from the quarter not Done",
  },
  {
    id: "qa-bounce-quarter",
    label: "QA bounce-back",
    value: 0,
    quarters: [
      quarterPoint("Q1", 0, "percent"),
      quarterPoint("Q2", (8 / 84) * 100, "percent"),
      quarterPoint("Q3", (75 / 318) * 100, "percent"),
      {
        ...quarterPoint("Q4", (3 / 122) * 100, "percent", "Oct 1–30"),
        detail:
          "Left QA for any other column, then came back.",
      },
    ],
    accent: "amber",
    subtext: "Left QA, then came back.",
    lowerIsBetter: true,
    goal: { value: 10, label: "10%" },
  },
  {
    id: "time-in-qa-quarter",
    label: "Median time in QA",
    value: 1,
    unit: "days",
    quarters: [
      quarterPoint("Q1", 0, "days"),
      quarterPoint("Q2", 2, "days"),
      quarterPoint("Q3", 1.2, "days"),
      quarterPoint("Q4", 0.8, "days", "Oct 1–30"),
    ],
    accent: "violet",
    subtext: "Visits of 1 hour or more",
    change: -0.4,
    changeLabel: "from 1.2 days on Oct 2",
    trend: "down",
    lowerIsBetter: true,
  },
];

export const qualityQuarterSourceNote =
  'Jira REST Nov 20, 2026 for status ratios. Q4 status window is Oct 1–Nov 20. Bounce and median time in QA remain the Oct 30 changelog count, so those two Q4 notes still say Oct 1–30. Open High: product bugs created in the quarter, still status != Done, priority Highest or High, divided by all product bugs from that quarter still not Done. Epic RWT-1195, November sample epic RWT-1504, and infra keys are excluded (RWT-415, RWT-416, RWT-417, RWT-424, RWT-488, RWT-620, RWT-625, RWT-626, RWT-766, RWT-691, RWT-677, RWT-675). Q1 1/7, Q2 10/19, Q3 15/44, Q4 9/36 (RWT-960, RWT-1018, RWT-1161, RWT-1162, RWT-1313, RWT-1407, RWT-1528, RWT-1586, RWT-1590). Four of the 35 YTD open High/Highest are Won\'t Do (RWT-447, RWT-463, RWT-284, RWT-486). Q4 product bugs: created >= "2026-10-01" AND created < "2026-11-21" AND (parent is EMPTY OR parent not in (RWT-1195, RWT-1504)) AND the infra keys excluded = 61; 36 are status != Done. YouConnect share: YP bugs plus RWT bugs labeled YP or YC, excluding MUFG/Onboarding/VC/Standalone/ORM and parents RWT-310, RWT-224, RWT-107, RWT-1195, RWT-1504. Unlabeled YP bugs drop out because Jira `labels not in` does not match an empty labels field. Q1 9/34, Q2 18/53, Q3 43/116, Q4 12/61. YouConnect still open: Q1 0/9, Q2 1/18, Q3 16/43, Q4 8/12 (RWT-1188, RWT-1309, RWT-1313, RWT-1503, RWT-1520, RWT-1528, RWT-1590, RWT-1594). Bounce stays the Oct 30 changelog: cohorted by first 2026 entry into QA Ready / QA In Progress. Changelog uses both "QA In Progress" and "QA in Progress". "Ready for QA" and "QA" do not count. A bounce is a later return after leaving QA for any other column. Moving between the two QA statuses is not a bounce. Q1–Q3 include a return that left QA for Blocked or Hold. Q4 counts Hold and does not count a return that left QA for Blocked. Q1 0 (lane unused), Q2 8/84, Q3 75/318, Q4 3/122 (RWT-780, RWT-868, RWT-928). Median time stays the Oct 30 changelog: completed visits starting in the quarter and lasting ≥1 hour. Q1 none, Q2 2.0 days (n=44, median 47.8 hours), Q3 1.2 days (n=285, median 29.3 hours), Q4 0.8 days (n=117, median 18.9 hours). The time-in-QA change chip compares that October median with the Oct 2 report: the median then was 1.2 days and October visits are 0.8 days. YouConnect share mix uses the same product-bug denominator. First match wins, and YouConnect is taken first. Then Parachute (parent in (RWT-832, RWT-833, RWT-310), label Parachute or Standalone, or a summary containing Parachute or AI Review), Vendor Circle (parent RWT-224, label VC, or project YCVC), Customer banks (label CS), MUFG (label MUFG), Client self-serve (parent RWT-60 or label ClientSelfServeCenter), Reporting (project RM or label RM), Onboarding (label Onboarding). Other has none of those. Q1: 14 Vendor Circle, 9 YouConnect, 6 Reporting, 4 Other, 1 Onboarding (34). Q2: 18 YouConnect, 11 Client self-serve, 9 Reporting, 5 Vendor Circle, 5 Other, 3 Customer banks, 1 Parachute, 1 Onboarding (53). Q3: 43 YouConnect, 20 Customer banks, 16 Parachute, 15 Vendor Circle, 8 MUFG, 8 Other, 6 Client self-serve (116). Q4: 26 Parachute, 12 YouConnect, 10 Other, 8 Customer banks, 5 Vendor Circle (61).';

export const timeInQa = {
  completedVisits: 672,
  visitsAtLeastOneHour: 446,
  subMinuteVisits: 169,
  medianHoursAll: 6.4,
  medianHoursGe1h: 24.5,
  medianDaysGe1h: 1,
  sourceNote:
    'Jira REST changelog Oct 30, 2026 on issues that entered QA Ready / QA In Progress in 2026 (524). Time in QA = consecutive time in QA Ready / QA In Progress until the ticket left that lane. Median of 446 visits lasting ≥1 hour = 24.5 hours (1.0 days). 169 of 672 completed visits were sub-minute board clicks and are excluded from the median. resolutiondate is not used. medianHoursAll is the Oct 16 all-visits median and was not recomputed.',
};

export const postQaWait = {
  readyForStage: 25,
  readyForProd: 34,
  total: 59,
  highBugsInReadyForProd: 3,
  sourceNote:
    "Jira REST Nov 20, 2026: project = RWT AND sprint = 1967 AND issuetype NOT IN (\"Test\", \"Test Execution\", \"Test Plan\", \"Test Set\", \"Precondition\") AND status in (\"Ready for Stage\", \"Ready for PROD\") = 59 (25 Stage, 34 PROD). Three Ready for PROD tickets are High product bugs (RWT-861, RWT-788, RWT-705). Six more Ready for PROD tickets are Highest dependency bugs under epic RWT-1195 and are not in that product count of 3. RWT-1370, a Highest story, and RWT-1552, a Highest task, are Ready for PROD. RWT-1091, a Highest story, is Ready for Stage. QA Owner is set on 39 of these 59. Eight Ready for PROD tickets are labeled NoQAReq.",
};

/** Sprint 44 tickets already past QA — Ready for Stage, then Ready for PROD. */
export const postQaWaitTickets: QualityTicket[] = [
  {
    key: "RWT-1091",
    summary: "Oxford Group — Add configurable Team visibility to Property records (enabled for Oxford)",
    status: "Ready for Stage",
    category: "Story",
    priority: "Highest",
    qaOwner: "Chester Cabia",
    url: "https://realwired.atlassian.net/browse/RWT-1091",
  },
  {
    key: "RWT-1196",
    summary: "SQL injection in unauthenticated getDocument entry point",
    status: "Ready for Stage",
    category: "Bug",
    priority: "Highest",
    qaOwner: "Marvs Medrano",
    url: "https://realwired.atlassian.net/browse/RWT-1196",
  },
  {
    key: "RWT-1313",
    summary: "When a scheduled job crashes, \"Run Scheduled Reports\" stays stuck for 24 hours and no scheduled reports go out",
    status: "Ready for Stage",
    category: "Bug",
    priority: "High",
    qaOwner: "Marvs Medrano",
    url: "https://realwired.atlassian.net/browse/RWT-1313",
  },
  {
    key: "RWT-134",
    summary: "Vendor Circle: Vendor Merge — scope & implement (ref YCVC-896)",
    status: "Ready for Stage",
    category: "Task",
    priority: "Medium",
    qaOwner: "Marvs Medrano",
    url: "https://realwired.atlassian.net/browse/RWT-134",
  },
  {
    key: "RWT-136",
    summary: "Vendor Circle: Invite/Connect manually-added vendor — edge cases (ref YCVC-916)",
    status: "Ready for Stage",
    category: "Task",
    priority: "Medium",
    qaOwner: "Marvs Medrano",
    url: "https://realwired.atlassian.net/browse/RWT-136",
  },
  {
    key: "RWT-1384",
    summary: "1-Step Requests: Cancelling the Review Assignment Should Return to In Process/--/Requested",
    status: "Ready for Stage",
    category: "Story",
    priority: "High",
    qaOwner: "Chester Cabia",
    url: "https://realwired.atlassian.net/browse/RWT-1384",
  },
  {
    key: "RWT-1433",
    summary: "Request reupload actions: Reupload Report, Reupload Report and Invoice and Reupload Invoice run from a plain GET link with no CSRF token and no role check (every bank)",
    status: "Ready for Stage",
    category: "Bug",
    priority: "Medium",
    qaOwner: "Marvs Medrano",
    url: "https://realwired.atlassian.net/browse/RWT-1433",
  },
  {
    key: "RWT-206",
    summary: "Vendor Record Merge in YouConnect (CS tool)",
    status: "Ready for Stage",
    category: "Story",
    priority: "High",
    qaOwner: "Chester Cabia",
    url: "https://realwired.atlassian.net/browse/RWT-206",
  },
  {
    key: "RWT-207",
    summary: "Vendor Type Record Merge in YouConnect (CS tool)",
    status: "Ready for Stage",
    category: "Story",
    priority: "High",
    qaOwner: "Marvs Medrano",
    url: "https://realwired.atlassian.net/browse/RWT-207",
  },
  {
    key: "RWT-214",
    summary: "Vendor Circle: Restore ignored pending invites to VC Search (hide=1 invites are currently unrecoverable)",
    status: "Ready for Stage",
    category: "Task",
    priority: "Medium",
    qaOwner: "Marvs Medrano",
    url: "https://realwired.atlassian.net/browse/RWT-214",
  },
  {
    key: "RWT-270",
    summary: "Add \"AI Review Fee\" field to Review Type Setup (YC/SugarCRM) — include in Total Fee (behaves like Review Fee)",
    status: "Ready for Stage",
    category: "Story",
    priority: "Medium",
    qaOwner: "Chester Cabia",
    url: "https://realwired.atlassian.net/browse/RWT-270",
  },
  {
    key: "RWT-273",
    summary: "YC: Add AI Review Fee field to Bank Configuration → Add-on config (AI Review Forms section)",
    status: "Ready for Stage",
    category: "Story",
    priority: "Medium",
    qaOwner: "Chester Cabia",
    url: "https://realwired.atlassian.net/browse/RWT-273",
  },
  {
    key: "RWT-274",
    summary: "YC/Studio: Create \"AI Review Fee\" Currency field on the Request module (Admin Studio) for drag-and-drop into pages",
    status: "Ready for Stage",
    category: "Story",
    priority: "Medium",
    qaOwner: "Chester Cabia",
    url: "https://realwired.atlassian.net/browse/RWT-274",
  },
  {
    key: "RWT-275",
    summary: "YC: Include AI Review Fee in the Fee Quote breakdown / \"Additional Details\" tooltip (Vendor Bid Response)",
    status: "Ready for Stage",
    category: "Story",
    priority: "Medium",
    qaOwner: "Chester Cabia",
    url: "https://realwired.atlassian.net/browse/RWT-275",
  },
  {
    key: "RWT-315",
    summary: "Vendor Circle — \"Send for Review\" (external review) bids do not appear in the vendor's \"My Bids\" tab",
    status: "Ready for Stage",
    category: "Bug",
    priority: "Medium",
    qaOwner: "Marvs Medrano",
    url: "https://realwired.atlassian.net/browse/RWT-315",
  },
  {
    key: "RWT-326",
    summary: "Vendor Circle – Documents replaced via the Vendor Updates tab are not retained in the vendor history panel",
    status: "Ready for Stage",
    category: "Bug",
    priority: "High",
    qaOwner: "Chester Cabia",
    url: "https://realwired.atlassian.net/browse/RWT-326",
  },
  {
    key: "RWT-368",
    summary: "VBR panel Reconciled Grade reads from Vendor Record, not Vendor Type Record — stale grade platform-wide",
    status: "Ready for Stage",
    category: "Bug",
    priority: "High",
    qaOwner: "eve",
    url: "https://realwired.atlassian.net/browse/RWT-368",
  },
  {
    key: "RWT-396",
    summary: "Vendor Circle – Coverage-area email says \"changeds\" and tells banks to add counties to a YouConnect list that doesn't exist",
    status: "Ready for Stage",
    category: "Bug",
    priority: "Medium",
    qaOwner: "Marvs Medrano",
    url: "https://realwired.atlassian.net/browse/RWT-396",
  },
  {
    key: "RWT-405",
    summary: "Add a \"Pre-Assign Reviewer\" option to the Edit dropdown to populate the Reviewer field with an Internal Reviewer before the review stage",
    status: "Ready for Stage",
    category: "Story",
    priority: "Medium",
    qaOwner: "Marvs Medrano",
    url: "https://realwired.atlassian.net/browse/RWT-405",
  },
  {
    key: "RWT-451",
    summary: "User record — record every field change in the Change Log (fleet-wide)",
    status: "Ready for Stage",
    category: "Story",
    priority: "High",
    qaOwner: "Chester Cabia",
    url: "https://realwired.atlassian.net/browse/RWT-451",
  },
  {
    key: "RWT-546",
    summary: "KReports scheduler: catch(Error) never clears the 'P' status, causing infinite retry and permanent starvation of all later reports (kschedulingcronhandler.php:147-149)",
    status: "Ready for Stage",
    category: "Bug",
    priority: "High",
    qaOwner: "eve",
    url: "https://realwired.atlassian.net/browse/RWT-546",
  },
  {
    key: "RWT-574",
    summary: "KReports scheduler: failed report emails are saved as status='sent' — Send() return value discarded and $exceptions never enabled (kschedulingcronhandler.php:331-350)",
    status: "Ready for Stage",
    category: "Bug",
    priority: "High",
    qaOwner: "eve",
    url: "https://realwired.atlassian.net/browse/RWT-574",
  },
  {
    key: "RWT-829",
    summary: "Reupload a Report — add an optional status rollback that returns the request to In Progress / Engaged / Order Accepted and clears Date Original Report Received",
    status: "Ready for Stage",
    category: "Story",
    priority: "Medium",
    qaOwner: "eve",
    url: "https://realwired.atlassian.net/browse/RWT-829",
  },
  {
    key: "RWT-927",
    summary: "Vendor Circle admin: Vendor Merge page has no navigation link, reachable only by typing /admin/vendor-merge (circle-dev, RWT-134)",
    status: "Ready for Stage",
    category: "Bug",
    priority: "Medium",
    qaOwner: "Marvs Medrano",
    url: "https://realwired.atlassian.net/browse/RWT-927",
  },
  {
    key: "RWT-962",
    summary: "Administrative Template Customizer: AI Review template integration",
    status: "Ready for Stage",
    category: "Task",
    priority: "Medium",
    qaOwner: "Marvs Medrano",
    url: "https://realwired.atlassian.net/browse/RWT-962",
  },
  {
    key: "RWT-1090",
    summary: "Administrative template editor: hide the 'Upload .json' control for now",
    status: "Ready for PROD",
    category: "Story",
    priority: "Medium",
    qaOwner: "eve",
    url: "https://realwired.atlassian.net/browse/RWT-1090",
  },
  {
    key: "RWT-1168",
    summary: "fix and improve YC deployment automation",
    status: "Ready for PROD",
    category: "Story",
    priority: "Medium",
    url: "https://realwired.atlassian.net/browse/RWT-1168",
  },
  {
    key: "RWT-1176",
    summary: "Zions Bancorporation — vendor on vc needs email & company name changed",
    status: "Ready for PROD",
    category: "Task",
    priority: "High",
    url: "https://realwired.atlassian.net/browse/RWT-1176",
  },
  {
    key: "RWT-1188",
    summary: "Developers can't regenerate minified JavaScript from its source, and nothing catches copies that disagree",
    status: "Ready for PROD",
    category: "Bug",
    priority: "Medium",
    url: "https://realwired.atlassian.net/browse/RWT-1188",
  },
  {
    key: "RWT-1189",
    summary: "Vendor Circle Vendor Merge: John Blaser",
    status: "Ready for PROD",
    category: "Task",
    priority: "Medium",
    noQaRequired: true,
    url: "https://realwired.atlassian.net/browse/RWT-1189",
  },
  {
    key: "RWT-1260",
    summary: "Critical dependency vulnerability: cakephp/database >= 5.2.0, < 5.2.14 (CVE-2026-79752) — Dependabot #135",
    status: "Ready for PROD",
    category: "Bug",
    priority: "Highest",
    url: "https://realwired.atlassian.net/browse/RWT-1260",
  },
  {
    key: "RWT-1261",
    summary: "Critical dependency vulnerability: cakephp/database >= 5.2.0, < 5.2.15 (CVE-2026-77635) — Dependabot #133",
    status: "Ready for PROD",
    category: "Bug",
    priority: "Highest",
    url: "https://realwired.atlassian.net/browse/RWT-1261",
  },
  {
    key: "RWT-1262",
    summary: "Critical dependency vulnerability: @babel/traverse < 7.23.2 (CVE-2023-45133) — Dependabot #31",
    status: "Ready for PROD",
    category: "Bug",
    priority: "Highest",
    url: "https://realwired.atlassian.net/browse/RWT-1262",
  },
  {
    key: "RWT-1263",
    summary: "Critical dependency vulnerability: minimist < 0.2.4 (CVE-2021-44906) — Dependabot #27",
    status: "Ready for PROD",
    category: "Bug",
    priority: "Highest",
    url: "https://realwired.atlassian.net/browse/RWT-1263",
  },
  {
    key: "RWT-1264",
    summary: "Critical dependency vulnerability: minimist >= 1.0.0, < 1.2.6 (CVE-2021-44906) — Dependabot #26",
    status: "Ready for PROD",
    category: "Bug",
    priority: "Highest",
    url: "https://realwired.atlassian.net/browse/RWT-1264",
  },
  {
    key: "RWT-1265",
    summary: "Critical dependency vulnerability: set-value < 2.0.1 (CVE-2019-10747) — Dependabot #1",
    status: "Ready for PROD",
    category: "Bug",
    priority: "Highest",
    url: "https://realwired.atlassian.net/browse/RWT-1265",
  },
  {
    key: "RWT-1309",
    summary: "Vendor Updates still created for non-monitored vendors after Monitor Credentials changes (CircleWorker uses cached BankConfig)",
    status: "Ready for PROD",
    category: "Bug",
    priority: "Medium",
    qaOwner: "Chester Cabia",
    url: "https://realwired.atlassian.net/browse/RWT-1309",
  },
  {
    key: "RWT-1370",
    summary: "Preserve Discussions When the Reviewer Is Changed on a Request",
    status: "Ready for PROD",
    category: "Story",
    priority: "Highest",
    qaOwner: "eve",
    url: "https://realwired.atlassian.net/browse/RWT-1370",
  },
  {
    key: "RWT-1413",
    summary: "Woodforest — Vendor Circle Merge",
    status: "Ready for PROD",
    category: "Task",
    priority: "High",
    noQaRequired: true,
    url: "https://realwired.atlassian.net/browse/RWT-1413",
  },
  {
    key: "RWT-1417",
    summary: "SouthState — Vendor Circle - Multiple Vendor Merge",
    status: "Ready for PROD",
    category: "Task",
    priority: "Medium",
    noQaRequired: true,
    url: "https://realwired.atlassian.net/browse/RWT-1417",
  },
  {
    key: "RWT-1552",
    summary: "Vendor Email Update – Adam Perutelli and Mike Ashworth",
    status: "Ready for PROD",
    category: "Task",
    priority: "Highest",
    noQaRequired: true,
    url: "https://realwired.atlassian.net/browse/RWT-1552",
  },
  {
    key: "RWT-253",
    summary: "YC: Search Circle by Coverage Area (national, state, counties)",
    status: "Ready for PROD",
    category: "Story",
    priority: "Medium",
    url: "https://realwired.atlassian.net/browse/RWT-253",
  },
  {
    key: "RWT-390",
    summary: "My Comments Dashlet: duplicate rows push real comments off the list (restructure the query)",
    status: "Ready for PROD",
    category: "Bug",
    priority: "Medium",
    qaOwner: "Chester Cabia",
    url: "https://realwired.atlassian.net/browse/RWT-390",
  },
  {
    key: "RWT-487",
    summary: "Security: expire Initial/Update Vendor Credential email links after 30 days, and immediately when the vendor is Rejected or otherwise blocked",
    status: "Ready for PROD",
    category: "Task",
    priority: "High",
    qaOwner: "Chester Cabia",
    url: "https://realwired.atlassian.net/browse/RWT-487",
  },
  {
    key: "RWT-616",
    summary: "S&T Bank (applies to all clients) — add Prior Appraisal Value and Prior Appraised Date to the do-not-clone field list used by Copy All in Request Wizard Portfolio mode (ZD 8689)",
    status: "Ready for PROD",
    category: "Bug",
    priority: "Medium",
    qaOwner: "eve",
    url: "https://realwired.atlassian.net/browse/RWT-616",
  },
  {
    key: "RWT-690",
    summary: "Citizens Business Bank — Vendor Profile History panel: forwarded email's \"To\" address is replaced with the vendor's email and the send fails (regression since ~8/25/26)",
    status: "Ready for PROD",
    category: "Bug",
    priority: "Medium",
    qaOwner: "eve",
    url: "https://realwired.atlassian.net/browse/RWT-690",
  },
  {
    key: "RWT-705",
    summary: "Download entry points that bypass authentication or the download token",
    status: "Ready for PROD",
    category: "Bug",
    priority: "High",
    url: "https://realwired.atlassian.net/browse/RWT-705",
  },
  {
    key: "RWT-788",
    summary: "Overall Grade (Weighted) does not calculate when a review is completed by an external review vendor",
    status: "Ready for PROD",
    category: "Bug",
    priority: "High",
    qaOwner: "Marvs Medrano",
    url: "https://realwired.atlassian.net/browse/RWT-788",
  },
  {
    key: "RWT-817",
    summary: "Bulk Bid: add the Comment to LO column to the Vendor Bulk Solicitation/Bid Responses panel (JM & LO view)",
    status: "Ready for PROD",
    category: "Story",
    priority: "High",
    qaOwner: "Chester Cabia",
    url: "https://realwired.atlassian.net/browse/RWT-817",
  },
  {
    key: "RWT-861",
    summary: "External review re-submitted via Review Submission web form after Reopen Review does not preserve the prior review (not moved to Original Review or History)",
    status: "Ready for PROD",
    category: "Bug",
    priority: "High",
    qaOwner: "Chester Cabia",
    url: "https://realwired.atlassian.net/browse/RWT-861",
  },
  {
    key: "RWT-863",
    summary: "Enterprise Bank & Trust — JM/Reviewer Discussion comments not displaying in Detail view (recurrence of YP-2473, Request 5777)",
    status: "Ready for PROD",
    category: "Bug",
    priority: "Medium",
    qaOwner: "Marvs Medrano",
    url: "https://realwired.atlassian.net/browse/RWT-863",
  },
  {
    key: "RWT-887",
    summary: "Stock Yards Bank & Trust — Vendor Status panel not valid",
    status: "Ready for PROD",
    category: "Bug",
    priority: "Medium",
    qaOwner: "eve",
    url: "https://realwired.atlassian.net/browse/RWT-887",
  },
  {
    key: "RWT-889",
    summary: "Stop sending expired-credential emails to vendors whose updated credentials are awaiting bank review in Vendor Circle",
    status: "Ready for PROD",
    category: "Bug",
    priority: "Medium",
    qaOwner: "Marvs Medrano",
    url: "https://realwired.atlassian.net/browse/RWT-889",
  },
  {
    key: "RWT-898",
    summary: "Vendor Circle Vendor Merge",
    status: "Ready for PROD",
    category: "Bug",
    priority: "Medium",
    noQaRequired: true,
    url: "https://realwired.atlassian.net/browse/RWT-898",
  },
  {
    key: "RWT-911",
    summary: "Stock Yards Bank & Trust — Vendor bid response comment made on 'view' in the VBR panel",
    status: "Ready for PROD",
    category: "Story",
    priority: "Low",
    url: "https://realwired.atlassian.net/browse/RWT-911",
  },
  {
    key: "RWT-912",
    summary: "Vendor Circle Vendor Account Merge",
    status: "Ready for PROD",
    category: "Task",
    priority: "Medium",
    noQaRequired: true,
    url: "https://realwired.atlassian.net/browse/RWT-912",
  },
  {
    key: "RWT-915",
    summary: "Vendor Circle Vendor Email Update",
    status: "Ready for PROD",
    category: "Task",
    priority: "Medium",
    noQaRequired: true,
    url: "https://realwired.atlassian.net/browse/RWT-915",
  },
  {
    key: "RWT-921",
    summary: "Vendor Circle Vendor Merge",
    status: "Ready for PROD",
    category: "Task",
    priority: "Medium",
    noQaRequired: true,
    url: "https://realwired.atlassian.net/browse/RWT-921",
  },
  {
    key: "RWT-979",
    summary: "Log vendor credential override changes in the main vendor record change log",
    status: "Ready for PROD",
    category: "Bug",
    priority: "Medium",
    qaOwner: "eve",
    url: "https://realwired.atlassian.net/browse/RWT-979",
  },
];
