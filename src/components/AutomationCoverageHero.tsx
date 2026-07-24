import { Target } from "lucide-react";
import { automationRunSummary } from "../data/metrics";

function CoverageMetric({
  title,
  subtitle,
  current,
  previous,
  target,
  accentClass,
  barClass,
  markerClass,
}: {
  title: string;
  subtitle: string;
  current: number;
  previous?: number;
  target: number;
  accentClass: string;
  barClass: string;
  markerClass: string;
}) {
  const progressPct = Math.min(100, Math.round((current / target) * 100));
  const markerLeft = Math.min(target, 100);

  return (
    <div>
      <div className="mb-3">
        <h3 className="text-base font-semibold text-text">{title}</h3>
        <p className="mt-0.5 text-sm text-text-muted">{subtitle}</p>
      </div>

      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-3xl font-bold tracking-tight text-text">{current}%</p>
          {previous != null && (
            <p className="mt-1 text-sm text-success">
              +{current - previous}% from {previous}%
            </p>
          )}
        </div>
        <div className="text-right">
          <p className={`text-sm font-medium ${accentClass}`}>{target}% target</p>
          <p className="text-xs text-text-muted">
            {current >= target
              ? `${current - target} pts past target`
              : `${target - current} pts remaining`}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <div className="mb-2 flex justify-between text-xs text-text-muted">
          <span>Progress toward target</span>
          <span>{progressPct}% of goal</span>
        </div>
        <div className="relative h-3 overflow-hidden rounded-full bg-surface">
          <div
            className={`absolute inset-y-0 left-0 rounded-full transition-all ${barClass}`}
            style={{ width: `${Math.min(current, 100)}%` }}
          />
          <div
            className={`absolute inset-y-0 w-0.5 ${markerClass}`}
            style={{ left: `${markerLeft}%` }}
            title={`${target}% target`}
          />
        </div>
        <div className="mt-1 flex justify-end">
          <span className="text-[10px] text-text-muted">▲ {target}% target</span>
        </div>
      </div>
    </div>
  );
}

export function AutomationCoverageHero() {
  return (
    <section className="rounded-2xl border border-violet-400/20 bg-gradient-to-br from-violet-400/10 to-surface-raised p-6">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-text">YouConnect Automation Coverage</h2>
          <p className="mt-1 text-sm text-text-muted">
            Application-wide and critical workflow coverage · Playwright
          </p>
        </div>
        <Target className="h-5 w-5 shrink-0 text-violet-400" />
      </div>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
        <CoverageMetric
          title="Overall Automation Coverage"
          subtitle={`App-wide · target ${automationRunSummary.appWideAutomationTargetPercent}%`}
          current={automationRunSummary.appWideAutomationPercent}
          target={automationRunSummary.appWideAutomationTargetPercent}
          accentClass="text-accent"
          barClass="bg-accent"
          markerClass="bg-accent/60"
        />
        <CoverageMetric
          title="Critical Workflow Automation Coverage"
          subtitle={`Request Lifecycle · target ${automationRunSummary.criticalWorkflowAutomationTargetPercent}%`}
          current={automationRunSummary.criticalWorkflowAutomationMid}
          previous={automationRunSummary.criticalWorkflowAutomationPrevious}
          target={automationRunSummary.criticalWorkflowAutomationTargetPercent}
          accentClass="text-violet-400"
          barClass="bg-violet-500"
          markerClass="bg-violet-300"
        />
      </div>
    </section>
  );
}
