export function SeeIt() {
  return (
    <section id="video" className="scroll-mt-20 py-20 lg:py-28">
      <div className="container">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-orange-ink">See it in action</p>
          <h2 className="mt-3 text-[clamp(2rem,4.5vw,3.2rem)] leading-[1.02]">
            focusmode 3 in 25 seconds.
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            The pause, the popup and the extension&apos;s own shaders, rendered live.
          </p>
        </div>
        <video
          className="mt-12 aspect-video w-full rounded-[20px] border border-border bg-black"
          src="/promo.mp4"
          poster="/promo-poster.jpg"
          width={1280}
          height={720}
          playsInline
          controls
          preload="none"
          aria-label="focusmode 3 promo video"
        />
      </div>
    </section>
  );
}
