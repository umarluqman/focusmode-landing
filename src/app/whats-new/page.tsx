import type { Metadata } from "next/types";
import { BuyButton } from "@/components/buy-button";
import { Footer } from "@/components/footer";
import { Faq } from "@/components/home/faq";
import { Reviews } from "@/components/home/reviews";
import { ResendForm } from "@/components/resend-form";
import { Countdown } from "@/components/sale";
import { LiveShader } from "@/components/shader/live-shader";
import { FAMILIES, HERO_SCENE } from "@/components/shader/scenes";
import { Stars } from "@/components/stars";
import { getCwsStats } from "@/lib/cws";
import {
  browsersLabel,
  CHROME_STORE_URL,
  formatPrice,
  isSaleActive,
  priceOf,
  SALE,
  TIERS,
} from "@/lib/pricing";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "What's new in FocusMode 3",
  description: "FocusMode 3 is installed. Here's what changed and what Pro adds.",
  robots: { index: false, follow: false },
};

const NEW = [
  {
    title: "A pause that moves",
    body: "A live shader rises over the site and settles while the timer runs. Harder to click past than a grey wall.",
    pro: false,
  },
  {
    title: "Groups with their own rules",
    body: "News after 15 minutes a day, shopping only at night, work sites all day. Each group gets its own trigger, breaks and pause.",
    pro: false,
  },
  {
    title: "Strict mode",
    body: "Need a hard stop? Every group blocks for up to 15 minutes. No breaks, no switching it off.",
    pro: false,
  },
  {
    title: "Breathing pause",
    body: "Four guided patterns, from 4-7-8 to box breathing, before you decide.",
    pro: true,
  },
];

const COMPARE: [string, string, string][] = [
  ["Focus groups", "1", "Unlimited"],
  ["Shader pauses", "6", "23"],
  ["Breathing pause", "–", "✓"],
  ["Break lengths", "5 min", "Any"],
  ["Usage analytics", "–", "✓"],
  ["Every future update", "✓", "✓"],
];

const SAVED_MINUTES_A_DAY = 20;

export default async function WhatsNew({
  searchParams,
}: {
  searchParams: { pro?: string };
}) {
  const stats = await getCwsStats();
  const sale = isSaleActive();
  const lifetime = searchParams.pro === "1";

  return (
    <>
      <main id="main">
        {lifetime ? <LifetimeHero /> : <Hero sale={sale} stats={stats} />}
        <WhatChanged />
        {lifetime ? (
          <ReviewAsk />
        ) : (
          <>
            <TheMath sale={sale} />
            <Compare />
            <Reviews />
            <Offer sale={sale} />
            <Faq />
          </>
        )}
      </main>
      <Footer />
    </>
  );
}

function Hero({
  sale,
  stats,
}: {
  sale: boolean;
  stats: Awaited<ReturnType<typeof getCwsStats>>;
}) {
  const from = formatPrice(priceOf(TIERS[0], sale));

  return (
    <section className="container grid items-center gap-12 pb-20 pt-12 sm:pt-16 lg:grid-cols-[1fr_1fr] lg:gap-16 lg:pb-28 lg:pt-20">
      <div className="max-w-xl animate-fade-up">
        <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
          <span className="size-1.5 rounded-full bg-orange" />
          You&apos;re on FocusMode 3
        </p>
        <h1 className="text-[clamp(2.4rem,6vw,4.2rem)] leading-[0.98] tracking-[-0.03em]">
          You updated. Now take your hours back.
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          Your groups, sites and streaks came with you. What&apos;s new is the
          pause itself: slower, calmer and much harder to click past.{" "}
          {sale
            ? `And for ${SALE.name}, lifetime Pro is ${SALE.percentOff}% off with code ${SALE.code}.`
            : "Pro removes every limit, for one payment."}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href="#offer"
            className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-7 text-[15px] font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {sale ? `Get Pro for $${from}` : `Get Pro from $${from}`}
          </a>
          <a
            href="#new"
            className="inline-flex h-12 items-center justify-center rounded-full px-5 text-[15px] font-semibold transition-colors hover:bg-secondary"
          >
            See what&apos;s new
          </a>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          One payment, yours for life. 14-day refund.
          {sale && (
            <>
              {" "}
              Sale ends in <Countdown className="font-semibold text-foreground" />
            </>
          )}
        </p>
        {stats && (
          <p className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
            <Stars rating={stats.ratingValue} />
            <span className="font-semibold text-foreground">{stats.ratingValue}</span>
            from {stats.ratingCount.toLocaleString("en-US")} ratings ·{" "}
            {stats.users.toLocaleString("en-US")}+ users
          </p>
        )}
      </div>
      <PauseCard />
    </section>
  );
}

