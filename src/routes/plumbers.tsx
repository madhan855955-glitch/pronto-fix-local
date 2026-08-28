import { createFileRoute } from "@tanstack/react-router";
import { ProviderBrowser } from "@/components/fixnear/provider-browser";

export const Route = createFileRoute("/plumbers")({
  head: () => ({
    meta: [
      { title: "Plumbers Near You — FixNear" },
      {
        name: "description",
        content:
          "Find trusted local plumbers for pipe leakage, tap repair, bathroom plumbing, water tank and drain blockage jobs.",
      },
      { property: "og:title", content: "Plumbers Near You — FixNear" },
      {
        property: "og:description",
        content: "Trusted local plumbers for leaks, taps, tanks and blocked drains.",
      },
    ],
  }),
  component: () => <ProviderBrowser trade="plumber" />,
});
