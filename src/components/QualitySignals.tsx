import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  ExternalLink,
  ShieldAlert,
} from "lucide-react";
import { isHighPriority } from "../data/sprintTickets";
import {
  openHighBugs,
  postQaWait,
  qaBounce,
  severityMix,
  sprintQaBounceTickets,
  timeInQa,
  youConnectVolume,
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
              ? "Sprint 35 · bounce-back, post-QA wait, and open High bugs — Jira REST, not velocity"
              : "Year-to-date · severity, YouConnect defect volume, QA-lane dwell — Jira REST changelog / JQL"}
          </p>
        </div>
      </div>

      {isSprint ? <SprintQuality /> : <YtdQuality />}

      <p className="mt-5 text-xs leading-relaxed text-text-muted">
        {isSprint
          ? `${qaBounce.sourceNote} ${postQaWait.sourceNote} Median time in QA is the YTD process figure (visits ≥1 hour).`
          : `${youConnectVolume.sourceNote} ${severityMix.sourceNote} Escaped-to-prod is not on this board: Environment is empty on every YTD bug.`}
      </p>
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
          value={severityMix.openHighAndHighest}
          meaning="Product bugs created this year that are still open and marked High or Highest."
          hint={`${severityMix.openHighest} Highest · median age ${severityMix.medianAgeDays}d · YTD-created, still open`}
          accent="danger"
        />
        <Stat
          label="Median time in QA"
          value={timeInQa.medianDaysGe1h}
          unit="days"
          meaning="Typical time a ticket spends in QA Ready / QA In Progress. Sub-minute board clicks are excluded."
          hint="YTD process · visits lasting ≥1 hour (n=267)"
          accent="violet"
        />
      </div>
      <TicketFold tickets={sprintQaBounceTickets} label="Returned to the QA lane" />
      <TicketFold tickets={openHighBugs} label="Highest still open" />
    </div>
  );
}

function YtdQuality() {
  const highShare = Math.round(
    (severityMix.openHighAndHighest / severityMix.productOpenYtd) * 100,
  );

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat
          label="Open High / Highest"
          value={highShare}
          unit="%"
          meaning="Share of still-open YTD product bugs that are marked High or Highest."
          hint={`${severityMix.openHighAndHighest} of ${severityMix.productOpenYtd} still open · ${severityMix.openHighest} Highest · ${severityMix.agedOver30} older than 30 days`}
          accent="danger"
        />
        <Stat
          label="YouConnect share"
          value={youConnectVolume.sharePercent}
          unit="%"
          meaning="Share of YTD product bugs that are YouConnect product defects."
          hint={`${youConnectVolume.bugs} of ${youConnectVolume.productBugsYtd} product bugs · ${youConnectVolume.ypCount} YP · ${youConnectVolume.rwtCount} RWT`}
          accent="warning"
        />
        <Stat
          label="YouConnect still open"
          value={youConnectVolume.unresolvedPercent}
          unit="%"
          meaning="Share of those YouConnect product bugs that are still not Done. Not escaped-to-prod."
          hint={`${youConnectVolume.open} of ${youConnectVolume.bugs} still open · statusCategory != Done`}
          accent="amber"
        />
        <Stat
          label="QA bounce-back"
          value={qaBounce.bounceRatePercent}
          unit="%"
          meaning="Share of tickets that entered QA, left the lane, then came back later."
          hint={`${qaBounce.bouncedYtd} of ${qaBounce.enteredQaYtd} tickets that entered QA came back after leaving`}
          accent="amber"
        />
        <Stat
          label="Median time in QA"
          value={timeInQa.medianDaysGe1h}
          unit="days"
          meaning="Typical time a ticket spends in QA Ready / QA In Progress. Sub-minute board clicks are excluded."
          hint={`${timeInQa.subMinuteVisits} sub-minute board clicks excluded from ${timeInQa.completedVisits} visits`}
          accent="violet"
        />
      </div>

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
  meaning: string;
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
      <p className="mt-1 text-xs leading-relaxed text-text">{meaning}</p>
      <p className="mt-3 flex items-baseline gap-1">
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
