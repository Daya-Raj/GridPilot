import { Link } from "@tanstack/react-router";
import { ArrowRight, Beaker, CheckCircle2 } from "lucide-react";
import { useState } from "react";

import { AppShell, ModeBanner } from "@/components/gridpilot/app-shell";
import { DataBadge, Metric, StatusBadge, SuccessLine } from "@/components/gridpilot/common";
import { DemandRenewableChart, ResidualRiskChart } from "@/components/gridpilot/charts";
import { Button } from "@/components/ui/button";
import type { ForecastPoint } from "@/lib/gridpilot-data";
import { gridPilotServices } from "@/lib/services/gridpilot-services";

export function CommandCenterPage() {
  const scenario = gridPilotServices.getScenario();
  const [activePoint, setActivePoint] = useState<ForecastPoint>({
    time: "18:00",
    demand: 800,
    renewable: 250,
    shortfall: 550,
    trustedFlexibility: 180,
    residualRisk: 370,
  });

  return (
    <AppShell section="Command Center">
      <ModeBanner />
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <section className="border border-border bg-panel p-6 shadow-[var(--shadow-panel)]">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Next stress event</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-normal text-foreground">{scenario.eventTitle}</h2>
              <p className="mt-2 text-muted-foreground">{scenario.eventWindow} · {scenario.location}</p>
            </div>
            <StatusBadge state="PILOT READY" />
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            <Metric label="Expected shortfall" value={activePoint.shortfall} unit="kW" tone="risk" />
            <Metric label="Trusted flexibility" value={activePoint.trustedFlexibility} unit="kW" tone="trust" />
            <Metric label="Residual risk" value={activePoint.residualRisk} unit="kW" tone="caution" />
            <Metric label="Confidence" value="82" unit="%" tone="trust" />
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="cta" size="lg">
              <Link to="/app/events/$eventId" params={{ eventId: scenario.eventId }}>
                Review action plan <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/app/events/$eventId/simulate" params={{ eventId: scenario.eventId }}>
                <Beaker /> Simulate scenario
              </Link>
            </Button>
          </div>
        </section>
        <section className="border border-border bg-surface p-6">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-trust" />
            <p className="font-semibold text-foreground">Operational briefing</p>
          </div>
          <div className="mt-5 space-y-4">
            <SuccessLine>Shortfall is concentrated in the 18:00–19:00 evening window.</SuccessLine>
            <SuccessLine>EV charging has the strongest evidence in this simulated scenario.</SuccessLine>
            <SuccessLine>Cold storage remains simulation-only until interruption evidence exists.</SuccessLine>
          </div>
          <div className="mt-6 border-t border-border pt-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Evidence basis</p>
            <div className="flex flex-wrap gap-2">
              <DataBadge value="Historical" />
              <DataBadge value="Predicted" />
              <DataBadge value="Recently measured" />
              <DataBadge value="Simulated" />
            </div>
          </div>
        </section>
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
        <DemandRenewableChart onTimeSelect={setActivePoint} />
        <section className="border border-border bg-panel p-5 shadow-[var(--shadow-panel)]">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Residual risk after plan</p>
          <ResidualRiskChart />
        </section>
      </div>
    </AppShell>
  );
}
