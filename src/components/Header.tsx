import { Calendar, Users } from "lucide-react";
import { dashboardMeta } from "../data/metrics";

export function Header() {
  return (
    <header className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <div className="mb-3 flex items-center gap-2">
          <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-medium tracking-wide text-accent uppercase">
            {dashboardMeta.team}
          </span>
          <span className="text-text-muted">×</span>
          <span className="text-sm font-medium text-text-muted">{dashboardMeta.client}</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">
          {dashboardMeta.title}
        </h1>
        <p className="mt-2 max-w-xl text-base text-text-muted">{dashboardMeta.subtitle}</p>
      </div>
      <div className="flex flex-col gap-2 text-sm text-text-muted sm:text-right">
        <div className="flex items-center gap-2 sm:justify-end">
          <Users className="h-4 w-4 text-accent" />
          <span>Partnership since {dashboardMeta.partnershipStart}</span>
        </div>
        <div className="flex items-center gap-2 sm:justify-end">
          <Calendar className="h-4 w-4 text-accent" />
          <span>
            Reporting: {dashboardMeta.reportingPeriod} · Updated {dashboardMeta.lastUpdated}
          </span>
        </div>
      </div>
    </header>
  );
}
