import type { YtdSubView } from "../data/metrics";

export function YtdSubToggle({
  value,
  onChange,
}: {
  value: YtdSubView;
  onChange: (view: YtdSubView) => void;
}) {
  return (
    <div
      className="inline-flex rounded-lg border border-border bg-surface-raised p-0.5"
      role="group"
      aria-label="Year-to-date sections"
    >
      {(
        [
          { id: "overview" as const, label: "Overview", hint: "Throughput & bugs" },
          { id: "automation" as const, label: "Automation", hint: "Coverage & runs" },
        ] as const
      ).map((option) => {
        const active = value === option.id;
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            aria-pressed={active}
            className={`rounded-md px-3 py-1.5 text-left transition-colors ${
              active
                ? "bg-accent/15 text-accent"
                : "text-text-muted hover:bg-surface-overlay hover:text-text"
            }`}
          >
            <span className="block text-sm font-medium">{option.label}</span>
            <span className={`block text-[10px] ${active ? "text-accent/80" : "text-text-muted"}`}>
              {option.hint}
            </span>
          </button>
        );
      })}
    </div>
  );
}
