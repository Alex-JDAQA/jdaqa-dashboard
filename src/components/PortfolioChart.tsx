import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { throughputChartMonths, throughputNarrative } from "../data/metrics";

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;

  const row = throughputChartMonths.find((m) => m.month === label);

  return (
    <div className="rounded-xl border border-border bg-surface-overlay px-4 py-3 shadow-xl">
      <p className="mb-1 text-sm font-semibold text-text">{label}</p>
      {row && (
        <p className="mb-2 text-xs text-text-muted">
          {row.resolutionRate}% of intake reached Ready for PROD or Done
        </p>
      )}
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2 text-sm">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-text-muted">{entry.name}:</span>
          <span className="font-medium text-text">{entry.value}</span>
        </div>
      ))}
    </div>
  );
}

export function PortfolioChart() {
  return (
    <section className="rounded-2xl border border-border bg-surface-raised p-6">
      <div className="mb-6 flex items-start gap-2">
        <TrendingUp className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
        <div>
          <h2 className="text-lg font-semibold text-text">Project Throughput</h2>
          <p className="mt-1 text-sm text-text-muted">
            Created vs Ready for PROD or Done · RWT Consolidated · May – Nov 20, 2026
          </p>
          <p className="mt-2 text-xs leading-relaxed text-text-muted">
            {throughputNarrative.description}
          </p>
        </div>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={throughputChartMonths} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="#2a3347" strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#8b95a8", fontSize: 11 }}
            />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: "#8b95a8", fontSize: 12 }} />
            <Tooltip content={<ChartTooltip />} />
            <Legend
              wrapperStyle={{ paddingTop: 16 }}
              formatter={(value) => <span className="text-sm text-text-muted">{value}</span>}
            />
            <Bar dataKey="created" name="Created" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            <Bar dataKey="resolved" name="Ready for PROD or Done" fill="#22c55e" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 border-t border-border-subtle pt-5">
        <p className="mb-3 text-xs font-medium tracking-wide text-text-muted uppercase">
          Month by month
        </p>
        <div className="grid grid-cols-2 gap-2 text-center text-xs sm:grid-cols-4 lg:grid-cols-7">
          {throughputChartMonths.map((month) => (
            <div key={month.month} className="rounded-lg bg-surface p-2">
              <p className="text-text-muted">{month.month}</p>
              <p className="mt-1 font-semibold text-warning">{month.created} created</p>
              <p className="font-semibold text-success">{month.resolved} ready or done</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 space-y-2 text-xs text-text-muted">
        <p className="text-accent">{throughputNarrative.highlight}</p>
        <p className="rounded-lg border border-border-subtle bg-surface-overlay px-3 py-2 leading-relaxed">
          {throughputNarrative.contextNote}
        </p>
      </div>
    </section>
  );
}
