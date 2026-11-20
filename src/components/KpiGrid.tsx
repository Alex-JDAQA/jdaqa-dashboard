import { useState } from "react";
import {
  TrendingDown,
  TrendingUp,
  Minus,
  ChevronDown,
  ChevronRight,
  Check,
  ExternalLink,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  isHighPriority,
  type KpiCard,
  type KpiQuarter,
  type KpiShareSlice,
  type SprintTicket,
} from "../data/metrics";

export function KpiGrid({
  cards,
  columns = 4,
}: {
  cards: KpiCard[];
  columns?: 2 | 4;
}) {
  const grid =
    columns === 2 ? "grid gap-4 sm:grid-cols-2" : "grid gap-4 sm:grid-cols-2 xl:grid-cols-4";

  return (
    <section aria-label="Key performance indicators">
      <div className={grid}>
        {cards.map((kpi) => (
          <KpiCardView key={kpi.id} kpi={kpi} />
        ))}
      </div>
    </section>
  );
}

function formatSignedChange(change: number, unit?: string) {
  const rounded = Math.round(Math.abs(change) * 10) / 10;
  const text = Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
  const sign = change > 0 ? "+" : change < 0 ? "-" : "";
  if (!unit || unit === "%") return `${sign}${text}%`;
  return `${sign}${text} ${unit}`;
}

function trendClass(trend: KpiCard["trend"], lowerIsBetter?: boolean) {
  if (trend !== "up" && trend !== "down") return "text-text-muted";
  const improved = lowerIsBetter ? trend === "down" : trend === "up";
  return improved ? "text-success" : "text-danger";
}

function ChangeChip({ kpi, className = "mt-3" }: { kpi: KpiCard; className?: string }) {
  if (kpi.change === undefined) return null;
  const TrendIcon =
    kpi.trend === "up" ? TrendingUp : kpi.trend === "down" ? TrendingDown : Minus;

  return (
    <div className={`flex items-center gap-1.5 text-sm ${trendClass(kpi.trend, kpi.lowerIsBetter)} ${className}`}>
      <TrendIcon className="h-4 w-4" aria-hidden="true" />
      <span className="font-medium">{formatSignedChange(kpi.change, kpi.unit)}</span>
      {kpi.changeLabel && <span className="text-text-muted">{kpi.changeLabel}</span>}
    </div>
  );
}

