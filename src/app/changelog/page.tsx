import type { Metadata } from "next";
import Image from "next/image";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Changelog",
  description: "What's new in focusmode, release by release.",
};

type Period = {
  date: string;
  updates: {
    version: string;
    title: string;
    imageSrc: string[];
    description: string[];
  }[];
};

const changes: Period[] = [
  {
    date: "November 2026",
    updates: [
      {
        version: "3.0.0",
        title: "focusmode 3: groups, shaders and lifetime Pro",
        imageSrc: [],
        description: [
          "Groups: give each set of sites its own trigger (always on, on schedule or after a daily usage limit), break budget, interventions and message. A group can block its sites or allow only them.",
          "Shader and Texture interventions: live GPU backdrops that settle while the pause runs. 23 shaders in 5 families: Dither is free, Gallery, Liquid, Marble and Fluid are Pro.",
          "7 interventions in total, rotated within a group so the pause never turns into a reflex. Breathing is Pro.",
          "Break limits with optional escalation: longer pauses and fewer easy exits once you overdo it.",
          "Strict mode: block every active group instantly for 1 to 15 minutes, with no breaks and no switching off.",
          "Quick actions: add the current site to a group, take a break or start strict mode from the popup.",
          "Usage analytics and streaks, a redesigned popup with light, dark and system themes, and a new logo.",
          "Pro is now a one-time license with Personal, Plus and Unlimited tiers. v2 Pro customers get Unlimited for free.",
          "Your groups, sites, schedules and Pro status carry over from 2.x automatically. A running strict session carries over too. PIN lock is not in 3.0 yet.",
        ],
      },
    ],
  },
  {
    date: "November 2025",
    updates: [
      {
        version: "2.7.4",
        title: "Breathing intervetions is here for PRO users!",
        imageSrc: [
          "/changelog/breathing-intervetion.webp",
          "/changelog/breathing-setting.webp",
        ],
        description: [
          "4 different breathing intervention is now available for PRO users. Try it in the intervetion options.",
        ],
      },
    ],
  },
  {
    date: "April 2025",
    updates: [
      {
        version: "2.7.3",
        title: "Bug Fixed for Dark Mode",
        imageSrc: [],
        description: ["Dark mode theme in certain websites is now fixed"],
      },
      {
        version: "2.7.2",
        title: "Bug Fixed and Improvements",
        imageSrc: [],
        description: [
          "Confirmation prompt before toggle focusmode OFF is now working fine",
          "Other minor improvements",
        ],
      },
    ],
  },
  {
    date: "March 2025",
    updates: [
      {
        version: "2.7.1",
        title:
          "Dark Mode for PRO users, Confirmation Prompt Toggle & Bug Fixed and Improvements",
        imageSrc: [
          "/changelog/dark.webp",
          "/changelog/confirmation-prompt.webp",
          "/changelog/chart-dark.webp",
          "/changelog/theme.webp",
        ],
        description: [
          "Dark mode theme is now available exclusively for PRO users",
          "Added option to toggle confirmation dialog when disabling focusmode",
          "Theme colors for charts. More charts are coming to PRO users.",
          "Resolved an issue with Advanced List website blocking functionality",
          "Fixed a bug preventing websites from being unblocked when focusmode is disabled",
          "Restored missing website usage statistics",
          "Save the charts setting",
        ],
      },
      {
        version: "2.7.0",
        title:
          "FREE PRO Interventions, PIN Protection, Confirmation Before Turning OFF and Schedule limit",
        imageSrc: [
          "/changelog/pro.webp",
          "/changelog/confirmation.webp",
          "/changelog/pin.webp",
          "/changelog/alert.webp",
        ],
        description: [
          "PRO interventions are now FREE for all users! Enjoy advanced interventions like Slide In Out, Hold to Complete and Pixelated.",
          "PIN Protection is now available for all users. Try it in the Settings.",
          "Confirmation dialog added when turning off focusmode. When confirmed, focusmode will stay off eventhough the scheduled is ON.",
          "Schedule feature is now limited to 3 days (Sun, Mon, Tue) per week for free users. Upgrade to PRO for unlimited scheduling.",
          // "More features are coming! Promo code 'BF2025' for 30% OFF will expired soon",
        ],
      },
    ],
  },
  {
    date: "February 2025",
    updates: [
      {
        version: "2.6.7",
        title: "Advanced List (BETA) for Power Users ",
        description: [
          "Introducing the advanced list for power users. User can now filter website with advanced rules to block websites with pattern matching",
        ],
        imageSrc: ["/changelog/advanced-list.webp"],
      },
    ],
  },
];

export default function Changelog() {
  return (
    <>
      <main id="main" className="container max-w-3xl py-16 sm:py-24">
        <h1 className="text-[clamp(2.2rem,5vw,3.4rem)] leading-[1.02]">Changelog</h1>
        <div className="mt-14 space-y-16">
          {changes.map((period, p) => (
            <section key={period.date} aria-labelledby={`period-${p}`}>
              <h2 id={`period-${p}`} className="text-sm font-semibold text-muted-foreground">
                {period.date}
              </h2>
              <div className="mt-4 space-y-10">
                {period.updates.map((update, u) => (
                  <article key={update.version} className="grid gap-x-6 gap-y-2 border-t border-border pt-5 sm:grid-cols-[5rem_1fr]">
                    <p className="tnum flex items-center gap-2 text-sm font-semibold text-muted-foreground sm:block">
                      {update.version}
                      {p === 0 && u === 0 && (
                        <span className="rounded-full bg-orange px-2 py-0.5 text-[11px] text-orange-foreground sm:mt-2 sm:inline-block">
                          New
                        </span>
                      )}
                    </p>
                    <div>
                      <h3 className="text-xl">{update.title}</h3>
                      <ul className="mt-3 list-disc space-y-1.5 pl-5 text-muted-foreground">
                        {update.description.map((d) => (
                          <li key={d}>{d}</li>
                        ))}
                      </ul>
                      {update.imageSrc.length > 0 && (
                        <div className="mt-6 grid grid-cols-2 gap-3">
                          {update.imageSrc.map((src, i) => (
                            <Image
                              key={src}
                              src={src}
                              alt={`${update.title}, screenshot ${i + 1}`}
                              width={500}
                              height={600}
                              loading="lazy"
                              className="h-auto w-full rounded-xl border border-border bg-foreground object-contain"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
