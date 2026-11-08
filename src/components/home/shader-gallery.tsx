"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { FREE_SHADER_FAMILIES } from "@/lib/pricing";
import { LiveShader } from "@/components/shader/live-shader";
import { FAMILIES, poster } from "@/components/shader/scenes";

const total = FAMILIES.reduce((n, f) => n + f.count, 0);

export function ShaderGallery() {
  const [scene, setScene] = useState(FAMILIES[0].scenes[0]);
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
            {FREE_SHADER_FAMILIES.join(" and ")} come free. Pro opens the whole
            gallery.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[18rem_1fr]">
          <div className="order-2 space-y-5 lg:order-1">
            {FAMILIES.map((f) => (
              <fieldset key={f.label}>
                <legend className="mb-2 flex w-full items-center justify-between text-sm">
                  <span className="font-semibold">
                    {f.label}
                    <span className="ml-1.5 font-normal text-muted-foreground">{f.count}</span>
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
                      <span className="flex h-9 items-center gap-2 rounded-full border border-border bg-card pl-1.5 pr-3.5 text-sm transition-colors peer-checked:border-foreground peer-focus-visible:ring-2 peer-focus-visible:ring-ring">
                        <span className="size-6 rounded-full" style={{ background: poster(s.colors) }} />
                        {s.label}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
            ))}
          </div>

          <div className="relative order-1 aspect-[4/3] overflow-hidden rounded-[24px] bg-muted lg:order-2 lg:aspect-auto lg:min-h-[30rem]">
            <LiveShader scene={scene} />
            <div className="absolute bottom-4 left-4 rounded-full bg-[hsl(60_20%_99%/0.8)] px-3.5 py-1.5 text-sm font-semibold backdrop-blur">
              {family.label} · {scene.label}
              {!family.free && <span className="ml-2 text-primary">Pro</span>}
            </div>
          </div>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          Previews are simplified web versions of the in-extension shaders.
        </p>
      </div>
    </section>
  );
}
