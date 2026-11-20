import type { AutomationRunResult, AutomationRunSpec } from "./metrics";

export type PlaywrightRunSnapshot = {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  environment: string;
  startedAt: string;
  durationMin: number;
  totalTests: number;
  passed: number;
  failed: number;
  flaky: number;
  skipped: number;
  passRatePercent: number;
  passRateNote: string;
  updateNote: string;
  failureBreakdown: { count: number; label: string; detail: string }[];
  flakyNote: string;
  reportSource: string;
  suites: AutomationRunResult[];
  specs: AutomationRunSpec[];
};

/** Earlier full regressions on stage. Newest of these is still older than the latest run in metrics.ts. */
export const earlierPlaywrightRuns: PlaywrightRunSnapshot[] = [
  {
    "id": "38530331863",
    "label": "14 Oct 2026, 07:45 UTC · 97.1% · 5 failed",
    "title": "YouConnect — Playwright Run",
    "subtitle": "Full regression suite · CI mode · headless · Chromium · 1 retry",
    "environment": "stage.realwired.com",
    "startedAt": "2026-10-14 07:45 UTC",
    "durationMin": 158.9,
    "totalTests": 273,
    "passed": 265,
    "failed": 5,
    "flaky": 3,
    "skipped": 0,
    "passRatePercent": 97.1,
    "passRateNote": "265/273 executed (skipped omitted)",
    "updateNote": "Full regression on stage, 14 Oct 2026 (GitHub Actions run 38530331863). 5 failures. 3 are the same known bugs, RWT-497 and RWT-314. Parachute standalone is still not configured on stage. Transaction Report file 9843 shows Vendor Fee 1234.56 while the request fee fields are blank. Two known defects stay quarantined and count as passed: sorting the Emails list by To, and the Vendor Letters post-delete redirect.",
    "failureBreakdown": [
      {
        "count": 3,
        "label": "Known bugs — 2 tickets",
        "detail": "RWT-497: Loan Officer still gets an Order ERIS button on a Property with no modal (1 test). RWT-314: Zip County Basic and Advanced Search still return no rows (2 tests)."
      },
      {
        "count": 1,
        "label": "Stage not configured",
        "detail": "Parachute standalone switch: the API URL field still reads \"Not configured on this server. The switch cannot be turned on.\""
      },
      {
        "count": 1,
        "label": "Transaction Report fee",
        "detail": "File 9843 Vendor Fee is 1234.56 on the report and 0 on the request (partial fee and fee quote are blank). The test says that can be benign when the request is a BWM order."
      }
    ],
    "flakyNote": "3 recovered on retry — zip create/edit/delete (the record was slow to appear), Revision Report Submission (the page closed mid-click), and two-step reject (the Loan Officer rejection email was missing on the first attempt).",
    "reportSource": "GitHub Actions run 38530331863 · results.json · https://github.com/RealWired/YouConnect/actions/runs/38530331863",
    "suites": [
      {
        "suite": "Request Lifecycle",
        "passed": 49,
        "failed": 0,
        "flaky": 2,
        "skipped": 0,
        "passRate": 96,
        "date": "Oct 14 2026",
        "source": "CI · stage.realwired.com",
        "status": "unstable",
        "note": "Two-step reject and Revision Report Submission both recovered on retry"
      },
      {
        "suite": "Authentication",
        "passed": 21,
        "failed": 0,
        "flaky": 0,
        "skipped": 0,
        "passRate": 100,
        "date": "Oct 14 2026",
        "source": "CI · stage.realwired.com",
        "status": "passing",
        "note": "Admin, JM, and LO setup passed"
      },
      {
        "suite": "General Settings",
        "passed": 2,
        "failed": 1,
        "flaky": 0,
        "skipped": 0,
        "passRate": 67,
        "date": "Oct 14 2026",
        "source": "CI · stage.realwired.com",
        "status": "unstable",
        "note": "Default Filter By Status passed. Parachute standalone is still not configured on stage"
      },
      {
        "suite": "Module regression",
        "passed": 193,
        "failed": 4,
        "flaky": 1,
        "skipped": 0,
        "passRate": 97,
        "date": "Oct 14 2026",
        "source": "CI · stage.realwired.com",
        "status": "unstable",
        "note": "3 tests are RWT-497 and RWT-314. Transaction Report file 9843 Vendor Fee does not match the request. Zip create/edit/delete recovered on retry"
      }
    ],
    "specs": [
      {
        "file": "modules/zip-code-management/zip-code-management-regression.spec.js",
        "passed": 3,
        "failed": 2,
        "flaky": 1,
        "skipped": 0,
        "note": "RWT-314 canaries — Zip County Basic and Advanced Search still return no rows. Create/edit/delete recovered on retry"
      },
      {
        "file": "GeneralSettings/ParachuteStandaloneSwitch.spec.js",
        "passed": 0,
        "failed": 1,
        "flaky": 0,
        "skipped": 0,
        "note": "Stage API URL still reads \"Not configured on this server. The switch cannot be turned on.\""
      },
      {
        "file": "modules/k-reports/transaction-report.spec.js",
        "passed": 3,
        "failed": 1,
        "flaky": 0,
        "skipped": 0,
        "note": "File 9843 Vendor Fee is 1234.56 on the report and 0 on the request. The test says that can be benign when the request is a BWM order"
      },
      {
        "file": "modules/eris-report/eris-report-smoke.spec.js",
        "passed": 7,
        "failed": 1,
        "flaky": 0,
        "skipped": 0,
        "note": "RWT-497 canary still red — Loan Officer Order button renders, but the modal handler is missing"
      },
      {
        "file": "request-lifecycle/report-review/report-disputedANDcorrections.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 1,
        "skipped": 0,
        "note": "Revision Report Submission recovered on retry — the page closed mid-click on a vendor link"
      },
      {
        "file": "request-lifecycle/request-actions/reject-request-twostep.spec.js",
        "passed": 0,
        "failed": 0,
        "flaky": 1,
        "skipped": 0,
        "note": "Two-step reject recovered on retry — the first attempt did not find the Loan Officer rejection email"
      },
      {
        "file": "GeneralSettings/DefaultFilterByStatus.spec.js",
        "passed": 2,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "auth/forgot-password.spec.js",
        "passed": 7,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "auth/forgot-username.spec.js",
        "passed": 7,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "auth/login.spec.js",
        "passed": 4,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "fixtures/auth.setup.admin.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "fixtures/auth.setup.job-manager.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "fixtures/auth.setup.loan-officer.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/View-Edit-properties/View_Edit_Properties.spec.js",
        "passed": 6,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/api-accounts/api-accounts-crud-smoke.spec.js",
        "passed": 9,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/bank-holidays/bank-holidays-crud-smoke.spec.js",
        "passed": 5,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/bank-holidays/bank-holidays-search-smoke.spec.js",
        "passed": 5,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/bulk-bid/bulk-bid-lifecycle.spec.js",
        "passed": 4,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/comments/comments-thread-presence-smoke.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/comments/comments-thread-smoke.spec.js",
        "passed": 3,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/data-msa/data-msa-crud-smoke.spec.js",
        "passed": 6,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/documents/documents-create-validation.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/documents/documents-lifecycle-smoke.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/emails/emails-access-gate.spec.js",
        "passed": 3,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/emails/emails-history-subpanel.spec.js",
        "passed": 6,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/emails/emails-list-smoke.spec.js",
        "passed": 10,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/emails/emails-resend-wiring.spec.js",
        "passed": 8,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/geocode-status/geocode-status-list-search.spec.js",
        "passed": 14,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/geocode-status/geocode-status-vendor-lifecycle.spec.js",
        "passed": 2,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/k-reports/k-reports-crud.spec.js",
        "passed": 10,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/k-reports/k-reports-search.spec.js",
        "passed": 5,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/k-reports/k-reports-smoke.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/market-area/market-area-crud-smoke.spec.js",
        "passed": 6,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/notes/notes-crud.spec.js",
        "passed": 8,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/notes/notes-search-indexing.spec.js",
        "passed": 5,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/notes/notes-sorting.spec.js",
        "passed": 4,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/password-management/password-management-load-smoke.spec.js",
        "passed": 4,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/password-management/password-management-save-smoke.spec.js",
        "passed": 2,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/report-summaries/report-summaries-crud.spec.js",
        "passed": 7,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/solicitation/solicitation-detail-smoke.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/solicitation/solicitation-list-search-smoke.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/st-appraisal/request-list-advanced-search.spec.js",
        "passed": 2,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/st-appraisal/request-list-detail-smoke.spec.js",
        "passed": 2,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/st-appraisal/request-list-smoke.spec.js",
        "passed": 4,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/st-appraisal/request-list-sort-smoke.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/st-field-templates/st-field-templates-advanced-search.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/st-field-templates/st-field-templates-crud.spec.js",
        "passed": 2,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/st-field-templates/st-field-templates-request-integration.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/st-field-templates/st-field-templates-smoke.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/st-logical-routing/logical-routing-crud.spec.js",
        "passed": 6,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/st-logical-routing/logical-routing-duplicate-guard.spec.js",
        "passed": 3,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/user-management/group-users-crud.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/user-management/role-permissions-enforcement.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/user-management/role-permissions.spec.js",
        "passed": 2,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/user-management/roles-crud.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/user-management/users-crud.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/user-management/users-deactivate.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/user-management/users-list-search.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/vendor-letters/vendor-letters-crud-smoke.spec.js",
        "passed": 5,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/vendor-letters/vendor-letters-preview-smoke.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/vendor/vendor-create-edit-smoke.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/vendor/vendor-create-validation.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/vendor/vendor-search-smoke.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/vendor/vendor-solicitation-visibility.spec.js",
        "passed": 2,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "request-lifecycle/cancel-engagement/cancel-enagement.spec.js",
        "passed": 3,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "request-lifecycle/report-review/report-review-acceptance.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "request-lifecycle/report-review/report-review-approval.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "request-lifecycle/report-review/report-review-completion.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "request-lifecycle/report-review/report-review.spec.js",
        "passed": 5,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "request-lifecycle/report-review/request-complete.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "request-lifecycle/report-submission/report-deliverydate-revised.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "request-lifecycle/report-submission/report-submission.spec.js",
        "passed": 2,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "request-lifecycle/request-actions/accept-request-onestep.spec.js",
        "passed": 3,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "request-lifecycle/request-actions/accept-request-twostep.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "request-lifecycle/request-creation-wizard/request-creation.spec.js",
        "passed": 3,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "request-lifecycle/request-list/request-review.spec.js",
        "passed": 7,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "request-lifecycle/vendor-solicitation/vendor-solicitation-a.spec.js",
        "passed": 5,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "request-lifecycle/vendor-solicitation/vendor-solicitation-b.spec.js",
        "passed": 5,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "request-lifecycle/vendor-solicitation/vendor-solicitation-c.spec.js",
        "passed": 5,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "request-lifecycle/vendor-solicitation/vendor-solicitation-d.spec.js",
        "passed": 4,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      }
    ]
  },
  {
    "id": "36740178925",
    "label": "30 Sep 2026, 15:55 UTC · 97.1% · 6 failed",
    "title": "YouConnect — Playwright Run",
    "subtitle": "Full regression suite · CI mode · headless · Chromium · 1 retry",
    "environment": "stage.realwired.com",
    "startedAt": "2026-09-30 15:55 UTC",
    "durationMin": 190.1,
    "totalTests": 299,
    "passed": 271,
    "failed": 6,
    "flaky": 2,
    "skipped": 20,
    "passRatePercent": 97.1,
    "passRateNote": "271/279 executed (excluding skipped)",
    "updateNote": "Full regression on stage, 30 Sep 2026 (GitHub Actions run 36740178925). 6 failures. 3 are the same known bugs, RWT-497 and RWT-314. 1 is the new Parachute standalone switch: stage has no API URL configured. API Accounts CRUD timed out, and a two-step reject left the request Submitted.",
    "failureBreakdown": [
      {
        "count": 3,
        "label": "Known bugs — 2 tickets",
        "detail": "RWT-497: Loan Officer still gets an Order ERIS button on a Property with no modal (1 test). RWT-314: Zip County Basic and Advanced Search still return no rows (2 tests)."
      },
      {
        "count": 1,
        "label": "Stage not configured",
        "detail": "Parachute standalone switch: the API URL field reads \"Not configured on this server. The switch cannot be turned on.\" The other 5 tests in that spec are serial, so they were skipped."
      },
      {
        "count": 2,
        "label": "Did not finish on stage",
        "detail": "API Accounts full CRUD timed out loading the list (the other 8 tests in that spec passed). Two-step reject (YP-1362) left the request status Submitted; the test expected Not Submitted."
      }
    ],
    "flakyNote": "2 recovered on retry — zip create/edit/delete (the empty-search message was slow) and Review Approval (the page closed mid-click).",
    "reportSource": "GitHub Actions run 36740178925 · results.json · https://github.com/RealWired/YouConnect/actions/runs/36740178925",
    "suites": [
      {
        "suite": "Request Lifecycle",
        "passed": 49,
        "failed": 1,
        "flaky": 1,
        "skipped": 0,
        "passRate": 96,
        "date": "Sep 30 2026",
        "source": "CI · stage.realwired.com",
        "status": "unstable",
        "note": "Two-step reject stayed Submitted (expected Not Submitted). Review Approval recovered on retry"
      },
      {
        "suite": "Authentication",
        "passed": 21,
        "failed": 0,
        "flaky": 0,
        "skipped": 2,
        "passRate": 100,
        "date": "Sep 30 2026",
        "source": "CI · stage.realwired.com",
        "status": "passing",
        "note": "Admin, JM, and LO setup passed · 2 skipped (invalid password, lockout)"
      },
      {
        "suite": "General Settings",
        "passed": 2,
        "failed": 1,
        "skipped": 5,
        "passRate": 67,
        "date": "Sep 30 2026",
        "source": "CI · stage.realwired.com",
        "status": "unstable",
        "note": "Default Filter By Status passed. Parachute standalone is not configured on stage, so its serial tests did not run"
      },
      {
        "suite": "Module regression",
        "passed": 199,
        "failed": 4,
        "flaky": 1,
        "skipped": 13,
        "passRate": 98,
        "date": "Sep 30 2026",
        "source": "CI · stage.realwired.com",
        "status": "unstable",
        "note": "3 tests are RWT-497 and RWT-314. API Accounts CRUD timed out. Bulk bid send/cancel was skipped (opt-in)"
      }
    ],
    "specs": [
      {
        "file": "modules/zip-code-management/zip-code-management-regression.spec.js",
        "passed": 3,
        "failed": 2,
        "flaky": 1,
        "skipped": 0,
        "note": "RWT-314 canaries — Zip County Basic and Advanced Search still return no rows. Create/edit/delete recovered on retry"
      },
      {
        "file": "GeneralSettings/ParachuteStandaloneSwitch.spec.js",
        "passed": 0,
        "failed": 1,
        "flaky": 0,
        "skipped": 5,
        "note": "Stage API URL reads \"Not configured on this server.\" The other 5 tests are serial and did not run"
      },
      {
        "file": "modules/api-accounts/api-accounts-crud-smoke.spec.js",
        "passed": 8,
        "failed": 1,
        "flaky": 0,
        "skipped": 0,
        "note": "Full CRUD timed out loading the API Accounts list. The other 8 tests in this spec passed"
      },
      {
        "file": "modules/eris-report/eris-report-smoke.spec.js",
        "passed": 7,
        "failed": 1,
        "flaky": 0,
        "skipped": 0,
        "note": "RWT-497 canary still red — Loan Officer Order button renders, but the modal handler is missing"
      },
      {
        "file": "request-lifecycle/request-actions/reject-request-twostep.spec.js",
        "passed": 0,
        "failed": 1,
        "flaky": 0,
        "skipped": 0,
        "note": "Reject left the request status Submitted; the test expected Not Submitted"
      },
      {
        "file": "request-lifecycle/report-review/report-review-approval.spec.js",
        "passed": 0,
        "failed": 0,
        "flaky": 1,
        "skipped": 0,
        "note": "Review Approval recovered on retry — the page closed mid-click"
      },
      {
        "file": "modules/bulk-bid/bulk-bid-send-cancel-lifecycle.spec.js",
        "passed": 0,
        "failed": 0,
        "flaky": 0,
        "skipped": 8,
        "note": "Skipped — opt-in only. The chain mutates shared stage data and did not run in this CI job"
      },
      {
        "file": "auth/login.spec.js",
        "passed": 4,
        "failed": 0,
        "flaky": 0,
        "skipped": 2,
        "note": "2 skipped (invalid password, lockout)"
      },
      {
        "file": "modules/notes/notes-search-indexing.spec.js",
        "passed": 5,
        "failed": 0,
        "flaky": 0,
        "skipped": 2,
        "note": "2 skipped — Notes advanced search does not render on stage"
      },
      {
        "file": "modules/market-area/market-area-crud-smoke.spec.js",
        "passed": 6,
        "failed": 0,
        "flaky": 0,
        "skipped": 1,
        "note": "Assigned-area JM check skipped: a blank-type routing rule blocks it on stage"
      },
      {
        "file": "modules/vendor/vendor-search-smoke.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 1,
        "note": "1 skipped — license search needs a Credentials record"
      },
      {
        "file": "modules/vendor/vendor-solicitation-visibility.spec.js",
        "passed": 2,
        "failed": 0,
        "flaky": 0,
        "skipped": 1,
        "note": "1 skipped — selectability matrix needs licence fixtures"
      },
      {
        "file": "auth/forgot-password.spec.js",
        "passed": 7,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "auth/forgot-username.spec.js",
        "passed": 7,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "fixtures/auth.setup.admin.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "fixtures/auth.setup.job-manager.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "fixtures/auth.setup.loan-officer.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "GeneralSettings/DefaultFilterByStatus.spec.js",
        "passed": 2,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/View-Edit-properties/View_Edit_Properties.spec.js",
        "passed": 6,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/bank-holidays/bank-holidays-crud-smoke.spec.js",
        "passed": 5,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/bank-holidays/bank-holidays-search-smoke.spec.js",
        "passed": 5,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/bulk-bid/bulk-bid-lifecycle.spec.js",
        "passed": 4,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/comments/comments-thread-presence-smoke.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/comments/comments-thread-smoke.spec.js",
        "passed": 3,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/data-msa/data-msa-crud-smoke.spec.js",
        "passed": 6,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/documents/documents-create-validation.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/documents/documents-lifecycle-smoke.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/emails/emails-access-gate.spec.js",
        "passed": 3,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/emails/emails-history-subpanel.spec.js",
        "passed": 6,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/emails/emails-list-smoke.spec.js",
        "passed": 10,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/emails/emails-resend-wiring.spec.js",
        "passed": 8,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/geocode-status/geocode-status-list-search.spec.js",
        "passed": 14,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/geocode-status/geocode-status-vendor-lifecycle.spec.js",
        "passed": 2,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/k-reports/k-reports-crud.spec.js",
        "passed": 10,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/k-reports/k-reports-search.spec.js",
        "passed": 5,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/k-reports/k-reports-smoke.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/k-reports/transaction-report.spec.js",
        "passed": 10,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/notes/notes-crud.spec.js",
        "passed": 8,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/notes/notes-sorting.spec.js",
        "passed": 4,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/password-management/password-management-load-smoke.spec.js",
        "passed": 4,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/password-management/password-management-save-smoke.spec.js",
        "passed": 2,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/report-summaries/report-summaries-crud.spec.js",
        "passed": 7,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/solicitation/solicitation-detail-smoke.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/solicitation/solicitation-list-search-smoke.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/st-appraisal/request-list-advanced-search.spec.js",
        "passed": 2,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/st-appraisal/request-list-detail-smoke.spec.js",
        "passed": 2,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/st-appraisal/request-list-smoke.spec.js",
        "passed": 4,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/st-appraisal/request-list-sort-smoke.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/st-field-templates/st-field-templates-advanced-search.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/st-field-templates/st-field-templates-crud.spec.js",
        "passed": 2,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/st-field-templates/st-field-templates-request-integration.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/st-field-templates/st-field-templates-smoke.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/st-logical-routing/logical-routing-crud.spec.js",
        "passed": 6,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/st-logical-routing/logical-routing-duplicate-guard.spec.js",
        "passed": 3,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/user-management/group-users-crud.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/user-management/role-permissions-enforcement.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/user-management/role-permissions.spec.js",
        "passed": 2,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/user-management/roles-crud.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/user-management/users-crud.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/user-management/users-deactivate.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/user-management/users-list-search.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/vendor-letters/vendor-letters-crud-smoke.spec.js",
        "passed": 5,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/vendor-letters/vendor-letters-preview-smoke.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/vendor/vendor-create-edit-smoke.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/vendor/vendor-create-validation.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "request-lifecycle/cancel-engagement/cancel-enagement.spec.js",
        "passed": 3,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "request-lifecycle/report-review/report-disputedANDcorrections.spec.js",
        "passed": 2,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "request-lifecycle/report-review/report-review-acceptance.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "request-lifecycle/report-review/report-review-completion.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "request-lifecycle/report-review/report-review.spec.js",
        "passed": 5,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "request-lifecycle/report-review/request-complete.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "request-lifecycle/report-submission/report-deliverydate-revised.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "request-lifecycle/report-submission/report-submission.spec.js",
        "passed": 2,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "request-lifecycle/request-actions/accept-request-onestep.spec.js",
        "passed": 3,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "request-lifecycle/request-actions/accept-request-twostep.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "request-lifecycle/request-creation-wizard/request-creation.spec.js",
        "passed": 3,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "request-lifecycle/request-list/request-review.spec.js",
        "passed": 7,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "request-lifecycle/vendor-solicitation/vendor-solicitation-a.spec.js",
        "passed": 5,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "request-lifecycle/vendor-solicitation/vendor-solicitation-b.spec.js",
        "passed": 5,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "request-lifecycle/vendor-solicitation/vendor-solicitation-c.spec.js",
        "passed": 5,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "request-lifecycle/vendor-solicitation/vendor-solicitation-d.spec.js",
        "passed": 4,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      }
    ]
  },
  {
    "id": "36722277644",
    "label": "30 Sep 2026, 13:34 UTC · 85.9% · 36 failed",
    "title": "YouConnect — Playwright Run",
    "subtitle": "Full regression suite · CI mode · headless · Chromium · 1 retry",
    "environment": "stage.realwired.com",
    "startedAt": "2026-09-30 13:34 UTC",
    "durationMin": 113.4,
    "totalTests": 299,
    "passed": 219,
    "failed": 36,
    "flaky": 0,
    "skipped": 44,
    "passRatePercent": 85.9,
    "passRateNote": "219/255 executed (excluding skipped)",
    "updateNote": "Earlier full regression the same day (GitHub Actions run 36722277644). 36 failures. 31 stopped immediately because YOUCONNECT_API_KEY was not set, so Request Lifecycle never exercised the app. The later 15:55 run set the key and those tests ran. The known bugs were already present: RWT-497 and RWT-314. Parachute standalone is not configured on stage, and API Accounts timed out.",
    "failureBreakdown": [
      {
        "count": 31,
        "label": "API key not set",
        "detail": "Request Lifecycle (30) and Report Summaries (1) failed with \"Missing required apiKey. Set YOUCONNECT_API_KEY.\" Another 18 Request Lifecycle tests were skipped behind that."
      },
      {
        "count": 3,
        "label": "Known bugs — 2 tickets",
        "detail": "RWT-497: Loan Officer still gets an Order ERIS button on a Property with no modal (1 test). RWT-314: Zip County Basic and Advanced Search still return no rows (2 tests)."
      },
      {
        "count": 2,
        "label": "Stage setup",
        "detail": "Parachute standalone switch: the API URL field reads \"Not configured on this server.\" API Accounts full CRUD timed out loading the list."
      }
    ],
    "flakyNote": "No test failed and then passed on retry.",
    "reportSource": "GitHub Actions run 36722277644 · results.json · https://github.com/RealWired/YouConnect/actions/runs/36722277644",
    "suites": [
      {
        "suite": "Request Lifecycle",
        "passed": 3,
        "failed": 30,
        "flaky": 0,
        "skipped": 18,
        "passRate": 9,
        "date": "Sep 30 2026, 13:34",
        "source": "CI · stage.realwired.com",
        "status": "failing",
        "note": "30 failed and 18 skipped because YOUCONNECT_API_KEY was not set"
      },
      {
        "suite": "Authentication",
        "passed": 21,
        "failed": 0,
        "flaky": 0,
        "skipped": 2,
        "passRate": 100,
        "date": "Sep 30 2026, 13:34",
        "source": "CI · stage.realwired.com",
        "status": "passing",
        "note": "Admin, JM, and LO setup passed · 2 skipped"
      },
      {
        "suite": "General Settings",
        "passed": 2,
        "failed": 1,
        "flaky": 0,
        "skipped": 5,
        "passRate": 67,
        "date": "Sep 30 2026, 13:34",
        "source": "CI · stage.realwired.com",
        "status": "unstable",
        "note": "Parachute standalone is not configured on stage, so its serial tests did not run"
      },
      {
        "suite": "Module regression",
        "passed": 193,
        "failed": 5,
        "flaky": 0,
        "skipped": 19,
        "passRate": 97,
        "date": "Sep 30 2026, 13:34",
        "source": "CI · stage.realwired.com",
        "status": "unstable",
        "note": "RWT-314 and RWT-497 were already failing. API Accounts timed out. Report Summaries needed the API key"
      }
    ],
    "specs": [
      {
        "file": "request-lifecycle/report-review/report-review.spec.js",
        "passed": 0,
        "failed": 5,
        "flaky": 0,
        "skipped": 0,
        "note": "Missing YOUCONNECT_API_KEY"
      },
      {
        "file": "request-lifecycle/cancel-engagement/cancel-enagement.spec.js",
        "passed": 0,
        "failed": 3,
        "flaky": 0,
        "skipped": 0,
        "note": "Missing YOUCONNECT_API_KEY"
      },
      {
        "file": "request-lifecycle/request-list/request-review.spec.js",
        "passed": 0,
        "failed": 2,
        "flaky": 0,
        "skipped": 5,
        "note": "Missing YOUCONNECT_API_KEY"
      },
      {
        "file": "request-lifecycle/vendor-solicitation/vendor-solicitation-a.spec.js",
        "passed": 0,
        "failed": 2,
        "flaky": 0,
        "skipped": 3,
        "note": "Missing YOUCONNECT_API_KEY"
      },
      {
        "file": "request-lifecycle/vendor-solicitation/vendor-solicitation-b.spec.js",
        "passed": 0,
        "failed": 2,
        "flaky": 0,
        "skipped": 3,
        "note": "Missing YOUCONNECT_API_KEY"
      },
      {
        "file": "request-lifecycle/vendor-solicitation/vendor-solicitation-c.spec.js",
        "passed": 0,
        "failed": 2,
        "flaky": 0,
        "skipped": 3,
        "note": "Missing YOUCONNECT_API_KEY"
      },
      {
        "file": "request-lifecycle/vendor-solicitation/vendor-solicitation-d.spec.js",
        "passed": 0,
        "failed": 2,
        "flaky": 0,
        "skipped": 2,
        "note": "Missing YOUCONNECT_API_KEY"
      },
      {
        "file": "modules/zip-code-management/zip-code-management-regression.spec.js",
        "passed": 4,
        "failed": 2,
        "flaky": 0,
        "skipped": 0,
        "note": "Search returned no rows"
      },
      {
        "file": "request-lifecycle/report-review/report-disputedANDcorrections.spec.js",
        "passed": 0,
        "failed": 2,
        "flaky": 0,
        "skipped": 0,
        "note": "Missing YOUCONNECT_API_KEY"
      },
      {
        "file": "request-lifecycle/report-submission/report-submission.spec.js",
        "passed": 0,
        "failed": 2,
        "flaky": 0,
        "skipped": 0,
        "note": "Missing YOUCONNECT_API_KEY"
      },
      {
        "file": "modules/report-summaries/report-summaries-crud.spec.js",
        "passed": 0,
        "failed": 1,
        "flaky": 0,
        "skipped": 6,
        "note": "Missing YOUCONNECT_API_KEY"
      },
      {
        "file": "GeneralSettings/ParachuteStandaloneSwitch.spec.js",
        "passed": 0,
        "failed": 1,
        "flaky": 0,
        "skipped": 5,
        "note": "Stage API URL is not configured. The other tests in this spec are serial and did not run"
      },
      {
        "file": "request-lifecycle/request-actions/accept-request-onestep.spec.js",
        "passed": 0,
        "failed": 1,
        "flaky": 0,
        "skipped": 2,
        "note": "Missing YOUCONNECT_API_KEY"
      },
      {
        "file": "modules/api-accounts/api-accounts-crud-smoke.spec.js",
        "passed": 8,
        "failed": 1,
        "flaky": 0,
        "skipped": 0,
        "note": "Timed out on stage"
      },
      {
        "file": "modules/eris-report/eris-report-smoke.spec.js",
        "passed": 7,
        "failed": 1,
        "flaky": 0,
        "skipped": 0,
        "note": "RWT-497 canary still red — Loan Officer Order button renders, but the modal handler is missing"
      },
      {
        "file": "request-lifecycle/report-review/report-review-acceptance.spec.js",
        "passed": 0,
        "failed": 1,
        "flaky": 0,
        "skipped": 0,
        "note": "Missing YOUCONNECT_API_KEY"
      },
      {
        "file": "request-lifecycle/report-review/report-review-approval.spec.js",
        "passed": 0,
        "failed": 1,
        "flaky": 0,
        "skipped": 0,
        "note": "Missing YOUCONNECT_API_KEY"
      },
      {
        "file": "request-lifecycle/report-review/report-review-completion.spec.js",
        "passed": 0,
        "failed": 1,
        "flaky": 0,
        "skipped": 0,
        "note": "Missing YOUCONNECT_API_KEY"
      },
      {
        "file": "request-lifecycle/report-review/request-complete.spec.js",
        "passed": 0,
        "failed": 1,
        "flaky": 0,
        "skipped": 0,
        "note": "Missing YOUCONNECT_API_KEY"
      },
      {
        "file": "request-lifecycle/report-submission/report-deliverydate-revised.spec.js",
        "passed": 0,
        "failed": 1,
        "flaky": 0,
        "skipped": 0,
        "note": "Missing YOUCONNECT_API_KEY"
      },
      {
        "file": "request-lifecycle/request-actions/accept-request-twostep.spec.js",
        "passed": 0,
        "failed": 1,
        "flaky": 0,
        "skipped": 0,
        "note": "Missing YOUCONNECT_API_KEY"
      },
      {
        "file": "request-lifecycle/request-actions/reject-request-twostep.spec.js",
        "passed": 0,
        "failed": 1,
        "flaky": 0,
        "skipped": 0,
        "note": "Missing YOUCONNECT_API_KEY"
      },
      {
        "file": "modules/bulk-bid/bulk-bid-send-cancel-lifecycle.spec.js",
        "passed": 0,
        "failed": 0,
        "flaky": 0,
        "skipped": 8,
        "note": "Opt-in: mutates shared stage data. Set PW_BULK_BID_LIFECYCLE=1 to run the send/cancel chain."
      },
      {
        "file": "auth/login.spec.js",
        "passed": 4,
        "failed": 0,
        "flaky": 0,
        "skipped": 2,
        "note": "2 skipped (invalid password, lockout)"
      },
      {
        "file": "modules/notes/notes-search-indexing.spec.js",
        "passed": 5,
        "failed": 0,
        "flaky": 0,
        "skipped": 2,
        "note": "The Advanced Search panel does not render for Notes on this environment (see POM quirk 7)."
      },
      {
        "file": "modules/market-area/market-area-crud-smoke.spec.js",
        "passed": 6,
        "failed": 0,
        "flaky": 0,
        "skipped": 1,
        "note": "Assigned-area check skipped: a blank-type routing rule blocks it on stage"
      },
      {
        "file": "modules/vendor/vendor-search-smoke.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 1,
        "note": "License search needs a Credentials record"
      },
      {
        "file": "modules/vendor/vendor-solicitation-visibility.spec.js",
        "passed": 2,
        "failed": 0,
        "flaky": 0,
        "skipped": 1,
        "note": "Selectability matrix needs licence fixtures"
      },
      {
        "file": "fixtures/auth.setup.admin.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "fixtures/auth.setup.job-manager.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "fixtures/auth.setup.loan-officer.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "auth/forgot-password.spec.js",
        "passed": 7,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "auth/forgot-username.spec.js",
        "passed": 7,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "GeneralSettings/DefaultFilterByStatus.spec.js",
        "passed": 2,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/bank-holidays/bank-holidays-crud-smoke.spec.js",
        "passed": 5,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/bank-holidays/bank-holidays-search-smoke.spec.js",
        "passed": 5,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/bulk-bid/bulk-bid-lifecycle.spec.js",
        "passed": 4,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/comments/comments-thread-presence-smoke.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/comments/comments-thread-smoke.spec.js",
        "passed": 3,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/data-msa/data-msa-crud-smoke.spec.js",
        "passed": 6,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/documents/documents-create-validation.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/documents/documents-lifecycle-smoke.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/emails/emails-access-gate.spec.js",
        "passed": 3,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/emails/emails-history-subpanel.spec.js",
        "passed": 6,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/emails/emails-list-smoke.spec.js",
        "passed": 10,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/emails/emails-resend-wiring.spec.js",
        "passed": 8,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/geocode-status/geocode-status-list-search.spec.js",
        "passed": 14,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/geocode-status/geocode-status-vendor-lifecycle.spec.js",
        "passed": 2,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/k-reports/k-reports-crud.spec.js",
        "passed": 10,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/k-reports/k-reports-search.spec.js",
        "passed": 5,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/k-reports/k-reports-smoke.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/k-reports/transaction-report.spec.js",
        "passed": 10,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/notes/notes-crud.spec.js",
        "passed": 8,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/notes/notes-sorting.spec.js",
        "passed": 4,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/password-management/password-management-load-smoke.spec.js",
        "passed": 4,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/password-management/password-management-save-smoke.spec.js",
        "passed": 2,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/solicitation/solicitation-detail-smoke.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/solicitation/solicitation-list-search-smoke.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/st-appraisal/request-list-advanced-search.spec.js",
        "passed": 2,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/st-appraisal/request-list-detail-smoke.spec.js",
        "passed": 2,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/st-appraisal/request-list-smoke.spec.js",
        "passed": 4,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/st-appraisal/request-list-sort-smoke.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/st-field-templates/st-field-templates-advanced-search.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/st-field-templates/st-field-templates-crud.spec.js",
        "passed": 2,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/st-field-templates/st-field-templates-request-integration.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/st-field-templates/st-field-templates-smoke.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/st-logical-routing/logical-routing-crud.spec.js",
        "passed": 6,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/st-logical-routing/logical-routing-duplicate-guard.spec.js",
        "passed": 3,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/user-management/group-users-crud.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/user-management/role-permissions-enforcement.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/user-management/role-permissions.spec.js",
        "passed": 2,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/user-management/roles-crud.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/user-management/users-crud.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/user-management/users-deactivate.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/user-management/users-list-search.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/vendor-letters/vendor-letters-crud-smoke.spec.js",
        "passed": 5,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/vendor-letters/vendor-letters-preview-smoke.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/vendor/vendor-create-edit-smoke.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/vendor/vendor-create-validation.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/View-Edit-properties/View_Edit_Properties.spec.js",
        "passed": 6,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "request-lifecycle/request-creation-wizard/request-creation.spec.js",
        "passed": 3,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      }
    ]
  },
  {
    "id": "35768697204",
    "label": "22 Sep 2026, 18:41 UTC · 82.9% · 40 failed",
    "title": "YouConnect — Playwright Run",
    "subtitle": "Full regression suite · CI mode · headless · Chromium · 1 retry",
    "environment": "stage.realwired.com",
    "startedAt": "2026-09-22 18:41 UTC",
    "durationMin": 115.8,
    "totalTests": 293,
    "passed": 214,
    "failed": 40,
    "flaky": 4,
    "skipped": 35,
    "passRatePercent": 82.9,
    "passRateNote": "214/258 executed (excluding skipped)",
    "updateNote": "Full regression on stage, 22 Sep 2026 (GitHub Actions run 35768697204). 40 failures. 31 are the missing YOUCONNECT_API_KEY, same block as the early 30 Sep run. 2 are the known zip-search bug RWT-314, and 1 is the known ERIS bug RWT-497. The rest timed out or hit stale stage data (Notes list, K Reports, Bulk Bid, field templates).",
    "failureBreakdown": [
      {
        "count": 31,
        "label": "API key not set",
        "detail": "Request Lifecycle (30) and Report Summaries (1) failed with \"Missing required apiKey. Set YOUCONNECT_API_KEY.\" Another 18 Request Lifecycle tests were skipped behind that."
      },
      {
        "count": 3,
        "label": "Known bugs — 2 tickets",
        "detail": "RWT-497: Loan Officer still gets an Order ERIS button on a Property with no modal (1 test). RWT-314: Zip County Basic and Advanced Search still return no rows (2 tests)."
      },
      {
        "count": 6,
        "label": "Timeout or stale stage data",
        "detail": "API Accounts, a K Reports edit, Bulk Bid, and a field template timed out. The Notes list opened with no record id."
      }
    ],
    "flakyNote": "4 recovered on retry — ERIS job-manager toggle, zip create/edit/delete, K Reports field grid, and Bulk Bid project setup.",
    "reportSource": "GitHub Actions run 35768697204 · results.json · https://github.com/RealWired/YouConnect/actions/runs/35768697204",
    "suites": [
      {
        "suite": "Request Lifecycle",
        "passed": 3,
        "failed": 30,
        "flaky": 0,
        "skipped": 18,
        "passRate": 9,
        "date": "Sep 22 2026",
        "source": "CI · stage.realwired.com",
        "status": "failing",
        "note": "30 failed and 18 skipped because YOUCONNECT_API_KEY was not set"
      },
      {
        "suite": "Authentication",
        "passed": 21,
        "failed": 0,
        "flaky": 0,
        "skipped": 2,
        "passRate": 100,
        "date": "Sep 22 2026",
        "source": "CI · stage.realwired.com",
        "status": "passing",
        "note": "Admin, JM, and LO setup passed · 2 skipped"
      },
      {
        "suite": "General Settings",
        "passed": 2,
        "failed": 0,
        "flaky": 0,
        "skipped": 0,
        "passRate": 100,
        "date": "Sep 22 2026",
        "source": "CI · stage.realwired.com",
        "status": "passing",
        "note": "Both Default Filter By Status tests passed"
      },
      {
        "suite": "Module regression",
        "passed": 188,
        "failed": 10,
        "flaky": 4,
        "skipped": 15,
        "passRate": 93,
        "date": "Sep 22 2026",
        "source": "CI · stage.realwired.com",
        "status": "unstable",
        "note": "Known bugs RWT-314 and RWT-497, plus timeouts and a Notes list with no record id. 4 tests recovered on retry"
      }
    ],
    "specs": [
      {
        "file": "request-lifecycle/report-review/report-review.spec.js",
        "passed": 0,
        "failed": 5,
        "flaky": 0,
        "skipped": 0,
        "note": "Missing YOUCONNECT_API_KEY"
      },
      {
        "file": "request-lifecycle/cancel-engagement/cancel-enagement.spec.js",
        "passed": 0,
        "failed": 3,
        "flaky": 0,
        "skipped": 0,
        "note": "Missing YOUCONNECT_API_KEY"
      },
      {
        "file": "modules/zip-code-management/zip-code-management-regression.spec.js",
        "passed": 3,
        "failed": 2,
        "flaky": 1,
        "skipped": 0,
        "note": "Search returned no rows. Another test in this spec recovered on retry"
      },
      {
        "file": "request-lifecycle/request-list/request-review.spec.js",
        "passed": 0,
        "failed": 2,
        "flaky": 0,
        "skipped": 5,
        "note": "Missing YOUCONNECT_API_KEY"
      },
      {
        "file": "request-lifecycle/vendor-solicitation/vendor-solicitation-a.spec.js",
        "passed": 0,
        "failed": 2,
        "flaky": 0,
        "skipped": 3,
        "note": "Missing YOUCONNECT_API_KEY"
      },
      {
        "file": "request-lifecycle/vendor-solicitation/vendor-solicitation-b.spec.js",
        "passed": 0,
        "failed": 2,
        "flaky": 0,
        "skipped": 3,
        "note": "Missing YOUCONNECT_API_KEY"
      },
      {
        "file": "request-lifecycle/vendor-solicitation/vendor-solicitation-c.spec.js",
        "passed": 0,
        "failed": 2,
        "flaky": 0,
        "skipped": 3,
        "note": "Missing YOUCONNECT_API_KEY"
      },
      {
        "file": "request-lifecycle/vendor-solicitation/vendor-solicitation-d.spec.js",
        "passed": 0,
        "failed": 2,
        "flaky": 0,
        "skipped": 2,
        "note": "Missing YOUCONNECT_API_KEY"
      },
      {
        "file": "request-lifecycle/report-review/report-disputedANDcorrections.spec.js",
        "passed": 0,
        "failed": 2,
        "flaky": 0,
        "skipped": 0,
        "note": "Missing YOUCONNECT_API_KEY"
      },
      {
        "file": "request-lifecycle/report-submission/report-submission.spec.js",
        "passed": 0,
        "failed": 2,
        "flaky": 0,
        "skipped": 0,
        "note": "Missing YOUCONNECT_API_KEY"
      },
      {
        "file": "modules/k-reports/k-reports-crud.spec.js",
        "passed": 4,
        "failed": 1,
        "flaky": 1,
        "skipped": 4,
        "note": "Timed out on stage"
      },
      {
        "file": "modules/bulk-bid/bulk-bid-send-cancel-lifecycle.spec.js",
        "passed": 6,
        "failed": 1,
        "flaky": 1,
        "skipped": 0,
        "note": "Timed out on stage"
      },
      {
        "file": "modules/eris-report/eris-report-smoke.spec.js",
        "passed": 6,
        "failed": 1,
        "flaky": 1,
        "skipped": 0,
        "note": "RWT-497 canary still red. Another test in this spec recovered on retry"
      },
      {
        "file": "modules/report-summaries/report-summaries-crud.spec.js",
        "passed": 0,
        "failed": 1,
        "flaky": 0,
        "skipped": 6,
        "note": "Missing YOUCONNECT_API_KEY"
      },
      {
        "file": "request-lifecycle/request-actions/accept-request-onestep.spec.js",
        "passed": 0,
        "failed": 1,
        "flaky": 0,
        "skipped": 2,
        "note": "Missing YOUCONNECT_API_KEY"
      },
      {
        "file": "modules/api-accounts/api-accounts-crud-smoke.spec.js",
        "passed": 8,
        "failed": 1,
        "flaky": 0,
        "skipped": 0,
        "note": "Timed out on stage"
      },
      {
        "file": "modules/bulk-bid/bulk-bid-lifecycle.spec.js",
        "passed": 3,
        "failed": 1,
        "flaky": 0,
        "skipped": 0,
        "note": "Timed out on stage"
      },
      {
        "file": "modules/notes/notes-crud.spec.js",
        "passed": 7,
        "failed": 1,
        "flaky": 0,
        "skipped": 0,
        "note": "First list row had no Notes record id"
      },
      {
        "file": "modules/st-field-templates/st-field-templates-request-integration.spec.js",
        "passed": 0,
        "failed": 1,
        "flaky": 0,
        "skipped": 0,
        "note": "Timed out on stage"
      },
      {
        "file": "request-lifecycle/report-review/report-review-acceptance.spec.js",
        "passed": 0,
        "failed": 1,
        "flaky": 0,
        "skipped": 0,
        "note": "Missing YOUCONNECT_API_KEY"
      },
      {
        "file": "request-lifecycle/report-review/report-review-approval.spec.js",
        "passed": 0,
        "failed": 1,
        "flaky": 0,
        "skipped": 0,
        "note": "Missing YOUCONNECT_API_KEY"
      },
      {
        "file": "request-lifecycle/report-review/report-review-completion.spec.js",
        "passed": 0,
        "failed": 1,
        "flaky": 0,
        "skipped": 0,
        "note": "Missing YOUCONNECT_API_KEY"
      },
      {
        "file": "request-lifecycle/report-review/request-complete.spec.js",
        "passed": 0,
        "failed": 1,
        "flaky": 0,
        "skipped": 0,
        "note": "Missing YOUCONNECT_API_KEY"
      },
      {
        "file": "request-lifecycle/report-submission/report-deliverydate-revised.spec.js",
        "passed": 0,
        "failed": 1,
        "flaky": 0,
        "skipped": 0,
        "note": "Missing YOUCONNECT_API_KEY"
      },
      {
        "file": "request-lifecycle/request-actions/accept-request-twostep.spec.js",
        "passed": 0,
        "failed": 1,
        "flaky": 0,
        "skipped": 0,
        "note": "Missing YOUCONNECT_API_KEY"
      },
      {
        "file": "request-lifecycle/request-actions/reject-request-twostep.spec.js",
        "passed": 0,
        "failed": 1,
        "flaky": 0,
        "skipped": 0,
        "note": "Missing YOUCONNECT_API_KEY"
      },
      {
        "file": "auth/login.spec.js",
        "passed": 4,
        "failed": 0,
        "flaky": 0,
        "skipped": 2,
        "note": "2 skipped (invalid password, lockout)"
      },
      {
        "file": "modules/notes/notes-search-indexing.spec.js",
        "passed": 5,
        "failed": 0,
        "flaky": 0,
        "skipped": 2,
        "note": "The Advanced Search panel does not render for Notes on this environment (see POM quirk 7)."
      },
      {
        "file": "modules/market-area/market-area-crud-smoke.spec.js",
        "passed": 6,
        "failed": 0,
        "flaky": 0,
        "skipped": 1,
        "note": "Assigned-area check skipped: a blank-type routing rule blocks it on stage"
      },
      {
        "file": "modules/vendor/vendor-search-smoke.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 1,
        "note": "License search needs a Credentials record"
      },
      {
        "file": "modules/vendor/vendor-solicitation-visibility.spec.js",
        "passed": 2,
        "failed": 0,
        "flaky": 0,
        "skipped": 1,
        "note": "Selectability matrix needs licence fixtures"
      },
      {
        "file": "fixtures/auth.setup.admin.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "fixtures/auth.setup.job-manager.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "fixtures/auth.setup.loan-officer.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "auth/forgot-password.spec.js",
        "passed": 7,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "auth/forgot-username.spec.js",
        "passed": 7,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "GeneralSettings/DefaultFilterByStatus.spec.js",
        "passed": 2,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/bank-holidays/bank-holidays-crud-smoke.spec.js",
        "passed": 5,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/bank-holidays/bank-holidays-search-smoke.spec.js",
        "passed": 5,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/comments/comments-thread-presence-smoke.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/comments/comments-thread-smoke.spec.js",
        "passed": 3,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/data-msa/data-msa-crud-smoke.spec.js",
        "passed": 6,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/documents/documents-create-validation.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/documents/documents-lifecycle-smoke.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/emails/emails-access-gate.spec.js",
        "passed": 3,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/emails/emails-history-subpanel.spec.js",
        "passed": 6,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/emails/emails-list-smoke.spec.js",
        "passed": 10,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/emails/emails-resend-wiring.spec.js",
        "passed": 8,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/geocode-status/geocode-status-list-search.spec.js",
        "passed": 14,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/geocode-status/geocode-status-vendor-lifecycle.spec.js",
        "passed": 2,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/k-reports/k-reports-search.spec.js",
        "passed": 5,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/k-reports/k-reports-smoke.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/k-reports/transaction-report.spec.js",
        "passed": 10,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/notes/notes-sorting.spec.js",
        "passed": 4,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/password-management/password-management-load-smoke.spec.js",
        "passed": 4,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/password-management/password-management-save-smoke.spec.js",
        "passed": 2,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/solicitation/solicitation-detail-smoke.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/solicitation/solicitation-list-search-smoke.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/st-appraisal/request-list-advanced-search.spec.js",
        "passed": 2,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/st-appraisal/request-list-detail-smoke.spec.js",
        "passed": 2,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/st-appraisal/request-list-smoke.spec.js",
        "passed": 4,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/st-appraisal/request-list-sort-smoke.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/st-field-templates/st-field-templates-advanced-search.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/st-field-templates/st-field-templates-crud.spec.js",
        "passed": 2,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/st-field-templates/st-field-templates-smoke.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/st-logical-routing/logical-routing-crud.spec.js",
        "passed": 6,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/st-logical-routing/logical-routing-duplicate-guard.spec.js",
        "passed": 3,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/user-management/group-users-crud.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/user-management/role-permissions-enforcement.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/user-management/role-permissions.spec.js",
        "passed": 2,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/user-management/roles-crud.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/user-management/users-crud.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/user-management/users-deactivate.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/user-management/users-list-search.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/vendor-letters/vendor-letters-crud-smoke.spec.js",
        "passed": 5,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/vendor-letters/vendor-letters-preview-smoke.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/vendor/vendor-create-edit-smoke.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/vendor/vendor-create-validation.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/View-Edit-properties/View_Edit_Properties.spec.js",
        "passed": 6,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "request-lifecycle/request-creation-wizard/request-creation.spec.js",
        "passed": 3,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      }
    ]
  }
];
