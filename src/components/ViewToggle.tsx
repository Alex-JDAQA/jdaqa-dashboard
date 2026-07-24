import type { ViewMode } from "../data/metrics";

export function ViewToggle({
  value,
  onChange,
}: {
  value: ViewMode;
  onChange: (mode: ViewMode) => void;
}) {
  return (
    <div
      className="inline-flex rounded-xl border border-border bg-surface-raised p-1"
      role="group"
      aria-label="Reporting period"
    >
      {(
        [
          { id: "sprint" as const, label: "Sprint", hint: "Current sprint" },
          { id: "ytd" as const, label: "Year-to-Date", hint: "Leadership view" },
        ] as const
      ).map((option) => {
        const active = value === option.id;
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            aria-pressed={active}
            className={`rounded-lg px-4 py-2 text-left transition-colors ${
              active
                ? "bg-accent text-white"
                : "text-text-muted hover:bg-surface-overlay hover:text-text"
            }`}
          >
            <span className="block text-sm font-semibold">{option.label}</span>
            <span className={`block text-[11px] ${active ? "text-white/80" : "text-text-muted"}`}>
              {option.hint}
            </span>
          </button>
        );
      })}
    </div>
  );
}