function LifetimeHero() {
  return (
    <section className="container grid items-center gap-12 pb-20 pt-12 sm:pt-16 lg:grid-cols-[1fr_1fr] lg:gap-16 lg:pb-28 lg:pt-20">
      <div className="max-w-xl animate-fade-up">
        <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
          <span className="size-1.5 rounded-full bg-orange" />
          You&apos;re on FocusMode 3
        </p>
        <h1 className="text-[clamp(2.4rem,6vw,4.2rem)] leading-[0.98] tracking-[-0.03em]">
          You&apos;re Pro for life. Thank you.
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          You backed FocusMode early, so every v2 Pro account gets an Unlimited
          key for free, even if your subscription lapsed. Enter the email you
          paid with and we&apos;ll send it. Then paste it in Settings in the
          extension.
        </p>
        <ResendForm className="mt-8 max-w-md" />
      </div>
      <PauseCard />
    </section>
  );
}

function PauseCard() {
  return (
    <div className="relative isolate flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[28px] p-6">
      <LiveShader scene={FAMILIES[3].scenes[1]} className="-z-10" />
      <div className="rounded-2xl bg-white/70 px-6 py-5 text-center text-foreground shadow-lg backdrop-blur-md">
        <p className="text-xl font-semibold tracking-tight">Pause. Let the light move first.</p>
        <p className="mt-1 text-sm text-muted-foreground">
          You have <b className="text-foreground">2 breaks</b> left today.
        </p>
      </div>
    </div>
  );
}

