import { STATUS_META, STATUS_ORDER } from "@/lib/fixnear/data";
import type { RequestStatus } from "@/lib/fixnear/types";
import { cn } from "@/lib/utils";

export function StatusPill({ status }: { status: RequestStatus }) {
  const meta = STATUS_META[status];
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold">
      <span className={cn("size-2 rounded-full", meta.dot)} />
      {meta.label}
    </span>
  );
}

export function StatusTimeline({ status }: { status: RequestStatus }) {
  const current = STATUS_META[status].order;
  return (
    <ol className="grid grid-cols-5 gap-2">
      {STATUS_ORDER.map((s, i) => {
        const done = i <= current;
        return (
          <li key={s} className="space-y-2">
            <div
              className={cn(
                "h-1.5 w-full rounded-full transition-colors",
                done ? STATUS_META[s].dot : "bg-border",
              )}
            />
            <p
              className={cn(
                "text-[10px] leading-tight font-semibold tracking-wide uppercase",
                done ? "text-foreground" : "text-muted-foreground/60",
              )}
            >
              {STATUS_META[s].label}
            </p>
          </li>
        );
      })}
    </ol>
  );
}
