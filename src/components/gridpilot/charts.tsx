import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Button } from "@/components/ui/button";
import type { ForecastPoint } from "@/lib/gridpilot-data";
import { forecastSeries } from "@/lib/gridpilot-data";

type SeriesKey = "demand" | "renewable" | "shortfall";

const seriesLabels: Record<SeriesKey, string> = {
  demand: "Demand",
  renewable: "Renewable Supply",
  shortfall: "Shortfall",
};

function KwTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ name?: string; value?: number; color?: string }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="min-w-44 border border-border bg-popover p-3 text-sm shadow-[var(--shadow-panel)]">
      <p className="mb-2 font-mono font-semibold text-foreground">{label}</p>
      <div className="space-y-1.5">
        {payload.map((item) => (
          <div key={item.name} className="flex items-center justify-between gap-5">
            <span className="text-muted-foreground">{item.name}</span>
            <span className="font-mono font-semibold tabular-nums text-foreground">{item.value} kW</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DemandRenewableChart({ onTimeSelect }: { onTimeSelect?: (point: ForecastPoint) => void }) {
  const [visible, setVisible] = useState<Record<SeriesKey, boolean>>({ demand: true, renewable: true, shortfall: true });
  const [selectedTime, setSelectedTime] = useState("18:00");
  const selectedPoint = useMemo(
    () => forecastSeries.find((point) => point.time === selectedTime) ?? {
      time: "18:00",
      demand: 800,
      renewable: 250,
      shortfall: 550,
      trustedFlexibility: 180,
      residualRisk: 370,
    },
    [selectedTime],
  );

  return (
    <div className="border border-border bg-panel p-4 shadow-[var(--shadow-panel)]">
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Demand vs Renewable Supply vs Shortfall</p>
          <p className="mt-1 text-sm text-muted-foreground">Click a time period to update the event context.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(seriesLabels) as SeriesKey[]).map((key) => (
            <Button
              key={key}
              type="button"
              variant={visible[key] ? "secondary" : "outline"}
              size="sm"
              onClick={() => setVisible((current) => ({ ...current, [key]: !current[key] }))}
            >
              {seriesLabels[key]}
            </Button>
          ))}
        </div>
      </div>
      <div className="h-[22rem] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={forecastSeries}
            margin={{ left: 8, right: 18, top: 12, bottom: 8 }}
            onClick={(state) => {
              const label = typeof state?.activeLabel === "string" ? state.activeLabel : selectedTime;
              const point = forecastSeries.find((item) => item.time === label);
              if (point) {
                setSelectedTime(point.time);
                onTimeSelect?.(point);
              }
            }}
          >
            <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 6" vertical={false} />
            <XAxis dataKey="time" tickLine={false} axisLine={false} tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }} />
            <YAxis unit=" kW" tickLine={false} axisLine={false} tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }} />
            <Tooltip content={<KwTooltip />} cursor={{ stroke: "var(--color-foreground)", strokeWidth: 1, strokeDasharray: "4 4" }} />
            <ReferenceLine x={selectedTime} stroke="var(--color-brand)" strokeWidth={2} />
            {visible.demand ? <Line type="monotone" dataKey="demand" name="Demand" stroke="var(--color-demand)" strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 6 }} /> : null}
            {visible.renewable ? <Line type="monotone" dataKey="renewable" name="Renewable" stroke="var(--color-renewable)" strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 6 }} /> : null}
            {visible.shortfall ? <Line type="monotone" dataKey="shortfall" name="Shortfall" stroke="var(--color-shortfall)" strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 6 }} /> : null}
            <Legend wrapperStyle={{ color: "var(--color-muted-foreground)", fontSize: 12 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 grid gap-3 border-t border-border pt-4 sm:grid-cols-4">
        <p className="text-sm text-muted-foreground"><span className="font-mono font-semibold text-foreground">{selectedPoint.time}</span> selected</p>
        <p className="text-sm text-muted-foreground">Demand <span className="font-mono font-semibold text-foreground">{selectedPoint.demand} kW</span></p>
        <p className="text-sm text-muted-foreground">Renewable <span className="font-mono font-semibold text-foreground">{selectedPoint.renewable} kW</span></p>
        <p className="text-sm text-muted-foreground">Shortfall <span className="font-mono font-semibold text-risk">{selectedPoint.shortfall} kW</span></p>
      </div>
    </div>
  );
}

export function FlexibilityChart() {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={forecastSeries} margin={{ left: 8, right: 18, top: 8, bottom: 8 }}>
          <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 6" vertical={false} />
          <XAxis dataKey="time" tickLine={false} axisLine={false} tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }} />
          <YAxis unit=" kW" tickLine={false} axisLine={false} tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }} />
          <Tooltip content={<KwTooltip />} cursor={{ fill: "var(--color-muted)" }} />
          <Bar dataKey="trustedFlexibility" name="Trusted flexibility" fill="var(--color-flexibility)" radius={[3, 3, 0, 0]} />
          <Bar dataKey="residualRisk" name="Residual risk" fill="var(--color-residual)" radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ResidualRiskChart() {
  return (
    <div className="h-60 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={forecastSeries} margin={{ left: 8, right: 18, top: 8, bottom: 8 }}>
          <defs>
            <linearGradient id="residualFill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="5%" stopColor="var(--color-residual)" stopOpacity={0.42} />
              <stop offset="95%" stopColor="var(--color-residual)" stopOpacity={0.06} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 6" vertical={false} />
          <XAxis dataKey="time" tickLine={false} axisLine={false} tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }} />
          <YAxis unit=" kW" tickLine={false} axisLine={false} tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }} />
          <Tooltip content={<KwTooltip />} cursor={{ stroke: "var(--color-foreground)", strokeDasharray: "4 4" }} />
          <Area type="monotone" dataKey="residualRisk" name="Residual risk" stroke="var(--color-residual)" fill="url(#residualFill)" strokeWidth={2.5} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ScenarioComparisonChart({ data }: { data: Array<{ label: string; value: number }> }) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ left: 20, right: 18, top: 8, bottom: 8 }}>
          <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 6" horizontal={false} />
          <XAxis type="number" unit=" kW" tickLine={false} axisLine={false} tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }} />
          <YAxis type="category" dataKey="label" width={118} tickLine={false} axisLine={false} tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }} />
          <Tooltip content={<KwTooltip />} cursor={{ fill: "var(--color-muted)" }} />
          <Bar dataKey="value" name="Residual risk" fill="var(--color-residual)" radius={[0, 3, 3, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
