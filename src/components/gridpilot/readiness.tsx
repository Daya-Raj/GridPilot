import { useState } from "react";
import { ArrowRight, ClipboardList, X } from "lucide-react";

import { AppShell, ModeBanner } from "@/components/gridpilot/app-shell";
import { ConfidenceIndicator, DataBadge, Metric, StatusBadge } from "@/components/gridpilot/common";
import { Button } from "@/components/ui/button";
import type { FlexResource } from "@/lib/gridpilot-data";
import { gridPilotServices } from "@/lib/services/gridpilot-services";

export function ReadinessPage() {
  const [selected, setSelected] = useState<FlexResource | null>(null);
  const readiness = gridPilotServices.getReadiness();
  const resources = gridPilotServices.getResources();

  return (
    <AppShell section="Data & Flexibility Readiness">
      <ModeBanner />
      <div className="grid gap-8 border-b border-border pb-8 xl:grid-cols-[0.85fr_1.15fr]">
        <section className="border-l-2 border-trust bg-panel px-7 py-6 shadow-[var(--shadow-panel)]">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Can this site safely participate?</p>
          <div className="mt-4 flex items-start justify-between gap-4">
            <h2 className="text-5xl font-semibold tracking-[-0.03em] text-foreground">Pilot ready</h2>
            <StatusBadge state="PILOT READY" />
          </div>
          <p className="mt-4 leading-7 text-muted-foreground">GridPilot recommends a bounded pilot action because the strongest resources have usable evidence, while uncertain resources are held back.</p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <Metric label="Trusted flexibility" value="180" unit="kW" tone="trust" />
            <Metric label="Residual risk" value="370" unit="kW" tone="caution" />
          </div>
        </section>
        <section className="bg-surface p-1">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Why this verdict?</p>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {readiness.factors.map((factor) => (
              <div key={factor.label} className="border-t border-border bg-panel px-1 py-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold text-foreground">{factor.label}</p>
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">{factor.state}</span>
                </div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{factor.value}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="mt-8 border-b border-border bg-panel py-7">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Evidence ladder</p>
            <h2 className="mt-2 text-2xl font-semibold text-foreground">Evidence changes what GridPilot will recommend.</h2>
          </div>
          <DataBadge value="Data quality matters" />
        </div>
        <div className="mt-7 grid gap-5 lg:grid-cols-5">
          {readiness.evidenceLadder.map((step) => (
            <div key={step.label} className="border-l border-border bg-surface pl-4">
              <p className="font-semibold text-foreground">{step.label}</p>
              <p className="mt-2 min-h-12 text-sm leading-6 text-muted-foreground">{step.description}</p>
              <div className="mt-4 flex gap-1" aria-label={`Evidence tier ${step.strength} of 5`}>
                {[1, 2, 3, 4, 5].map((tier) => <span key={tier} className={`h-px flex-1 ${tier <= step.strength ? "bg-trust" : "bg-border"}`} />)}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 bg-panel py-7">
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Trusted flexibility</p>
            <h2 className="mt-2 text-2xl font-semibold text-foreground">Resources and recommended actions</h2>
          </div>
          <Button variant="outline"><ClipboardList /> Create data collection plan</Button>
        </div>
        <div className="overflow-x-auto border-y border-border">
          <table className="w-full min-w-[760px] border-collapse bg-surface text-sm">
            <thead className="bg-muted text-left text-xs uppercase tracking-[0.14em] text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-semibold">Resource</th>
                <th className="px-4 py-3 font-semibold">Available flexibility</th>
                <th className="px-4 py-3 font-semibold">Evidence</th>
                <th className="px-4 py-3 font-semibold">Confidence</th>
                <th className="px-4 py-3 font-semibold">Recommended action</th>
              </tr>
            </thead>
            <tbody>
              {resources.map((resource) => (
                <tr key={resource.id} className="border-t border-border transition-colors hover:bg-accent/50">
                  <td className="px-4 py-4 font-semibold text-foreground">
                    <button className="text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" onClick={() => setSelected(resource)}>{resource.resource}</button>
                  </td>
                  <td className="px-4 py-4 font-mono tabular-nums text-foreground">{resource.availableKw} kW</td>
                  <td className="px-4 py-4"><DataBadge value={resource.evidence} /></td>
                  <td className="px-4 py-4"><ConfidenceIndicator value={resource.confidence === "High" ? 88 : resource.confidence === "Medium" ? 66 : 34} label={resource.confidence} /></td>
                  <td className="px-4 py-4 text-muted-foreground">{resource.recommendedAction}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="border border-caution/25 bg-caution-soft p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-caution">Why this matters</p>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">
            {readiness.whyNotReadyItems.map((item) => <li key={item}>• {item}</li>)}
          </ul>
        </div>
        <div className="border border-border bg-surface p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">What to do next</p>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">
            {readiness.collectionPlan.map((item) => <li key={item}>• {item}</li>)}
          </ul>
        </div>
      </section>

      {selected ? (
        <div className="fixed inset-0 z-40 bg-foreground/20" onClick={() => setSelected(null)}>
          <aside className="ml-auto h-full w-full max-w-md overflow-y-auto border-l border-border bg-background p-6 shadow-[var(--shadow-panel)]" onClick={(event) => event.stopPropagation()} aria-label="Resource detail">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Resource detail</p>
                <h3 className="mt-2 text-2xl font-semibold text-foreground">{selected.resource}</h3>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setSelected(null)} aria-label="Close resource detail"><X /></Button>
            </div>
            <div className="mt-6 grid gap-4">
              <Metric label="Available flexibility" value={selected.availableKw} unit="kW" tone={selected.selected ? "trust" : "muted"} />
              <DataBadge value={selected.evidence} />
              <ConfidenceIndicator value={selected.confidence === "High" ? 88 : selected.confidence === "Medium" ? 66 : 34} label={selected.confidence} />
            </div>
            <div className="mt-6 border-t border-border pt-5">
              <p className="font-semibold text-foreground">Recommendation basis</p>
              {selected.selected ? (
                <ul className="mt-3 space-y-2 text-sm leading-6 text-muted-foreground">
                  {selected.rationale.map((item) => <li key={item}>• {item}</li>)}
                </ul>
              ) : <p className="mt-3 text-sm leading-6 text-muted-foreground">{selected.rejectedReason}</p>}
            </div>
            <Button className="mt-6 w-full" variant="cta">Open in event workspace <ArrowRight /></Button>
          </aside>
        </div>
      ) : null}
    </AppShell>
  );
}
