import {
  ArrowRight,
  CheckCircle2,
  CircleDashed,
  Clock,
  GitBranch,
  Workflow,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  automationSuites,
  requestLifecycleSummary,
  requestLifecycleWorkflows,
} from "../data/metrics";

const statusConfig = {
  active: { icon: CheckCircle2, label: "Active", className: "text-success" },
  "in-progress": { icon: Clock, label: "In Progress", className: "text-warning" },
  planned: { icon: CircleDashed, label: "Planned", className: "text-text-muted" },
};

const workflowIconConfig = {
  active: { icon: CheckCircle2, className: "text-success" },
  "in-progress": { icon: Clock, className: "text-warning" },
  planned: { icon: CircleDashed, className: "text-text-muted" },
};

const otherSuites = automationSuites.filter((s) => s.suite !== "Request Lifecycle");

export function AutomationCoverage() {
  const chartData = automationSuites
    .filter((s) => s.testCases > 0)
    .map((s) => ({
      suite: s.suite.replace(" ", "\n"),
      testCases: s.testCases,
    }));

  return (
    <section className="rounded-2xl border border-border bg-surface-raised p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-text">Playwright Automation Suites</h2>
        <p className="mt-1 text-sm text-text-muted">
          YouConnect E2E coverage · 26 spec files · 76 automated tests
        </p>
      </div>

      {/* Request Lifecycle — featured workflow coverage */}
      <div className="mb-8 rounded-2xl border border-violet-400/25 bg-violet-400/5 p-6">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/20">
              <GitBranch className="h-5 w-5 text-violet-400" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-text">Request Lifecycle Automated Coverage</h3>
              <p className="mt-1 max-w-2xl text-sm text-text-muted">
                End-to-end Playwright coverage across the full YouConnect request workflow — from
                LO creation through vendor solicitation, report submission, review, and completion.
              </p>
            </div>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
            <StatPill label="Phases" value={requestLifecycleSummary.totalPhases} />
            <StatPill label="Spec files" value={requestLifecycleSummary.specFiles} />
            <StatPill label="Tests" value={requestLifecycleSummary.testCases} />
            <StatPill label="Coverage" value={requestLifecycleSummary.coverageEstimate} accent />
          </div>
        </div>

        <div className="space-y-4">
          {requestLifecycleWorkflows.map((phase, index) => (
            <div key={phase.phase}>
              <article className="rounded-xl border border-border-subtle bg-surface-overlay p-4 sm:p-5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-6">
                  <div className="flex items-start gap-4 lg:w-56 lg:shrink-0">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-500/20 font-mono text-sm font-bold text-violet-300">
                      {phase.phase}
                    </div>
                    <div>
                      <h4 className="font-semibold text-text">{phase.stage}</h4>
                      <p className="mt-1 text-xs leading-relaxed text-text-muted">
                        {phase.description}
                      </p>
                      <p className="mt-2 font-mono text-xs text-violet-400">
                        {phase.specFiles} spec{phase.specFiles !== 1 ? "s" : ""} · {phase.testCases}{" "}
                        test{phase.testCases !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>

                  <div className="flex-1 border-t border-border-subtle pt-4 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-6">
                    <p className="mb-3 text-xs font-medium tracking-wide text-text-muted uppercase">
                      Automated workflows
                    </p>
                    <ul className="grid gap-2 sm:grid-cols-2">
                      {phase.workflows.map((workflow) => (
                        <li
                          key={workflow}
                          className="flex items-start gap-2 rounded-lg bg-surface px-3 py-2 text-sm text-text"
                        >
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-success" />
                          <span>{workflow}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>

              {index < requestLifecycleWorkflows.length - 1 && (
                <div className="flex justify-center py-1 text-text-muted">
                  <ArrowRight className="hidden h-4 w-4 rotate-90 sm:block" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-2 rounded-lg border border-violet-400/15 bg-surface/50 px-4 py-3 text-xs text-text-muted">
          <Workflow className="h-3.5 w-3.5 shrink-0 text-violet-400" />
          <span>
            Authentication flows (login, forgot password/username) run as supporting suites outside
            the lifecycle pipeline. Module smoke tests are in early progress with initial specs only.
          </span>
        </div>
      </div>

      {/* Other suites + chart */}
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid stroke="#2a3347" strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="suite"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#8b95a8", fontSize: 11 }}
                interval={0}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#8b95a8", fontSize: 12 }}
                label={{
                  value: "Automated tests",
                  angle: -90,
                  position: "insideLeft",
                  fill: "#8b95a8",
                  fontSize: 12,
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1a2030",
                  border: "1px solid #2a3347",
                  borderRadius: 12,
                  color: "#e8ecf4",
                }}
              />
              <Bar dataKey="testCases" name="Tests" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-3">
          {otherSuites.map((suite) => {
            const status = statusConfig[suite.status];
            const StatusIcon = status.icon;
            const workflowIcon = workflowIconConfig[suite.status];
            const WorkflowIcon = workflowIcon.icon;

            return (
              <div
                key={suite.suite}
                className="rounded-xl border border-border-subtle bg-surface-overlay px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <StatusIcon className={`h-4 w-4 shrink-0 ${status.className}`} />
                  <div className="flex-1">
                    <p className="font-medium text-text">{suite.suite}</p>
                    <p className="text-xs text-text-muted">
                      {suite.specFiles > 0
                        ? `${suite.specFiles} specs · ${suite.testCases} tests · ${status.label}`
                        : status.label}
                    </p>
                  </div>
                </div>
                {suite.coverageNote && (
                  <p className="mt-2 pl-7 text-xs leading-relaxed text-warning">{suite.coverageNote}</p>
                )}
                {suite.workflows.length > 0 && suite.testCases > 0 && (
                  <ul className="mt-2 space-y-1 pl-7">
                    {suite.workflows.map((workflow) => (
                      <li key={workflow} className="flex items-center gap-2 text-xs text-text-muted">
                        <WorkflowIcon className={`h-3 w-3 shrink-0 ${workflowIcon.className}`} />
                        {workflow}
                      </li>
                    ))}
                  </ul>
                )}
                {suite.workflows.length > 0 && suite.testCases === 0 && (
                  <p className="mt-2 pl-7 text-xs text-text-muted">
                    {suite.workflows.join(" · ")}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function StatPill({
  label,
  value,
  accent,
}: {
  label: string;
  value: string | number;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-lg border px-3 py-2 text-center ${
        accent
          ? "border-violet-400/30 bg-violet-500/15"
          : "border-border-subtle bg-surface-overlay"
      }`}
    >
      <p className={`text-lg font-bold ${accent ? "text-violet-300" : "text-text"}`}>{value}</p>
      <p className="text-xs text-text-muted">{label}</p>
    </div>
  );
}
