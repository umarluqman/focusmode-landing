"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { TierId } from "@/lib/pricing";

export function BuyButton({
  tier,
  className,
  children,
}: {
  tier: TierId;
  className?: string;
  children: React.ReactNode;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);

  const buy = async () => {
    setBusy(true);
    setError(false);
    try {
      const res = await fetch("/api/checkout/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier }),
      });
      const { url } = await res.json();
      if (!res.ok || !url) throw new Error();
      window.location.assign(url);
    } catch {
      setError(true);
      setBusy(false);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={buy}
        disabled={busy}
        aria-busy={busy}
        className={cn(
          "inline-flex h-12 w-full items-center justify-center rounded-full px-6 text-[15px] font-semibold transition-[transform,background-color] duration-200 ease-out active:scale-[0.98] disabled:opacity-70",
          className
        )}
      >
        {busy ? "Opening checkout…" : children}
      </button>
      <p role="status" className="mt-2 min-h-5 text-center text-xs text-destructive">
        {error && "Checkout didn't open. Try again, or email focusmode.app@gmail.com."}
      </p>
    </div>
  );
}
