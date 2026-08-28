import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFixNear } from "@/lib/fixnear/store";

const SUGGESTIONS = ["Adyar", "Anna Nagar", "T. Nagar", "600020"];

export function LocationField({ onSubmit }: { onSubmit?: () => void }) {
  const { location, setLocation } = useFixNear();
  const [value, setValue] = useState(location);

  useEffect(() => setValue(location), [location]);

  return (
    <div className="panel p-4">
      <label htmlFor="location" className="eyebrow flex items-center gap-1.5">
        <MapPin className="size-3.5" /> Your location
      </label>
      <form
        className="mt-2 flex flex-col gap-2 sm:flex-row"
        onSubmit={(e) => {
          e.preventDefault();
          setLocation(value.trim());
          onSubmit?.();
        }}
      >
        <Input
          id="location"
          value={value}
          onChange={(e) => setValue(e.target.value.slice(0, 80))}
          placeholder="Enter your area or pincode"
          className="h-11 flex-1"
        />
        <Button type="submit" size="lg" className="shrink-0">
          Find a professional
        </Button>
      </form>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="text-xs text-muted-foreground">Popular:</span>
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => {
              setValue(s);
              setLocation(s);
            }}
            className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium transition-colors hover:bg-accent"
          >
            {s}
          </button>
        ))}
        {location ? (
          <span className="text-xs font-semibold text-success">Showing results near {location}</span>
        ) : null}
      </div>
    </div>
  );
}
