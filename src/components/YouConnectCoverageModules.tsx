import { Layers } from "lucide-react";
import {
  appWideCoverageBreakdown,
  arfAutomationAreas,
  youConnectAppWideAreas,
  type AppWideCoverageDepth,
} from "../data/metrics";

const DEPTH_META: Record<
  AppWideCoverageDepth,
  { label: string; hint: string; badge: string; countClass: string }
> = {
  full: {
    label: "Full",
    hint: "CRUD or the real workflow is automated",
    badge: "bg-success/15 text-success",
    countClass: "text-success",
  },
  partial: {
    label: "Partial",
    hint: "List/smoke only — the main product action is still manual",
    badge: "bg-warning/15 text-warning",
    countClass: "text-warning",
  },
  none: {
    label: "None",
    hint: "In the program; no Playwright spec yet",
    badge: "bg-surface text-text-muted",
    countClass: "text-text-muted",
  },
};

function ModuleGroup({
  depth,
  areas,
}: {
  depth: AppWideCoverageDepth;
  areas: { id: string; name: string; note: string }[];
}) {
  const meta = DEPTH_META[depth];
  if (areas.length === 0) return null;

  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className={`rounded px-2 py-0.5 text-[11px] font-semibold tracking-wide uppercase ${meta.badge}`}>
            {meta.label}
          </span>
          <span className="text-xs text-text-muted">{meta.hint}</span>
        </div>
        <span className={`font-mono text-sm font-semibold ${meta.countClass}`}>{areas.length}</span>
      </div>
      <ul className="grid gap-px overflow-hidden rounded-xl border border-border-subtle bg-border-subtle sm:grid-cols-2">
        {areas.map((area) => (
          <li key={area.id} className="bg-surface-overlay px-3 py-2">
            <p className="text-sm font-medium text-text">{area.name}</p>
            <p className="mt-0.5 text-xs leading-snug text-text-muted">{area.note}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function YouConnectCoverageModules() {
  const depths: AppWideCoverageDepth[] = ["full", "partial", "none"];

  return (
    <section className="rounded-2xl border border-border bg-surface-raised p-6">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-text">What the {appWideCoverageBreakdown.percent}% includes</h2>
          <p className="mt-1 text-sm text-text-muted">
            {appWideCoverageBreakdown.full} full + {appWideCoverageBreakdown.partial} × 0.5 partial
            {" ÷ "}
            {appWideCoverageBreakdown.areaCount} in-scope modules = {appWideCoverageBreakdown.percent}%.
            Leftover Sugar surfaces (Construction, Comps, Evaluations, Workgroups, and similar) were never in
            this program and are not in the denominator.
          </p>
        </div>
        <Layers className="h-5 w-5 shrink-0 text-accent" />
      </div>

      <div className="space-y-5">
        {depths.map((depth) => (
          <ModuleGroup
            key={depth}
            depth={depth}
            areas={youConnectAppWideAreas.filter((area) => area.depth === depth)}
          />
        ))}
      </div>

      <div className="mt-6 border-t border-border-subtle pt-5">
        <h3 className="text-sm font-semibold text-text">Parachute / AI Review Forms (ARF)</h3>
        <p className="mt-1 text-xs leading-relaxed text-text-muted">
          YouConnect-embedded order workflow — same Playwright suite, not Parachute Standalone. Template
          Editor is still manual and is not counted against the 100% order-program figure.
        </p>
        <div className="mt-3 space-y-5">
          {depths.map((depth) => (
            <ModuleGroup
              key={`arf-${depth}`}
              depth={depth}
              areas={arfAutomationAreas.filter((area) => area.depth === depth)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
