import { useState } from "react";
import { Header } from "./components/Header";
import { SectionNav } from "./components/SectionNav";
import { ViewToggle } from "./components/ViewToggle";
import { YtdSubToggle } from "./components/YtdSubToggle";
import { KpiGrid } from "./components/KpiGrid";
import { PortfolioChart } from "./components/PortfolioChart";
import { BugMetrics } from "./components/BugMetrics";
import { SprintThroughputBurnup } from "./components/SprintThroughputBurnup";
import { BugTrendChart } from "./components/BugTrendChart";
import { ProjectCoverage } from "./components/ProjectCoverage";
import { AutomationView } from "./components/AutomationView";
import {
  type ViewMode,
  type YtdSubView,
  sprintBugMetrics,
  sprintKpiCards,
  sprintMeta,
  ytdKpiCards,
} from "./data/metrics";

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>("sprint");
  const [ytdSubView, setYtdSubView] = useState<YtdSubView>("overview");
  const isSprint = viewMode === "sprint";
  const isYtd = viewMode === "ytd";

  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
    if (mode === "ytd") {
      setYtdSubView("overview");
    }
  };

  return (
    <div className="min-h-screen bg-surface">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(59,130,246,0.15),transparent)]" />
      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Header />
          <ViewToggle value={viewMode} onChange={handleViewModeChange} />
        </div>

        {isYtd && (
          <div className="mt-6">
            <YtdSubToggle value={ytdSubView} onChange={setYtdSubView} />
          </div>
        )}

        <SectionNav viewMode={viewMode} ytdSubView={ytdSubView} />

        <main className="mt-8 space-y-8">
          {isSprint && (
            <div id="overview" className="scroll-mt-24 space-y-6">
              <p className="text-sm text-text-muted">
                {sprintMeta.currentSprint.name} active · prior {sprintMeta.previousSprint.name}{" "}
                closed
              </p>
              <KpiGrid cards={sprintKpiCards} />
              <BugMetrics metrics={sprintBugMetrics} />
              <SprintThroughputBurnup />
            </div>
          )}

          {isYtd && ytdSubView === "overview" && (
            <>
              <div id="overview" className="scroll-mt-24 space-y-3">
                <p className="text-sm text-text-muted">
                  Year-to-date portfolio throughput, bugs, and coverage
                </p>
                <KpiGrid cards={ytdKpiCards} />
              </div>
              <div id="portfolio" className="scroll-mt-24">
                <PortfolioChart />
              </div>
              <div id="bugs" className="scroll-mt-24">
                <BugTrendChart />
              </div>
              <div id="coverage" className="scroll-mt-24">
                <ProjectCoverage />
              </div>
            </>
          )}

          {isYtd && ytdSubView === "automation" && <AutomationView />}
        </main>
        <footer className="mt-16 border-t border-border-subtle py-6 text-center text-sm text-text-muted">
          JDAQA · RealWired · Sprint + year-to-date velocity · 6-month point-in-time report archived
          at tag <code className="text-accent">point-in-time-6mo-contract</code>
        </footer>
      </div>
    </div>
  );
}
