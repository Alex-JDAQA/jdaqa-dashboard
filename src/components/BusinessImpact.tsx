import { ArrowRight, Sparkles, TrendingUp } from "lucide-react";
import { businessImpact } from "../data/metrics";

const accentStyles = {
  blue: {
    border: "border-accent/20",
    bg: "bg-accent/[0.07]",
    metric: "text-accent",
    glow: "shadow-[inset_0_1px_0_0_rgba(59,130,246,0.12)]",
    dot: "bg-accent",
  },
  green: {
    border: "border-success/20",
    bg: "bg-success/[0.07]",
    metric: "text-success",
    glow: "shadow-[inset_0_1px_0_0_rgba(34,197,94,0.12)]",
    dot: "bg-success",
  },
  violet: {
    border: "border-violet-400/20",
    bg: "bg-violet-400/[0.07]",
    metric: "text-violet-400",
    glow: "shadow-[inset_0_1px_0_0_rgba(167,139,250,0.12)]",
    dot: "bg-violet-400",
  },
  amber: {
    border: "border-warning/20",
    bg: "bg-warning/[0.07]",
    metric: "text-warning",
    glow: "shadow-[inset_0_1px_0_0_rgba(245,158,11,0.12)]",
    dot: "bg-warning",
  },
};

export function BusinessImpact() {
  return (
    <section
      aria-label="Business impact summary"
      className="relative isolate overflow-hidden rounded-2xl border border-accent/15 bg-[#111620] shadow-[0_0_0_1px_rgba(59,130,246,0.06),0_12px_40px_-12px_rgba(0,0,0,0.55),0_0_64px_-20px_rgba(59,130,246,0.18)]"
    >
      {/* Left accent rail */}
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-accent via-success/80 to-violet-400"
      />

      {/* Ambient background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_100%_0%,rgba(59,130,246,0.12),transparent_55%),radial-gradient(ellipse_50%_60%_at_0%_100%,rgba(34,197,94,0.08),transparent_50%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-border-subtle to-transparent"
      />

      <div className="relative px-6 py-7 pl-7 sm:px-8 sm:py-8 sm:pl-9">
        <div className="mb-8 flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-accent/25 bg-gradient-to-br from-accent/20 to-accent/5 shadow-[0_0_20px_-4px_rgba(59,130,246,0.35)]">
            <Sparkles className="h-5 w-5 text-accent" />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-text sm:text-3xl">
              Business Impact
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-text-muted sm:text-[15px]">
              {businessImpact.summary}
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
          {businessImpact.pillars.map((pillar) => {
            const style = accentStyles[pillar.accent];

            return (
              <article
                key={pillar.id}
                className={`group rounded-xl border ${style.border} ${style.bg} ${style.glow} p-4 transition-colors hover:border-white/10`}
              >
                <div className="flex items-center gap-2">
                  <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
                  <p className="text-[11px] font-semibold tracking-wide text-text-muted uppercase">
                    {pillar.title}
                  </p>
                </div>
                <p className={`mt-3 text-2xl font-bold tracking-tight ${style.metric}`}>
                  {pillar.metric}
                </p>
                {pillar.metricDetail && (
                  <p className="mt-1 text-xs font-medium text-text-muted/90">
                    {pillar.metricDetail}
                  </p>
                )}
                <p className="mt-3 border-t border-white/[0.04] pt-3 text-xs leading-relaxed text-text-muted">
                  {pillar.description}
                </p>
              </article>
            );
          })}
        </div>

        <div className="mt-6 grid gap-3 rounded-xl border border-white/[0.06] bg-surface-overlay/50 p-4 backdrop-blur-sm sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:gap-5">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-success/10">
              <TrendingUp className="h-4 w-4 text-success" />
            </div>
            <div>
              <p className="text-[11px] font-semibold tracking-wide text-success uppercase">
                Inflection point
              </p>
              <p className="mt-1 text-sm leading-relaxed text-text-muted">
                {businessImpact.inflectionPoint}
              </p>
            </div>
          </div>

          <div
            aria-hidden
            className="hidden h-10 w-px bg-gradient-to-b from-transparent via-border to-transparent sm:block"
          />

          <div className="flex items-start gap-3 sm:flex-row-reverse sm:text-right">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10">
              <ArrowRight className="h-4 w-4 text-accent" />
            </div>
            <div>
              <p className="text-[11px] font-semibold tracking-wide text-accent uppercase">
                Looking ahead
              </p>
              <p className="mt-1 text-sm leading-relaxed text-text-muted">
                {businessImpact.forwardLook}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
