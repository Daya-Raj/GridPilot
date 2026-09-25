import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/app/events")({
  component: EventsLayout,
});

function EventsLayout() {
  return <Outlet />;
}
