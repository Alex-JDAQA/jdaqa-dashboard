import { useState } from "react";
import { ChevronDown, ChevronRight, Bug } from "lucide-react";
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
import { bugsByMonth, bugsByProject } from "../data/metrics";

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

  return (
    <div className="rounded-xl border border-border bg-surface-overlay px-4 py-3 shadow-xl">
      <p className="mb-2 text-sm font-semibold text-text">{label}</p>
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

export function BugTrendChart() {
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  const toggleProject = (projectId: string) => {
    setExpandedProject((current) => (current === projectId ? null : projectId));
  };

  return (
    <section className="rounded-2xl border border-border bg-surface-raised p-6">
      <div className="mb-5 flex items-center gap-2">
        <Bug className="h-5 w-5 text-warning" />
        <div>
          <h2 className="text-lg font-semibold text-text">Bugs Detected & Resolved</h2>
          <p className="mt-0.5 text-sm text-text-muted">
            Year-to-date · portfolio-wide · Jan – Jul 2026
          </p>
        </div>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={bugsByMonth} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
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
            <Bar dataKey="detected" name="Detected" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            <Bar dataKey="resolved" name="Resolved" fill="#22c55e" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-4 rounded-lg border border-border-subtle bg-surface-overlay px-3 py-2 text-xs leading-relaxed text-text-muted">
        Detected = Bug tickets whose Jira Created date falls in that month. YTD values are
        placeholders pending a verified Jira pull.
      </p>

      <div className="mt-6 border-t border-border-subtle pt-5">
        <p className="mb-3 text-xs font-medium tracking-wide text-text-muted uppercase">
          Per-project breakdown
        </p>
        <div className="space-y-2">
          {bugsByProject.map((project) => {
            const isExpanded = expandedProject === project.projectId;
            const ytdDetected = project.months.reduce((sum, m) => sum + m.detected, 0);
            const ytdResolved = project.months.reduce((sum, m) => sum + m.resolved, 0);

            return (
              <div
                key={project.projectId}
                className="rounded-xl border border-border-subtle bg-surface-overlay"
              >
                <button
                  type="button"
                  onClick={() => toggleProject(project.projectId)}
                  className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-center gap-2">
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4 text-text-muted" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-text-muted" />
                    )}
                    <span className="rounded bg-accent/10 px-2 py-0.5 font-mono text-xs font-medium text-accent">
                      {project.shortName}
                    </span>
                    <span className="text-sm font-medium text-text">{project.projectName}</span>
                  </div>
                  <div className="flex gap-4 text-xs text-text-muted">
                    <span>
                      <span className="font-semibold text-warning">{ytdDetected}</span> detected
                    </span>
                    <span>
                      <span className="font-semibold text-success">{ytdResolved}</span> resolved
                    </span>
                  </div>
                </button>

                {isExpanded && (
                  <div className="border-t border-border-subtle px-4 py-3">
                    <div className="grid grid-cols-7 gap-2 text-center text-xs">
                      {project.months.map((month) => (
                        <div key={month.month} className="rounded-lg bg-surface p-2">
                          <p className="text-text-muted">{month.month}</p>
                          <p className="mt-1 font-semibold text-warning">{month.detected}</p>
                          <p className="font-semibold text-success">{month.resolved}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 flex justify-center gap-6 text-[10px] text-text-muted">
                      <span>▲ detected</span>
                      <span>▼ resolved</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
