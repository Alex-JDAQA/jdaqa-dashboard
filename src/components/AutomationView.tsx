import { AutomationByProject } from "./AutomationByProject";
import { AutomationCoverageHero } from "./AutomationCoverageHero";
import { AutomationRunResults } from "./AutomationRunResults";
import { TeamSprintLoad } from "./TeamSprintLoad";

export function AutomationView() {
  return (
    <div className="space-y-8">
      <div id="auto-overview" className="scroll-mt-24">
        <AutomationCoverageHero />
      </div>
      <div id="orm" className="scroll-mt-24">
        <TeamSprintLoad />
      </div>
      <div id="runs" className="scroll-mt-24">
        <AutomationRunResults />
      </div>
      <div id="by-project" className="scroll-mt-24">
        <AutomationByProject />
      </div>
    </div>
  );
}
