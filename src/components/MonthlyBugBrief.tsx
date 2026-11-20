import { ExternalLink } from "lucide-react";
import type { BugMixSlice, MonthlyBugBrief } from "../data/metrics";

const severityColor: Record<string, string> = {
  Highest: "bg-danger",
  High: "bg-warning",
  Medium: "bg-accent",
  Low: "bg-text-muted",
};

const pipelineColor: Record<string, string> = {
  Done: "bg-success",
  "Ready for PROD": "bg-accent",
  "Ready for Stage": "bg-warning",
  Review: "bg-[#a78bfa]",
  "In Progress": "bg-[#38bdf8]",
  Hold: "bg-[#94a3b8]",
  "To Do": "bg-text-muted",
};

export function MonthlyBugBrief({ brief }: { brief: MonthlyBugBrief }) {
  return (
    <section className="rounded-2xl border border-border bg-surface-raised p-6">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-text">{brief.monthLabel} bug trends</h2>
        <p className="mt-0.5 text-sm text-text-muted">
          {brief.rangeLabel} · product bugs
        </p>
      </div>

      <p className="max-w-3xl text-sm leading-relaxed text-text">{brief.headline}</p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {brief.stats.map((stat) => (
          <Stat key={stat.label} label={stat.label} value={stat.value} hint={stat.hint} />
        ))}
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <Mix title="How serious" slices={brief.severity} colors={severityColor} />
        <Mix title="Where they sit" slices={brief.pipeline} colors={pipelineColor} />
      </div>

      <div className="mt-5 grid gap-3 lg:grid-cols-2">
        {brief.themes.map((theme) => (
          <article
            key={theme.id}
            className="rounded-xl border border-border-subtle bg-surface-overlay p-4"
          >
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="text-sm font-semibold text-text">{theme.title}</h3>
              <p className="text-2xl font-bold text-text">{theme.count}</p>
            </div>
            <p className="mt-1 text-sm leading-snug text-text">{theme.summary}</p>
            {theme.area && (
              <p className="mt-2 text-xs leading-relaxed text-text-muted">{theme.area}</p>
            )}
            <ul className="mt-3 space-y-2">
              {theme.lines.map((line) => (
                <li
                  key={`${line.label}-${line.issue}`}
                  className="flex items-start justify-between gap-3 border-t border-border-subtle pt-2"
                >
                  <p className="min-w-0 text-xs leading-snug">
                    <span className="font-medium text-text">{line.label}</span>
                    <span className="text-text-muted"> — {line.issue}</span>
                  </p>
                  <span className={`shrink-0 text-[11px] ${statusClass(line.status)}`}>
                    {line.status}
                  </span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="mt-5">
        <p className="mb-3 text-xs font-medium tracking-wide text-text-muted uppercase">
          High and still open
        </p>
        <ul className="divide-y divide-border-subtle overflow-hidden rounded-xl border border-border-subtle">
          {brief.watch.map((ticket) => (
            <li key={ticket.key} className="bg-surface-overlay px-4 py-3">
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={ticket.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-accent hover:underline"
                >
                  {ticket.key}
                  <ExternalLink className="h-3 w-3" />
                </a>
                <span className="rounded border border-danger/30 bg-danger/10 px-2 py-0.5 text-[11px] font-semibold tracking-wide text-danger uppercase">
                  {ticket.priority}
                </span>
                <span className="rounded bg-surface px-2 py-0.5 text-[11px] text-text-muted">
                  {ticket.status}
                </span>
              </div>
              <p className="mt-1 text-sm leading-snug text-text">{ticket.summary}</p>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-text-muted">{brief.sourceNote}</p>
    </section>
  );
}

function statusClass(status: string) {
  if (status.startsWith("Done")) return "text-success";
  if (status.includes("High")) return "text-danger";
  return "text-text-muted";
}

function Stat({ label, value, hint }: { label: string; value: number; hint: string }) {
  return (
    <div className="rounded-xl border border-border-subtle bg-surface-overlay p-4">
      <p className="text-xs font-medium tracking-wide text-text-muted uppercase">{label}</p>
      <p className="mt-2 text-3xl font-bold text-text">{value}</p>
      <p className="mt-1 text-xs leading-relaxed text-text-muted">{hint}</p>
    </div>
  );
}

function Mix({
  title,
  slices,
  colors,
}: {
  title: string;
  slices: BugMixSlice[];
  colors: Record<string, string>;
}) {
  const total = slices.reduce((sum, slice) => sum + slice.count, 0);

  return (
    <div className="rounded-xl border border-border-subtle bg-surface-overlay p-4">
      <p className="text-xs font-medium tracking-wide text-text-muted uppercase">{title}</p>
      <div className="mt-3 flex h-2.5 overflow-hidden rounded-full bg-surface">
        {slices.map((slice) => (
          <div
            key={slice.label}
            className={colors[slice.label] ?? "bg-text-muted"}
            style={{ width: `${total === 0 ? 0 : (slice.count / total) * 100}%` }}
            title={`${slice.count} ${slice.label}`}
          />
        ))}
      </div>
      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
        {slices.map((slice) => (
          <li key={slice.label} className="flex items-center gap-1.5 text-xs text-text-muted">
            <span
              className={`h-2 w-2 rounded-full ${colors[slice.label] ?? "bg-text-muted"}`}
            />
            <span className="font-medium text-text">{slice.count}</span>
            {slice.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
