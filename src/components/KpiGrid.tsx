import { useState } from "react";
import {
  TrendingDown,
  TrendingUp,
  Minus,
  ChevronDown,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { isHighPriority, type KpiCard, type SprintTicket } from "../data/metrics";

export function KpiGrid({ cards }: { cards: KpiCard[] }) {
  return (
    <section aria-label="Key performance indicators">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((kpi) => (
          <KpiCardView key={kpi.id} kpi={kpi} />
        ))}
      </div>
    </section>
  );
}

function KpiCardView({ kpi }: { kpi: KpiCard }) {
  const [ticketsOpen, setTicketsOpen] = useState(false);
  const TrendIcon =
    kpi.trend === "up" ? TrendingUp : kpi.trend === "down" ? TrendingDown : Minus;
  const trendColor =
    kpi.trend === "up"
      ? "text-success"
      : kpi.trend === "down"
        ? "text-danger"
        : "text-text-muted";
  const hasTickets = Boolean(kpi.tickets && kpi.tickets.length > 0);

  return (
    <article
      className={`rounded-2xl border border-border bg-surface-raised p-5 transition-colors hover:border-border-subtle ${
        hasTickets && ticketsOpen ? "sm:col-span-2 xl:col-span-2" : ""
      }`}
    >
      <p className="text-sm font-medium text-text-muted">{kpi.label}</p>
      {kpi.description && (
        <p className="mt-1 text-xs leading-relaxed text-text">{kpi.description}</p>
      )}
      <div className="mt-3 flex items-baseline gap-1">
        <span className="text-3xl font-bold tracking-tight text-text">
          {typeof kpi.value === "number"
            ? kpi.unit === "%"
              ? kpi.value.toFixed(kpi.value % 1 === 0 ? 0 : 1)
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
        <p className="mt-2 text-xs leading-relaxed text-text-muted">{kpi.subtext}</p>
      )}

      {hasTickets && kpi.tickets && (
        <TicketList
          tickets={kpi.tickets}
          label={kpi.ticketsLabel ?? "Tickets"}
          open={ticketsOpen}
          onToggle={() => setTicketsOpen((open) => !open)}
        />
      )}
    </article>
  );
}

function TicketList({
  tickets,
  label,
  open,
  onToggle,
}: {
  tickets: SprintTicket[];
  label: string;
  open: boolean;
  onToggle: () => void;
}) {
  const sortedTickets = [...tickets].sort((a, b) => {
    const aHigh = isHighPriority(a.priority) ? 0 : 1;
    const bHigh = isHighPriority(b.priority) ? 0 : 1;
    return aHigh - bHigh;
  });
  const highCount = sortedTickets.filter((t) => isHighPriority(t.priority)).length;

  return (
    <div className="mt-4 border-t border-border-subtle pt-4">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-3 rounded-xl border border-border-subtle bg-surface-overlay px-3 py-2.5 text-left"
        aria-expanded={open}
      >
        <div className="flex items-center gap-2">
          {open ? (
            <ChevronDown className="h-4 w-4 shrink-0 text-text-muted" />
          ) : (
            <ChevronRight className="h-4 w-4 shrink-0 text-text-muted" />
          )}
          <span className="text-xs font-medium tracking-wide text-text-muted uppercase">
            {label}
          </span>
          <span className="rounded bg-surface px-2 py-0.5 font-mono text-[11px] text-text-muted">
            {tickets.length}
          </span>
          {highCount > 0 && (
            <span className="rounded border border-danger/30 bg-danger/10 px-2 py-0.5 text-[11px] font-medium text-danger">
              {highCount} High Priority
            </span>
          )}
        </div>
        <span className="text-xs text-text-muted">{open ? "Hide" : "Show"}</span>
      </button>

      {open && (
        <ul className="mt-3 max-h-80 divide-y divide-border-subtle overflow-y-auto rounded-xl border border-border-subtle">
          {sortedTickets.map((ticket) => (
            <li key={ticket.key} className="bg-surface-overlay px-3 py-2.5">
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
                {isHighPriority(ticket.priority) && (
                  <span className="rounded border border-danger/30 bg-danger/10 px-2 py-0.5 text-[11px] font-semibold tracking-wide text-danger uppercase">
                    High Priority
                  </span>
                )}
                <span className="rounded bg-surface px-2 py-0.5 text-[11px] text-text-muted">
                  {ticket.status}
                </span>
                {ticket.storyPoints != null && (
                  <span className="text-[11px] text-text-muted">
                    {ticket.storyPoints} Story Points
                  </span>
                )}
                {ticket.category && (
                  <span className="text-[11px] text-text-muted">{ticket.category}</span>
                )}
              </div>
              <p className="mt-1 text-sm leading-snug text-text">{ticket.summary}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
