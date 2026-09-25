import { createFileRoute } from "@tanstack/react-router";

import { MapPortfolioPage } from "@/components/gridpilot/map-view";

export const Route = createFileRoute("/app/map")({
  head: () => ({
    meta: [
      { title: "Map & Portfolio — GridPilot India" },
      { name: "description", content: "Conceptual neighbourhood map showing stress, trusted flexibility, residual risk, and provenance for a simulated local scenario." },
      { property: "og:title", content: "Map & Portfolio — GridPilot India" },
      { property: "og:description", content: "See where stress, flexibility, and residual risk remain across conceptual neighbourhood areas." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MapPortfolioPage,
});
