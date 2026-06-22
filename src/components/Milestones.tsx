import { milestones } from "../data/metrics";

export function Milestones() {
  return (
    <section className="rounded-2xl border border-border bg-surface-raised p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-text">Partnership Timeline</h2>
        <p className="mt-1 text-sm text-text-muted">
          JDAQA milestones with RealWired · January – June 2025
        </p>
      </div>

      <div className="relative">
        <div className="absolute top-3 left-0 hidden h-0.5 w-full bg-border sm:block" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {milestones.map((milestone, index) => (
            <article key={milestone.date} className="relative">
              <div className="mb-3 flex items-center gap-3">
                <div className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 border-accent bg-surface-raised">
                  <div className="h-2 w-2 rounded-full bg-accent" />
                </div>
                <time className="font-mono text-xs font-medium text-accent">{milestone.date}</time>
              </div>
              <div className="rounded-xl border border-border-subtle bg-surface-overlay p-4 sm:ml-0">
                <h3 className="font-semibold text-text">{milestone.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-text-muted">
                  {milestone.description}
                </p>
                {index === milestones.length - 1 && (
                  <span className="mt-3 inline-flex rounded-full bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent">
                    Current
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
