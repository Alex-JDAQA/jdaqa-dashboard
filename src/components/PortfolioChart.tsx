import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { executiveSummary, portfolioByMonth } from "../data/metrics";

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

  const row = portfolioByMonth.find((m) => m.month === label);

  return (
    <div className="rounded-xl border border-border bg-surface-overlay px-4 py-3 shadow-xl">
      <p className="mb-1 text-sm font-semibold text-text">{label}</p>
      {row && (
        <p className="mb-2 text-xs text-text-muted">
          {row.period === "post-qa" ? "Post-QA" : "Pre-QA"} · {row.resolutionRate}% resolution rate
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
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-text">Portfolio Issue Throughput</h2>
        <p className="mt-1 text-sm text-text-muted">
          Combined created vs. resolved · YP + YCVC + RM + ARF
        </p>
        <p className="mt-2 text-xs leading-relaxed text-text-muted">
          {executiveSummary.narrative}
        </p>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={portfolioByMonth} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="#2a3347" strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#8b95a8", fontSize: 11 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#8b95a8", fontSize: 12 }}
            />
            <Tooltip content={<ChartTooltip />} />
            <Legend
              wrapperStyle={{ paddingTop: 16 }}
              formatter={(value) => (
                <span className="text-sm text-text-muted">{value}</span>
              )}
            />
            <ReferenceLine x="Jan 26" stroke="#3b82f6" strokeDasharray="4 4" label="" />
            <Bar dataKey="created" name="Created" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            <Bar dataKey="resolved" name="Resolved" fill="#22c55e" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 flex flex-wrap gap-4 text-xs text-text-muted">
        <span>
          Pre-QA avg: <strong className="text-text">{executiveSummary.preQa.avgResolvedPerMonth}/mo</strong> resolved
        </span>
        <span>
          Post-QA avg: <strong className="text-success">{executiveSummary.postQa.avgResolvedPerMonth}/mo</strong> resolved
        </span>
        <span className="text-accent">{executiveSummary.inflectionPoint}</span>
      </div>
    </section>
  );
}
