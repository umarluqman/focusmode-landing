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

const pad = (n: number) => String(n).padStart(2, "0");

export function Countdown({ className }: { className?: string }) {
  const [left, setLeft] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setLeft(Math.max(0, SALE.end.getTime() - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (left === 0) return null;
  const s = Math.floor((left ?? 0) / 1000);
  const parts = [
    [Math.floor(s / 86400), "d"],
    [Math.floor(s / 3600) % 24, "h"],
    [Math.floor(s / 60) % 60, "m"],
    [s % 60, "s"],
  ] as const;

  return (
    <span className={className} role="timer" aria-label="Time left in the sale">
      <span className="tnum" aria-hidden={left === null}>
        {left === null
          ? "--d --h --m --s"
          : parts.map(([v, u]) => `${pad(v)}${u}`).join(" ")}
      </span>
    </span>
  );
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
        <Countdown className="opacity-80" />
        <span className="font-semibold text-orange underline-offset-4 group-hover:underline">
          See prices
        </span>
      </div>
    </Link>
  );
}
