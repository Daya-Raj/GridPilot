import { createFileRoute } from "@tanstack/react-router";

import { EventsPage } from "@/components/gridpilot/event-workspace";

export const Route = createFileRoute("/app/events/")({
  head: () => ({
    meta: [
      { title: "Stress Events — GridPilot India" },
      { name: "description", content: "Review upcoming renewable-stress windows and open the bounded action workspace for each event." },
      { property: "og:title", content: "Stress Events — GridPilot India" },
      { property: "og:description", content: "Upcoming renewable-stress events with shortfall, trusted flexibility, residual risk, and readiness state." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EventsPage,
});
