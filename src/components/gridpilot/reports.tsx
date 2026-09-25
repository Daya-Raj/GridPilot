import { Check, Clock3 } from "lucide-react";

import { AppShell, ModeBanner } from "@/components/gridpilot/app-shell";
import { DataBadge, Metric, StatusBadge } from "@/components/gridpilot/common";
import { demoScenario } from "@/lib/gridpilot-data";
import { gridPilotServices } from "@/lib/services/gridpilot-services";

const history = [
  { label: "Forecast", detail: "550 kW shortfall predicted", complete: true },
  { label: "Plan approved", detail: "180 kW bounded response", complete: true },
  { label: "Scenario simulated", detail: "Residual risk reviewed", complete: true },
  { label: "Awaiting measurement", detail: "Post-event evidence pending", complete: false },
  { label: "Measured", detail: "Not measured yet", complete: false },
  { label: "Closed", detail: "Pending measurement", complete: false },
];

export function ReportsPage() {
  const provenance = gridPilotServices.getProvenance();
  return (
    <AppShell section="Impact & Reports">
      <ModeBanner />
      <section className="border-b border-border pb-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Latest decision record</p><h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-[-0.02em] md:text-4xl">{demoScenario.eventTitle}</h2><p className="mt-3 text-muted-foreground">{demoScenario.eventWindow} · {demoScenario.location}</p></div><StatusBadge state="Awaiting measurement" /></div>
        <div className="mt-9 grid gap-5 sm:grid-cols-2 xl:grid-cols-5"><Metric label="Baseline" value="550" unit="kW" tone="risk" /><Metric label="Planned flexibility" value="180" unit="kW" tone="trust" /><Metric label="Expected impact" value="180" unit="kW" tone="trust" /><Metric label="Residual risk" value="370" unit="kW" tone="caution" /><Metric label="Confidence" value="82" unit="%" tone="trust" /></div>
      </section>

      <div className="mt-8 grid gap-10 xl:grid-cols-[1.1fr_0.9fr]">
        <section><p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Evidence &amp; provenance</p><h3 className="mt-2 text-2xl font-semibold">What this decision relied on</h3><div className="mt-6 divide-y divide-border border-y border-border">{provenance.map((item) => <div key={item.label} className="grid gap-3 py-5 md:grid-cols-[1fr_auto]"><div><div className="flex flex-wrap items-center gap-3"><p className="font-semibold">{item.label}</p><DataBadge value={item.status} /></div><p className="mt-2 text-sm text-muted-foreground">{item.source} · {item.coverage} · {item.resolution}</p></div><p className="text-sm text-muted-foreground">Confidence <span className="font-semibold text-foreground">{item.confidence}</span></p></div>)}</div></section>
        <section><p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Action history</p><h3 className="mt-2 text-2xl font-semibold">Decision lifecycle</h3><ol className="mt-6">{history.map((item, index) => <li key={item.label} className="relative grid grid-cols-[2.25rem_1fr] gap-4 pb-6 last:pb-0">{index < history.length - 1 ? <span className="absolute bottom-0 left-[1.05rem] top-8 w-px bg-border" /> : null}<span className={`relative z-10 flex h-9 w-9 items-center justify-center rounded-full border ${item.complete ? "border-trust bg-trust-soft text-trust" : "border-border bg-background text-muted-foreground"}`}>{item.complete ? <Check className="h-4 w-4" /> : <Clock3 className="h-4 w-4" />}</span><div className="pt-1"><p className="font-semibold">{item.label}</p><p className="mt-1 text-sm text-muted-foreground">{item.detail}</p></div></li>)}</ol></section>
      </div>

      <section className="mt-10 border-l-2 border-caution bg-caution-soft px-6 py-5"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-caution">Measurement status</p><p className="mt-2 text-xl font-semibold">Not measured yet.</p><p className="mt-2 text-sm text-muted-foreground">Expected impact remains predicted until post-event data is uploaded.</p></section>
    </AppShell>
  );
}