import { useEffect, useState } from "react";
import type { ViewMode, YtdSubView } from "../data/metrics";

const sprintSections = [{ id: "overview", label: "KPIs" }] as const;

const ytdOverviewSections = [
  { id: "overview", label: "KPIs" },
  { id: "portfolio", label: "Throughput" },
  { id: "bugs", label: "Bugs" },
  { id: "coverage", label: "Coverage" },
] as const;

const ytdAutomationSections = [
  { id: "auto-overview", label: "Overview" },
  { id: "orm", label: "ORM" },
  { id: "runs", label: "Runs" },
  { id: "by-project", label: "By Project" },
] as const;

type SectionId =
  | (typeof sprintSections)[number]["id"]
  | (typeof ytdOverviewSections)[number]["id"]
  | (typeof ytdAutomationSections)[number]["id"];

const SCROLL_OFFSET = 96;

function getSections(viewMode: ViewMode, ytdSubView: YtdSubView) {
  if (viewMode === "sprint") return sprintSections;
  return ytdSubView === "overview" ? ytdOverviewSections : ytdAutomationSections;
}

export function SectionNav({
  viewMode,
  ytdSubView,
}: {
  viewMode: ViewMode;
  ytdSubView: YtdSubView;
}) {
  const sections = getSections(viewMode, ytdSubView);
  const [activeId, setActiveId] = useState<SectionId>(sections[0].id);

  useEffect(() => {
    const nextSections = getSections(viewMode, ytdSubView);
    setActiveId(nextSections[0].id);
  }, [viewMode, ytdSubView]);

  useEffect(() => {
    const currentSections = getSections(viewMode, ytdSubView);

    const updateActiveSection = () => {
      let current: SectionId = currentSections[0].id;

      for (const section of currentSections) {
        const element = document.getElementById(section.id);
        if (element && element.getBoundingClientRect().top <= SCROLL_OFFSET) {
          current = section.id;
        }
      }

      setActiveId(current);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    return () => window.removeEventListener("scroll", updateActiveSection);
  }, [viewMode, ytdSubView]);

  const handleClick = (id: SectionId) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      aria-label="Dashboard sections"
      className="sticky top-0 z-50 -mx-4 mt-8 border-y border-border-subtle bg-surface/85 px-4 backdrop-blur-md sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
    >
      <div className="flex gap-1 overflow-x-auto py-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {sections.map((section) => {
          const isActive = activeId === section.id;

          return (
            <button
              key={section.id}
              type="button"
              onClick={() => handleClick(section.id)}
              aria-current={isActive ? "true" : undefined}
              className={`shrink-0 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-accent text-white"
                  : "text-text-muted hover:bg-surface-overlay hover:text-text"
              }`}
            >
              {section.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
