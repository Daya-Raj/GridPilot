import { createFileRoute } from "@tanstack/react-router";

import { ReadinessPage } from "@/components/gridpilot/readiness";

export const Route = createFileRoute("/app/readiness")({
  head: () => ({
    meta: [
      { title: "Data & Flexibility Readiness — GridPilot India" },
      { name: "description", content: "Assess whether a neighbourhood site can safely participate in a flexibility action using visible evidence quality." },
      { property: "og:title", content: "Data & Flexibility Readiness — GridPilot India" },
      { property: "og:description", content: "Readiness verdicts, evidence ladder, resource confidence, and data collection guidance for GridPilot." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ReadinessPage,
});