function GoalBadge({ label, met }: { label: string; met: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${
        met
          ? "border-success/40 bg-success/15 text-success"
          : "border-border bg-surface-overlay text-text-muted"
      }`}
    >
      <span
        className={`flex h-4 w-4 items-center justify-center rounded-full ${
          met ? "bg-success text-surface" : "border border-border-subtle bg-surface"
        }`}
        aria-hidden="true"
      >
        {met && <Check className="h-2.5 w-2.5" strokeWidth={3} />}
      </span>
      {met && <span className="sr-only">Met. </span>}
      Goal {label}
    </span>
  );
}

function KpiCardView({ kpi }: { kpi: KpiCard }) {
  const [ticketsOpen, setTicketsOpen] = useState(false);
  const hasTickets = Boolean(kpi.tickets && kpi.tickets.length > 0);
  const hasQuarters = Boolean(kpi.quarters && kpi.quarters.length > 0);

  return (
    <article
      className={`rounded-2xl border border-border bg-surface-raised p-5 transition-colors hover:border-border-subtle ${
        hasTickets && ticketsOpen ? "sm:col-span-2 xl:col-span-2" : ""
      }`}
    >
      {hasQuarters ? (
        <QuarterMetric kpi={kpi} />
      ) : (
      <>
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
      </>
      )}
      {!hasQuarters && <ChangeChip kpi={kpi} />}
      {!hasQuarters && !kpi.change && kpi.changeLabel && (
        <p className="mt-3 text-xs text-text-muted">{kpi.changeLabel}</p>
      )}
      {!hasQuarters && kpi.contextLines && kpi.contextLines.length > 0 && (
        <ul className="mt-3 space-y-1.5">
          {kpi.contextLines.map((line) => (
            <li key={line} className="text-xs leading-relaxed text-text">
              {line}
            </li>
          ))}
        </ul>
      )}
      {!hasQuarters && kpi.subtext && (
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

const shareColor: Record<string, string> = {
  YouConnect: "#3b82f6",
  Parachute: "#f59e0b",
  "Vendor Circle": "#a78bfa",
  "Customer banks": "#22c55e",
  MUFG: "#f87171",
  "Client self-serve": "#38bdf8",
  Reporting: "#94a3b8",
  Onboarding: "#fb7185",
  Other: "#64748b",
};

function formatShare(count: number, total: number) {
  const numeric = Math.round((count / total) * 1000) / 10;
  const text = Number.isInteger(numeric) ? String(numeric) : numeric.toFixed(1);
  return `${text}%`;
}

function ShareBreakdown({ slices }: { slices: KpiShareSlice[] }) {
  const [open, setOpen] = useState(false);
  const total = slices.reduce((sum, slice) => sum + slice.count, 0);
  const youConnect = slices.find((slice) => slice.label === "YouConnect");
  const rest = slices
    .filter((slice) => slice.label !== "YouConnect")
    .sort((a, b) => b.count - a.count);
  const ordered = youConnect ? [...rest, youConnect] : rest;

  return (
    <div className="mt-3">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="flex w-full cursor-pointer items-center justify-between gap-2 rounded-lg border border-border bg-surface-overlay px-2.5 py-1.5 text-left text-xs font-medium text-text"
      >
        <span>Where the rest sits</span>
        <ChevronDown
          className={`h-3.5 w-3.5 shrink-0 text-text-muted transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>
      {open && (
        <div className="mt-2 rounded-lg border border-border-subtle bg-surface-overlay p-2.5">
          <div className="flex h-2 overflow-hidden rounded-full bg-surface" aria-hidden="true">
            {ordered.map((slice) => (
              <div
                key={slice.label}
                style={{
                  width: `${total === 0 ? 0 : (slice.count / total) * 100}%`,
                  background: shareColor[slice.label] ?? "#64748b",
                }}
              />
            ))}
          </div>
          <ul className="mt-2 space-y-1.5">
            {rest.map((slice) => (
              <ShareRow key={slice.label} slice={slice} total={total} />
            ))}
            {youConnect && (
              <ShareRow slice={youConnect} total={total} mark="This metric" divider />
            )}
          </ul>
          <p className="mt-2 text-[11px] leading-relaxed text-text-muted">
            Shares of the {total} product bugs in this quarter. YouConnect is counted first.
          </p>
        </div>
      )}
    </div>
  );
}

function ShareRow({
  slice,
  total,
  mark,
  divider,
}: {
  slice: KpiShareSlice;
  total: number;
  mark?: string;
  divider?: boolean;
}) {
  return (
    <li className={`flex items-center gap-2 text-xs ${divider ? "border-t border-border-subtle pt-1.5" : ""}`}>
      <span
        className="h-2 w-2 shrink-0 rounded-full"
        style={{ background: shareColor[slice.label] ?? "#64748b" }}
        aria-hidden="true"
      />
      <span className="min-w-0 flex-1 text-text">
        {slice.label}
        {mark && <span className="text-text-muted"> · {mark}</span>}
      </span>
      <span className="tabular-nums text-text-muted">{slice.count}</span>
      <span className="w-12 text-right font-medium tabular-nums text-text">
        {formatShare(slice.count, total)}
      </span>
    </li>
  );
}

