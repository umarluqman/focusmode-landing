"use client";

import { useEffect, useState } from "react";
import { BrowserFrame, FakeFeed } from "./browser-frame";
import { InterventionFrame } from "./intervention-frame";

const BROWSE_MS = 2600;
const PAUSE_MS = 7400;

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
      <BrowserFrame url={paused ? "x.com · paused by focusmode" : "x.com/home"}>
        <div className="relative aspect-[4/3.4] sm:aspect-[4/3]">
          <FakeFeed />
          {paused && (
            <InterventionFrame
              interactive={false}
              params={{ type: "shader", variant: "paper-mesh", duration: 4 }}
            />
          )}
        </div>
      </BrowserFrame>
    </div>
  );
}
