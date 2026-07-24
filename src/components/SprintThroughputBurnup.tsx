import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  ExternalLink,
  TrendingUp,
} from "lucide-react";
import {
  sprintCurrentDeliveredTickets,
  sprintMeta,
  sprintThroughput,
} from "../data/metrics";

function paceLabel(deliveredPct: number, timePct: number) {
  const delta = deliveredPct - timePct;
  if (delta > 3) return { text: "Ahead of time", tone: "text-success" };
  if (delta < -3) return { text: "Behind time", tone: "text-warning" };
  return { text: "On pace", tone: "text-text-muted" };
}

export function SprintThroughputBurnup() {
  const [ticketsOpen, setTicketsOpen] = useState(false);
  const { currentSprint, previousSprint } = sprintMeta;
  const { deliveredItems, committedItems, daysElapsed, daysTotal, contextNote } =
    sprintThroughput;

  const deliveredPct = (deliveredItems / committedItems) * 100;
  const timePct = (daysElapsed / daysTotal) * 100;
  const remainingItems = committedItems - deliveredItems;
  const pace = paceLabel(deliveredPct, timePct);

  return (
    <section className="rounded-2xl border border-green-400/20 bg-gradient-to-br from-green-400/10 to-surface-raised p-6">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-text">
            Sprint Throughput · {currentSprint.name}
          </h2>
          <p className="mt-1 text-sm text-text-muted">
            {currentSprint.range} · Done-column burnup vs sprint commitment
          </p>
        </div>
        <TrendingUp className="h-5 w-5 shrink-0 text-success" />
      </div>

      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-4xl font-bold tracking-tight text-text">
            {Math.round(deliveredPct)}%
          </p>
          <p className="mt-1 text-sm text-text-muted">
            {deliveredItems} of {committedItems} committed items in Done
          </p>
        </div>
        <div className="text-right">
          <p className={`text-sm font-medium ${pace.tone}`}>{pace.text}</p>
          <p className="text-xs text-text-muted">
            Day {daysElapsed} of {daysTotal} · {previousSprint.name} closed{" "}
            {previousSprint.deliveredItems}
          </p>
        </div>
      </div>

      <div className="mt-5">
        <div className="mb-2 flex justify-between text-xs text-text-muted">
          <span>Burnup — items moved to Done</span>
          <span>{remainingItems} remaining</span>
        </div>
        <div className="relative h-4 overflow-hidden rounded-full bg-surface">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-success transition-all"
            style={{ width: `${deliveredPct}%` }}
            title={`${deliveredItems} items Done`}
          />
          <div
            className="absolute inset-y-0 z-10 w-0.5 bg-amber-300"
            style={{ left: `${timePct}%` }}
            title={`Day ${daysElapsed} of ${daysTotal}`}
          />
        </div>
        <div className="mt-2 flex justify-between text-[10px] text-text-muted">
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2 w-2 rounded-full bg-success" />
            Done ({deliveredItems})
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2 w-0.5 bg-amber-300" />
            Time elapsed (day {daysElapsed})
          </span>
          <span>{committedItems} committed</span>
        </div>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-text-muted">{contextNote}</p>

      {sprintCurrentDeliveredTickets.length > 0 && (
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
                Moved to Done this sprint
              </span>
              <span className="rounded bg-surface px-2 py-0.5 font-mono text-[11px] text-text-muted">
                {sprintCurrentDeliveredTickets.length}
              </span>
            </div>
            <span className="text-xs text-text-muted">{ticketsOpen ? "Hide" : "Show"}</span>
          </button>

          {ticketsOpen && (
            <ul className="mt-3 max-h-80 divide-y divide-border-subtle overflow-y-auto rounded-xl border border-border-subtle">
              {sprintCurrentDeliveredTickets.map((ticket) => (
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
                    {ticket.category && (
                      <span className="rounded bg-surface px-2 py-0.5 text-[11px] text-text-muted">
                        {ticket.category}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm leading-snug text-text">{ticket.summary}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  );
}
