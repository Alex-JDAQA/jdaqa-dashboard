import { useState } from "react";
import { ChevronDown, ChevronRight, FlaskConical, PlayCircle } from "lucide-react";
import {
  automationRunResults,
  automationRunSpecDetails,
  automationRunSummary,
  latestPlaywrightRun,
} from "../data/metrics";
import {
  earlierPlaywrightRuns,
  type PlaywrightRunSnapshot,
} from "../data/playwrightRunHistory";
import { recentPlaywrightRuns } from "../data/playwrightRecentRuns";

const playwrightRuns: PlaywrightRunSnapshot[] = [
  ...recentPlaywrightRuns,
  {
    id: "39478846592",
    label: "20 Oct 2026, 18:55 UTC · 97.1% · 5 failed",
    ...latestPlaywrightRun,
    suites: automationRunResults,
    specs: automationRunSpecDetails,
  },
  ...earlierPlaywrightRuns,
];

const statusStyles = {
  passing: "border-success/20 bg-success/10 text-success",
  unstable: "border-warning/20 bg-warning/10 text-warning",
  failing: "border-danger/20 bg-danger/10 text-danger",
  planned: "border-border-subtle bg-surface text-text-muted",
};

export function AutomationRunResults() {
  const [specsOpen, setSpecsOpen] = useState(false);
  const [runId, setRunId] = useState(playwrightRuns[0].id);
  const run = playwrightRuns.find((item) => item.id === runId) ?? playwrightRuns[0];

  const executed = run.passed + run.failed + run.flaky;

  return (
    <section className="flex h-full flex-col rounded-2xl border border-border bg-surface-raised p-6">
      <div className="mb-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="text-lg font-semibold text-text">Automation Run Results</h2>
            <p className="mt-1 text-sm font-medium text-text">{run.title}</p>
            <p className="mt-0.5 text-xs text-text-muted">{run.subtitle}</p>
          </div>
          <PlayCircle className="h-5 w-5 shrink-0 text-violet-400" />
        </div>
        <label className="mt-3 block">
          <span className="mb-1 block text-[10px] font-medium tracking-wide text-text-muted uppercase">
            Run
          </span>
          <select
            value={run.id}
            onChange={(event) => {
              setRunId(event.target.value);
              setSpecsOpen(false);
            }}
            className="w-full cursor-pointer rounded-lg border border-border bg-surface-overlay px-2.5 py-2 text-xs font-medium text-text"
          >
            {playwrightRuns.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-5">
        <RunMeta label="Environment" value={run.environment} />
        <RunMeta label="Started" value={run.startedAt} />
        <RunMeta
          label="Duration"
          value={run.durationMin < 1 ? "under 1 min" : `${run.durationMin} min`}
        />
        <RunMeta label="Tests" value={String(run.totalTests)} />
        <RunMeta
          label="Pass rate"
          value={executed === 0 ? "—" : `${run.passRatePercent}%`}
          subtext={run.passRateNote}
          className="sm:col-span-2 lg:col-span-1"
        />
      </div>

      <div
        className={`mb-4 grid grid-cols-2 gap-2 ${run.skipped > 0 ? "sm:grid-cols-4" : "sm:grid-cols-3"}`}
      >
        <MiniStat label="Passed" value={run.passed} tone="success" />
        <MiniStat label="Failed" value={run.failed} tone="danger" />
        <MiniStat label="Flaky" value={run.flaky} tone="warning" />
        {run.skipped > 0 && <MiniStat label="Skipped" value={run.skipped} tone="muted" />}
      </div>

      <p className="mb-4 rounded-lg border border-accent/20 bg-accent/5 px-3 py-2 text-xs leading-relaxed text-text-muted">
        {run.updateNote}
      </p>

      <div className="mb-4 space-y-2">
        <p className="text-xs font-medium tracking-wide text-text-muted uppercase">
          {run.failed > 0 ? `Reading the ${run.failed} failures` : "Why this run stopped"}
        </p>
        {run.failureBreakdown.map((item) => (
          <div
            key={item.label}
            className="rounded-lg border border-border-subtle bg-surface-overlay px-3 py-2"
          >
            <p className="text-xs font-medium text-text">
              <span className="text-danger">{item.count} {item.label}</span>
            </p>
            <p className="mt-1 text-xs leading-relaxed text-text-muted">{item.detail}</p>
          </div>
        ))}
        {run.flaky > 0 && (
          <p className="rounded-lg border border-warning/20 bg-warning/5 px-3 py-2 text-xs leading-relaxed text-text-muted">
            <span className="font-medium text-warning">Flaky {run.flaky} recovered on retry</span>
            {" — "}
            {run.flakyNote.replace(/^\d+ recovered on retry — /, "")}
          </p>
        )}
      </div>

      {run.suites.length > 0 && (
        <p className="mb-2 text-xs font-medium tracking-wide text-text-muted uppercase">
          By suite
        </p>
      )}
      <ul className="space-y-2">
        {run.suites.map((suite) => {
          const suiteExecuted = suite.passed + suite.failed + (suite.flaky ?? 0);

          return (
          <li
            key={suite.suite}
            className="rounded-xl border border-border-subtle bg-surface-overlay px-3 py-2.5"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-text">{suite.suite}</p>
                <p className="text-xs text-text-muted">
                  {suite.passed} passed
                  {suite.failed > 0 && ` · ${suite.failed} failed`}
                  {(suite.flaky ?? 0) > 0 && ` · ${suite.flaky} flaky`}
                  {suite.skipped > 0 && ` · ${suite.skipped} skipped`}
                  {" · "}
                  {suite.date}
                </p>
              </div>
              <span
                className={`shrink-0 rounded-full border px-2 py-0.5 text-xs font-medium ${statusStyles[suite.status]}`}
              >
                {suiteExecuted === 0 ? "skipped" : `${suite.passRate}%`}
              </span>
            </div>
            {suite.note && (
              <p className="mt-2 text-xs leading-relaxed text-text-muted">{suite.note}</p>
            )}
          </li>
          );
        })}
      </ul>

      {run.specs.length > 0 && (
      <div className="mt-4 border-t border-border-subtle pt-4">
        <button
          type="button"
          onClick={() => setSpecsOpen((open) => !open)}
          className="flex w-full items-center justify-between gap-3 rounded-xl border border-border-subtle bg-surface-overlay px-3 py-2.5 text-left"
          aria-expanded={specsOpen}
        >
          <div className="flex items-center gap-2">
            {specsOpen ? (
              <ChevronDown className="h-4 w-4 text-text-muted" />
            ) : (
              <ChevronRight className="h-4 w-4 text-text-muted" />
            )}
            <span className="text-xs font-medium tracking-wide text-text-muted uppercase">
              Per-spec breakdown
            </span>
            <span className="rounded bg-surface px-2 py-0.5 font-mono text-[11px] text-text-muted">
              {run.specs.length}
            </span>
          </div>
          <span className="text-xs text-text-muted">{specsOpen ? "Hide" : "Show"}</span>
        </button>

        {specsOpen && (
          <ul className="mt-3 max-h-96 space-y-1.5 overflow-y-auto">
            {run.specs.map((spec) => {
              const total = spec.passed + spec.failed + spec.flaky + spec.skipped;
              const hasIssue = spec.failed > 0 || spec.flaky > 0;

              return (
                <li
                  key={spec.file}
                  className={`rounded-lg border px-3 py-2 text-xs ${
                    hasIssue
                      ? "border-warning/20 bg-warning/5"
                      : "border-border-subtle bg-surface-overlay"
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="min-w-0 font-mono text-[11px] text-text">{spec.file}</p>
                    <div className="flex shrink-0 gap-2 text-text-muted">
                      <span className="text-success">{spec.passed} passed</span>
                      {spec.failed > 0 && <span className="text-danger">{spec.failed} failed</span>}
                      {spec.flaky > 0 && <span className="text-warning">{spec.flaky} flaky</span>}
                      {spec.skipped > 0 && <span>{spec.skipped} skipped</span>}
                      <span className="text-text-muted">/ {total}</span>
                    </div>
                  </div>
                  {spec.note && (
                    <p className="mt-1 leading-relaxed text-text-muted">{spec.note}</p>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
      )}

      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2 text-xs text-text-muted">
          <FlaskConical className="h-3.5 w-3.5 text-violet-400" />
          <span>
            {run.specs.length} specs · {run.totalTests} tests · target{" "}
            {automationRunSummary.appWideAutomationTargetPercent}% app-wide automation
          </span>
        </div>
        <p className="text-xs text-text-muted">{run.reportSource}</p>
        <p className="text-xs text-violet-400">
          {run.title} · {run.startedAt} · {run.durationMin < 1 ? "under 1 min" : `${run.durationMin} min`}
        </p>
      </div>
    </section>
  );
}

function RunMeta({
  label,
  value,
  subtext,
  className = "",
}: {
  label: string;
  value: string;
  subtext?: string;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl border border-border-subtle bg-surface-overlay px-3 py-2 ${className}`}
    >
      <p className="text-[10px] font-medium tracking-wide text-text-muted uppercase">{label}</p>
      <p className="mt-0.5 text-xs font-medium text-text">{value}</p>
      {subtext && <p className="mt-0.5 text-[10px] text-text-muted">{subtext}</p>}
    </div>
  );
}

function MiniStat({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "success" | "danger" | "warning" | "muted";
}) {
  const toneClass =
    tone === "success"
      ? "text-success"
      : tone === "danger"
        ? "text-danger"
        : tone === "warning"
          ? "text-warning"
          : "text-text-muted";

  return (
    <div className="rounded-xl border border-border-subtle bg-surface-overlay p-3 text-center">
      <p className={`text-lg font-bold ${toneClass}`}>{value}</p>
      <p className="text-xs text-text-muted">{label}</p>
    </div>
  );
}
