import { Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { AvailabilityDot, TradeBadge } from "@/components/fixnear/trade-badge";
import { Stars } from "@/components/fixnear/stars";
import { Button } from "@/components/ui/button";
import type { Provider } from "@/lib/fixnear/types";

export function ProviderCard({ provider }: { provider: Provider }) {
  return (
    <article className="panel lift flex flex-col overflow-hidden">
      <div className="flex items-start gap-4 p-5">
        <img
          src={provider.photo}
          alt={provider.name}
          loading="lazy"
          width={512}
          height={512}
          className="size-16 shrink-0 rounded-2xl object-cover"
        />
        <div className="min-w-0">
          <h3 className="truncate text-lg leading-tight">{provider.name}</h3>
          <div className="mt-1.5">
            <TradeBadge trade={provider.trade} />
          </div>
          <div className="mt-2 flex items-center gap-2 text-sm">
            <Stars value={provider.rating} />
            <span className="font-semibold">{provider.rating.toFixed(1)}</span>
            <span className="text-muted-foreground">({provider.reviewCount})</span>
          </div>
        </div>
      </div>

      <dl className="grid grid-cols-3 divide-x divide-border border-y border-border text-center">
        <div className="px-2 py-2.5">
          <dd className="text-sm font-semibold">{provider.experienceYears} yrs</dd>
          <dt className="eyebrow text-[10px]">Experience</dt>
        </div>
        <div className="px-2 py-2.5">
          <dd className="text-sm font-semibold">{provider.distanceKm} km</dd>
          <dt className="eyebrow text-[10px]">Away</dt>
        </div>
        <div className="px-2 py-2.5">
          <dd className="text-sm font-semibold">₹{provider.startingPrice}</dd>
          <dt className="eyebrow text-[10px]">From</dt>
        </div>
      </dl>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between text-xs">
          <AvailabilityDot availability={provider.availability} />
          <span className="inline-flex items-center gap-1 text-muted-foreground">
            <MapPin className="size-3.5" /> {provider.area}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          {provider.completedJobs} jobs completed
          {provider.emergency ? " · Emergency ready" : ""}
        </p>
        <div className="mt-auto flex gap-2 pt-1">
          <Button variant="soft" className="flex-1" asChild>
            <Link to="/providers/$providerId" params={{ providerId: provider.id }}>
              View profile
            </Link>
          </Button>
          <Button
            variant={provider.trade === "electrician" ? "electric" : "water"}
            className="flex-1"
            asChild
          >
            <Link to="/request/$providerId" params={{ providerId: provider.id }}>
              Request service
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
