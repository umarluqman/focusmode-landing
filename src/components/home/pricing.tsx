"use client";

import { cn } from "@/lib/utils";
import {
  browsersLabel,
  CHROME_STORE_URL,
  formatPrice,
  FREE_FEATURES,
  PRO_FEATURES,
  priceOf,
  SALE,
  TIERS,
} from "@/lib/pricing";
import { BuyButton } from "@/components/buy-button";
import { ResendForm } from "@/components/resend-form";
import { Countdown, useSaleActive } from "@/components/sale";

const Check = () => (
  <svg viewBox="0 0 16 16" className="mt-1 size-3.5 shrink-0" aria-hidden="true">
    <path d="M3 8.5 6.5 12 13 4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function Pricing({
  initialSale,
  heading: Heading = "h2",
}: {
  initialSale: boolean;
  heading?: "h1" | "h2";
}) {
  const sale = useSaleActive(initialSale);

  return (
    <section id="pricing" className="scroll-mt-20 border-t border-border py-20 lg:py-28">
      <div className="container">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-orange-ink">Pricing</p>
            <Heading className="mt-3 text-[clamp(2rem,4.5vw,3.2rem)] leading-[1.02]">
              Free to start. Pay once for Pro.
            </Heading>
            <p className="mt-4 text-lg text-muted-foreground">
              No subscription. Pick how many browsers you use and keep it for life.
            </p>
          </div>
          {sale && (
            <div className="self-start rounded-2xl bg-primary px-4 py-3 text-sm text-primary-foreground lg:self-auto">
              <p className="font-semibold">{SALE.name}: {SALE.percentOff}% off</p>
              <p className="opacity-80">
                Ends in <Countdown />
              </p>
            </div>
          )}
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <article className="flex flex-col rounded-[20px] border border-border p-6">
            <h3 className="text-lg">Free</h3>
            <p className="mt-1 text-sm text-muted-foreground">Forever, on any browser.</p>
            <p className="mt-6 text-5xl font-semibold tracking-tight">$0</p>
            <ul className="mt-6 flex-1 space-y-2 text-sm">
              {FREE_FEATURES.map((f) => (
                <li key={f} className="flex gap-2">
                  <Check />
                  {f}
                </li>
              ))}
            </ul>
            <a
              href={CHROME_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-7 mt-8 inline-flex h-12 items-center justify-center rounded-full border border-input text-[15px] font-semibold transition-colors hover:bg-secondary"
            >
              Add to Chrome
            </a>
          </article>

          {TIERS.map((t) => {
            const featured = t.id === "plus";
            const price = priceOf(t, sale);
            return (
              <article
                key={t.id}
                className={cn(
                  "flex flex-col rounded-[20px] border p-6",
                  featured
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card"
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
                  <span className="text-5xl font-semibold tracking-tight">${formatPrice(price)}</span>
                  {sale && (
                    <>
                      <s className={cn("text-xl", featured ? "opacity-60" : "text-muted-foreground")}>
                        <span className="sr-only">was </span>${t.price}
                      </s>
                      <span className={cn("text-sm font-semibold", featured ? "text-orange" : "text-orange-ink")}>
                        −{SALE.percentOff}%
                      </span>
                    </>
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

        <p className="mt-4 text-sm text-muted-foreground">
          Pro keys work with FocusMode 3.0 and later. On an older version?
          Update it from chrome://extensions before you activate.
        </p>

        <div className="mt-6 grid gap-6 rounded-[20px] border border-border p-6 lg:grid-cols-[1fr_1fr] lg:gap-12">
          <div>
            <h3 className="text-lg">Every Pro tier includes</h3>
            <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
              {PRO_FEATURES.map((f) => (
                <li key={f} className="flex gap-2">
                  <Check />
                  {f}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted-foreground">
              A browser is one Chrome profile. Move a seat any time from
              Settings in the extension.
            </p>
          </div>
          <div id="already-pro" className="scroll-mt-24 border-t border-border pt-6 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
            <h3 className="text-lg">Already Pro from v2? You&apos;re Pro for life.</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Every v2 Pro account gets a free Unlimited key, even if your
              subscription lapsed. Enter the email you paid with and we&apos;ll
              send it.
            </p>
            <ResendForm className="mt-4" />
          </div>
        </div>
      </div>
    </section>
  );
}
