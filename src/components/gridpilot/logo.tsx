import { Link } from "@tanstack/react-router";

import { cn } from "@/lib/utils";

type GridPilotLogoProps = {
  compact?: boolean;
  className?: string;
  toHome?: boolean;
};

export function GridPilotMark({ className, animated = false }: { className?: string; animated?: boolean }) {
  return (
    <img
      src="/favicon.png"
      alt=""
      aria-hidden="true"
      className={cn("h-8 w-8 shrink-0 object-contain", animated && "logo-mark-reveal", className)}
    />
  );
}

export function GridPilotLogo({ compact = false, className, toHome = false }: GridPilotLogoProps) {
  const content = (
    <span className={cn("inline-flex items-center gap-3 text-brand", className)}>
      <GridPilotMark />
      {!compact ? (
        <span className="leading-none">
          <span className="block text-[1.02rem] font-semibold tracking-normal text-foreground">GridPilot</span>
          <span className="mt-1 block text-[0.63rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            India
          </span>
        </span>
      ) : null}
    </span>
  );

  if (toHome) {
    return (
      <Link to="/" aria-label="GridPilot home" className="inline-flex">
        {content}
      </Link>
    );
  }

  return content;
}
