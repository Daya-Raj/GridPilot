import { Link } from "@tanstack/react-router";
import { useState } from "react";

import { AppShell, ModeBanner } from "@/components/gridpilot/app-shell";
import { DataBadge, Metric, StatusBadge } from "@/components/gridpilot/common";
import { Button } from "@/components/ui/button";
import { demoScenario, type Area } from "@/lib/gridpilot-data";
import { gridPilotServices } from "@/lib/services/gridpilot-services";

const modes = ["Stress", "Trusted Flexibility", "Residual Risk", "Provenance"] as const;
const times = ["16:00", "17:00", "18:00", "19:00", "20:00"];
const positions = [
  { x: 180, y: 180, r: 72 },
  { x: 355, y: 145, r: 58 },
  { x: 530, y: 250, r: 78 },
  { x: 290, y: 305, r: 54 },
];

const fallbackArea: Area = { id: "area-a", name: "Area A", demand: 0, renewable: 0, shortfall: 0, trustedFlexibility: 0, residualRisk: 0, readiness: "Not ready", topAction: "Review evidence" };

export function MapPortfolioPage() {
  const areas = gridPilotServices.getPortfolioAreas();
  const [mode, setMode] = useState<(typeof modes)[number]>("Residual Risk");
  const [time, setTime] = useState("18:00");
  const [afterPlan, setAfterPlan] = useState(true);
  const [selected, setSelected] = useState<Area>(areas[0] ?? fallbackArea);

  return (
    <AppShell section="Map & Portfolio">
      <ModeBanner />
      <section className="border border-border bg-panel p-6 shadow-[var(--shadow-panel)]">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          <div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Simulated local scenario</p><h2 className="mt-3 text-4xl font-semibold text-foreground">Where does residual risk remain?</h2></div>
          <div className="flex flex-wrap gap-2">{modes.map((item) => <Button key={item} variant={mode === item ? "secondary" : "outline"} onClick={() => setMode(item)}>{item}</Button>)}</div>
        </div>
      </section>
      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_24rem]">
        <section className="border border-border bg-surface p-5">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <DataBadge value={mode} />
            <div className="flex flex-wrap gap-2">{times.map((item) => <Button key={item} variant={time === item ? "secondary" : "outline"} size="sm" onClick={() => setTime(item)}>{item}</Button>)}<Button variant={afterPlan ? "secondary" : "outline"} size="sm" onClick={() => setAfterPlan((value) => !value)}>{afterPlan ? "After Plan" : "Before Plan"}</Button></div>
          </div>
          <div className="relative min-h-[31rem] overflow-hidden border border-border bg-map p-6">
            <div className="absolute left-6 top-6 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">North Chennai cluster · {time}</div>
            <svg viewBox="0 0 760 430" className="mt-8 h-full min-h-[25rem] w-full" role="img" aria-label="Conceptual neighbourhood portfolio map">
              <path d="M61 87C152 30 232 65 300 101C379 143 437 77 518 92C610 109 697 171 707 252C719 348 610 401 494 386C398 374 344 333 249 353C153 373 58 330 42 238C30 169 11 118 61 87Z" fill="var(--color-map-land)" stroke="var(--color-border)" strokeWidth="2" />
              {areas.map((area, index) => {
                const position = positions[index];
                if (!position) return null;
                const fill = selected.id === area.id ? "var(--color-brand)" : area.readiness === "Ready now" ? "var(--color-trust)" : area.readiness === "Simulation only" ? "var(--color-caution)" : "var(--color-brand-muted)";
                return <g key={area.id} onClick={() => setSelected(area)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") setSelected(area); }} className="cursor-pointer focus:outline-none" tabIndex={0} role="button" aria-label={area.name}><circle cx={position.x} cy={position.y} r={position.r} fill={fill} opacity={selected.id === area.id ? 0.84 : 0.42} /><circle cx={position.x} cy={position.y} r={position.r + 8} fill="none" stroke={fill} strokeWidth="2" strokeDasharray="7 8" opacity="0.55" /><text x={position.x} y={position.y - 5} textAnchor="middle" fill="var(--color-brand-foreground)" fontSize="22" fontWeight="700">{String.fromCharCode(65 + index)}</text><text x={position.x} y={position.y + 19} textAnchor="middle" fill="var(--color-brand-foreground)" fontSize="13">{afterPlan ? area.residualRisk : area.shortfall} kW</text></g>;
              })}
              <path d="M105 338C205 271 285 243 384 272C497 306 555 296 670 203" stroke="var(--color-border)" strokeWidth="4" fill="none" strokeLinecap="round" />
              <path d="M112 95C221 148 302 177 404 142C487 113 569 131 664 180" stroke="var(--color-border)" strokeWidth="3" fill="none" strokeLinecap="round" />
            </svg>
          </div>
        </section>
        <aside className="border border-border bg-panel p-6 shadow-[var(--shadow-panel)]">
          <div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Area detail</p><h3 className="mt-2 text-2xl font-semibold text-foreground">{selected.name}</h3></div><StatusBadge state={selected.readiness} /></div>
          <div className="mt-6 grid gap-5"><Metric label="Demand" value={selected.demand} unit="kW" /><Metric label="Renewable" value={selected.renewable} unit="kW" tone="trust" /><Metric label="Shortfall" value={selected.shortfall} unit="kW" tone="risk" /><Metric label="Trusted flexibility" value={selected.trustedFlexibility} unit="kW" tone="trust" /><Metric label="Residual risk" value={afterPlan ? selected.residualRisk : selected.shortfall} unit="kW" tone="caution" /></div>
          <p className="mt-6 border-t border-border pt-5 text-sm text-muted-foreground">Top action: <span className="font-semibold text-foreground">{selected.topAction}</span></p>
          <Button asChild variant="cta" className="mt-5 w-full"><Link to="/app/events/$eventId" params={{ eventId: demoScenario.eventId }}>Open event workspace</Link></Button>
        </aside>
      </div>
    </AppShell>
  );
}