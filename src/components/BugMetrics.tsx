import { useState } from "react";
import { Bug, ChevronDown, ChevronRight, ExternalLink } from "lucide-react";
import type { BugPeriodMetrics } from "../data/metrics";

export function BugMetrics({ metrics }: { metrics: BugPeriodMetrics }) {
  const {
    periodLabel,
    periodRange,
    detected,
    resolved,
    openFromPeriod,
    resolutionRatePercent,
    contextNote,
    tickets,
  } = metrics;
  const [ticketsOpen, setTicketsOpen] = useState(false);
  const openTickets =
    tickets?.filter((ticket) => ticket.status.toLowerCase() !== "done") ?? [];
  const openCount = openTickets.length > 0 ? openTickets.length : openFromPeriod;
  const readyForProdCount = openTickets.filter(
    (ticket) => ticket.status.toLowerCase() === "ready for prod",
  ).length;

  const openHint =
    openCount > 0
      ? `${readyForProdCount}/${openCount} are in Ready for PROD`
      : resolutionRatePercent !== null
        ? `${resolutionRatePercent}% currently Done`
        : "See context note";

  return (
    <section className="rounded-2xl border border-border bg-surface-raised p-6">
      <div className="mb-5 flex items-center gap-2">
        <Bug className="h-5 w-5 text-warning" />
        <div>
          <h2 className="text-lg font-semibold text-text">Bugs Detected & Resolved</h2>
          <p className="mt-0.5 text-sm text-text-muted">
            {periodLabel} · {periodRange}
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Detected" value={detected} />
        <Stat label="Resolved / Done" value={resolved} />
        <Stat
          label="Still open (from period)"
          value={openFromPeriod}
          hint={openHint}
        />
      </div>

      <p className="mt-4 text-xs leading-relaxed text-text-muted">{contextNote}</p>

      {tickets && tickets.length > 0 && (
        <div className="mt-6 border-t border-border-subtle pt-5">
          <button
            type="button"
            onClick={() => setTicketsOpen((open) => !open)}
            className="flex w-full items-center justify-between gap-3 rounded-xl border border-border-subtle bg-surface-overlay px-4 py-3 text-left"
            aria-expanded={ticketsOpen}
          >
            <div className="flex items-center gap-2">
              {ticketsOpen ? (
                <ChevronDown className="h-4 w-4 text-text-muted" />
              ) : (
                <ChevronRight className="h-4 w-4 text-text-muted" />
              )}
              <span className="text-xs font-medium tracking-wide text-text-muted uppercase">
                Bug Tickets In This Sprint
              </span>
              <span className="rounded bg-surface px-2 py-0.5 font-mono text-[11px] text-text-muted">
                {tickets.length}
              </span>
            </div>
            <span className="text-xs text-text-muted">{ticketsOpen ? "Hide" : "Show"}</span>
          </button>

          {ticketsOpen && (
            <ul className="mt-3 divide-y divide-border-subtle overflow-hidden rounded-xl border border-border-subtle">
              {tickets.map((ticket) => (
                <li key={ticket.key} className="bg-surface-overlay px-4 py-3">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
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
                        <span
                          className={
                            ticket.status.toLowerCase() === "done"
                              ? "rounded bg-success/15 px-2 py-0.5 text-[11px] font-medium text-success"
                              : "rounded bg-surface px-2 py-0.5 text-[11px] text-text-muted"
                          }
                        >
                          {ticket.status}
                        </span>
                      </div>
                      <p className="mt-1 text-sm leading-snug text-text">{ticket.summary}</p>
                    </div>
                    <div className="shrink-0 text-xs text-text-muted sm:text-right">
                      <p>Created {ticket.created}</p>
                      <p>{ticket.reporter}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  );
}

function Stat({ label, value, hint }: { label: string; value: number; hint?: string }) {
  return (
    <div className="rounded-xl border border-border-subtle bg-surface-overlay p-4">
      <p className="text-xs font-medium tracking-wide text-text-muted uppercase">{label}</p>
      <p className="mt-2 text-3xl font-bold text-text">{value}</p>
      {hint && <p className="mt-1 text-xs text-text-muted">{hint}</p>}
    </div>
  );
}
