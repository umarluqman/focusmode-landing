"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { BrowserFrame, FakeFeed } from "./browser-frame";
import { InterventionFrame } from "./intervention-frame";

const SITES = [
  { url: "x.com", variant: "paper-warp" },
  { url: "reddit.com", variant: "dither-sphere" },
  { url: "youtube.com/shorts", variant: "marble-ink" },
];

const DAILY_BREAKS = 3;

const STEPS = [
  ["Habit reaches for a site", "You open a tab on autopilot. focusmode catches it before the page does."],
  ["The pause rises", "A shader fills the screen while a short timer runs. Nothing to read, nothing to scroll."],
  ["You choose, on purpose", "Take a counted break, or close the tab and keep your streak."],
];

type Phase = "idle" | "paused" | "break" | "closed";

export function BlockedMoment() {
  const [site, setSite] = useState(SITES[0]);
  const [phase, setPhase] = useState<Phase>("idle");

  const visit = (s: (typeof SITES)[number]) => {
    setSite(s);
    setPhase("paused");
  };

  return (
    <section id="demo" className="scroll-mt-20 border-y border-border bg-card py-20 lg:py-28">
      <div className="container grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <p className="text-sm font-semibold text-orange-ink">The blocked moment</p>
          <h2 className="mt-3 text-[clamp(2rem,4.5vw,3.2rem)] leading-[1.02]">
            A website blocker that gives you three seconds to change your mind.
          </h2>
          <ol className="mt-10 space-y-7">
            {STEPS.map(([title, body], i) => (
              <li key={title} className="grid grid-cols-[2rem_1fr] gap-x-3">
                <span className="tnum pt-0.5 text-sm font-semibold text-muted-foreground">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="text-lg">{title}</h3>
                  <p className="mt-1 text-muted-foreground">{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <div className="mb-4 flex flex-wrap items-center gap-2" role="group" aria-label="Pick a site to open">
            <span className="mr-1 text-sm text-muted-foreground">Open a site:</span>
            {SITES.map((s) => (
              <button
                key={s.url}
                type="button"
                onClick={() => visit(s)}
                aria-pressed={site.url === s.url && phase !== "idle"}
                className={cn(
                  "h-9 rounded-full border px-4 text-sm font-medium transition-colors",
                  site.url === s.url && phase !== "idle"
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background hover:border-foreground/30"
                )}
              >
                {s.url}
              </button>
            ))}
          </div>

          <BrowserFrame url={phase === "idle" || phase === "closed" ? "new tab" : site.url}>
            <div className="relative aspect-[4/3.4] sm:aspect-[16/11]" aria-live="polite">
              {phase === "idle" && (
                <div className="absolute inset-0 grid place-items-center p-6 text-center text-muted-foreground">
                  <p>Pick a site above and see what focusmode does.</p>
                </div>
              )}
              {phase === "break" && <FakeFeed />}

              {phase === "paused" && (
                <InterventionFrame
                  params={{
                    type: "shader",
                    variant: site.variant,
                    duration: 3,
                    text: "Are you sure you want to enter this site?",
                    breaks: DAILY_BREAKS,
                  }}
                  onAction={(a) => setPhase(a.action === "break" ? "break" : "closed")}
                />
              )}
            </div>
          </BrowserFrame>

          <p className="mt-4 flex min-h-5 flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground" aria-live="polite">
            {(phase === "break" || phase === "closed") && (
              <>
                <span>
                  {phase === "break"
                    ? `5-minute break started. ${DAILY_BREAKS - 1} breaks left today.`
                    : "Tab closed. Your streak lives on."}
                </span>
                <button
                  type="button"
                  onClick={() => setPhase("idle")}
                  className="font-semibold text-orange-ink underline-offset-4 hover:underline"
                >
                  Try again
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
