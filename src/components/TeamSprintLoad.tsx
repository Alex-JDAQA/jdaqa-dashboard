import { ExternalLink, Users } from "lucide-react";
import { sprintOrmProgress } from "../data/metrics";

export function TeamSprintLoad() {
  const ormPct = Math.round((sprintOrmProgress.done / sprintOrmProgress.totalModules) * 100);
  const sprint29Total =
    sprintOrmProgress.sprint29Done.length +
    sprintOrmProgress.sprint29InQa.length +
    sprintOrmProgress.sprint29Todo.length;
  const sprint29DonePct = Math.round(
    (sprintOrmProgress.sprint29Done.length / sprint29Total) * 100,
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

      <div className="grid gap-3 sm:grid-cols-3">
        <Stat label="Done" value={sprintOrmProgress.done} tone="success" />
        <Stat label="In QA" value={sprintOrmProgress.inQa} tone="warning" />
        <Stat label="Queued" value={sprintOrmProgress.todo} tone="muted" />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-border-subtle bg-surface-overlay p-4">
          <p className="text-xs font-medium tracking-wide text-text-muted uppercase">
            Shipped last sprint (Sprint 28)
          </p>
          <ul className="mt-2 space-y-1">
            {sprintOrmProgress.sprint28Delivered.map((item) => (
              <li key={item} className="text-sm text-text">
                · {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-border-subtle bg-surface-overlay p-4">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-medium tracking-wide text-text-muted uppercase">
              Sprint 29 progress
            </p>
            <span className="text-xs text-text-muted">
              {sprintOrmProgress.sprint29Done.length}/{sprint29Total} Done · {sprint29DonePct}%
            </span>
          </div>
          <ModuleGroup
            label="Done"
            items={sprintOrmProgress.sprint29Done}
            tone="success"
          />
          <ModuleGroup
            label="In QA"
            items={sprintOrmProgress.sprint29InQa}
            tone="warning"
          />
          <ModuleGroup
            label="To Do"
            items={sprintOrmProgress.sprint29Todo}
            tone="muted"
          />
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-border-subtle bg-surface-overlay p-4">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-medium tracking-wide text-text-muted uppercase">
            Backlog · To Do
          </p>
          <span className="text-xs text-text-muted">
            {sprintOrmProgress.backlogTodo.length} modules · Sprint 30+
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
