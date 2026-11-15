"use client";

import { useEffect, useState } from "react";
import { LiveShader } from "@/components/shader/live-shader";
import { HERO_SCENE } from "@/components/shader/scenes";
import { BrowserFrame, FakeFeed } from "./browser-frame";
import { OverlayMock, overlayButton } from "./overlay-mock";

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
            <div aria-hidden="true">
              <OverlayMock
                key={String(paused)}
                active={paused}
                text="Pause. Let the light move first."
                breaksLeft={3}
              >
                <div className="flex gap-3">
                  <span className={overlayButton.outline}>Let me continue</span>
                  <span className={overlayButton.dark}>Close tab</span>
                </div>
              </OverlayMock>
            </div>
          </div>
        </div>
      </BrowserFrame>
    </div>
  );
}
