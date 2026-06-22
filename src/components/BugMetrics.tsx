import { Bug, TrendingDown, TrendingUp } from "lucide-react";
import { bugMetrics } from "../data/metrics";

export function BugMetrics() {
  return (
    <section className="rounded-2xl border border-border bg-surface-raised p-6">
      <div className="mb-6 flex items-center gap-2">
        <Bug className="h-5 w-5 text-warning" />
        <div>
          <h2 className="text-lg font-semibold text-text">Bug Detection & Resolution</h2>
          <p className="mt-0.5 text-sm text-text-muted">Pre-QA vs. post-QA comparison</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {bugMetrics.map((metric) => {
          const TrendIcon = metric.trend === "up" ? TrendingUp : TrendingDown;
          const trendColor = metric.trend === "up" ? "text-accent" : "text-warning";

          return (
            <article
              key={metric.label}
              className="rounded-xl border border-border-subtle bg-surface-overlay p-5"
            >
              <h3 className="font-semibold text-text">{metric.label}</h3>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium tracking-wide text-text-muted uppercase">Pre-QA</p>
                  <p className="mt-1 text-2xl font-bold text-text">{metric.preQaTotal}</p>
                  <p className="text-xs text-text-muted">~{metric.preQaMonthly}/month</p>
                </div>
                <div>
                  <p className="text-xs font-medium tracking-wide text-text-muted uppercase">Post-QA</p>
                  <p className="mt-1 text-2xl font-bold text-text">{metric.postQaTotal}</p>
                  <p className="text-xs text-text-muted">~{metric.postQaMonthly}/month</p>
                </div>
              </div>
              <div className={`mt-4 flex items-center gap-1.5 text-sm font-medium ${trendColor}`}>
                <TrendIcon className="h-4 w-4" />
                <span>
                  {metric.changePercent > 0 ? "+" : ""}
                  {metric.changePercent}%
                </span>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-text-muted">{metric.interpretation}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
