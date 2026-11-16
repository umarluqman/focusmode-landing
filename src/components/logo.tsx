const ARMS = [[50, 30], [30, 50], [70, 50], [50, 70]];
const CORNERS = [[30, 30], [70, 30], [30, 70], [70, 70]];

export function Logo({ size = 24, className }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      {ARMS.map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={8.5} />
      ))}
      {CORNERS.map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={8.5} opacity={0.35} />
      ))}
    </svg>
  );
}

export function Wordmark() {
  return (
    <span className="flex items-center gap-2">
      <Logo size={28} className="rounded-[7px] bg-primary text-primary-foreground" />
      <span className="font-display text-[17px] font-semibold tracking-tight">
        focusmode
      </span>
    </span>
  );
}
