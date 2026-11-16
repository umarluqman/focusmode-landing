import type { Metadata } from "next/types";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { StoreLink } from "@/components/store-link";
import { ALTERNATIVE_PAGES, BLOCKERS } from "@/lib/alternatives";

const title = "Best Website Blockers for Chrome in 2026, Compared";
const description =
  "BlockSite, StayFocusd, LeechBlock NG, Cold Turkey, Freedom, one sec, Opal and focusmode compared: platforms, apps vs sites, pricing model and privacy.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  openGraph: { title, description, url: "./" },
};

const PICKS = [
  ["You want your phone covered too", "Freedom, BlockSite, one sec or Opal."],
  ["You need to block desktop apps and games", "Cold Turkey or Freedom."],
  ["You use Firefox and want it free", "LeechBlock NG."],
  ["You want a daily budget and a block you can't cancel", "StayFocusd."],
  [
    "You want a pause in Chrome, not a wall, and your data kept on your device",
    "focusmode, or Mindful Browsing for something lighter.",
  ],
];

const h2 = "mt-14 text-[clamp(1.6rem,3.5vw,2.2rem)] leading-tight";

export default function AlternativesHub() {
  return (
    <>
      <main id="main" className="container max-w-3xl py-12 lg:py-20">
        <h1 className="text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.02] tracking-[-0.02em]">
          The best website blockers for Chrome, compared
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          We make focusmode, so read this with that in mind. We&apos;ve tried to be fair: every
          tool below is good at something, and several do things focusmode doesn&apos;t, like
          blocking apps on your phone or desktop. Facts come from each tool&apos;s own site or
          Chrome Web Store listing, checked in November 2026.
        </p>

        <div className="mt-8 overflow-x-auto rounded-[20px] border border-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-card text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-semibold">Tool</th>
                <th className="px-4 py-3 font-semibold">Runs on</th>
                <th className="px-4 py-3 font-semibold">Blocks</th>
                <th className="px-4 py-3 font-semibold">Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {BLOCKERS.map((b) => (
                <tr key={b.name}>
                  <td className="whitespace-nowrap px-4 py-3 font-semibold">{b.name}</td>
                  <td className="min-w-40 px-4 py-3">{b.runsOn}</td>
                  <td className="min-w-32 px-4 py-3">{b.blocks}</td>
                  <td className="min-w-48 px-4 py-3">{b.pricing}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className={h2}>Before you install anything</h2>
        <p className="mt-4 text-muted-foreground">
          Chrome has no built-in site blocker for your own profile. Without an extension, the two
          common options are all or nothing.
        </p>
        <div className="mt-6 space-y-6">
          <div>
            <h3 className="text-lg">Your hosts file</h3>
            <p className="mt-1 text-muted-foreground">
              Add lines such as 0.0.0.0 reddit.com and 0.0.0.0 www.reddit.com to /etc/hosts on
              macOS or C:\Windows\System32\drivers\etc\hosts on Windows. It blocks the site in
              every browser. It needs admin rights, one line per hostname, works on whole domains
              only, and has no schedule.
            </p>
          </div>
          <div>
            <h3 className="text-lg">A Chrome policy</h3>
            <p className="mt-1 text-muted-foreground">
              Chrome&apos;s URLBlocklist policy can block sites and paths. It&apos;s built for
              managed computers, so you set it in the registry or a configuration profile, and
              undoing it means going back there.
            </p>
          </div>
        </div>
        <p className="mt-6 text-muted-foreground">
          If you want schedules, daily limits or exceptions, you need one of the tools below. For
          step-by-step setup of every built-in option, see{" "}
          <Link href="/guides/how-to-block-websites-on-chrome/" className="underline underline-offset-4">
            how to block websites on Chrome
          </Link>
          .
        </p>

        <h2 className={h2}>The tools</h2>
        <div className="mt-6 divide-y divide-border border-y border-border">
          {BLOCKERS.map((b) => {
            const page = ALTERNATIVE_PAGES.find((p) => p.slug === b.slug);
            return (
              <section key={b.name} className="py-6">
                <h3 className="text-xl">{b.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {b.runsOn} · {b.style}
                </p>
                <p className="mt-3">{b.bestFor}</p>
                <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm">
                  {b.name !== "focusmode" && (
                    <a
                      href={b.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-4"
                    >
                      {b.name} website
                    </a>
                  )}
                  {page && (
                    <Link href={`/alternatives/${page.slug}/`} className="underline underline-offset-4">
                      focusmode vs {page.name}
                    </Link>
                  )}
                </p>
              </section>
            );
          })}
        </div>

        <h2 className={h2}>Which one to pick</h2>
        <ul className="mt-6 space-y-3">
          {PICKS.map(([need, pick]) => (
            <li key={need}>
              <b>{need}:</b> <span className="text-muted-foreground">{pick}</span>
            </li>
          ))}
        </ul>

        <h2 className={h2}>Where focusmode fits</h2>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          focusmode is for the browser on your computer. Instead of a block page it shows a short
          pause, one of 7 kinds, and you decide whether to go on. Sites live in groups, each with
          its own trigger: always, a schedule, or a daily limit. Rules can target a path, like
          youtube.com/shorts/*, and exceptions start with !. Strict mode gives you a hard stop for
          up to 15 minutes. Everything stays in your browser, with no account. It doesn&apos;t
          block apps, and it doesn&apos;t run on phones.
        </p>

        <div className="mt-14 rounded-[20px] bg-primary p-8 text-center text-primary-foreground">
          <p className="text-2xl font-semibold">Try a pause instead of a wall.</p>
          <p className="mt-2 opacity-80">Free forever for one group. Lifetime Pro if you want more.</p>
          <StoreLink
            placement="alternatives"
            className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-orange px-7 text-[15px] font-semibold text-orange-foreground transition-colors hover:bg-orange/90"
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
