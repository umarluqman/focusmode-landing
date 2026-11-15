"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const button =
  "inline-flex h-9 items-center justify-center whitespace-nowrap px-3.5 text-sm font-medium transition-colors sm:h-10 sm:px-4";

export const overlayButton = {
  outline: cn(button, "rounded-[8px] border border-zinc-200 bg-white text-zinc-900 shadow-sm hover:bg-zinc-100"),
  dark: cn(button, "rounded-[8px] bg-zinc-900 text-zinc-50 shadow-sm hover:bg-zinc-900/90"),
  segment:
    "h-9 whitespace-nowrap bg-white px-3 text-[13px] font-medium text-zinc-900 transition-colors hover:bg-zinc-100 disabled:text-zinc-900/50 disabled:hover:bg-white sm:h-10",
};

export function OverlayMock({
  text,
  breaksLeft,
  active = true,
  children,
}: {
  text: string;
  breaksLeft: number;
  active?: boolean;
  children: React.ReactNode;
}) {
  const [settled, setSettled] = useState(false);
  const reveal = cn("transition-opacity duration-500", !settled && "invisible opacity-0");

  return (
    <>
      <div
        className={cn(
          "absolute inset-x-0 top-0 h-1 bg-white transition-opacity duration-500",
          settled && "opacity-0"
        )}
      >
        <div
          onAnimationEnd={() => setSettled(true)}
          className={cn(
            "h-full origin-left scale-x-0 bg-zinc-950",
            active && "animate-[fill_3s_linear_forwards]"
          )}
        />
      </div>
      <div
        className={cn(
          "absolute inset-x-3 top-4 mx-auto flex max-w-[36rem] flex-col items-center gap-5 rounded-3xl px-4 py-6 transition-[background-color,box-shadow] duration-500 sm:top-6 sm:gap-7 sm:px-6 sm:py-8",
          settled
            ? "bg-white/60 shadow-[0_8px_40px_rgba(0,0,0,0.12)] ring-1 ring-white/50 backdrop-blur-lg"
            : "mix-blend-difference"
        )}
      >
        <div className="space-y-2 text-center">
          <p
            className={cn(
              "text-balance text-2xl font-bold leading-tight sm:text-[2rem]",
              settled ? "text-zinc-950" : "text-white"
            )}
          >
            {text}
          </p>
          <p className={cn("text-sm text-zinc-500", reveal)}>
            You have{" "}
            <span className="font-bold text-zinc-950">
              {breaksLeft} {breaksLeft === 1 ? "break" : "breaks"}
            </span>{" "}
            left today.
          </p>
        </div>
        <div className={reveal}>{children}</div>
      </div>
    </>
  );
}
