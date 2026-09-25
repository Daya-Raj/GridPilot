import { createFileRoute } from "@tanstack/react-router";

import { CommandCenterPage } from "@/components/gridpilot/command-center";

export const Route = createFileRoute("/app/")({
  head: () => ({
    meta: [
      { title: "Command Center — GridPilot India" },
      { name: "description", content: "Operational briefing for the next renewable-stress event, trusted flexibility, recommended action, and expected impact." },
      { property: "og:title", content: "Command Center — GridPilot India" },
      { property: "og:description", content: "See the next renewable shortfall, trusted flexibility, residual risk, and bounded action plan." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CommandCenterPage,
});
