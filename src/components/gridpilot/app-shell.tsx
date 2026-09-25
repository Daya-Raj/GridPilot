import { Link, useRouterState } from "@tanstack/react-router";
import { BarChart3, ClipboardCheck, FileText, Gauge, Map, RadioTower, Settings2 } from "lucide-react";
import type { ReactNode } from "react";

import { GridPilotLogo } from "@/components/gridpilot/logo";
import { DataBadge, StatusBadge } from "@/components/gridpilot/common";
import { cn } from "@/lib/utils";
import { gridPilotServices } from "@/lib/services/gridpilot-services";

const navItems = [
  { label: "Command Center", to: "/app", icon: Gauge },
  { label: "Readiness", to: "/app/readiness", icon: ClipboardCheck },
  { label: "Events", to: "/app/events", icon: RadioTower },
  { label: "Map & Portfolio", to: "/app/map", icon: Map },
  { label: "Reports", to: "/app/reports", icon: FileText },
] as const;

export function AppShell({ children, section }: { children: ReactNode; section: string }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const scenario = gridPilotServices.getScenario();

  return (
    <div className="min-h-screen bg-background text-foreground lg:grid lg:grid-cols-[16.5rem_1fr]">
      <aside className="border-b border-sidebar-border bg-sidebar px-5 py-5 lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r">
        <div className="flex items-center justify-between lg:block">
          <GridPilotLogo toHome />
          <DataBadge value="Simulated demo data" />
        </div>
        <nav className="mt-7 flex gap-1 overflow-x-auto lg:block lg:space-y-1" aria-label="GridPilot app navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = item.to === "/app" ? pathname === "/app" : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex min-w-fit items-center gap-3 rounded-sm border-l-2 border-transparent px-3 py-2.5 text-sm font-medium text-sidebar-foreground transition-colors duration-200 hover:bg-sidebar-accent/70 hover:text-sidebar-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  active && "border-brand bg-sidebar-accent text-brand",
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="mt-8 hidden space-y-3 border-t border-sidebar-border pt-5 text-xs lg:block">
          <div className="flex items-center justify-between gap-3">
            <span className="text-muted-foreground">Scenario</span>
            <span className="font-semibold text-foreground">North Chennai</span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="text-muted-foreground">Data mode</span>
            <span className="font-semibold text-caution">Simulation</span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="text-muted-foreground">System status</span>
            <span className="font-semibold text-trust">Ready</span>
          </div>
        </div>
      </aside>
      <div className="min-w-0">
        <header className="sticky top-0 z-20 border-b border-border bg-background/95 px-5 py-3.5 backdrop-blur md:px-8">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">GridPilot India · {section}</p>
              <h1 className="mt-1 text-lg font-semibold text-foreground md:text-xl">{scenario.label}</h1>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge state="SIMULATION MODE" />
              <DataBadge value="Predicted" />
              <span className="inline-flex items-center rounded-md border border-border bg-surface px-3 py-1.5 text-xs font-medium text-muted-foreground">
                Scenario time · {scenario.scenarioTime}
              </span>
              <button aria-label="Scenario settings" className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-surface text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <Settings2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </header>
        <main className="mx-auto w-full max-w-[1600px] px-5 py-6 md:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  );
}

export function ModeBanner() {
  return (
    <div className="mb-6 flex items-center gap-3 border-l-2 border-caution bg-caution-soft px-4 py-3 text-sm text-caution">
      <BarChart3 className="h-4 w-4" />
      <span className="font-semibold">Simulated local scenario.</span>
      <span className="text-muted-foreground">Values demonstrate planning logic and do not imply live local grid telemetry.</span>
    </div>
  );
}
