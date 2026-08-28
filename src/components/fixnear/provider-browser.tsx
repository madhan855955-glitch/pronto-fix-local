import { useMemo, useState } from "react";
import { ProviderCard } from "@/components/fixnear/provider-card";
import { LocationField } from "@/components/fixnear/location-field";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { PROVIDERS, TRADE_META } from "@/lib/fixnear/data";
import type { Trade } from "@/lib/fixnear/types";

type SortKey = "distance" | "rating" | "price" | "experience";

export function ProviderBrowser({ trade }: { trade: Trade }) {
  const meta = TRADE_META[trade];
  const [distance, setDistance] = useState(6);
  const [minRating, setMinRating] = useState("0");
  const [maxPrice, setMaxPrice] = useState("2000");
  const [minExperience, setMinExperience] = useState("0");
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [sort, setSort] = useState<SortKey>("distance");

  const results = useMemo(() => {
    const list = PROVIDERS.filter(
      (p) =>
        p.trade === trade &&
        p.distanceKm <= distance &&
        p.rating >= Number(minRating) &&
        p.startingPrice <= Number(maxPrice) &&
        p.experienceYears >= Number(minExperience) &&
        (!onlyAvailable || p.availability === "available"),
    );
    const sorters: Record<SortKey, (a: typeof list[number], b: typeof list[number]) => number> = {
      distance: (a, b) => a.distanceKm - b.distanceKm,
      rating: (a, b) => b.rating - a.rating,
      price: (a, b) => a.startingPrice - b.startingPrice,
      experience: (a, b) => b.experienceYears - a.experienceYears,
    };
    return [...list].sort(sorters[sort]);
  }, [trade, distance, minRating, maxPrice, minExperience, onlyAvailable, sort]);

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 lg:px-8">
      <header className="max-w-2xl">
        <p className="eyebrow">{meta.glyph} {meta.label}s near you</p>
        <h1 className="mt-3 text-4xl sm:text-5xl">
          {trade === "electrician" ? "Certified electricians on call" : "Plumbers who find the leak"}
        </h1>
        <p className="mt-3 text-muted-foreground">{meta.tagline}. Compare ratings, experience and starting price, then request the professional you trust.</p>
      </header>

      <div className="mt-8">
        <LocationField />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="panel h-fit space-y-6 p-5">
          <h2 className="text-base">Filters</h2>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Distance</Label>
              <span className="text-xs font-semibold text-muted-foreground">{distance} km</span>
            </div>
            <Slider
              value={[distance]}
              min={1}
              max={10}
              step={1}
              onValueChange={(v) => setDistance(v[0] ?? 6)}
            />
          </div>

          <div className="space-y-2">
            <Label>Minimum rating</Label>
            <Select value={minRating} onValueChange={setMinRating}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Any rating</SelectItem>
                <SelectItem value="4">4.0 and above</SelectItem>
                <SelectItem value="4.5">4.5 and above</SelectItem>
                <SelectItem value="4.8">4.8 and above</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Starting price</Label>
            <Select value={maxPrice} onValueChange={setMaxPrice}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2000">Any price</SelectItem>
                <SelectItem value="200">Under ₹200</SelectItem>
                <SelectItem value="300">Under ₹300</SelectItem>
                <SelectItem value="500">Under ₹500</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Experience</Label>
            <Select value={minExperience} onValueChange={setMinExperience}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Any experience</SelectItem>
                <SelectItem value="3">3+ years</SelectItem>
                <SelectItem value="5">5+ years</SelectItem>
                <SelectItem value="10">10+ years</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between rounded-lg bg-surface px-3 py-2.5">
            <Label htmlFor="only-available" className="text-sm">Available now</Label>
            <Switch id="only-available" checked={onlyAvailable} onCheckedChange={setOnlyAvailable} />
          </div>
        </aside>

        <section>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
              {results.length} professional{results.length === 1 ? "" : "s"} match your filters
            </p>
            <div className="flex items-center gap-2">
              <Label className="text-xs">Sort by</Label>
              <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
                <SelectTrigger className="w-[170px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="distance">Nearest first</SelectItem>
                  <SelectItem value="rating">Highest rated</SelectItem>
                  <SelectItem value="price">Lowest price</SelectItem>
                  <SelectItem value="experience">Most experienced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {results.length === 0 ? (
            <div className="panel p-10 text-center">
              <p className="font-semibold">No professionals match these filters</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Try widening the distance or relaxing the price limit.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2">
              {results.map((p) => (
                <ProviderCard key={p.id} provider={p} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
