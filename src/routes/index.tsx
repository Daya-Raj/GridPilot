import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { Activity, ArrowRight, FlaskConical, ListChecks, ShieldCheck } from "lucide-react";

import heroImage from "@/assets/gridpilot-hero-depth.jpg";
import indiaImage from "@/assets/gridpilot-india-context.jpg";
import { DemandRenewableChart } from "@/components/gridpilot/charts";
import { DataBadge, SectionHeader } from "@/components/gridpilot/common";
import { GridPilotLogo } from "@/components/gridpilot/logo";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "GridPilot India — Renewable Flexibility Planning" },
    { name: "description", content: "GridPilot helps Indian neighbourhood energy programmes plan trusted responses to renewable supply stress." },
    { property: "og:title", content: "GridPilot India — Renewable Flexibility Planning" },
    { property: "og:description", content: "Evidence-weighted flexibility planning for renewable reliability in India." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});

const evidence = [
  { label: "Repeatedly measured", note: "Strongest evidence" },
  { label: "Recently measured", note: "Current but limited coverage" },
  { label: "Operator confirmed", note: "Known operating bounds" },
  { label: "User declared", note: "Useful for planning" },
  { label: "Simulated", note: "Scenario exploration only" },
];

function UnderstandVisual() {
  return <svg viewBox="0 0 220 72" className="h-20 w-full" aria-label="Demand rises above renewable supply to create a shortfall"><path d="M8 18 C48 13 70 18 96 20 S145 12 212 17" fill="none" stroke="var(--color-foreground)" strokeWidth="2"/><path d="M8 49 C46 43 72 37 102 39 S153 53 212 57" fill="none" stroke="var(--color-renewable)" strokeWidth="2"/><path d="M151 24V48" stroke="var(--color-risk)" strokeWidth="1.5" strokeDasharray="3 3"/><text x="158" y="39" fill="var(--color-risk)" fontSize="9" fontWeight="600">SHORTFALL</text></svg>;
}

function AssessVisual() {
  const levels = [{ label: "Measured", width: "w-full" }, { label: "Recent", width: "w-4/5" }, { label: "Confirmed", width: "w-3/5" }, { label: "Declared", width: "w-2/5" }, { label: "Simulated", width: "w-1/5" }];
  return <div className="space-y-2 py-2">{levels.map((level) => <div key={level.label} className="grid grid-cols-[4.75rem_1fr] items-center gap-2"><span className="text-[0.6rem] uppercase text-muted-foreground">{level.label}</span><span className="h-1 bg-border"><span className={`block h-full bg-trust ${level.width}`} /></span></div>)}</div>;
}

function PlanVisual() {
  return <div className="py-3"><div className="flex justify-between text-[0.6rem] uppercase text-muted-foreground"><span>17:00</span><span className="text-risk">Stress window</span><span>20:00</span></div><div className="relative mt-3 h-px bg-border"><span className="absolute left-[40%] top-[-7px] h-3.5 w-[27%] bg-risk-soft"/><span className="absolute left-[8%] top-[-3px] h-1.5 w-[22%] bg-trust"/><span className="absolute left-[70%] top-[-3px] h-1.5 w-[20%] bg-trust"/></div><p className="mt-4 text-[0.62rem] uppercase text-muted-foreground">EV · HVAC · Pump</p></div>;
}

function SimulateVisual() {
  return <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-3 py-2"><div><p className="text-[0.6rem] uppercase text-muted-foreground">Baseline</p><div className="mt-2 h-10 bg-risk-soft"><span className="block h-full w-full border-t-2 border-risk" /></div></div><ArrowRight className="mb-3 h-4 w-4 text-muted-foreground"/><div><p className="text-[0.6rem] uppercase text-muted-foreground">Plan</p><div className="mt-2 flex h-10 items-end bg-trust-soft"><span className="block h-5 w-full border-t-2 border-trust" /></div></div></div>;
}

const approachStages = [
  { label: "Understand", icon: Activity, meta: "Stress", copy: "Find when supply falls short.", visual: <UnderstandVisual /> },
  { label: "Assess", icon: ShieldCheck, meta: "Evidence", copy: "Know which flexibility to trust.", visual: <AssessVisual /> },
  { label: "Plan", icon: ListChecks, meta: "Response", copy: "Build a bounded action plan.", visual: <PlanVisual /> },
  { label: "Simulate", icon: FlaskConical, meta: "Outcome", copy: "See the result before acting.", visual: <SimulateVisual /> },
];

