import { TrendingDown, TrendingUp, Minus } from "lucide-react";
import { kpiCards } from "../data/metrics";

const accentMap = {
  blue: "border-accent/30 bg-accent/10 text-accent",
  green: "border-success/30 bg-success/10 text-success",
  amber: "border-warning/30 bg-warning/10 text-warning",
  violet: "border-violet-400/30 bg-violet-400/10 text-violet-400",
};

export function KpiGrid() {
  return (
    <section aria-label="Key performance indicators">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpiCards.map((kpi) => {
          const TrendIcon =
            kpi.trend === "up" ? TrendingUp : kpi.trend === "down" ? TrendingDown : Minus;
          const trendColor =
            kpi.trend === "up"
              ? "text-success"
              : kpi.trend === "down"
                ? "text-danger"
                : "text-text-muted";

          return (
            <article
              key={kpi.id}
              className="rounded-2xl border border-border bg-surface-raised p-5 transition-colors hover:border-border-subtle"
            >
              <p className="text-sm font-medium text-text-muted">{kpi.label}</p>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-3xl font-bold tracking-tight text-text">
                  {typeof kpi.value === "number"
                    ? kpi.unit === "%"
                      ? kpi.value.toFixed(1)
                      : Number.isInteger(kpi.value)
                        ? kpi.value
                        : kpi.value.toFixed(1)
                    : kpi.value}
                </span>
                {kpi.unit && kpi.unit !== "%" && (
                  <span className="text-lg font-medium text-text-muted">{kpi.unit}</span>
                )}
                {kpi.unit === "%" && (
                  <span className="text-lg font-medium text-text-muted">%</span>
                )}
              </div>
              {kpi.change !== undefined && (
                <div className={`mt-3 flex items-center gap-1.5 text-sm ${trendColor}`}>
                  <TrendIcon className="h-4 w-4" />
                  <span className="font-medium">
                    {kpi.change > 0 ? "+" : ""}
                    {kpi.change}%
                  </span>
                  {kpi.changeLabel && (
                    <span className="text-text-muted">{kpi.changeLabel}</span>
                  )}
                </div>
              )}
              {!kpi.change && kpi.changeLabel && (
                <p className="mt-3 text-xs text-text-muted">{kpi.changeLabel}</p>
              )}
              {kpi.subtext && (
                <p className="mt-2 text-xs text-text-muted">{kpi.subtext}</p>
              )}
              {kpi.impactSubmetric && (
                <p className="mt-3 rounded-lg border border-success/20 bg-success/5 px-2.5 py-2 text-xs leading-relaxed text-success">
                  {kpi.impactSubmetric}
                </p>
              )}
              {kpi.accent && kpi.change !== undefined && kpi.trend === "up" && (
                <div
                  className={`mt-4 inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${accentMap[kpi.accent]}`}
                >
                  Post-QA impact
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
