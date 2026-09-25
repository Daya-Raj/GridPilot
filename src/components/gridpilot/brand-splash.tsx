import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { GridPilotMark } from "@/components/gridpilot/logo";

export function BrandSplash() {
  const [visible, setVisible] = useState(true);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), reduceMotion ? 120 : 1180);
    return () => window.clearTimeout(timer);
  }, [reduceMotion]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center bg-brand text-brand-foreground"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0.1 : 0.28, ease: "easeOut" }}
          aria-label="GridPilot loading"
        >
          <div className="text-center">
            <motion.div
              className="mx-auto flex h-16 w-16 items-center justify-center"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: reduceMotion ? 0 : 0.42 }}
            >
              <GridPilotMark className="h-16 w-16" animated={!reduceMotion} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduceMotion ? 0 : 0.5, duration: 0.3 }}
            >
              <p className="mt-5 text-xl font-semibold">GridPilot</p>
              <p className="mt-2 text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-brand-foreground/70">India</p>
              <p className="mt-5 text-[0.6rem] font-medium uppercase tracking-[0.18em] text-brand-foreground/55">Flexibility readiness &amp; action planning</p>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}