"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function ResendForm({ className }: { className?: string }) {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email");
    setState("sending");
    const res = await fetch("/api/license/resend/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    }).catch(() => null);
    setState(res?.ok ? "sent" : "error");
  };

  if (state === "sent") {
    return (
      <p role="status" className={cn("text-sm", className)}>
        If that email has a FocusMode key, it&apos;s on its way. Check spam if it
        doesn&apos;t show up in a few minutes.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className={cn("space-y-2", className)}>
      <label htmlFor="resend-email" className="sr-only">
        Email you paid with
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          id="resend-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Email you paid with"
          className="h-12 min-w-0 flex-1 rounded-full border border-input bg-card px-5 text-[15px] placeholder:text-muted-foreground"
        />
        <button
          type="submit"
          disabled={state === "sending"}
          className="h-12 rounded-full bg-foreground px-6 text-[15px] font-semibold text-background transition-transform duration-200 ease-out active:scale-[0.98] disabled:opacity-70"
        >
          {state === "sending" ? "Sending…" : "Email my key"}
        </button>
      </div>
      <p role="status" className="min-h-5 text-xs text-destructive">
        {state === "error" && "Couldn't send right now. Try again in a minute."}
      </p>
    </form>
  );
}
