import { useEffect, useState } from "react";

const sections = [
  { id: "overview", label: "KPIs" },
  { id: "portfolio", label: "Throughput" },
  { id: "bugs", label: "Bugs" },
  { id: "impact", label: "Impact" },
  { id: "projects", label: "Projects" },
  { id: "manual", label: "Manual" },
  { id: "automation-coverage", label: "Automation Coverage" },
  { id: "timeline", label: "Timeline" },
] as const;

type SectionId = (typeof sections)[number]["id"];

const SCROLL_OFFSET = 96;

export function SectionNav() {
  const [activeId, setActiveId] = useState<SectionId>(sections[0].id);

  useEffect(() => {
    const updateActiveSection = () => {
      let current: SectionId = sections[0].id;

      for (const section of sections) {
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
  }, []);

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
                  ? "bg-accent-soft text-accent"
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
