import { StoreLink } from "@/components/store-link";
import { LiveShader } from "@/components/shader/live-shader";
import { HERO_SCENE } from "@/components/shader/scenes";

export function ClosingCta() {
  return (
    <section className="container pb-20 lg:pb-28">
      <div className="relative isolate overflow-hidden rounded-[28px] px-6 py-20 text-center sm:py-24">
        <LiveShader scene={HERO_SCENE} className="-z-10" />
        <div className="absolute inset-0 -z-10 bg-[hsl(199_60%_8%/0.3)]" />
        <h2 className="mx-auto max-w-xl text-[clamp(2rem,5vw,3.4rem)] leading-[1.02] text-[hsl(60_20%_99%)]">
          Try the pause on yourself.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-[hsl(60_20%_99%/0.85)]">
          Free forever for one group. Two minutes to set up.
        </p>
        <StoreLink
          placement="closing_cta"
          className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-[hsl(60_20%_99%)] px-7 text-[15px] font-semibold text-foreground transition-transform duration-200 ease-out hover:scale-[1.02]"
        />
      </div>
    </section>
  );
}
