import { useState } from "react";
import { ChevronDown, ChevronRight, ExternalLink, Users } from "lucide-react";
import { sprintMeta, sprintOrmProgress } from "../data/metrics";

export function TeamSprintLoad() {
  const [completedOpen, setCompletedOpen] = useState(false);
  const ormPct = Math.round((sprintOrmProgress.done / sprintOrmProgress.totalModules) * 100);
  const windowTotal =
    sprintOrmProgress.currentWindowDone.length +
    sprintOrmProgress.currentWindowInQa.length +
    sprintOrmProgress.currentWindowInProgress.length;
  const windowDonePct = Math.round(
    (sprintOrmProgress.currentWindowDone.length / windowTotal) * 100,
  );

  return (
    <section className="rounded-2xl border border-border bg-surface-raised p-6">
      <div className="mb-5 flex items-center gap-2">
        <Users className="h-5 w-5 text-accent" />
        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-semibold text-text">ORM Automation · Team Progress</h2>
          <p className="mt-0.5 text-sm text-text-muted">
            Epic{" "}
            <a
              href={sprintOrmProgress.epicUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-mono text-accent hover:underline"
            >
              {sprintOrmProgress.epic}
              <ExternalLink className="h-3 w-3" />
            </a>{" "}
            · {sprintOrmProgress.epicTitle}
          </p>
        </div>
      </div>

      <div className="mb-5 rounded-xl border border-border-subtle bg-surface-overlay p-4">
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm text-text-muted">Modules automated (epic total)</span>
          <span className="text-lg font-bold text-text">
            {sprintOrmProgress.done}/{sprintOrmProgress.totalModules}
            <span className="ml-2 text-sm font-medium text-text-muted">({ormPct}%)</span>
          </span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-surface">
          <div className="h-full rounded-full bg-violet-500" style={{ width: `${ormPct}%` }} />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-4">
        <Stat label="Done" value={sprintOrmProgress.done} tone="success" />
        <Stat label="In QA" value={sprintOrmProgress.inQa} tone="warning" />
        <Stat label="In dev" value={sprintOrmProgress.inProgress} tone="muted" />
        <Stat label="Queued" value={sprintOrmProgress.todo} tone="muted" />
      </div>

      <div className="mt-4">
        <button
          type="button"
          onClick={() => setCompletedOpen((open) => !open)}
          className="flex w-full items-center justify-between gap-3 rounded-xl border border-border-subtle bg-surface-overlay px-3 py-2.5 text-left"
          aria-expanded={completedOpen}
        >
          <div className="flex items-center gap-2">
            {completedOpen ? (
              <ChevronDown className="h-4 w-4 shrink-0 text-text-muted" />
            ) : (
              <ChevronRight className="h-4 w-4 shrink-0 text-text-muted" />
            )}
            <span className="text-xs font-medium tracking-wide text-text-muted uppercase">
              Completed modules
            </span>
            <span className="rounded bg-surface px-2 py-0.5 font-mono text-[11px] text-text-muted">
              {sprintOrmProgress.completedModules.length}
            </span>
          </div>
          <span className="text-xs text-text-muted">{completedOpen ? "Hide" : "Show"}</span>
        </button>

        {completedOpen && (
          <ul className="mt-3 grid max-h-80 gap-px overflow-y-auto rounded-xl border border-border-subtle bg-border-subtle sm:grid-cols-2">
            {sprintOrmProgress.completedModules.map((mod) => (
              <li key={mod.key} className="bg-surface-overlay px-3 py-2">
                <a
                  href={mod.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-accent hover:underline"
                >
                  {mod.key}
                  <ExternalLink className="h-3 w-3" />
                </a>
                <p className="mt-0.5 text-sm leading-snug text-text">{mod.summary}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-border-subtle bg-surface-overlay p-4">
          <p className="text-xs font-medium tracking-wide text-text-muted uppercase">
            {`Closed in prior window (${sprintMeta.previousSprint.range})`}
          </p>
          <ul className="mt-2 space-y-1">
            {sprintOrmProgress.priorWindowDelivered.map((item) => (
              <li key={item} className="text-sm text-text">
                · {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-border-subtle bg-surface-overlay p-4">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-medium tracking-wide text-text-muted uppercase">
              {sprintMeta.currentSprint.name} progress
            </p>
            <span className="text-xs text-text-muted">
              {sprintOrmProgress.currentWindowDone.length}/{windowTotal} Done · {windowDonePct}%
            </span>
          </div>
          <ModuleGroup
            label="Done"
            items={sprintOrmProgress.currentWindowDone}
            tone="success"
          />
          <ModuleGroup
            label="In QA"
            items={sprintOrmProgress.currentWindowInQa}
            tone="warning"
          />
          {sprintOrmProgress.currentWindowInProgress.length > 0 && (
            <ModuleGroup
              label="In dev"
              items={sprintOrmProgress.currentWindowInProgress}
              tone="muted"
            />
          )}
        </div>
      </div>

      {sprintOrmProgress.backlogTodo.length > 0 && (
        <div className="mt-4 rounded-xl border border-border-subtle bg-surface-overlay p-4">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-medium tracking-wide text-text-muted uppercase">
              Backlog · To Do
            </p>
            <span className="text-xs text-text-muted">
              {sprintOrmProgress.backlogTodo.length} modules
            </span>
          </div>
          <ul className="mt-3 grid gap-1 sm:grid-cols-2 lg:grid-cols-3">
            {sprintOrmProgress.backlogTodo.map((item) => (
              <li key={item} className="text-sm text-text">
                · {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="mt-4 rounded-lg border border-border-subtle bg-surface-overlay px-3 py-2 text-xs leading-relaxed text-text-muted">
        {sprintOrmProgress.contextNote}
      </p>
    </section>
  );
}

function ModuleGroup({
  label,
  items,
  tone,
}: {
  label: string;
  items: string[];
  tone: "success" | "warning" | "muted";
}) {
  const toneClass =
    tone === "success"
      ? "text-success"
      : tone === "warning"
        ? "text-warning"
        : "text-text-muted";

  return (
    <div className="mt-3">
      <p className={`text-[11px] font-medium tracking-wide uppercase ${toneClass}`}>
        {label} · {items.length}
      </p>
      <ul className="mt-1 space-y-0.5">
        {items.map((item) => (
          <li key={item} className="text-sm text-text">
            · {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "success" | "warning" | "muted";
}) {
  const valueClass =
    tone === "success"
      ? "text-success"
      : tone === "warning"
        ? "text-warning"
        : "text-text";

  return (
    <div className="rounded-xl border border-border-subtle bg-surface-overlay p-4 text-center">
      <p className={`text-2xl font-bold ${valueClass}`}>{value}</p>
      <p className="mt-1 text-xs text-text-muted">{label}</p>
    </div>
  );
}
