const HALF = "M473.5,51L415.5,51A225,215 0 0 0 190.5,266L14.5,266L14.5,251A220,220 0 0 1 234.5,31L473.5,31Z";

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
      <g transform="translate(50 50) scale(0.109) translate(-244 0)">
        <path d={HALF} transform="scale(1 -1)" />
        <path d={HALF} transform="scale(1 1)" />
      </g>
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
