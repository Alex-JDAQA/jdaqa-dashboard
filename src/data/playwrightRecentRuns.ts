import type { PlaywrightRunSnapshot } from "./playwrightRunHistory";

/** Main-branch full regressions newer than the 20 Oct run stored in metrics.ts. */
export const recentPlaywrightRuns: PlaywrightRunSnapshot[] = [
  {
    "id": "40871894556",
    "label": "Latest · 29 Oct 2026, 12:17 UTC · did not start",
    "title": "YouConnect — Playwright Run",
    "subtitle": "Full regression suite · CI mode · headless · Chromium · 1 retry",
    "environment": "stageautomation.realwired.com",
    "startedAt": "2026-10-29 12:17 UTC",
    "durationMin": 0.05,
    "totalTests": 0,
    "passed": 0,
    "failed": 0,
    "flaky": 0,
    "skipped": 0,
    "passRatePercent": 0,
    "passRateNote": "No tests executed",
    "updateNote": "Full regression against stageautomation.realwired.com, 29 Oct 2026 (GitHub Actions run 40871894556). Playwright stopped while loading the suite. MODULE_SEEDS has no entry for that host, so no test ran. The load error came from 9 specs: bulk bid lifecycle, bulk bid send/cancel, both comments smokes, three request-list smokes, and two field-template specs.",
    "failureBreakdown": [
      {
        "count": 9,
        "label": "Suite did not start",
        "detail": "Those 9 specs import seed data for the target host. stageautomation.realwired.com is not in MODULE_SEEDS, so Playwright aborted the run during load. Nothing was executed, passed, or skipped."
      }
    ],
    "flakyNote": "",
    "reportSource": "GitHub Actions run 40871894556 · results.json · https://github.com/RealWired/YouConnect/actions/runs/40871894556",
    "suites": [],
    "specs": []
  },
  {
    "id": "40775281969",
    "label": "28 Oct 2026, 21:52 UTC · 91.7% · 6 failed · 205 skipped",
    "title": "YouConnect — Playwright Run",
    "subtitle": "Full regression suite · CI mode · headless · Chromium · 1 retry",
    "environment": "stage.realwired.com",
    "startedAt": "2026-10-28 21:52 UTC",
    "durationMin": 95.3,
    "totalTests": 301,
    "passed": 88,
    "failed": 6,
    "flaky": 2,
    "skipped": 205,
    "passRatePercent": 91.7,
    "passRateNote": "88/96 executed (205 skipped)",
    "updateNote": "Full regression on stage, 28 Oct 2026, 21:52 UTC (GitHub Actions run 40775281969). Admin login never left the login page, so the admin project did not run (196 tests skipped, including General Settings). Of the 96 tests that did run, 6 failed and 2 recovered on retry. Property CRUD, bulk bid, and a field-template request check timed out. The pass rate is only among tests that ran.",
    "failureBreakdown": [
      {
        "count": 2,
        "label": "Admin login did not complete",
        "detail": "Admin setup timed out after 30 seconds. The browser was still on the login page. The admin login spec then expected a successful sign-in and got false. The other 196 admin-project tests did not run."
      },
      {
        "count": 2,
        "label": "Bulk bid",
        "detail": "Creating the throwaway project navigated back to the login page. Sending the bid then timed out after 60 seconds. 7 later tests in that spec are serial, so they did not run."
      },
      {
        "count": 1,
        "label": "Property CRUD timed out",
        "detail": "Create, read, update, delete waited 30 seconds for Create a Request and never clicked it."
      },
      {
        "count": 1,
        "label": "Field template on a request",
        "detail": "The job manager check timed out waiting for the request list table."
      }
    ],
    "flakyNote": "2 recovered on retry — Revision Report Submission and the vendor report submission. Both closed the page mid-click on a vendor link.",
    "reportSource": "GitHub Actions run 40775281969 · results.json · https://github.com/RealWired/YouConnect/actions/runs/40775281969",
    "suites": [
      {
        "suite": "Request Lifecycle",
        "passed": 49,
        "failed": 0,
        "flaky": 2,
        "skipped": 0,
        "passRate": 96,
        "date": "Oct 28 2026, 21:52",
        "source": "CI · stage.realwired.com",
        "status": "unstable",
        "note": "Revision Report Submission and the vendor report submission both recovered on retry. The page closed mid-click on a vendor link"
      },
      {
        "suite": "Authentication",
        "passed": 19,
        "failed": 2,
        "flaky": 0,
        "skipped": 2,
        "passRate": 90,
        "date": "Oct 28 2026, 21:52",
        "source": "CI · stage.realwired.com",
        "status": "unstable",
        "note": "Admin setup timed out on the login page, and the admin login check failed. Loan officer and job manager setup passed. 2 skipped (invalid password, lockout)"
      },
      {
        "suite": "General Settings",
        "passed": 0,
        "failed": 0,
        "flaky": 0,
        "skipped": 8,
        "passRate": 0,
        "date": "Oct 28 2026, 21:52",
        "source": "CI · stage.realwired.com",
        "status": "unstable",
        "note": "Did not run. These tests use the admin project, and admin login never completed"
      },
      {
        "suite": "Module regression",
        "passed": 20,
        "failed": 4,
        "flaky": 0,
        "skipped": 195,
        "passRate": 83,
        "date": "Oct 28 2026, 21:52",
        "source": "CI · stage.realwired.com",
        "status": "unstable",
        "note": "188 admin-project tests did not run after the admin login timeout. Property CRUD timed out waiting for Create a Request. Bulk bid returned to the login page, then the send step timed out, so 7 later tests in that spec did not run. The field-template request check timed out waiting for the list"
      }
    ],
    "specs": [
      {
        "file": "modules/bulk-bid/bulk-bid-send-cancel-lifecycle.spec.js",
        "passed": 1,
        "failed": 2,
        "flaky": 0,
        "skipped": 7,
        "note": "Creating the project navigated back to the login page. Sending the bid then timed out. 7 later tests in this spec did not run"
      },
      {
        "file": "auth/login.spec.js",
        "passed": 3,
        "failed": 1,
        "flaky": 0,
        "skipped": 2,
        "note": "Admin login expected a successful sign-in and got false. 2 skipped (invalid password, lockout)"
      },
      {
        "file": "fixtures/auth.setup.admin.js",
        "passed": 0,
        "failed": 1,
        "flaky": 0,
        "skipped": 0,
        "note": "Timed out on the login page. The URL stayed on Users/Login, so the admin project never started"
      },
      {
        "file": "modules/st-field-templates/st-field-templates-request-integration.spec.js",
        "passed": 0,
        "failed": 1,
        "flaky": 0,
        "skipped": 0,
        "note": "Timed out waiting for the request list table"
      },
      {
        "file": "modules/View-Edit-properties/View_Edit_Properties.spec.js",
        "passed": 5,
        "failed": 1,
        "flaky": 0,
        "skipped": 0,
        "note": "Create, read, update, delete timed out waiting for Create a Request"
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
        "file": "request-lifecycle/report-submission/report-submission.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 1,
        "skipped": 0,
        "note": "Vendor report submission recovered on retry — the page closed mid-click on a vendor link"
      },
      {
        "file": "GeneralSettings/DefaultFilterByStatus.spec.js",
        "passed": 0,
        "failed": 0,
        "flaky": 0,
        "skipped": 2
      },
      {
        "file": "GeneralSettings/ParachuteStandaloneSwitch.spec.js",
        "passed": 0,
        "failed": 0,
        "flaky": 0,
        "skipped": 6
      },
      {
        "file": "modules/api-accounts/api-accounts-crud-smoke.spec.js",
        "passed": 0,
        "failed": 0,
        "flaky": 0,
        "skipped": 9
      },
      {
        "file": "modules/bank-holidays/bank-holidays-crud-smoke.spec.js",
        "passed": 0,
        "failed": 0,
        "flaky": 0,
        "skipped": 5
      },
      {
        "file": "modules/bank-holidays/bank-holidays-search-smoke.spec.js",
        "passed": 0,
        "failed": 0,
        "flaky": 0,
        "skipped": 5
      },
      {
        "file": "modules/comments/comments-thread-presence-smoke.spec.js",
        "passed": 0,
        "failed": 0,
        "flaky": 0,
        "skipped": 1
      },
      {
        "file": "modules/comments/comments-thread-smoke.spec.js",
        "passed": 0,
        "failed": 0,
        "flaky": 0,
        "skipped": 3
      },
      {
        "file": "modules/data-msa/data-msa-crud-smoke.spec.js",
        "passed": 0,
        "failed": 0,
        "flaky": 0,
        "skipped": 6
      },
      {
        "file": "modules/documents/documents-create-validation.spec.js",
        "passed": 0,
        "failed": 0,
        "flaky": 0,
        "skipped": 1
      },
      {
        "file": "modules/documents/documents-lifecycle-smoke.spec.js",
        "passed": 0,
        "failed": 0,
        "flaky": 0,
        "skipped": 1
      },
      {
        "file": "modules/emails/emails-access-gate.spec.js",
        "passed": 0,
        "failed": 0,
        "flaky": 0,
        "skipped": 3
      },
      {
        "file": "modules/emails/emails-history-subpanel.spec.js",
        "passed": 0,
        "failed": 0,
        "flaky": 0,
        "skipped": 6
      },
      {
        "file": "modules/emails/emails-list-smoke.spec.js",
        "passed": 0,
        "failed": 0,
        "flaky": 0,
        "skipped": 10
      },
      {
        "file": "modules/emails/emails-resend-wiring.spec.js",
        "passed": 0,
        "failed": 0,
        "flaky": 0,
        "skipped": 8
      },
      {
        "file": "modules/eris-report/eris-report-smoke.spec.js",
        "passed": 0,
        "failed": 0,
        "flaky": 0,
        "skipped": 8
      },
      {
        "file": "modules/geocode-status/geocode-status-list-search.spec.js",
        "passed": 0,
        "failed": 0,
        "flaky": 0,
        "skipped": 14
      },
      {
        "file": "modules/geocode-status/geocode-status-vendor-lifecycle.spec.js",
        "passed": 0,
        "failed": 0,
        "flaky": 0,
        "skipped": 2
      },
      {
        "file": "modules/k-reports/k-reports-crud.spec.js",
        "passed": 0,
        "failed": 0,
        "flaky": 0,
        "skipped": 10
      },
      {
        "file": "modules/k-reports/k-reports-search.spec.js",
        "passed": 0,
        "failed": 0,
        "flaky": 0,
        "skipped": 5
      },
      {
        "file": "modules/k-reports/k-reports-smoke.spec.js",
        "passed": 0,
        "failed": 0,
        "flaky": 0,
        "skipped": 1
      },
      {
        "file": "modules/k-reports/transaction-report-drillthrough.spec.js",
        "passed": 0,
        "failed": 0,
        "flaky": 0,
        "skipped": 1
      },
      {
        "file": "modules/k-reports/transaction-report.spec.js",
        "passed": 0,
        "failed": 0,
        "flaky": 0,
        "skipped": 9
      },
      {
        "file": "modules/market-area/market-area-crud-smoke.spec.js",
        "passed": 0,
        "failed": 0,
        "flaky": 0,
        "skipped": 7
      },
      {
        "file": "modules/notes/notes-crud.spec.js",
        "passed": 0,
        "failed": 0,
        "flaky": 0,
        "skipped": 8
      },
      {
        "file": "modules/notes/notes-search-indexing.spec.js",
        "passed": 0,
        "failed": 0,
        "flaky": 0,
        "skipped": 7
      },
      {
        "file": "modules/notes/notes-sorting.spec.js",
        "passed": 0,
        "failed": 0,
        "flaky": 0,
        "skipped": 4
      },
      {
        "file": "modules/password-management/password-management-load-smoke.spec.js",
        "passed": 0,
        "failed": 0,
        "flaky": 0,
        "skipped": 4
      },
      {
        "file": "modules/password-management/password-management-save-smoke.spec.js",
        "passed": 0,
        "failed": 0,
        "flaky": 0,
        "skipped": 2
      },
      {
        "file": "modules/report-summaries/report-summaries-crud.spec.js",
        "passed": 0,
        "failed": 0,
        "flaky": 0,
        "skipped": 7
      },
      {
        "file": "modules/solicitation/solicitation-detail-smoke.spec.js",
        "passed": 0,
        "failed": 0,
        "flaky": 0,
        "skipped": 1
      },
      {
        "file": "modules/solicitation/solicitation-list-search-smoke.spec.js",
        "passed": 0,
        "failed": 0,
        "flaky": 0,
        "skipped": 1
      },
      {
        "file": "modules/st-field-templates/st-field-templates-advanced-search.spec.js",
        "passed": 0,
        "failed": 0,
        "flaky": 0,
        "skipped": 1
      },
      {
        "file": "modules/st-field-templates/st-field-templates-crud.spec.js",
        "passed": 0,
        "failed": 0,
        "flaky": 0,
        "skipped": 2
      },
      {
        "file": "modules/st-field-templates/st-field-templates-smoke.spec.js",
        "passed": 0,
        "failed": 0,
        "flaky": 0,
        "skipped": 1
      },
      {
        "file": "modules/st-logical-routing/logical-routing-crud.spec.js",
        "passed": 0,
        "failed": 0,
        "flaky": 0,
        "skipped": 6
      },
      {
        "file": "modules/st-logical-routing/logical-routing-duplicate-guard.spec.js",
        "passed": 0,
        "failed": 0,
        "flaky": 0,
        "skipped": 3
      },
      {
        "file": "modules/user-management/group-users-crud.spec.js",
        "passed": 0,
        "failed": 0,
        "flaky": 0,
        "skipped": 1
      },
      {
        "file": "modules/user-management/role-permissions.spec.js",
        "passed": 0,
        "failed": 0,
        "flaky": 0,
        "skipped": 2
      },
      {
        "file": "modules/user-management/roles-crud.spec.js",
        "passed": 0,
        "failed": 0,
        "flaky": 0,
        "skipped": 1
      },
      {
        "file": "modules/user-management/users-crud.spec.js",
        "passed": 0,
        "failed": 0,
        "flaky": 0,
        "skipped": 1
      },
      {
        "file": "modules/user-management/users-deactivate.spec.js",
        "passed": 0,
        "failed": 0,
        "flaky": 0,
        "skipped": 1
      },
      {
        "file": "modules/user-management/users-list-search.spec.js",
        "passed": 0,
        "failed": 0,
        "flaky": 0,
        "skipped": 1
      },
      {
        "file": "modules/vendor-letters/vendor-letters-crud-smoke.spec.js",
        "passed": 0,
        "failed": 0,
        "flaky": 0,
        "skipped": 5
      },
      {
        "file": "modules/vendor-letters/vendor-letters-preview-smoke.spec.js",
        "passed": 0,
        "failed": 0,
        "flaky": 0,
        "skipped": 1
      },
      {
        "file": "modules/vendor/vendor-create-edit-smoke.spec.js",
        "passed": 0,
        "failed": 0,
        "flaky": 0,
        "skipped": 1
      },
      {
        "file": "modules/vendor/vendor-create-validation.spec.js",
        "passed": 0,
        "failed": 0,
        "flaky": 0,
        "skipped": 1
      },
      {
        "file": "modules/vendor/vendor-search-smoke.spec.js",
        "passed": 0,
        "failed": 0,
        "flaky": 0,
        "skipped": 2
      },
      {
        "file": "modules/vendor/vendor-solicitation-visibility.spec.js",
        "passed": 0,
        "failed": 0,
        "flaky": 0,
        "skipped": 3
      },
      {
        "file": "modules/zip-code-management/zip-code-management-regression.spec.js",
        "passed": 0,
        "failed": 0,
        "flaky": 0,
        "skipped": 6
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
        "file": "modules/bulk-bid/bulk-bid-lifecycle.spec.js",
        "passed": 4,
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
        "file": "modules/user-management/role-permissions-enforcement.spec.js",
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
        "file": "request-lifecycle/request-actions/reject-request-twostep.spec.js",
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
    "id": "40630185158",
    "label": "28 Oct 2026, 04:05 UTC · 98.6% · 2 failed",
    "title": "YouConnect — Playwright Run",
    "subtitle": "Full regression suite · CI mode · headless · Chromium · 1 retry",
    "environment": "stage.realwired.com",
    "startedAt": "2026-10-28 04:05 UTC",
    "durationMin": 156.8,
    "totalTests": 301,
    "passed": 292,
    "failed": 2,
    "flaky": 2,
    "skipped": 5,
    "passRatePercent": 98.6,
    "passRateNote": "292/296 executed (excluding skipped)",
    "updateNote": "Full regression on stage, 28 Oct 2026, 04:05 UTC (GitHub Actions run 40630185158). 2 failures. 1 is the known ERIS bug, RWT-497. Bulk bid cancel timed out opening the project. 2 tests recovered on retry. 5 skips are the usual stage gaps: invalid password and lockout, Notes advanced search, and the vendor selectability matrix.",
    "failureBreakdown": [
      {
        "count": 1,
        "label": "Known bug — RWT-497",
        "detail": "Loan Officer still gets an Order ERIS button on a Property with no modal."
      },
      {
        "count": 1,
        "label": "Bulk bid cancel timed out",
        "detail": "Cancelling the solicitation waited 60 seconds for the project detail page and never opened it. The other tests in that spec passed."
      }
    ],
    "flakyNote": "2 recovered on retry — Revision Report Submission (the request list timed out loading) and the revised delivery date (the page closed mid-click on a vendor link).",
    "reportSource": "GitHub Actions run 40630185158 · results.json · https://github.com/RealWired/YouConnect/actions/runs/40630185158",
    "suites": [
      {
        "suite": "Request Lifecycle",
        "passed": 49,
        "failed": 0,
        "flaky": 2,
        "skipped": 0,
        "passRate": 96,
        "date": "Oct 28 2026, 04:05",
        "source": "CI · stage.realwired.com",
        "status": "unstable",
        "note": "Revision Report Submission recovered after the request list timed out. The revised delivery date recovered after the page closed mid-click on a vendor link"
      },
      {
        "suite": "Authentication",
        "passed": 21,
        "failed": 0,
        "flaky": 0,
        "skipped": 2,
        "passRate": 100,
        "date": "Oct 28 2026, 04:05",
        "source": "CI · stage.realwired.com",
        "status": "passing",
        "note": "Admin, JM, and LO setup passed · 2 skipped (invalid password, lockout)"
      },
      {
        "suite": "General Settings",
        "passed": 8,
        "failed": 0,
        "flaky": 0,
        "skipped": 0,
        "passRate": 100,
        "date": "Oct 28 2026, 04:05",
        "source": "CI · stage.realwired.com",
        "status": "passing",
        "note": "Default Filter By Status and Parachute standalone passed"
      },
      {
        "suite": "Module regression",
        "passed": 214,
        "failed": 2,
        "flaky": 0,
        "skipped": 3,
        "passRate": 99,
        "date": "Oct 28 2026, 04:05",
        "source": "CI · stage.realwired.com",
        "status": "unstable",
        "note": "RWT-497 is still red. Bulk bid cancel timed out opening the project. Notes advanced search and the vendor selectability matrix stayed skipped"
      }
    ],
    "specs": [
      {
        "file": "modules/bulk-bid/bulk-bid-send-cancel-lifecycle.spec.js",
        "passed": 9,
        "failed": 1,
        "flaky": 0,
        "skipped": 0,
        "note": "Cancel solicitation timed out opening the project detail page"
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
        "note": "Revision Report Submission recovered on retry — the request list timed out loading"
      },
      {
        "file": "request-lifecycle/report-submission/report-deliverydate-revised.spec.js",
        "passed": 0,
        "failed": 0,
        "flaky": 1,
        "skipped": 0,
        "note": "Recovered on retry — the page closed mid-click on a vendor link"
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
        "file": "GeneralSettings/ParachuteStandaloneSwitch.spec.js",
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
        "file": "modules/k-reports/transaction-report-drillthrough.spec.js",
        "passed": 1,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/k-reports/transaction-report.spec.js",
        "passed": 9,
        "failed": 0,
        "flaky": 0,
        "skipped": 0
      },
      {
        "file": "modules/market-area/market-area-crud-smoke.spec.js",
        "passed": 7,
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
        "file": "modules/vendor/vendor-search-smoke.spec.js",
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
        "file": "modules/zip-code-management/zip-code-management-regression.spec.js",
        "passed": 6,
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
        "file": "request-lifecycle/request-actions/reject-request-twostep.spec.js",
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
  }
];
