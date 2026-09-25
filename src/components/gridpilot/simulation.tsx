import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useMemo, useState } from "react";

import { AppShell, ModeBanner } from "@/components/gridpilot/app-shell";
import { ConfidenceIndicator, Metric, StatusBadge } from "@/components/gridpilot/common";
import { ScenarioComparisonChart } from "@/components/gridpilot/charts";
import { Button } from "@/components/ui/button";
import { demoScenario } from "@/lib/gridpilot-data";
import { gridPilotServices } from "@/lib/services/gridpilot-services";

export function SimulationPage() {
  const [solarReduction, setSolarReduction] = useState(20);
  const [evParticipationReduction, setEvParticipationReduction] = useState(30);
  const [hvacAvailabilityReduction, setHvacAvailabilityReduction] = useState(20);
  const [comfort, setComfort] = useState<"Standard" | "Tighter">("Tighter");
  const result = gridPilotServices.calculateScenario({ solarReduction, evParticipationReduction, hvacAvailabilityReduction, comfort });
  const chartData = useMemo(() => [
    { label: "Baseline shortfall", value: result.baselineShortfall },
    { label: "Current plan", value: result.currentPlanResidual },
    { label: "Scenario", value: result.scenarioResidual },
  ], [result]);

  return (
    <AppShell section="What-if Simulation">
      <ModeBanner />
      <section className="border border-border bg-panel p-6 shadow-[var(--shadow-panel)]">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Simulated scenario</p>
            <h2 className="mt-3 text-4xl font-semibold text-foreground">What changes if conditions weaken?</h2>
            <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">Adjust solar generation and participation assumptions before approving the plan.</p>
          </div>
          <StatusBadge state="SIMULATED SCENARIO" />
        </div>
      </section>
      <div className="mt-6 grid gap-6 xl:grid-cols-[0.75fr_1.25fr]">
        <section className="border border-border bg-surface p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Scenario controls</p>
          <div className="mt-6 space-y-6">
            <Control label="Solar generation" value={solarReduction} onChange={setSolarReduction} suffix="% lower" />
            <Control label="EV participation" value={evParticipationReduction} onChange={setEvParticipationReduction} suffix="% lower" />
            <Control label="HVAC availability" value={hvacAvailabilityReduction} onChange={setHvacAvailabilityReduction} suffix="% lower" />
            <div>
              <p className="mb-3 text-sm font-semibold text-foreground">Comfort constraint</p>
              <div className="flex gap-2">
                <Button variant={comfort === "Standard" ? "secondary" : "outline"} onClick={() => setComfort("Standard")}>Standard</Button>
                <Button variant={comfort === "Tighter" ? "secondary" : "outline"} onClick={() => setComfort("Tighter")}>Tighter</Button>
              </div>
            </div>
          </div>
        </section>
        <section className="border border-border bg-panel p-6 shadow-[var(--shadow-panel)]">
          <div className="grid gap-5 sm:grid-cols-4">
            <Metric label="Baseline" value={result.baselineShortfall} unit="kW" tone="risk" />
            <Metric label="Current plan" value={result.currentPlanResidual} unit="kW" tone="caution" />
            <Metric label="Scenario" value={result.scenarioResidual} unit="kW" tone="caution" />
            <div className="border-l border-border pl-4"><ConfidenceIndicator value={result.confidence} label="Confidence" /></div>
          </div>
          <div className="mt-8"><ScenarioComparisonChart data={chartData} /></div>
          <div className="mt-6 flex flex-wrap gap-3 border-t border-border pt-5">
            <Button asChild variant="cta"><Link to="/app/events/$eventId" params={{ eventId: demoScenario.eventId }}>Return to action plan <ArrowRight /></Link></Button>
            <Button asChild variant="outline"><Link to="/app/map">View map impact</Link></Button>
          </div>
        </section>
      </div>
    </AppShell>
  );
}

function Control({ label, value, onChange, suffix }: { label: string; value: number; onChange: (value: number) => void; suffix: string }) {
  return (
    <label className="block">
      <span className="flex items-center justify-between gap-4 text-sm font-semibold text-foreground">
        <span>{label}</span>
        <span className="font-mono tabular-nums text-muted-foreground">-{value}{suffix.replace("% lower", "%")}</span>
      </span>
      <input
        type="range"
        min="0"
        max="50"
        step="5"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-3 w-full accent-brand"
      />
      <span className="mt-1 block text-xs text-muted-foreground">{suffix}</span>
    </label>
  );
}
