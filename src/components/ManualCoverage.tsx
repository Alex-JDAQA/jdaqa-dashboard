import { manualCoverageGroups, manualCoverageSummary } from "../data/metrics";

const priorityStyles = {
  critical: "bg-danger/10 text-danger border-danger/20",
  high: "bg-warning/10 text-warning border-warning/20",
  medium: "bg-accent/10 text-accent border-accent/20",
};

const folderStyles: Record<string, string> = {
  "Core Workflows": "text-blue-400",
  Preconditions: "text-text-muted",
  "Reporting Microservice": "text-accent",
  "Vendor Management": "text-amber-400",
  "Vendor Circle": "text-violet-400",
  "AI Review Forms": "text-success",
};

export function ManualCoverage() {
  const featureAreaCount = manualCoverageGroups.reduce(
    (sum, group) => sum + group.areas.length,
    0
  );

  return (
    <section className="rounded-2xl border border-border bg-surface-raised p-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-text">Manual Test Coverage by Feature Area</h2>
          <p className="mt-1 text-sm text-text-muted">
            Xray Test Repository · Functional Testing (excl. {manualCoverageSummary.sprintTestingCases}{" "}
            sprint testing cases)
          </p>
        </div>
        <div className="text-sm">
          <span className="text-text-muted">Repository folders: </span>
          <span className="font-semibold text-text">{manualCoverageGroups.length}</span>
          <span className="mx-2 text-text-muted">·</span>
          <span className="text-text-muted">Feature areas: </span>
          <span className="font-semibold text-text">{featureAreaCount}</span>
          <span className="mx-2 text-text-muted">·</span>
          <span className="text-text-muted">Test cases: </span>
          <span className="font-semibold text-success">
            {manualCoverageSummary.totalFormalTestCases}
          </span>
        </div>
      </div>

      <div className="space-y-8">
        {manualCoverageGroups.map((group) => (
          <div key={group.folder}>
            <div className="mb-3 flex flex-wrap items-center gap-3">
              <h3 className={`text-sm font-semibold ${folderStyles[group.folder] ?? "text-text"}`}>
                {group.folder}
              </h3>
              <span className="rounded-full bg-surface-overlay px-2.5 py-0.5 font-mono text-xs text-text-muted">
                {group.testCases} test cases
              </span>
              {group.subtitle && (
                <span className="text-xs text-text-muted">{group.subtitle}</span>
              )}
            </div>

            <div className="overflow-x-auto rounded-xl border border-border-subtle">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead>
                  <tr className="border-b border-border bg-surface-overlay text-text-muted">
                    <th className="px-4 py-3 font-medium">Feature Area</th>
                    <th className="px-4 py-3 font-medium">Priority</th>
                  </tr>
                </thead>
                <tbody>
                  {group.areas.map((area) => (
                    <tr
                      key={`${group.folder}-${area.area}`}
                      className="border-b border-border-subtle last:border-0"
                    >
                      <td className="px-4 py-4">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="font-medium text-text">{area.area}</p>
                          {area.status === "todo" && (
                            <span className="inline-flex rounded-full border border-warning/30 bg-warning/10 px-2.5 py-0.5 text-xs font-medium text-warning">
                              Todo
                            </span>
                          )}
                        </div>
                        <p className="mt-1.5 max-w-2xl text-xs leading-relaxed text-text-muted">
                          {area.description}
                        </p>
                      </td>
                      <td className="px-4 py-4 align-top">
                        <span
                          className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${priorityStyles[area.priority]}`}
                        >
                          {area.priority}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-6 text-xs leading-relaxed text-text-muted">
        Xray Test Repository: {manualCoverageSummary.testRepositoryTotal} total ·{" "}
        {manualCoverageSummary.sprintTestingCases} sprint testing excluded ·{" "}
        {manualCoverageSummary.totalFormalTestCases} formal test cases · Functional Testing:{" "}
        {manualCoverageSummary.functionalTestingTotal}
      </p>
    </section>
  );
}
