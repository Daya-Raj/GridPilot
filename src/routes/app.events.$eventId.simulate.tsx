import { createFileRoute } from "@tanstack/react-router";

import { SimulationPage } from "@/components/gridpilot/simulation";

export const Route = createFileRoute("/app/events/$eventId/simulate")({
  head: () => ({
    meta: [
      { title: "What-if Simulation — GridPilot India" },
      { name: "description", content: "Simulate solar, EV participation, HVAC availability, and comfort constraints before approving a GridPilot action plan." },
      { property: "og:title", content: "What-if Simulation — GridPilot India" },
      { property: "og:description", content: "Compare baseline, current plan, and scenario residual risk with clearly labelled simulated assumptions." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SimulationPage,
});
