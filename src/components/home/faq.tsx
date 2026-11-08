import { browsersLabel, lowestPrice, TIERS } from "@/lib/pricing";

const tierLine = TIERS.map((t) => `${t.name} (${browsersLabel(t).toLowerCase()}, $${t.price})`).join(", ");

export const FAQS = [
  {
    q: "Is FocusMode free?",
    a: `Yes. The free version includes one focus group, all 8 interventions, schedules, time limits, breaks and streaks. Pro is a one-time payment from $${lowestPrice(false)}: ${tierLine}.`,
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
    a: "Chrome, plus Chromium browsers that install from the Chrome Web Store, such as Edge, Brave and Arc.",
  },
  {
    q: "Does FocusMode see my browsing?",
    a: "No. Your sites, groups and stats stay in your browser. The only thing that leaves it is your license key, when Pro checks that the key is valid.",
  },
  {
    q: "Can I block part of a site?",
    a: "Yes. Block youtube.com/shorts and leave the rest of YouTube open, or block a site and let one path through with a ! rule.",
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
        </div>
      </div>
    </section>
  );
}
