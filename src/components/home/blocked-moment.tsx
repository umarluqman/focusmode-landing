"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { LiveShader } from "@/components/shader/live-shader";
import { FAMILIES } from "@/components/shader/scenes";
import { BrowserFrame, FakeFeed } from "./browser-frame";
import { OverlayMock, overlayButton } from "./overlay-mock";

const SITES = [
  { url: "x.com", scene: FAMILIES[1].scenes[1] },
  { url: "reddit.com", scene: FAMILIES[0].scenes[0] },
  { url: "youtube.com/shorts", scene: FAMILIES[0].scenes[1] },
];

const BREAK_MINUTES = [5, 10, 15, 30];
const DAILY_BREAKS = 3;

const STEPS = [
  ["Habit reaches for a site", "You open a tab on autopilot. FocusMode catches it before the page does."],
  ["The pause rises", "A shader fills the screen while a short timer runs. Nothing to read, nothing to scroll."],
  ["You choose, on purpose", "Take a counted break, or close the tab and keep your streak."],
];

type Phase = "idle" | "paused" | "break" | "closed";

export function BlockedMoment() {
  const [site, setSite] = useState(SITES[0]);
  const [phase, setPhase] = useState<Phase>("idle");
  const [picking, setPicking] = useState(false);

  const visit = (s: (typeof SITES)[number]) => {
    setSite(s);
    setPicking(false);
    setPhase("paused");
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

          <BrowserFrame url={phase === "idle" || phase === "closed" ? "new tab" : site.url}>
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
                {phase === "paused" && (
                  <OverlayMock
                    key={site.url}
                    text="Are you sure you want to enter this site?"
                    breaksLeft={DAILY_BREAKS}
                  >
                    {picking ? (
                      <div className="flex items-center gap-2 sm:gap-3">
                        <button
                          type="button"
                          aria-label="Back"
                          onClick={() => setPicking(false)}
                          className="grid size-9 shrink-0 place-items-center rounded-[8px] text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-950"
                        >
                          <ArrowLeft className="size-4" />
                        </button>
                        <div className="grid grid-cols-2 gap-px xl:grid-cols-4 overflow-hidden rounded-[8px] border border-zinc-200 bg-zinc-200 shadow-sm">
                          {BREAK_MINUTES.map((minutes) => (
                            <button
                              key={minutes}
                              type="button"
                              disabled={minutes !== 5}
                              title={minutes !== 5 ? "Exclusive for PRO users" : undefined}
                              onClick={() => setPhase("break")}
                              className={overlayButton.segment}
                            >
                              For {minutes} minutes
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-3">
                        <button type="button" onClick={() => setPicking(true)} className={overlayButton.outline}>
                          Let me continue
                        </button>
                        <button type="button" onClick={() => setPhase("closed")} className={overlayButton.dark}>
                          Close tab
                        </button>
                      </div>
                    )}
                  </OverlayMock>
                )}
              </div>
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
