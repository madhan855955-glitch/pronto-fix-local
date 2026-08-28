import { TRADE_META } from "@/lib/fixnear/data";
import type { Availability, Trade } from "@/lib/fixnear/types";
import { cn } from "@/lib/utils";

export function TradeBadge({ trade, className }: { trade: Trade; className?: string }) {
  const meta = TRADE_META[trade];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
        trade === "electrician"
          ? "bg-electric-soft text-electric-foreground dark:text-electric"
          : "bg-water-soft text-water dark:text-water",
        className,
      )}
    >
      <span aria-hidden>{meta.glyph}</span>
      {meta.label}
    </span>
  );
}

const AVAIL_LABEL: Record<Availability, string> = {
  available: "Available now",
  busy: "Busy today",
  offline: "Offline",
};

export function AvailabilityDot({
  availability,
  className,
}: {
  availability: Availability;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 text-xs font-semibold", className)}>
      <span
        className={cn(
          "size-2 rounded-full",
          availability === "available" && "bg-success",
          availability === "busy" && "bg-warning",
          availability === "offline" && "bg-muted-foreground",
        )}
      />
      <span
        className={cn(
          availability === "available" && "text-success",
          availability === "busy" && "text-warning",
          availability === "offline" && "text-muted-foreground",
        )}
      >
        {AVAIL_LABEL[availability]}
      </span>
    </span>
  );
}
