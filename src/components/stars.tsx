import { StarIcon } from "lucide-react";

export function Stars({ rating, className = "size-4" }: { rating: number; className?: string }) {
  return (
    <span className="inline-flex gap-0.5" role="img" aria-label={`Rated ${rating} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={`relative ${className}`}>
          <StarIcon className="absolute inset-0 size-full fill-border text-border" aria-hidden="true" />
          <span
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${Math.min(Math.max(rating - i, 0), 1) * 100}%` }}
          >
            <StarIcon className={`${className} fill-orange text-orange`} aria-hidden="true" />
          </span>
        </span>
      ))}
    </span>
  );
}