function QuarterMetric({ kpi }: { kpi: KpiCard }) {
  const quarters = kpi.quarters ?? [];
  const current = quarters.find((quarter) => quarter.current) ?? quarters[quarters.length - 1];
  const [selectedLabel, setSelectedLabel] = useState(current.label);
  const selected = quarters.find((quarter) => quarter.label === selectedLabel) ?? current;
  const options = [current, ...[...quarters].reverse().filter((quarter) => quarter.label !== current.label)];
  const palette = {
    blue: { active: "#3b82f6", quiet: "#1e3a5f", current: "#1d4ed8" },
    green: { active: "#22c55e", quiet: "#14532d", current: "#166534" },
    amber: { active: "#f59e0b", quiet: "#78350f", current: "#b45309" },
    violet: { active: "#8b5cf6", quiet: "#4c1d95", current: "#6d28d9" },
    danger: { active: "#ef4444", quiet: "#7f1d1d", current: "#b91c1c" },
  } as const;
  const tone = palette[kpi.accent ?? "blue"];

  const barFill = (quarter: KpiQuarter) => {
    if (quarter.label === selected.label) return tone.active;
    if (quarter.current && selected.label !== current.label) return tone.current;
    return tone.quiet;
  };

  return (
    <div>
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-text-muted">{kpi.label}</p>
        <label className="shrink-0">
          <span className="sr-only">Quarter</span>
          <select
            value={selected.label}
            onChange={(event) => setSelectedLabel(event.target.value)}
            className="cursor-pointer rounded-lg border border-border bg-surface-overlay px-2.5 py-1.5 text-xs font-medium text-text"
          >
            {options.map((quarter) => (
              <option key={quarter.label} value={quarter.label}>
                {quarter.label}
                {quarter.note ? ` · ${quarter.note}` : ""}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-3xl font-bold tracking-tight text-text">{selected.value}</span>
        {kpi.unit && kpi.unit !== "%" && (
          <span className="text-lg font-medium text-text-muted">{kpi.unit}</span>
        )}
        <span className="text-sm text-text-muted">
          {selected.label}
          {selected.current ? " · current" : ""}
          {selected.note ? ` · ${selected.note}` : ""}
        </span>
      </div>
      {(kpi.goal || (selected.current && kpi.change !== undefined)) && (
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
          {kpi.goal && (
            <GoalBadge
              label={kpi.goal.label}
              met={
                (kpi.lowerIsBetter
                  ? selected.numeric <= kpi.goal.value
                  : selected.numeric >= kpi.goal.value)
              }
            />
          )}
          {selected.current && <ChangeChip kpi={kpi} className="" />}
        </div>
      )}
      {(selected.detail ?? kpi.subtext) && (
        <p className="mt-1 text-xs text-text-muted">{selected.detail ?? kpi.subtext}</p>
      )}
      {selected.mix && selected.mix.length > 0 && <ShareBreakdown slices={selected.mix} />}

      <div className="mt-4 h-32">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={quarters}
            margin={{ top: kpi.goal ? 16 : 8, right: 4, left: -18, bottom: 0 }}
            onClick={(state) => {
              const label = state?.activeLabel;
              if (typeof label === "string" && quarters.some((quarter) => quarter.label === label)) {
                setSelectedLabel(label);
              }
            }}
          >
            <CartesianGrid stroke="#2a3347" strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#8b95a8", fontSize: 11 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#8b95a8", fontSize: 11 }}
              width={36}
            />
            <Tooltip
              cursor={{ fill: "rgba(255,255,255,0.04)" }}
              content={({ active: tipActive, payload }) => {
                if (!tipActive || !payload?.length) return null;
                const row = payload[0].payload as KpiQuarter;
                return (
                  <div className="rounded-lg border border-border bg-surface-overlay px-2.5 py-1.5 text-xs text-text">
                    {row.label} · {row.value}
                    {row.note ? ` · ${row.note}` : ""}
                  </div>
                );
              }}
            />
            {kpi.goal && (
              <ReferenceLine
                y={kpi.goal.value}
                stroke="#22c55e"
                strokeDasharray="3 3"
                ifOverflow="extendDomain"
                label={{
                  value: `Goal ${kpi.goal.label}`,
                  position: "insideTopLeft",
                  fill: "#22c55e",
                  fontSize: 11,
                }}
              />
            )}
            <Bar dataKey="numeric" radius={[4, 4, 0, 0]} minPointSize={4} cursor="pointer">
              {quarters.map((quarter) => (
                <Cell key={quarter.label} fill={barFill(quarter)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
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
  const noQaCount = sortedTickets.filter((t) => t.noQaRequired).length;

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
          {noQaCount > 0 && (
            <span className="rounded border border-accent/30 bg-accent-soft px-2 py-0.5 text-[11px] font-medium text-accent">
              {noQaCount} NoQAReq
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
                {ticket.noQaRequired && (
                  <span
                    className="rounded border border-accent/30 bg-accent-soft px-2 py-0.5 text-[11px] font-semibold tracking-wide text-accent uppercase"
                    title="Does not need QA"
                  >
                    NoQAReq
                  </span>
                )}
                <span className="rounded bg-surface px-2 py-0.5 text-[11px] text-text-muted">
                  {ticket.status}
                </span>
                {ticket.qaOwner && (
                  <span className="text-[11px] text-text-muted">QA Owner: {ticket.qaOwner}</span>
                )}
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
