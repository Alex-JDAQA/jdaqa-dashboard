import { Header } from "./components/Header";
import { SectionNav } from "./components/SectionNav";
import { BusinessImpact } from "./components/BusinessImpact";
import { KpiGrid } from "./components/KpiGrid";
import { PortfolioChart } from "./components/PortfolioChart";
import { BugMetrics } from "./components/BugMetrics";
import { ProjectCoverage } from "./components/ProjectCoverage";
import { ManualCoverage } from "./components/ManualCoverage";
import { AutomationCoverage } from "./components/AutomationCoverage";
import { Milestones } from "./components/Milestones";
import { AutomationSummary } from "./components/AutomationSummary";

export default function App() {
  return (
    <div className="min-h-screen bg-surface">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(59,130,246,0.15),transparent)]" />
      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Header />
        <SectionNav />
        <main className="mt-8 space-y-8">
          <div id="overview" className="scroll-mt-24">
            <KpiGrid />
          </div>
          <div className="grid gap-8 lg:grid-cols-5">
            <div id="portfolio" className="scroll-mt-24 lg:col-span-3">
              <PortfolioChart />
            </div>
            <div className="scroll-mt-24 lg:col-span-2">
              <AutomationSummary />
            </div>
          </div>
          <div id="bugs" className="scroll-mt-24">
            <BugMetrics />
          </div>
          <div id="impact" className="scroll-mt-24">
            <BusinessImpact />
          </div>
          <div id="projects" className="scroll-mt-24">
            <ProjectCoverage />
          </div>
          <div id="manual" className="scroll-mt-24">
            <ManualCoverage />
          </div>
          <div id="automation-coverage" className="scroll-mt-24">
            <AutomationCoverage />
          </div>
          <div id="timeline" className="scroll-mt-24">
            <Milestones />
          </div>
        </main>
        <footer className="mt-16 border-t border-border-subtle py-6 text-center text-sm text-text-muted">
          JDAQA · RealWired · Data from Confluence Impact Dashboard & Q1 Progress Report
        </footer>
      </div>
    </div>
  );
}
