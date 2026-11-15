import { CHROME_STORE_URL } from "@/lib/pricing";
import { getCwsStats } from "@/lib/cws";
import { Stars } from "@/components/stars";
import { HeroDemo } from "./hero-demo";

export async function Hero() {
  const stats = await getCwsStats();

  return (
    <section className="relative overflow-hidden">
      <div className="container grid items-center gap-12 pb-20 pt-12 sm:pt-16 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:pb-28 lg:pt-24">
        <div className="max-w-xl animate-fade-up">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <span className="size-1.5 rounded-full bg-orange" />
            FocusMode 3.0 is here
          </p>
          <h1 className="text-[clamp(2.6rem,6.5vw,4.6rem)] leading-[0.98] tracking-[-0.03em]">
            A pause before the scroll.
          </h1>
          <p className="mt-6 max-w-[34rem] text-lg leading-relaxed text-muted-foreground">
            FocusMode doesn&apos;t slam the door on distracting sites. It slows
            the moment down: a living shader rises over the page, you take a
            breath, and then you decide. Everything stays in your browser.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={CHROME_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-7 text-[15px] font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Add to Chrome, it&apos;s free
            </a>
            <a
              href="#demo"
              className="inline-flex h-12 items-center justify-center rounded-full px-5 text-[15px] font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              Try the pause
            </a>
          </div>
          {stats ? (
            <a
              href="#reviews"
              className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground"
            >
              <Stars rating={stats.ratingValue} />
              <span className="font-semibold text-foreground">{stats.ratingValue}</span>
              <span>
                from {stats.ratingCount.toLocaleString("en-US")} ratings ·{" "}
                {stats.users.toLocaleString("en-US")}+ users · no account, no server tracking
              </span>
            </a>
          ) : (
            <p className="mt-6 text-sm text-muted-foreground">
              Free on the Chrome Web Store · no account, no server tracking
            </p>
          )}
        </div>

        <HeroDemo />
      </div>
    </section>
  );
}
