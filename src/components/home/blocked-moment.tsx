"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { LiveShader } from "@/components/shader/live-shader";
import { FAMILIES } from "@/components/shader/scenes";
import { BrowserFrame, FakeFeed } from "./browser-frame";

const SITES = [
  { url: "x.com", group: "Doom-scroll", scene: FAMILIES[1].scenes[1] },
  { url: "reddit.com", group: "Doom-scroll", scene: FAMILIES[0].scenes[0] },
  { url: "youtube.com/shorts", group: "Research video", scene: FAMILIES[0].scenes[1] },
];

const STEPS = [
  ["Habit reaches for a site", "You open a tab on autopilot. FocusMode catches it before the page does."],
  ["The pause rises", "A shader fills the screen while a short timer runs. Nothing to read, nothing to scroll."],
  ["You choose, on purpose", "Hold to take a counted break, or close the tab and keep your streak."],
];

type Phase = "idle" | "paused" | "break" | "closed";

export function BlockedMoment() {
  const [site, setSite] = useState(SITES[0]);
  const [phase, setPhase] = useState<Phase>("idle");
  const [holding, setHolding] = useState(false);

  const visit = (s: (typeof SITES)[number]) => {
    setSite(s);
    setPhase("paused");
  };

  const hold = {
    onPointerDown: () => setHolding(true),
    onPointerUp: () => setHolding(false),
    onPointerLeave: () => setHolding(false),
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        setHolding(true);
      }
    },
    onKeyUp: () => setHolding(false),
  };

  return (
    <section id="demo" className="scroll-mt-20 border-y border-border bg-card py-20 lg:py-28">
      <div className="container grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <p className="text-sm font-semibold text-orange-ink">The blocked moment</p>
          <h2 className="mt-3 text-[clamp(2rem,4.5vw,3.2rem)] leading-[1.02]">
            Three seconds is enough to change your mind.
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

          <BrowserFrame url={phase === "idle" ? "new tab" : site.url}>
            <div className="relative aspect-[4/3.4] sm:aspect-[16/11]" aria-live="polite">
              {phase === "idle" && (
                <div className="absolute inset-0 grid place-items-center p-6 text-center text-muted-foreground">
                  <p>Pick a site above and see what FocusMode does.</p>
                </div>
              )}
              {phase === "break" && <FakeFeed />}

              <div
                className={cn(
                  "absolute inset-0 transition-opacity duration-700 ease-out",
                  phase === "paused" ? "opacity-100" : "pointer-events-none opacity-0"
                )}
              >
                {phase !== "idle" && <LiveShader scene={site.scene} reveal={phase === "paused" ? 1 : 0} />}
                <div className="absolute inset-0 grid place-items-center p-5">
                  {phase === "paused" && (
                    <div className="w-full max-w-[20rem] rounded-3xl bg-[hsl(60_20%_99%/0.66)] p-6 text-center shadow-[0_8px_40px_rgba(0,0,0,0.14)] ring-1 ring-white/50 backdrop-blur-lg">
                      <p className="text-xs font-medium text-foreground/60">{site.group} group</p>
                      <p className="mt-1 text-lg font-semibold leading-snug tracking-tight">
                        Are you sure you want to enter this site?
                      </p>
                      <div className="mt-5 grid gap-2">
                        <button
                          type="button"
                          {...hold}
                          className="relative h-11 select-none overflow-hidden rounded-full bg-foreground text-sm font-semibold text-background [touch-action:none]"
                        >
                          <span
                            onAnimationEnd={() => {
                              setHolding(false);
                              setPhase("break");
                            }}
                            className={cn(
                              "absolute inset-0 origin-left scale-x-0 bg-orange",
                              holding && "animate-[fill_3s_linear_forwards]"
                            )}
                          />
                          <span className="relative">{holding ? "Keep holding…" : "Hold 3s to take a break"}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setPhase("closed")}
                          className="h-11 rounded-full text-sm font-semibold transition-colors hover:bg-foreground/5"
                        >
                          Close tab
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {(phase === "break" || phase === "closed") && (
                <div className="absolute inset-x-4 bottom-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-foreground px-4 py-3 text-sm text-background">
                  <span>
                    {phase === "break"
                      ? "5-minute break started. 2 of 3 breaks left today."
                      : "Tab closed. Your streak lives on."}
                  </span>
                  <button
                    type="button"
                    onClick={() => setPhase("idle")}
                    className="font-semibold text-orange underline-offset-4 hover:underline"
                  >
                    Try again
                  </button>
                </div>
              )}
            </div>
          </BrowserFrame>
        </div>
      </div>
    </section>
  );
}
