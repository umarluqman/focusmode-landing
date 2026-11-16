"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { BrowserFrame } from "./browser-frame";
import { InterventionFrame } from "./intervention-frame";

const INTERVENTIONS = [
  { type: "shader", name: "Shader Light", body: "A live GPU scene rises and settles while the timer runs.", isNew: true },
  { type: "texture", name: "Texture Field", body: "A quiet animated pattern. Let it settle, then decide.", isNew: true },
  { type: "breathing", name: "Breathing Exercise", body: "Four guided patterns, from 4‑7‑8 to box breathing.", pro: true },
  { type: "hold", name: "Hold to Continue", body: "Press and hold for 3–15 seconds to go through." },
  { type: "slide", name: "Slide to Continue", body: "A panel slides over the page and back. Wait it out." },
  { type: "pixel", name: "Pixel Animation", body: "Pixel blocks fill the screen, one by one." },
  { type: "instant", name: "Instant Block", body: "A calm stop with one question. No timer." },
] as const;

export function Interventions() {
  const [current, setCurrent] = useState<(typeof INTERVENTIONS)[number]>(INTERVENTIONS[0]);
  const [run, setRun] = useState(0);
  const replay = () => setRun((n) => n + 1);

  return (
    <section className="py-20 lg:py-28">
      <div className="container grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="text-sm font-semibold text-orange-ink">{INTERVENTIONS.length} interventions</p>
          <h2 className="mt-3 text-[clamp(2rem,4.5vw,3.2rem)] leading-[1.02]">
            Friction, not force: {INTERVENTIONS.length} ways to pause a site.
          </h2>
          <p className="mt-5 max-w-md text-lg text-muted-foreground">
            The same wall every time becomes wallpaper. Mix several in a group
            and FocusMode rotates them, so the pause never turns into a reflex.
          </p>
          <p className="mt-4 max-w-md text-muted-foreground">
            Need a hard stop instead? Strict mode blocks every active group
            instantly for up to 15 minutes. No breaks, no switching off.
          </p>
        </div>

        <div>
          <BrowserFrame url="youtube.com">
            <div className="relative aspect-[4/3.4] sm:aspect-[16/10]">
              <InterventionFrame
                params={{ type: current.type, duration: 3, run }}
                onAction={replay}
              />
            </div>
          </BrowserFrame>
          <div className="mt-3 flex justify-end">
            <button
              type="button"
              onClick={replay}
              className="inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <RotateCcw className="size-3.5" />
              Replay
            </button>
          </div>

          <ol className="mt-4 grid gap-x-10 sm:grid-cols-2">
            {INTERVENTIONS.map((item, i) => (
              <li key={item.type} className="border-t border-border">
                <button
                  type="button"
                  onClick={() => setCurrent(item)}
                  aria-pressed={item === current}
                  className={cn(
                    "w-full py-5 text-left transition-opacity",
                    item === current ? "opacity-100" : "opacity-60 hover:opacity-100"
                  )}
                >
                  <span className="flex items-baseline gap-3">
                    <span className="tnum text-sm text-muted-foreground">0{i + 1}</span>
                    <span className="font-display text-lg">{item.name}</span>
                    {"isNew" in item && (
                      <span className="rounded-full bg-orange/20 px-2 py-0.5 text-[11px] font-semibold">
                        New in 3.0
                      </span>
                    )}
                    {"pro" in item && <span className="text-sm font-semibold text-primary">Pro</span>}
                  </span>
                  <span className="mt-1.5 block pl-8 text-muted-foreground">{item.body}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
