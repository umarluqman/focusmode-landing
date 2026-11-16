import type { Metadata } from "next/types";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { BLOCK_PAGES } from "@/lib/block-pages";
import { formatPrice, isSaleActive, priceOf, PRO_FEATURES, SALE, TIERS } from "@/lib/pricing";

export const metadata: Metadata = {
  title: { absolute: "Welcome to focusmode" },
  description: "focusmode is installed. Pin it, set up your first group and choose how the pause works. Three steps, about two minutes.",
  robots: { index: false, follow: false },
};

const STEPS = [
  {
    title: "Pin it to your toolbar",
    body: "Click the puzzle piece icon next to the address bar, then the pin next to focusmode. Now it's one click away.",
  },
  {
    title: "Set up your first group",
    body: "Click the focusmode icon. Pick a goal, the sites that steal your time and how many breaks you want a day. That becomes your first group. Later, right-click any page and choose Add to focusmode Group, then the group.",
  },
  {
    title: "Choose the pause and when it runs",
    body: "Open the group. Under Interventions, pick how the pause feels: hold a button, slide, watch moving light, and more. Under Trigger, keep it Always on, put it On schedule, or let it start After usage, once you've spent your daily time.",
  },
];

export default function Welcome() {
  const sale = isSaleActive();
  const from = formatPrice(priceOf(TIERS[0], sale));

  return (
    <>
      <main id="main" className="container max-w-3xl py-12 lg:py-20">
        <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
          <span className="size-1.5 rounded-full bg-orange" />
          focusmode is installed
        </p>
        <h1 className="mt-5 text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.02] tracking-[-0.02em]">
          Thanks for installing. Here&apos;s how to start.
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          focusmode puts a short pause in front of the sites that pull you in, so you decide
          before you scroll. Setup takes about two minutes.
        </p>

        <ol className="mt-12 divide-y divide-border border-y border-border">
          {STEPS.map((s, i) => (
            <li key={s.title} className="grid grid-cols-[2.5rem_1fr] gap-x-2 py-6">
              <span className="text-2xl font-semibold text-orange-ink">{i + 1}</span>
              <div>
                <h2 className="text-xl">{s.title}</h2>
                <p className="mt-1.5 text-muted-foreground">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <h2 className="mt-14 text-[clamp(1.6rem,3.5vw,2.2rem)] leading-tight">Rules for the usual suspects</h2>
        <p className="mt-3 text-muted-foreground">
          Want to block only YouTube Shorts, or Reddit but still open threads from Google? These guides have rules you can copy.
        </p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {BLOCK_PAGES.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/block/${p.slug}/`}
                className="inline-flex h-9 items-center rounded-full border border-border px-4 text-sm hover:bg-secondary"
              >
                {p.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-14 rounded-[20px] border border-border bg-card p-6 sm:p-8">
          <p className="text-sm font-semibold text-orange-ink">
            {sale ? (
              <>
                {SALE.name} · {SALE.percentOff}% off with code {SALE.code} · ends {SALE.endLabel}
              </>
            ) : (
              "When you want more"
            )}
          </p>
          <h2 className="mt-3 text-[clamp(1.6rem,3.5vw,2.2rem)] leading-tight">
            Free covers one group. Pro removes the limits.
          </h2>
          <ul className="mt-5 grid gap-2 sm:grid-cols-2">
            {PRO_FEATURES.filter((f) => f !== "Every future update").map((f) => (
              <li key={f} className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-orange" aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>
          <Link
            href="/pricing/"
            className="mt-7 inline-flex h-12 items-center justify-center rounded-full bg-primary px-7 text-[15px] font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            See Pro from ${from}
          </Link>
          <p className="mt-3 text-sm text-muted-foreground">One payment, no subscription. 14-day refund.</p>
        </div>

        <div className="mt-14">
          <h2 className="text-lg">Your browsing stays on your device</h2>
          <p className="mt-2 text-muted-foreground">
            Your sites, schedules and usage stats live in your browser&apos;s storage. No account, no
            trackers, and your browsing is never sent to us. Details in the{" "}
            <Link href="/privacy-policy/" className="underline underline-offset-4">
              privacy policy
            </Link>
            .
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
