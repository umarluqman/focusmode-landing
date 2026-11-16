import { cn } from "@/lib/utils";

export function BrowserFrame({
  url,
  className,
  children,
}: {
  url: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[20px] border border-border bg-card shadow-[0_1px_2px_hsl(199_40%_7%/0.04),0_24px_60px_-24px_hsl(199_60%_15%/0.35)]",
        className
      )}
    >
      <div className="flex h-10 items-center gap-3 border-b border-border px-4">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-secondary" />
          <span className="size-2.5 rounded-full bg-secondary" />
          <span className="size-2.5 rounded-full bg-secondary" />
        </span>
        <span className="flex h-6 flex-1 items-center rounded-full bg-muted px-3 text-xs text-muted-foreground">
          {url}
        </span>
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}

export function FakeFeed() {
  return (
    <div className="space-y-4 p-5" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <div key={i} className="flex gap-3">
          <div className="size-9 shrink-0 rounded-full bg-secondary" />
          <div className="flex-1 space-y-2 pt-1">
            <div className="h-2.5 w-1/3 rounded-full bg-secondary" />
            <div className="h-2.5 w-11/12 rounded-full bg-muted" />
            <div className="h-2.5 w-3/4 rounded-full bg-muted" />
            {i === 0 && <div className="mt-3 h-28 rounded-xl bg-muted" />}
          </div>
        </div>
      ))}
    </div>
  );
}
