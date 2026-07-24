import { Bot, CheckCircle2 } from "lucide-react";
import { projectCoverageKpis } from "../data/metrics";

export function AutomationByProject() {
  return (
    <section className="rounded-2xl border border-border bg-surface-raised p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-text">Automation by Project</h2>
        <p className="mt-1 text-sm text-text-muted">
          Per-project automation coverage and test inventory
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {projectCoverageKpis.map((project) => (
          <article
            key={project.id}
            className="flex flex-col rounded-xl border border-border-subtle bg-surface-overlay p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="rounded bg-violet-400/10 px-2 py-0.5 font-mono text-xs font-medium text-violet-400">
                  {project.shortName}
                </span>
                <h3 className="mt-2 font-semibold text-text">{project.name}</h3>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-text">
                  {project.automationCoveragePercent}%
                </p>
                <p className="text-xs text-text-muted">
                  {project.criticalWorkflowAutomationPercent != null
                    ? "app-wide"
                    : "automation"}
                </p>
              </div>
            </div>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-surface">
              <div
                className="h-full rounded-full bg-violet-500"
                style={{ width: `${project.automationCoveragePercent}%` }}
              />
            </div>

            {project.criticalWorkflowAutomationPercent != null && (
              <div className="mt-3 rounded-lg border border-violet-400/20 bg-violet-400/5 px-3 py-2.5">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-medium text-text-muted">
                    Critical workflow automation
                  </p>
                  <p className="font-mono text-sm font-semibold text-violet-400">
                    {project.criticalWorkflowAutomationPercent}%
                  </p>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface">
                  <div
                    className="h-full rounded-full bg-violet-500"
                    style={{
                      width: `${project.criticalWorkflowAutomationPercent}%`,
                    }}
                  />
                </div>
              </div>
            )}

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg bg-surface p-3">
                <p className="text-xs text-text-muted">Manual coverage</p>
                <p className="mt-1 font-mono font-semibold text-text">
                  {project.manualCoveragePercent}%
                </p>
              </div>
              <div className="rounded-lg bg-surface p-3">
                <p className="text-xs text-text-muted">Automated tests</p>
                <p className="mt-1 font-mono font-semibold text-text">
                  {project.automationTests ?? 0}
                </p>
                {project.automationTests != null &&
                  project.automationTestsPrevious != null &&
                  project.automationTestsPrevious > 0 && (
                    <p className="mt-1 text-xs text-success">
                      +
                      {Math.round(
                        ((project.automationTests - project.automationTestsPrevious) /
                          project.automationTestsPrevious) *
                          100,
                      )}
                      % from {project.automationTestsPrevious}
                    </p>
                  )}
              </div>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-success">
              {(project.testCases || project.xrayArtifacts) && (
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4" />
                  {project.xrayArtifacts
                    ? `${project.xrayArtifacts}+ Xray artifacts`
                    : `${project.testCases} manual cases`}
                </span>
              )}
              {project.automationTests !== undefined && project.automationTests > 0 && (
                <span className="inline-flex items-center gap-1.5 text-violet-400">
                  <Bot className="h-4 w-4" />
                  {project.automationTests} Playwright tests
                </span>
              )}
            </div>

            <p className="mt-3 flex-1 text-xs leading-relaxed text-text-muted">
              {project.automationNote ?? project.highlight}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
