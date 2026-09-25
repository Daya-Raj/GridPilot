import { createFileRoute } from "@tanstack/react-router";

import { ReportsPage } from "@/components/gridpilot/reports";

export const Route = createFileRoute("/app/reports")({
  head: () => ({
    meta: [
      { title: "Impact & Reports — GridPilot India" },
      { name: "description", content: "Impact report preview separating predicted, simulated, and measured status for a GridPilot action plan." },
      { property: "og:title", content: "Impact & Reports — GridPilot India" },
      { property: "og:description", content: "Expected impact, residual risk, confidence, data provenance, and measurement status for GridPilot." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ReportsPage,
});
