"use client";

import { useState } from "react";

export function LicenseKey({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-border bg-background p-2 sm:flex-row sm:items-center">
      <code className="min-w-0 flex-1 select-all break-all px-3 py-2 font-mono text-[15px] font-semibold tracking-tight">
        {value}
      </code>
      <button
        type="button"
        onClick={copy}
        className="h-11 shrink-0 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
      >
        <span aria-live="polite">{copied ? "Copied" : "Copy key"}</span>
      </button>
    </div>
  );
}
