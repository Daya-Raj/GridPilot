import { createFileRoute } from "@tanstack/react-router";

import { EventWorkspacePage } from "@/components/gridpilot/event-workspace";

export const Route = createFileRoute("/app/events/$eventId")({
  head: () => ({
    meta: [
      { title: "Event Workspace — GridPilot India" },
      { name: "description", content: "Operational decision room for forecast, trusted flexibility, action plan, recommendation rationale, approval, and counterfactuals." },
      { property: "og:title", content: "Event Workspace — GridPilot India" },
      { property: "og:description", content: "Plan and approve a bounded response to an evening renewable shortfall with visible evidence and residual risk." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EventWorkspacePage,
});
