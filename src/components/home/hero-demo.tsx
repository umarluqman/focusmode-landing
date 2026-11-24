"use client";

import { useEffect, useState } from "react";
import { BrowserFrame } from "./browser-frame";
import { InterventionFrame } from "./intervention-frame";

const SCENES = ["typing", "page", "wave"] as const;
const DWELL_MS = { typing: 2500, page: 900, wave: 5000 };
const WAVE = SCENES.indexOf("wave");
const SITE = "youtube.com";
// The cursor reaches the address bar and clicks before the first key.
const FIRST_KEY_MS = 800;
const KEY_MS = 100;

export function HeroDemo() {
  const [step, setStep] = useState(0);
  const [typed, setTyped] = useState(0);
  const scene = SCENES[step];
  const typing = scene === "typing";

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStep(WAVE);
      return;
    }
    const id = setTimeout(() => {
      setStep((step + 1) % SCENES.length);
      setTyped(0);
    }, DWELL_MS[SCENES[step]]);
    return () => clearTimeout(id);
  }, [step]);

  useEffect(() => {
    if (!typing || typed === SITE.length) return;
    const id = setTimeout(() => setTyped(typed + 1), typed ? KEY_MS : FIRST_KEY_MS);
    return () => clearTimeout(id);
  }, [typing, typed]);

  return (
    <div className="animate-fade-up [animation-delay:120ms]">
      <BrowserFrame
        zoomed={typing}
        url={
          typing ? (
            <>
              {SITE.slice(0, typed)}
              <span className="ml-px h-3.5 w-px animate-blink bg-foreground" />
            </>
          ) : scene === "page" ? (
            SITE
          ) : (
            `${SITE} · paused by focusmode`
          )
        }
      >
        <div className="relative aspect-[4/3.4] sm:aspect-[4/3]">
          {typing ? <Cursor /> : <FakeVideoGrid />}
          {scene === "wave" && (
            <InterventionFrame interactive={false} params={{ type: "slide", variant: "wave", duration: 4 }} />
          )}
        </div>
      </BrowserFrame>
    </div>
  );
}

function Cursor() {
  return (
    <svg
      viewBox="0 0 12 16"
      className="absolute -top-4 left-[170px] w-3 origin-top-left animate-cursor-click fill-foreground stroke-card"
      aria-hidden="true"
    >
      <path d="M1 1v12l3.2-3 2.1 4.6 2-.9-2.1-4.5H11z" />
    </svg>
  );
}

function FakeVideoGrid() {
  return (
    <div className="absolute inset-0 grid grid-cols-2 content-start gap-4 overflow-hidden p-5 sm:grid-cols-3" aria-hidden="true">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="space-y-2">
          <div className="aspect-video rounded-xl bg-muted" />
          <div className="flex gap-2">
            <div className="size-6 shrink-0 rounded-full bg-secondary" />
            <div className="flex-1 space-y-1.5 pt-0.5">
              <div className="h-2 w-11/12 rounded-full bg-secondary" />
              <div className="h-2 w-2/3 rounded-full bg-muted" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
