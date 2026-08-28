import { createFileRoute } from "@tanstack/react-router";
import { ProviderBrowser } from "@/components/fixnear/provider-browser";

export const Route = createFileRoute("/electricians")({
  head: () => ({
    meta: [
      { title: "Electricians Near You — FixNear" },
      {
        name: "description",
        content:
          "Compare verified local electricians by rating, distance, experience and starting price. Book wiring, fan, light and power-fault jobs.",
      },
      { property: "og:title", content: "Electricians Near You — FixNear" },
      {
        property: "og:description",
        content: "Verified local electricians for wiring, fans, lights and power faults.",
      },
    ],
  }),
  component: () => <ProviderBrowser trade="electrician" />,
});