function useScrolledPast(threshold: number) {
  const [past, setPast] = useState(false);
  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return past;
}

function Index() {
  const navSolid = useScrolledPast(48);
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 720], [0, 96]);
  const imageScale = useTransform(scrollY, [0, 720], [1, 1.07]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className={`fixed inset-x-0 top-0 z-30 transition-[background-color,border-color] duration-300 ${navSolid ? "border-b border-border bg-background/92 backdrop-blur" : "border-b border-transparent"}`}>
        <div className="mx-auto flex h-[4.75rem] max-w-[1440px] items-center justify-between px-5 md:px-10">
          <GridPilotLogo toHome className="scale-105" />
          <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex" aria-label="Landing navigation">
            {['approach', 'trust', 'india', 'product'].map((item) => <Link key={item} to="/" hash={item} className="capitalize transition-colors duration-200 hover:text-brand">{item}</Link>)}
          </nav>
          <Button asChild variant="cta" size="sm"><Link to="/app">Explore GridPilot <ArrowRight /></Link></Button>
        </div>
      </header>

      <main>
        <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden">
          <motion.img
            src={heroImage}
            alt=""
            aria-hidden="true"
            width={1536}
            height={1280}
            style={{ y: imageY, scale: imageScale }}
            className="absolute -top-[8%] left-0 h-[116%] w-full object-cover"
          />
          <div className="hero-scrim pointer-events-none absolute inset-0" />
          <div className="relative mx-auto w-full max-w-[1440px] px-5 pt-[7.5rem] pb-[15rem] md:px-10 md:pt-[9.5rem] md:pb-28">
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.38 }} className="max-w-2xl">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Flexibility readiness · India</p>
              <h1 className="mt-7 max-w-xl text-5xl font-semibold leading-[0.98] tracking-[-0.035em] text-foreground md:text-6xl xl:text-[4.65rem]">
                Renewable variability.<br /><span className="text-brand">Reliable energy.</span>
              </h1>
              <p className="mt-7 max-w-lg text-lg leading-8 text-muted-foreground">GridPilot helps local energy programmes assess flexibility, plan trusted responses, and understand what changes before action.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild variant="cta" size="lg"><Link to="/app">Explore GridPilot <ArrowRight /></Link></Button>
                <Button asChild variant="ghost" size="lg"><Link to="/" hash="approach">See how it works</Link></Button>
              </div>
            </motion.div>
          </div>
          <p className="absolute bottom-5 right-5 hidden bg-background/85 px-3 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground backdrop-blur md:block">Neighbourhood energy · Chennai context</p>
        </section>

        <section id="approach" className="border-y border-border bg-surface py-24">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <SectionHeader title="From uncertainty to an actionable plan." eyebrow="Approach"><p>A clear sequence from supply stress to a decision people can trust.</p></SectionHeader>
            <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {approachStages.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.article
                    key={item.label}
                    tabIndex={0}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="group relative flex aspect-square flex-col justify-between overflow-hidden border border-border bg-background p-6 outline-none transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-brand hover:shadow-[var(--shadow-panel)] focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/30"
                  >
                    <span className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-brand transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100" />
                    <div className="flex items-start justify-between">
                      <span className="font-mono text-xs font-semibold text-brand">0{index + 1}</span>
                      <span className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted-foreground">{item.meta}</span>
                    </div>
                    <div className="relative grid flex-1 place-items-center">
                      <span className="flex h-16 w-16 items-center justify-center border border-border bg-surface text-brand transition-all duration-300 group-hover:scale-75 group-hover:opacity-0 group-focus-visible:scale-75 group-focus-visible:opacity-0">
                        <Icon className="h-7 w-7" strokeWidth={1.5} />
                      </span>
                      <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 scale-90 opacity-0 transition-all duration-300 ease-out group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100">
                        {item.visual}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold tracking-tight transition-colors duration-200 group-hover:text-brand">{item.label}</h3>
                      <p className="mt-1.5 text-sm leading-5 text-muted-foreground">{item.copy}</p>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="trust" className="py-24">
          <div className="mx-auto grid max-w-7xl gap-14 px-5 md:px-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
            <div><SectionHeader title="Evidence changes what GridPilot recommends." eyebrow="Trust"><p>Not every number deserves the same level of trust.</p></SectionHeader><p className="mt-8 max-w-md text-sm leading-6 text-muted-foreground">Evidence levels define how much flexibility the system is willing to trust.</p></div>
            <div className="border-l border-border pl-6 md:pl-10">
              {evidence.map((item, index) => (
                <div key={item.label} className="grid grid-cols-[2rem_1fr] gap-4 border-b border-border py-4 first:pt-0 last:border-0">
                  <span className="font-mono text-xs text-muted-foreground">0{index + 1}</span>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between"><p className="font-semibold">{item.label}</p><p className="text-xs text-muted-foreground">{item.note}</p></div>
                </div>
              ))}
              <div className="mt-8 border-t border-border pt-6"><p className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Illustrative product logic</p><div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-4"><div><p className="font-mono text-2xl font-semibold">100 <span className="text-sm text-muted-foreground">kW</span></p><p className="mt-1 text-xs text-muted-foreground">EV available · recently measured</p></div><ArrowRight className="h-4 w-4 text-brand"/><div><p className="font-mono text-2xl font-semibold text-trust">85 <span className="text-sm text-muted-foreground">kW</span></p><p className="mt-1 text-xs text-muted-foreground">Trusted contribution</p></div></div><p className="mt-5 border-l border-caution pl-4 text-sm leading-6 text-muted-foreground">If evidence weakens → trusted flexibility decreases → the action plan and residual risk change.</p></div>
            </div>
          </div>
        </section>

        <section id="india" className="border-y border-border bg-surface py-24">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <motion.figure initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="overflow-hidden border border-border shadow-[var(--shadow-panel)]"><img src={indiaImage} alt="Solar panels within a leafy Chennai neighbourhood" width={1536} height={1024} loading="lazy" className="h-[30rem] w-full object-cover" /></motion.figure>
            <SectionHeader title="Built for the data realities of local energy programmes in India." eyebrow="India"><p>GridPilot works progressively—from uploaded data and scenario planning to verified flexibility and future utility integration.</p></SectionHeader>
          </div>
        </section>

        <section id="product" className="py-24">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"><SectionHeader title="The decision, in context." eyebrow="Product preview · Simulated scenario"><p>See the shortfall, what can be trusted, and what changes if EV flexibility disappears.</p></SectionHeader><DataBadge value="SIMULATED SCENARIO" /></div>
            <div className="mt-10 grid gap-4 sm:grid-cols-5">
              {[{label:"Demand",value:"800",tone:"text-foreground"},{label:"Renewable",value:"250",tone:"text-trust"},{label:"Raw shortfall",value:"550",tone:"text-risk"},{label:"Trusted flexibility",value:"180",tone:"text-trust"},{label:"Residual risk",value:"370",tone:"text-caution"}].map((item) => <div key={item.label} className="border-t border-border pt-4"><p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">{item.label}</p><p className={`mt-3 font-mono text-3xl font-semibold tabular-nums ${item.tone}`}>{item.value}<span className="ml-1 text-sm text-muted-foreground">kW</span></p></div>)}
            </div>
            <div className="mt-8"><DemandRenewableChart /></div>
          </div>
        </section>

        <section className="bg-brand py-20 text-brand-foreground"><div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 md:px-8 lg:flex-row lg:items-end lg:justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-foreground/65">GridPilot India</p><h2 className="mt-4 max-w-2xl text-4xl font-semibold leading-tight tracking-[-0.025em] md:text-5xl">Make renewable flexibility easier to trust.</h2></div><Button asChild variant="light" size="lg"><Link to="/app">Explore GridPilot <ArrowRight /></Link></Button></div></section>
      </main>
      <footer className="border-t border-border px-5 py-8 md:px-8"><div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between"><GridPilotLogo /><span>Flexibility readiness &amp; action planning</span></div></footer>
    </div>
  );
}