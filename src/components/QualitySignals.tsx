import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  ExternalLink,
  ShieldAlert,
} from "lucide-react";
import { KpiGrid } from "./KpiGrid";
import { isHighPriority } from "../data/sprintTickets";
import {
  openHighBugs,
  postQaWait,
  postQaWaitTickets,
  qaBounce,
  qualityQuarterCards,
  sprintOpenHigh,
  sprintOpenHighBugs,
  sprintQaBounceTickets,
  timeInQa,
  type QualityTicket,
} from "../data/qualityMetrics";

export function QualitySignals({ view }: { view: "sprint" | "ytd" }) {
  const isSprint = view === "sprint";

  return (
    <section className="rounded-2xl border border-border bg-surface-raised p-6">
      <div className="mb-5 flex items-start gap-2">
        <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-warning" />
        <div>
          <h2 className="text-lg font-semibold text-text">Quality signals</h2>
          <p className="mt-0.5 text-sm text-text-muted">
            {isSprint
              ? `${sprintOpenHigh.sprintName} · bounce-back, post-QA wait, and open High bugs`
              : "By quarter"}
          </p>
        </div>
      </div>

      {isSprint ? <SprintQuality /> : <YtdQuality />}

      {!isSprint && (
        <p className="mt-5 text-xs text-text-muted">
          Jira REST · November 20, 2026. Bounce-back and time in QA were last counted October 30.
        </p>
      )}
    </section>
  );
}

function SprintQuality() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat
          label="Returned to QA"
          value={`${qaBounce.sprintReturnedToQa}/${qaBounce.sprintInQa}`}
          meaning="Tickets in the current QA lane that already left QA once and came back."
          hint="Changelog return visits · moving between QA Ready and QA In Progress is not a bounce"
          accent="warning"
        />
        <Stat
          label="Waiting past QA"
          value={postQaWait.total}
          meaning="Work that already passed QA and is sitting in Ready for Stage or Ready for PROD."
          hint={`${postQaWait.readyForStage} Stage · ${postQaWait.readyForProd} PROD · ${postQaWait.highBugsInReadyForProd} High bugs in Ready for PROD`}
          accent="amber"
        />
        <Stat
          label="Open High / Highest"
          value={sprintOpenHigh.openHighAndHighest}
          meaning={`${sprintOpenHigh.sprintName} product bugs that are still open and marked High or Highest.`}
          hint={`${sprintOpenHigh.openHighest} Highest · ${sprintOpenHigh.openHigh} High · median age ${sprintOpenHigh.medianAgeDays}d · status not Done`}
          accent="danger"
        />
        <Stat
          label="Median time in QA"
          value={timeInQa.medianDaysGe1h}
          unit="days"
          meaning="Typical time a ticket spends in QA Ready / QA In Progress. Sub-minute board clicks are excluded."
          hint={`YTD process · visits lasting ≥1 hour (n=${timeInQa.visitsAtLeastOneHour})`}
          accent="violet"
        />
      </div>
      <TicketFold tickets={sprintQaBounceTickets} label="Returned to the QA lane" />
      <TicketFold tickets={postQaWaitTickets} label="Waiting past QA" />
      <TicketFold tickets={sprintOpenHighBugs} label="Open High / Highest in this sprint" />
    </div>
  );
}

function YtdQuality() {
  return (
    <div className="space-y-5">
      <KpiGrid cards={qualityQuarterCards} columns={2} />
      <TicketFold tickets={openHighBugs} label="Highest still open" />
    </div>
  );
}

function Stat({
  label,
  value,
  unit,
  meaning,
  hint,
  accent,
}: {
  label: string;
  value: string | number;
  unit?: string;
  meaning?: string;
  hint: string;
  accent: "warning" | "amber" | "danger" | "violet";
}) {
  const bar =
    accent === "danger"
      ? "border-danger/30"
      : accent === "violet"
        ? "border-violet-500/30"
        : "border-warning/30";

  return (
    <div className={`rounded-xl border bg-surface-overlay p-4 ${bar}`}>
      <p className="text-xs font-medium tracking-wide text-text-muted uppercase">{label}</p>
      {meaning && <p className="mt-1 text-xs leading-relaxed text-text">{meaning}</p>}
      <p className={`flex items-baseline gap-1 ${meaning ? "mt-3" : "mt-2"}`}>
        <span className="text-3xl font-bold text-text">
          {typeof value === "number" && unit === "%"
            ? value.toFixed(value % 1 === 0 ? 0 : 1)
            : value}
        </span>
        {unit && <span className="text-sm text-text-muted">{unit}</span>}
      </p>
      <p className="mt-2 text-xs leading-relaxed text-text-muted">{hint}</p>
    </div>
  );
}

function TicketFold({ tickets, label }: { tickets: QualityTicket[]; label: string }) {
  const [open, setOpen] = useState(false);
  const highCount = tickets.filter((t) => isHighPriority(t.priority)).length;

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between gap-3 rounded-xl border border-border-subtle bg-surface-overlay px-4 py-3 text-left"
        aria-expanded={open}
      >
        <div className="flex items-center gap-2">
          {open ? (
            <ChevronDown className="h-4 w-4 text-text-muted" />
          ) : (
            <ChevronRight className="h-4 w-4 text-text-muted" />
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
        <ul className="mt-3 divide-y divide-border-subtle overflow-hidden rounded-xl border border-border-subtle">
          {tickets.map((ticket) => (
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
                {isHighPriority(ticket.priority) && (
                  <span className="rounded border border-danger/30 bg-danger/10 px-2 py-0.5 text-[11px] font-semibold tracking-wide text-danger uppercase">
                    {ticket.priority ?? "High Priority"}
                  </span>
                )}
                <span className="rounded bg-surface px-2 py-0.5 text-[11px] text-text-muted">
                  {ticket.status}
                </span>
                {ticket.qaOwner && (
                  <span className="text-[11px] text-text-muted">QA Owner: {ticket.qaOwner}</span>
                )}
                {ticket.ageDays != null && (
                  <span className="text-[11px] text-text-muted">{ticket.ageDays}d open</span>
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
