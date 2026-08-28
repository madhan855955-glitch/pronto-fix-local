import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ProviderCard } from "@/components/fixnear/provider-card";
import { Button } from "@/components/ui/button";
import { PROVIDERS, TRADE_META } from "@/lib/fixnear/data";
import type { Trade } from "@/lib/fixnear/types";

export const Route = createFileRoute("/emergency")({
  validateSearch: (search: Record<string, unknown>): { trade: Trade } => ({
    trade: search.trade === "plumber" ? "plumber" : "electrician",
  }),
  head: () => ({
    meta: [
      { title: "Emergency Electrician & Plumber — FixNear" },
      {
        name: "description",
        content:
          "Urgent electrical or plumbing problem? See on-call emergency professionals sorted by distance and availability.",
      },
      { property: "og:title", content: "Emergency Electrician & Plumber — FixNear" },
      {
        property: "og:description",
        content: "On-call emergency electricians and plumbers, sorted by who can reach you fastest.",
      },
    ],
  }),
  component: EmergencyPage,
});

function EmergencyPage() {
  const { trade } = Route.useSearch();
  const navigate = useNavigate({ from: "/emergency" });

  const providers = PROVIDERS.filter((p) => p.emergency && p.trade === trade).sort((a, b) => {
    const availRank = (v: string) => (v === "available" ? 0 : v === "busy" ? 1 : 2);
    return availRank(a.availability) - availRank(b.availability) || a.distanceKm - b.distanceKm;
  });

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 lg:px-8">
      <div className="panel border-destructive/30 bg-destructive/5 p-6 sm:p-8">
        <span className="text-2xl" aria-hidden>
          🚨
        </span>
        <h1 className="mt-3 text-4xl">Emergency service</h1>
        <p className="mt-2 max-w-xl text-muted-foreground">
          Need an electrician or plumber immediately? These professionals accept out-of-hours calls.
          A 25% urgency surcharge applies to the estimate.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button
            variant={trade === "electrician" ? "electric" : "soft"}
            size="lg"
            onClick={() => navigate({ search: { trade: "electrician" } })}
          >
            ⚡ Emergency Electrician
          </Button>
          <Button
            variant={trade === "plumber" ? "water" : "soft"}
            size="lg"
            onClick={() => navigate({ search: { trade: "plumber" } })}
          >
            🔧 Emergency Plumber
          </Button>
        </div>
      </div>

      <h2 className="mt-10 text-2xl">
        On-call {TRADE_META[trade].label.toLowerCase()}s ({providers.length})
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Sorted by availability, then distance from your saved location.
      </p>
      <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {providers.map((p) => (
          <ProviderCard key={p.id} provider={p} />
        ))}
      </div>
    </div>
  );
}
