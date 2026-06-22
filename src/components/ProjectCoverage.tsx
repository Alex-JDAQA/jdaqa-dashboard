import { Calendar, CheckCircle2, Layers } from "lucide-react";
import { projectSummaries, qaPeriodReference } from "../data/metrics";

export function ProjectCoverage() {
  return (
    <section className="rounded-2xl border border-border bg-surface-raised p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-text">Coverage by Project</h2>
        <p className="mt-1 text-sm text-text-muted">
          Manual test coverage and issue resolution impact per product area
        </p>
      </div>

      <div className="mb-6 rounded-xl border border-border-subtle bg-surface-overlay p-4">
        <div className="flex items-start gap-3">
          <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
          <div className="flex-1">
            <p className="text-sm font-medium text-text">Pre-QA vs. Post-QA Reference Periods</p>
            <p className="mt-1 text-xs leading-relaxed text-text-muted">{qaPeriodReference.note}</p>
            <div className="mt-3 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-lg border border-warning/20 bg-warning/5 px-3 py-1.5 text-xs">
                <span className="font-medium text-warning">Pre-QA</span>
                <span className="text-text-muted">Before {qaPeriodReference.qaStartDate}</span>
              </span>
              <span className="inline-flex items-center gap-2 rounded-lg border border-success/20 bg-success/5 px-3 py-1.5 text-xs">
                <span className="font-medium text-success">Post-QA</span>
                <span className="text-text-muted">{qaPeriodReference.postQaPeriod}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {projectSummaries.map((project) => (
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
              {(project.testCases || project.xrayArtifacts) && (
                <div className="text-right">
                  <p className="text-2xl font-bold text-text">
                    {project.testCases ?? `${project.xrayArtifacts}+`}
                  </p>
                  <p className="text-xs text-text-muted">
                    {project.xrayArtifacts ? "Xray artifacts" : "test cases"}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              <span className="rounded-md bg-warning/10 px-2 py-1 text-warning">
                Pre-QA: {project.preQaPeriod}
              </span>
              <span className="rounded-md bg-success/10 px-2 py-1 text-success">
                Post-QA: {project.postQaPeriod}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg bg-surface p-3">
                <p className="text-xs text-text-muted">Resolved (pre → post)</p>
                <p className="mt-1 font-mono font-semibold text-text">
                  {project.preQaResolved} → {project.postQaResolved}
                </p>
                {project.resolvedChangePercent > 0 && (
                  <p className="mt-0.5 text-xs text-success">+{project.resolvedChangePercent}%</p>
                )}
              </div>
              <div className="rounded-lg bg-surface p-3">
                <p className="text-xs text-text-muted">Resolution rate</p>
                <p className="mt-1 font-mono font-semibold text-text">
                  {project.preQaResolutionRate}% → {project.postQaResolutionRate}%
                </p>
              </div>
            </div>

            {project.passRate !== undefined && (
              <div className="mt-3 flex items-center gap-2 text-sm text-success">
                <CheckCircle2 className="h-4 w-4" />
                <span>
                  {project.testCases} tests · {project.passRate}% passing
                  {project.featureAreas && ` · ${project.featureAreas} feature areas`}
                </span>
              </div>
            )}

            <p className="mt-3 flex-1 text-xs leading-relaxed text-text-muted">
              {project.coverageHighlight}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2 text-xs text-text-muted">
        <Layers className="h-3.5 w-3.5" />
        <span>YP serves as the central Jira/Xray container for cross-project QA artifacts</span>
      </div>
    </section>
  );
}
