import { CheckCircle2, Layers } from "lucide-react";
import {
  automationRunSummary,
  automationSummary,
  manualCoverageSummary,
  projectCoverageKpis,
} from "../data/metrics";

export function ProjectCoverage() {
  return (
    <section className="rounded-2xl border border-border bg-surface-raised p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-text">Coverage by Project</h2>
        <p className="mt-1 text-sm text-text-muted">
          Per-project manual, automation, and overall coverage
        </p>
      </div>

      <div className="mb-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-border-subtle bg-surface-overlay p-4">
          <p className="text-xs font-medium tracking-wide text-text-muted uppercase">
            Portfolio manual coverage
          </p>
          <p className="mt-2 text-2xl font-bold text-text">
            {automationSummary.manualCriticalCoverage}%
          </p>
          <p className="mt-1 text-xs text-text-muted">
            {manualCoverageSummary.totalFormalTestCases} formal Xray cases
          </p>
        </div>
        <div className="rounded-xl border border-border-subtle bg-surface-overlay p-4">
          <p className="text-xs font-medium tracking-wide text-text-muted uppercase">
            Critical workflow automation
          </p>
          <p className="mt-2 text-2xl font-bold text-violet-400">
            {automationRunSummary.criticalWorkflowAutomationMid}%
          </p>
          <p className="mt-1 text-xs text-success">
            +
            {automationRunSummary.criticalWorkflowAutomationMid -
              automationRunSummary.criticalWorkflowAutomationPrevious}
            % from {automationRunSummary.criticalWorkflowAutomationPrevious}%
          </p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {projectCoverageKpis.map((project) => (
          <article
            key={project.id}
            className="flex flex-col rounded-xl border border-border-subtle bg-surface-overlay p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="rounded bg-accent/10 px-2 py-0.5 font-mono text-xs font-medium text-accent">
                  {project.shortName}
                </span>
                <h3 className="mt-2 font-semibold text-text">{project.name}</h3>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="rounded-lg bg-surface p-3">
                <p className="text-xs text-text-muted">Manual</p>
                <p className="mt-1 font-mono text-lg font-semibold text-text">
                  {project.manualCoveragePercent}%
                </p>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-overlay">
                  <div
                    className="h-full rounded-full bg-success"
                    style={{ width: `${project.manualCoveragePercent}%` }}
                  />
                </div>
              </div>
              <div className="rounded-lg bg-surface p-3">
                <p className="text-xs text-text-muted">
                  {project.criticalWorkflowAutomationPercent != null
                    ? "App-wide automation"
                    : "Automation"}
                </p>
                <p className="mt-1 font-mono text-lg font-semibold text-violet-400">
                  {project.automationCoveragePercent}%
                </p>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-overlay">
                  <div
                    className="h-full rounded-full bg-violet-500"
                    style={{ width: `${project.automationCoveragePercent}%` }}
                  />
                </div>
              </div>
              <div className="rounded-lg bg-surface p-3">
                <p className="text-xs text-text-muted">Overall</p>
                <p className="mt-1 font-mono text-lg font-semibold text-text">
                  {project.overallCoveragePercent}%
                </p>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-overlay">
                  <div
                    className="h-full rounded-full bg-accent"
                    style={{ width: `${project.overallCoveragePercent}%` }}
                  />
                </div>
              </div>
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

            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-success">
              {(project.testCases || project.xrayArtifacts) && (
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4" />
                  {project.xrayArtifacts
                    ? `${project.xrayArtifacts}+ Xray artifacts`
                    : `${project.testCases} test cases`}
                </span>
              )}
              {project.automationTests !== undefined && project.automationTests > 0 && (
                <span className="text-violet-400">
                  {project.automationTests} automated tests
                  {project.automationTestsPrevious != null &&
                    project.automationTestsPrevious > 0 && (
                      <span className="ml-1.5 text-success">
                        +
                        {Math.round(
                          ((project.automationTests - project.automationTestsPrevious) /
                            project.automationTestsPrevious) *
                            100,
                        )}
                        % from {project.automationTestsPrevious}
                      </span>
                    )}
                </span>
              )}
            </div>

            <p className="mt-3 flex-1 text-xs leading-relaxed text-text-muted">{project.highlight}</p>
          </article>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2 text-xs text-text-muted">
        <Layers className="h-3.5 w-3.5" />
        <span>YP is the central Jira/Xray container for cross-project QA artifacts · YouConnect</span>
      </div>
    </section>
  );
}
