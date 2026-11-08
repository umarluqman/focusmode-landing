const HALF = "M180.1 19.9 L72 128 L122 178 L18.9 178 A120 120 0 0 1 180.1 19.9 Z";

export function Logo({ size = 24, className }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 256 256"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d={HALF} />
      <path d={HALF} transform="rotate(180 128 128)" />
    </svg>
  );
}

export function Wordmark() {
  return (
    <span className="flex items-center gap-2">
      <span className="grid size-7 place-items-center rounded-full bg-primary text-primary-foreground">
        <Logo size={16} />
      </span>
      <span className="font-display text-[17px] font-semibold tracking-tight">
        FocusMode
      </span>
    </span>
  );
}
