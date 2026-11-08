"use client";

import { useEffect, useState } from "react";
import { LiveShader } from "@/components/shader/live-shader";
import { HERO_SCENE } from "@/components/shader/scenes";
import { BrowserFrame, FakeFeed } from "./browser-frame";

const BROWSE_MS = 2600;
const PAUSE_MS = 6800;

export function HeroDemo() {
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPaused(true);
      return;
    }
    let id = setTimeout(function loop(next = true) {
      setPaused(next);
      id = setTimeout(() => loop(!next), next ? PAUSE_MS : BROWSE_MS);
    }, BROWSE_MS);
    return () => clearTimeout(id);
  }, []);

  return (
    <div className="animate-fade-up [animation-delay:120ms]">
      <BrowserFrame url={paused ? "x.com · paused by FocusMode" : "x.com/home"}>
        <div className="relative aspect-[4/3.4] sm:aspect-[4/3]">
          <FakeFeed />
          <div
            className="absolute inset-0 transition-opacity duration-700 ease-out"
            style={{ opacity: paused ? 1 : 0 }}
          >
            <LiveShader scene={HERO_SCENE} reveal={paused ? 1 : 0} />
            <div className="absolute inset-0 grid place-items-center p-5">
              <PauseCard key={String(paused)} active={paused} />
            </div>
          </div>
        </div>
      </BrowserFrame>
    </div>
  );
}

function PauseCard({ active }: { active: boolean }) {
  return (
    <div
      aria-hidden="true"
      className="w-full max-w-[19rem] rounded-3xl bg-[hsl(60_20%_99%/0.62)] p-6 text-center shadow-[0_8px_40px_rgba(0,0,0,0.14)] ring-1 ring-white/50 backdrop-blur-lg"
    >
      <p className="text-lg font-semibold leading-snug tracking-tight">
        Pause. Let the light move first.
      </p>
      <div className="mx-auto mt-5 h-1 w-full overflow-hidden rounded-full bg-foreground/10">
        <div
          className={`h-full origin-left scale-x-0 rounded-full bg-foreground ${active ? "animate-fill" : ""}`}
        />
      </div>
      <div className="mt-5 flex justify-center gap-2 text-sm font-semibold">
        <span className="rounded-full bg-foreground px-4 py-2 text-background">
          Close tab
        </span>
        <span className="rounded-full px-4 py-2">Continue</span>
      </div>
    </div>
  );
}
