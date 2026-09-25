import { Link } from "@tanstack/react-router";
import { ArrowRight, Beaker, CheckCircle2, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";

import { AppShell, ModeBanner } from "@/components/gridpilot/app-shell";
import { ConfidenceIndicator, DataBadge, Metric, StatusBadge } from "@/components/gridpilot/common";
import { DemandRenewableChart, FlexibilityChart } from "@/components/gridpilot/charts";
import { Button } from "@/components/ui/button";
import type { EvEvidenceSetting } from "@/lib/gridpilot-data";
import { demoScenario, flexibilityResources } from "@/lib/gridpilot-data";
import { gridPilotServices } from "@/lib/services/gridpilot-services";

const evidenceOptions: EvEvidenceSetting[] = ["High", "Medium", "Unavailable"];

export function EventsPage() {
  return (
    <AppShell section="Stress Events">
      <ModeBanner />
      <section className="border border-border bg-panel p-6 shadow-[var(--shadow-panel)]">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Stress events</p>
            <h2 className="mt-2 text-3xl font-semibold text-foreground">Upcoming renewable-stress windows</h2>
          </div>
          <DataBadge value="Predicted" />
        </div>
        <Link
          to="/app/events/$eventId"
          params={{ eventId: demoScenario.eventId }}
          className="mt-6 grid gap-4 border border-border bg-surface p-5 transition-colors hover:bg-accent/50 md:grid-cols-[1fr_auto]"
        >
          <div>
            <div className="flex flex-wrap items-center gap-3"><StatusBadge state="DRAFT" /><DataBadge value="Simulated demo scenario" /></div>
            <h3 className="mt-4 text-2xl font-semibold text-foreground">{demoScenario.eventTitle}</h3>
            <p className="mt-2 text-muted-foreground">{demoScenario.eventWindow} · {demoScenario.location}</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              <Metric label="Shortfall" value="550" unit="kW" tone="risk" />
              <Metric label="Trusted flex" value="180" unit="kW" tone="trust" />
              <Metric label="Residual" value="370" unit="kW" tone="caution" />
            </div>
          </div>
          <div className="flex items-center text-brand"><ArrowRight className="h-6 w-6" /></div>
        </Link>
      </section>
    </AppShell>
  );
}

export function EventWorkspacePage() {
  const [evEvidence, setEvEvidence] = useState<EvEvidenceSetting>("High");
  const plan = gridPilotServices.calculatePlan(evEvidence);
  const selectedResources = useMemo(() => flexibilityResources.filter((resource) => resource.selected), []);

  return (
    <AppShell section="Event Workspace">
      <ModeBanner />
      <section className="border border-border bg-panel p-6 shadow-[var(--shadow-panel)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Event · {demoScenario.eventWindow}</p>
            <h2 className="mt-3 text-4xl font-semibold text-foreground">{demoScenario.eventTitle}</h2>
            <p className="mt-2 text-muted-foreground">{demoScenario.location}</p>
          </div>
          <div className="flex flex-wrap gap-2"><StatusBadge state="DRAFT" /><DataBadge value="Predicted" /><DataBadge value="Simulated" /></div>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
          <Metric label="Demand" value="800" unit="kW" />
          <Metric label="Renewable" value="250" unit="kW" tone="trust" />
          <Metric label="Shortfall" value="550" unit="kW" tone="risk" />
          <Metric label="Trusted flex" value={plan.trustedFlexibility} unit="kW" tone="trust" />
          <Metric label="Residual risk" value={plan.residualRisk} unit="kW" tone="caution" />
        </div>
      </section>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <DemandRenewableChart />
        <section className="border border-border bg-panel p-5 shadow-[var(--shadow-panel)]">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Flexibility and residual risk</p>
          <FlexibilityChart />
        </section>
      </div>

      <section className="mt-6 grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="border border-border bg-panel p-6 shadow-[var(--shadow-panel)]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Recommended action plan</p>
              <h3 className="mt-2 text-2xl font-semibold text-foreground">Bounded response for human approval</h3>
            </div>
            <ConfidenceIndicator value={plan.confidence} label="Plan confidence" />
          </div>
          <div className="mt-6 space-y-3">
            {selectedResources.map((resource, index) => {
              const plannedKw = resource.id === "ev" ? plan.evPlanned : resource.plannedKw;
              return (
                <div key={resource.id} className="grid gap-3 border border-border bg-surface p-4 sm:grid-cols-[2rem_1fr_auto] sm:items-center">
                  <span className="flex h-8 w-8 items-center justify-center rounded-md bg-brand-soft font-mono text-sm font-semibold text-brand">{index + 1}</span>
                  <div>
                    <p className="font-semibold text-foreground">{resource.recommendedAction}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{resource.resource}</p>
                  </div>
                  <span className="font-mono text-xl font-semibold text-foreground">{plannedKw} kW</span>
                </div>
              );
            })}
          </div>
          <div className="mt-6 grid gap-4 border-t border-border pt-5 sm:grid-cols-3">
            <Metric label="Total trusted" value={plan.trustedFlexibility} unit="kW" tone="trust" />
            <Metric label="Residual risk" value={plan.residualRisk} unit="kW" tone="caution" />
            <Metric label="Confidence" value={plan.confidence} unit="%" tone="trust" />
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button variant="cta"><CheckCircle2 /> Approve Plan</Button>
            <Button variant="outline"><SlidersHorizontal /> Modify Plan</Button>
            <Button asChild variant="outline">
              <Link to="/app/events/$eventId/simulate" params={{ eventId: demoScenario.eventId }}><Beaker /> Run What-if</Link>
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="border border-border bg-surface p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Minimum flexibility required</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              <Metric label="Required" value={demoScenario.requiredFlexibilityKw} unit="kW" />
              <Metric label="Available trusted" value={plan.trustedFlexibility} unit="kW" tone={plan.margin >= 0 ? "trust" : "risk"} />
              <Metric label="Margin" value={`${plan.margin >= 0 ? "+" : ""}${plan.margin}`} unit="kW" tone={plan.margin >= 0 ? "trust" : "risk"} />
            </div>
            <div className="mt-5 h-3 bg-muted">
              <div className="h-full bg-trust transition-all duration-300" style={{ width: `${Math.min((plan.trustedFlexibility / 220) * 100, 100)}%` }} />
            </div>
            {plan.margin < 0 ? <p className="mt-3 text-sm font-semibold text-risk">Insufficient trusted flexibility. More measured evidence is needed before approval.</p> : null}
          </div>

          <div className="border border-border bg-panel p-6 shadow-[var(--shadow-panel)]">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Signature evidence interaction</p>
            <h3 className="mt-2 text-2xl font-semibold text-foreground">EV evidence changes the plan.</h3>
            <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="EV evidence level">
              {evidenceOptions.map((option) => (
                <Button key={option} variant={evEvidence === option ? "secondary" : "outline"} onClick={() => setEvEvidence(option)}>{option}</Button>
              ))}
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Metric label="EV action" value={plan.evPlanned} unit="kW" tone={plan.evPlanned > 0 ? "trust" : "muted"} />
              <Metric label="Residual risk" value={plan.residualRisk} unit="kW" tone="caution" />
            </div>
            <p className="mt-5 border-l border-brand pl-4 text-sm leading-6 text-muted-foreground">{plan.recommendation}</p>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-2">
        <div className="border border-border bg-surface p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Why selected?</p>
          {flexibilityResources.filter((resource) => resource.selected).map((resource) => (
            <div key={resource.id} className="mt-5 border-t border-border pt-5">
              <p className="font-semibold text-foreground">{resource.resource}</p>
              <ul className="mt-2 space-y-2 text-sm leading-6 text-muted-foreground">{resource.rationale.map((item) => <li key={item}>• {item}</li>)}</ul>
            </div>
          ))}
        </div>
        <div className="border border-caution/25 bg-caution-soft p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-caution">Why not selected?</p>
          {flexibilityResources.filter((resource) => !resource.selected).map((resource) => (
            <div key={resource.id} className="mt-5 border-t border-caution/25 pt-5">
              <p className="font-semibold text-foreground">{resource.resource}</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{resource.rejectedReason}</p>
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