function WhatChanged() {
  return (
    <section id="new" className="scroll-mt-20 border-t border-border py-20 lg:py-28">
      <div className="container">
        <p className="text-sm font-semibold text-orange-ink">New in 3.0</p>
        <h2 className="mt-3 max-w-2xl text-[clamp(2rem,4.5vw,3.2rem)] leading-[1.02]">
          A wall you learn to ignore. A pause you don&apos;t.
        </h2>
        <ul className="mt-12 grid gap-x-10 sm:grid-cols-2">
          {NEW.map((n) => (
            <li key={n.title} className="border-t border-border py-6">
              <h3 className="flex items-baseline gap-3 text-lg">
                {n.title}
                {n.pro && <span className="text-sm font-semibold text-primary">Pro</span>}
              </h3>
              <p className="mt-1.5 text-muted-foreground">{n.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function TheMath({ sale }: { sale: boolean }) {
  const price = priceOf(TIERS[0], sale);
  const hours = Math.round((SAVED_MINUTES_A_DAY * 365) / 60);
  const cents = Math.round((price / hours) * 100);

  return (
    <section className="bg-primary text-primary-foreground">
      <div className="container grid gap-10 py-16 lg:grid-cols-[1fr_1fr] lg:items-center lg:py-20">
        <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] leading-[1.05]">
          {SAVED_MINUTES_A_DAY} minutes a day is {hours} hours a year.
        </h2>
        <div className="space-y-3 text-lg opacity-90">
          <p>
            That&apos;s what a few &ldquo;quick checks&rdquo; add up to. If
            FocusMode stops just that much, Pro costs about {cents}¢ for every
            hour you get back.
          </p>
          <p>
            Paid once, ${formatPrice(price)}. No subscription waiting to renew.
          </p>
        </div>
      </div>
    </section>
  );
}

function Compare() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <div>
          <p className="text-sm font-semibold text-orange-ink">Free vs Pro</p>
          <h2 className="mt-3 text-[clamp(2rem,4.5vw,3.2rem)] leading-[1.02]">
            Free stays free. Pro is for when one group isn&apos;t enough.
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Most people outgrow one group in a week: work sites by day,
            shopping by night, news on a timer.
          </p>
        </div>
        <div className="rounded-[20px] border border-border bg-card text-sm">
          <div className="grid grid-cols-[1fr_80px_96px] px-5 py-3 text-xs font-semibold text-muted-foreground">
            <span />
            <span className="text-center">Free</span>
            <span className="text-center text-primary">Pro</span>
          </div>
          {COMPARE.map(([label, free, pro]) => (
            <div key={label} className="grid grid-cols-[1fr_80px_96px] items-center border-t border-border px-5 py-3.5">
              <span>{label}</span>
              <span className="text-center text-muted-foreground">{free}</span>
              <span className="text-center font-semibold">{pro}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Offer({ sale }: { sale: boolean }) {
  return (
    <section id="offer" className="scroll-mt-20 border-t border-border py-20 lg:py-28">
      <div className="container">
        <div className="max-w-2xl">
          {sale && (
            <p className="text-sm font-semibold text-orange-ink">
              {SALE.name} · code {SALE.code} · ends in <Countdown />
            </p>
          )}
          <h2 className="mt-3 text-[clamp(2rem,4.5vw,3.2rem)] leading-[1.02]">
            {sale ? `Lifetime Pro, ${SALE.percentOff}% off.` : "Lifetime Pro. Pay once."}
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Pick how many browsers you use. Every tier unlocks everything.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {TIERS.map((t) => {
            const featured = t.id === "plus";
            return (
              <article
                key={t.id}
                className={cn(
                  "flex flex-col rounded-[20px] border p-6",
                  featured ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card"
                )}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg">{t.name}</h3>
                  {featured && (
                    <span className="rounded-full bg-orange px-2.5 py-0.5 text-[11px] font-semibold text-orange-foreground">
                      Best value
                    </span>
                  )}
                </div>
                <p className={cn("mt-1 text-sm", featured ? "opacity-75" : "text-muted-foreground")}>
                  {browsersLabel(t)}
                </p>
                <p className="mt-6 flex items-baseline gap-2">
                  <span className="text-5xl font-semibold tracking-tight">${formatPrice(priceOf(t, sale))}</span>
                  {sale && (
                    <s className={cn("text-xl", featured ? "opacity-60" : "text-muted-foreground")}>
                      <span className="sr-only">was </span>${t.price}
                    </s>
                  )}
                </p>
                <p className={cn("mt-1 text-sm", featured ? "opacity-75" : "text-muted-foreground")}>
                  one-time
                </p>
                <p className="mt-6 flex-1 text-sm">{t.blurb}</p>
                <BuyButton
                  tier={t.id}
                  className={cn(
                    "mt-8",
                    featured
                      ? "bg-orange text-orange-foreground hover:bg-orange/90"
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                  )}
                >
                  Get {t.name}
                </BuyButton>
              </article>
            );
          })}
        </div>

        <ul className="mt-8 grid gap-3 text-sm text-muted-foreground sm:grid-cols-3">
          <li>
            <b className="text-foreground">Pay once.</b> No subscription, nothing renews.
          </li>
          <li>
            <b className="text-foreground">14-day refund.</b> Not for you? Email us for your money back.
          </li>
          <li>
            <b className="text-foreground">Still local-first.</b> Your browsing never leaves your browser.
          </li>
        </ul>
      </div>
    </section>
  );
}

function ReviewAsk() {
  return (
    <section className="container pb-20 lg:pb-28">
      <div className="relative isolate overflow-hidden rounded-[28px] px-6 py-20 text-center sm:py-24">
        <LiveShader scene={HERO_SCENE} className="-z-10" />
        <div className="absolute inset-0 -z-10 bg-[hsl(199_60%_8%/0.3)]" />
        <h2 className="mx-auto max-w-xl text-[clamp(2rem,5vw,3.4rem)] leading-[1.02] text-[hsl(60_20%_99%)]">
          Like FocusMode 3?
        </h2>
        <p className="mx-auto mt-4 max-w-md text-[hsl(60_20%_99%/0.85)]">
          A two-line review on the Chrome Web Store helps other people find it.
        </p>
        <a
          href={`${CHROME_STORE_URL}/reviews`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-[hsl(60_20%_99%)] px-7 text-[15px] font-semibold text-foreground transition-transform duration-200 ease-out hover:scale-[1.02]"
        >
          Leave a review
        </a>
      </div>
    </section>
  );
}
