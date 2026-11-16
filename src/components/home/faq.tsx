import { browsersLabel, FIREFOX_LIVE, lowestPrice, TIERS } from "@/lib/pricing";

const tierLine = TIERS.map((t) => `${t.name} (${browsersLabel(t).toLowerCase()}, $${t.price})`).join(", ");

export const FAQS = [
  {
    q: "Does FocusMode see my browsing?",
    a: "No. FocusMode is local-first: your sites, groups, usage stats and streaks stay in your browser. Nothing about your browsing is sent to us, and there are no third-party trackers. The only thing that leaves it is your license key, with a random install ID and your browser's name, when Pro checks that the key is valid.",
  },
  {
    q: "Is FocusMode free?",
    a: `Yes. The free version includes one focus group, 6 of the 7 interventions (Breathing is Pro), the Dither shaders, schedules, time limits, strict mode, 5-minute breaks, escalation and streaks. Pro is a one-time payment from $${lowestPrice()}: ${tierLine}.`,
  },
  {
    q: "Is Pro really lifetime?",
    a: "Yes. You pay once and keep Pro, including every future update. There is no subscription and nothing renews.",
  },
  {
    q: "What counts as a browser?",
    a: "One browser profile with FocusMode installed. Work Chrome and personal Chrome are two browsers, even on the same computer. You can free a seat from Settings in the extension and use it somewhere else.",
  },
  {
    q: "I paid for Pro in FocusMode 2. What happens now?",
    a: "You're Pro for life on unlimited browsers, even if your old subscription lapsed. We're emailing every v2 Pro customer a key. If yours hasn't arrived, use the Find my license key page with the email you paid with.",
  },
  {
    q: "Can I get a refund?",
    a: "Yes. If FocusMode Pro isn't right for you, email focusmode.app@gmail.com within 14 days of purchase for a full refund.",
  },
  {
    q: "Which browsers does it work in?",
    a: `Chrome${FIREFOX_LIVE ? " and Firefox" : ""}, plus Chromium browsers that install from the Chrome Web Store, such as Edge, Brave and Arc.`,
  },
  {
    q: "Can I block part of a site?",
    a: "Yes. Block youtube.com/shorts/* and leave the rest of YouTube open, or block a site and let one path through with a ! rule. A group can also work the other way round: list the sites you need and everything else is blocked while it's on.",
  },
  {
    q: "Can I stop myself from switching it off?",
    a: "Yes. Strict mode locks things for 1, 5, 10 or 15 minutes: every active group blocks instantly with no breaks, and groups can't be switched off or edited until the time is up. PIN lock from FocusMode 2 isn't in 3.0 yet.",
  },
  {
    q: "I lost my license key.",
    a: "Go to Find my license key and enter the email you paid with. We'll send every key on that email.",
  },
];

export function Faq({ heading: Heading = "h2" }: { heading?: "h1" | "h2" }) {
  return (
    <section id="faq" className="scroll-mt-20 border-t border-border py-20 lg:py-28">
      <div className="container grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <Heading className="text-[clamp(2rem,4.5vw,3.2rem)] leading-[1.02]">Questions</Heading>
        <div className="divide-y divide-border border-y border-border">
          {FAQS.map(({ q, a }) => (
            <details key={q} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-[17px] font-semibold [&::-webkit-details-marker]:hidden">
                {q}
                <span
                  aria-hidden="true"
                  className="text-xl font-normal text-muted-foreground transition-transform duration-300 ease-out group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="-mt-1 pb-5 pr-10 text-muted-foreground">{a}</p>
            </details>
          ))}
          {Heading === "h2" && (
            <a href="/faq/" className="block py-5 text-sm font-semibold underline underline-offset-4">
              All questions about FocusMode
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
