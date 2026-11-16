"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { FREE_SHADER_FAMILIES } from "@/lib/pricing";
import { InterventionFrame } from "./intervention-frame";

// Mirrors SHADER_VARIANTS in focusmode-wxt/types/storage.ts.
const family = (label: string, prefix: string, names: string[]) => ({
  label,
  free: FREE_SHADER_FAMILIES.includes(label),
  scenes: names.map((name) => ({
    id: `${prefix}-${name}`,
    label: name.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join(" "),
  })),
});

const FAMILIES = [
  family("Dither", "dither", ["sphere", "warp", "simplex", "swirl", "ripple", "wave"]),
  family("Gallery", "paper", ["mesh", "grain", "warp", "metaballs", "smoke-ring", "god-rays", "swirl", "neuro", "spiral"]),
  family("Liquid", "liquid", ["molten", "aurora", "silk", "bayer"]),
  family("Marble", "marble", ["marble", "ink", "aurora"]),
  family("Fluid", "fluid", ["burst"]),
];

const total = FAMILIES.reduce((n, f) => n + f.scenes.length, 0);

export function ShaderGallery() {
  const [scene, setScene] = useState(FAMILIES[0].scenes[0]);
  const [run, setRun] = useState(0);
  const family = FAMILIES.find((f) => f.scenes.includes(scene))!;

  return (
    <section id="shaders" className="scroll-mt-20 py-20 lg:py-28">
      <div className="container">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-orange-ink">Shader gallery</p>
            <h2 className="mt-3 text-[clamp(2rem,4.5vw,3.2rem)] leading-[1.02]">
              {total} living backdrops for the pause.
            </h2>
          </div>
          <p className="max-w-sm text-muted-foreground">
            Each one renders live on your GPU, then settles as the timer ends.{" "}
            The {FREE_SHADER_FAMILIES.join(" and ")} family is free. Pro opens the
            whole gallery.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[18rem_1fr]">
          <div className="order-2 space-y-5 lg:order-1">
            {FAMILIES.map((f) => (
              <fieldset key={f.label}>
                <legend className="mb-2 flex w-full items-center justify-between text-sm">
                  <span className="font-semibold">
                    {f.label}
                    <span className="ml-1.5 font-normal text-muted-foreground">{f.scenes.length}</span>
                  </span>
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[11px] font-semibold",
                      f.free ? "bg-secondary text-foreground" : "bg-primary text-primary-foreground"
                    )}
                  >
                    {f.free ? "Free" : "Pro"}
                  </span>
                </legend>
                <div className="flex flex-wrap gap-2">
                  {f.scenes.map((s) => (
                    <label key={s.id} className="cursor-pointer">
                      <input
                        type="radio"
                        name="shader"
                        className="peer sr-only"
                        checked={s === scene}
                        onChange={() => setScene(s)}
                      />
                      <span className="flex h-9 items-center rounded-full border border-border bg-card px-3.5 text-sm transition-colors peer-checked:border-foreground peer-focus-visible:ring-2 peer-focus-visible:ring-ring">
                        {s.label}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
            ))}
          </div>

          <div className="relative order-1 aspect-[4/3] overflow-hidden rounded-[24px] bg-muted lg:order-2 lg:aspect-auto lg:min-h-[30rem]">
            <InterventionFrame
              params={{ type: "shader", variant: scene.id, duration: 4, run }}
              onAction={() => setRun((n) => n + 1)}
            />
            <div className="absolute bottom-4 left-4 rounded-full bg-[hsl(60_20%_99%/0.8)] px-3.5 py-1.5 text-sm font-semibold backdrop-blur">
              {family.label} · {scene.label}
              {!family.free && <span className="ml-2 text-primary">Pro</span>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
