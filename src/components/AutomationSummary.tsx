import type { ComponentType } from "react";
import { Bot, FlaskConical, Target, Workflow } from "lucide-react";
import { automationSummary } from "../data/metrics";

export function AutomationSummary() {
  const progress = Math.round(
    (automationSummary.criticalWorkflowAutomationMid /
      automationSummary.criticalWorkflowAutomationMax) *
      100
  );

  return (
    <section className="flex h-full flex-col rounded-2xl border border-border bg-surface-raised p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-text">Automation Overview</h2>
        <p className="mt-1 text-sm text-text-muted">Playwright · Request Lifecycle focus</p>
      </div>

      <div className="flex flex-1 flex-col gap-5">
        <div className="rounded-xl border border-border-subtle bg-surface-overlay p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-muted">Critical workflow automation</span>
            <span className="text-2xl font-bold text-text">
              {automationSummary.criticalWorkflowAutomationMin}–
              {automationSummary.criticalWorkflowAutomationMax}%
            </span>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-surface">
            <div
              className="h-full rounded-full bg-violet-500 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-text-muted">
            Manual critical flow coverage: {automationSummary.manualCriticalCoverage}%
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <StatCard icon={Workflow} label="Spec Files" value={automationSummary.totalSpecFiles} />
          <StatCard icon={FlaskConical} label="Automated Tests" value={automationSummary.totalAutomatedTests} />
          <StatCard icon={Bot} label="Smoke Regression" value={automationSummary.requestLifecycleSmoke} isText />
          <StatCard icon={Target} label="ORM Automation" value={automationSummary.ormAutomationStatus} isText />
        </div>

        <div className="rounded-xl border border-border-subtle bg-surface-overlay p-4">
          <p className="text-sm font-medium text-text">Stabilization Focus</p>
          <ul className="mt-2 space-y-1">
            {automationSummary.stabilizationFocus.map((item) => (
              <li key={item} className="text-xs text-text-muted">
                · {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto rounded-xl border border-warning/20 bg-warning/5 p-4">
          <p className="text-sm font-medium text-warning">CI/CD Integration</p>
          <p className="mt-1 text-xs text-text-muted">{automationSummary.ciStatus}</p>
        </div>
      </div>
    </section>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  isText,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: number | string;
  isText?: boolean;
}) {
  return (
    <div className="rounded-xl border border-border-subtle bg-surface-overlay p-3">
      <Icon className="mb-2 h-4 w-4 text-violet-400" />
      <p className={`font-bold text-text ${isText ? "text-sm" : "text-xl"}`}>{value}</p>
      <p className="text-xs text-text-muted">{label}</p>
    </div>
  );
}
