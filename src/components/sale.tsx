"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { isSaleActive, SALE } from "@/lib/pricing";

export function useSaleActive(initial: boolean) {
  const [active, setActive] = useState(initial);
  useEffect(() => {
    const tick = () => setActive(isSaleActive());
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);
  return active;
}

export function SaleBanner({ initial }: { initial: boolean }) {
  const active = useSaleActive(initial);
  if (!active) return null;
  return (
    <Link
      href="/pricing/"
      className="group block bg-primary text-primary-foreground"
    >
      <div className="container flex min-h-10 flex-wrap items-center justify-center gap-x-3 gap-y-0.5 py-2 text-center text-[13px]">
        <span className="font-semibold">
          <span className="mr-1.5 inline-block size-1.5 -translate-y-px rounded-full bg-orange align-middle" />
          {SALE.name}: {SALE.percentOff}% off lifetime Pro with code {SALE.code}
        </span>
        <span className="opacity-80">Ends {SALE.endLabel}</span>
        <span className="font-semibold text-orange underline-offset-4 group-hover:underline">
          See prices
        </span>
      </div>
    </Link>
  );
}
