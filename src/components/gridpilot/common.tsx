import { AlertCircle, CheckCircle2, CircleDashed, Clock3, Database, ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import type { ConfidenceLevel, EvidenceLevel, ReadinessState } from "@/lib/gridpilot-data";

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground", className)}>
      {children}
    </p>
  );
}

export function SectionHeader({ eyebrow, title, children }: { eyebrow?: string; title: string; children?: ReactNode }) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="mt-3 text-3xl font-semibold tracking-normal text-foreground md:text-4xl">{title}</h2>
      {children ? <div className="mt-4 text-base leading-7 text-muted-foreground">{children}</div> : null}
    </div>
  );
}

export function Metric({ label, value, unit, tone = "default" }: { label: string; value: string | number; unit?: string; tone?: "default" | "trust" | "caution" | "risk" | "muted" }) {
  const toneClass = {
    default: "text-foreground",
    trust: "text-trust",
    caution: "text-caution",
    risk: "text-risk",
    muted: "text-muted-foreground",
  }[tone];

  return (
    <div className="border-l border-border pl-4">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
      <p className={cn("mt-2 font-mono text-3xl font-semibold tabular-nums", toneClass)}>
        {value}
        {unit ? <span className="ml-1 text-base font-medium text-muted-foreground">{unit}</span> : null}
      </p>
    </div>
  );
}

export function StatusBadge({ state }: { state: ReadinessState | string }) {
  const normalized = state.toLowerCase();
  const tone = normalized.includes("ready") && !normalized.includes("not") ? "bg-trust-soft text-trust border-trust/20" : normalized.includes("simulation") ? "bg-caution-soft text-caution border-caution/20" : normalized.includes("draft") ? "bg-muted text-muted-foreground border-border" : "bg-risk-soft text-risk border-risk/20";
  return <span className={cn("inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.12em]", tone)}>{state}</span>;
}

export function DataBadge({ value }: { value: EvidenceLevel | string }) {
  const lower = value.toLowerCase();
  const icon = lower.includes("measured") || lower.includes("real") ? <ShieldCheck /> : lower.includes("simulated") || lower.includes("assumed") ? <CircleDashed /> : lower.includes("predicted") || lower.includes("historical") ? <Clock3 /> : <Database />;
  const tone = lower.includes("measured") || lower.includes("real") ? "border-trust/25 bg-trust-soft text-trust" : lower.includes("simulated") || lower.includes("assumed") ? "border-caution/25 bg-caution-soft text-caution" : "border-border bg-surface text-muted-foreground";
  return <span className={cn("inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs font-semibold", tone)}>{icon}<span>{value}</span></span>;
}

export function ConfidenceIndicator({ value, label }: { value: number; label?: ConfidenceLevel | string }) {
  return (
    <div className="min-w-36">
      <div className="mb-2 flex items-center justify-between gap-3 text-xs">
        <span className="font-semibold text-foreground">{label ?? `${value}%`}</span>
        <span className="font-mono tabular-nums text-muted-foreground">{value}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-sm bg-muted">
        <div className="h-full rounded-sm bg-trust transition-all duration-300" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

export function LoadingState() {
  return (
    <div className="space-y-3" aria-label="Loading">
      <div className="h-6 w-48 animate-pulse rounded-sm bg-muted" />
      <div className="h-24 animate-pulse rounded-md bg-muted" />
      <div className="h-16 animate-pulse rounded-md bg-muted" />
    </div>
  );
}

export function EmptyState({ title, action }: { title: string; action: string }) {
  return (
    <div className="border border-dashed border-border bg-surface p-6">
      <p className="font-semibold text-foreground">{title}</p>
      <p className="mt-2 text-sm text-muted-foreground">{action}</p>
    </div>
  );
}

export function ErrorState() {
  return (
    <div className="flex items-start gap-3 border border-risk/25 bg-risk-soft p-4 text-risk">
      <AlertCircle className="mt-0.5 h-5 w-5" />
      <div>
        <p className="font-semibold">Something went wrong loading this scenario.</p>
        <p className="mt-1 text-sm">Try again.</p>
      </div>
    </div>
  );
}

export function SuccessLine({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-start gap-2 text-sm text-muted-foreground">
      <CheckCircle2 className="mt-0.5 h-4 w-4 text-trust" />
      <span>{children}</span>
    </div>
  );
}
