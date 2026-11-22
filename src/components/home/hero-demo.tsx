"use client";

import { useEffect, useState } from "react";
import { BrowserFrame, FakeFeed } from "./browser-frame";
import { InterventionFrame } from "./intervention-frame";

const SCENES = ["feed", "wave", "feed", "breathing"] as const;
const DWELL_MS = { feed: 2600, wave: 7400, breathing: 7000 };
// Breathing stays up this long after the visitor's last click.
const HOLD_MS = 30000;
const BREATHING = SCENES.indexOf("breathing");

export function HeroDemo() {
  const [step, setStep] = useState(0);
  const [touches, setTouches] = useState(0);
  const scene = SCENES[step];

  const advance = () => {
    setStep((s) => (s + 1) % SCENES.length);
    setTouches(0);
  };

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStep(BREATHING);
      return;
    }
    const id = setTimeout(advance, touches ? HOLD_MS : DWELL_MS[scene]);
    return () => clearTimeout(id);
  }, [step, touches]);

  return (
    <div className="animate-fade-up [animation-delay:120ms]">
      <BrowserFrame url={scene === "feed" ? "x.com/home" : "x.com · paused by focusmode"}>
        <div className="relative aspect-[4/3.4] sm:aspect-[4/3]">
          <FakeFeed />
          {scene === "wave" && (
            <InterventionFrame interactive={false} params={{ type: "slide", variant: "wave", duration: 6 }} />
          )}
          {scene === "breathing" && (
            <InterventionFrame
              params={{ type: "breathing", variant: "petals", technique: "505" }}
              onInteract={() => setTouches((t) => t + 1)}
              onAction={advance}
            />
          )}
        </div>
      </BrowserFrame>
    </div>
  );
}
