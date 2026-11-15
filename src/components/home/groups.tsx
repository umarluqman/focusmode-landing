import Image from "next/image";

const SCREENS = [
  ["home", "Every group, its time today and breaks left"],
  ["group", "Open a group to set its sites, trigger and pauses"],
  ["strict", "Strict mode: no breaks until the timer runs out"],
  ["analytics", "Streaks and time spent, with Pro"],
];

const GROUPS = [
  {
    name: "Deep work",
    note: "Keeps the workday for the hard thing.",
    sites: ["feed.social", "news.today", "forum.chat", "shop.deals", "inbox.mail", "*.live.stream"],
    settings: [
      ["Mode", "Block these sites"],
      ["Active", "Mon–Fri, 9:00–17:30"],
      ["Pause", "Shader or texture"],
      ["Breaks", "2 a day"],
    ],
  },
  {
    name: "Doom-scroll",
    note: "45 minutes of feeds a day, then the pause.",
    sites: ["feed.social", "shorts.video", "photos.feed", "threads.chat"],
    settings: [
      ["Mode", "Block these sites"],
      ["Active", "After 45 min a day"],
      ["Pause", "Shader, hold or pixel"],
      ["Breaks", "3 a day"],
    ],
  },
  {
    name: "Study only",
    note: "Three sites stay open. Everything else pauses.",
    sites: ["docs.study", "library.edu", "notes.app"],
    settings: [
      ["Mode", "Allow only these sites"],
      ["Active", "Always"],
      ["Pause", "Breathing 4‑7‑8 (Pro) or instant"],
      ["Breaks", "1 a day"],
    ],
  },
];

export function Groups() {
  return (
    <section id="groups" className="scroll-mt-20 border-t border-border bg-card py-20 lg:py-28">
      <div className="container">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-orange-ink">Per-group rules</p>
          <h2 className="mt-3 text-[clamp(2rem,4.5vw,3.2rem)] leading-[1.02]">
            Slack at 10am isn&apos;t TikTok at midnight.
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Put sites in groups and give each group its own schedule, pause,
            break budget and message. Three to start from:
          </p>
        </div>

        <ul className="-mx-5 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:px-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:pb-0">
          {SCREENS.map(([name, caption]) => (
            <li key={name} className="w-[16rem] shrink-0 snap-start lg:w-auto">
              <figure>
                <Image
                  src={`/screens/popup-${name}.webp`}
                  alt={`FocusMode popup. ${caption}.`}
                  width={400}
                  height={580}
                  loading="lazy"
                  className="h-auto w-full rounded-[20px] border border-border"
                />
                <figcaption className="mt-3 text-sm text-muted-foreground">{caption}</figcaption>
              </figure>
            </li>
          ))}
        </ul>

        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {GROUPS.map((g) => (
            <li key={g.name} className="flex flex-col rounded-[20px] border border-border bg-background p-5">
              <h3 className="text-xl">{g.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{g.note}</p>
              <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Sites">
                {g.sites.map((s) => (
                  <li key={s} className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium">
                    {s}
                  </li>
                ))}
              </ul>
              <dl className="mt-5 divide-y divide-border border-t border-border text-sm">
                {g.settings.map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 py-2.5">
                    <dt className="text-muted-foreground">{k}</dt>
                    <dd className="text-right font-medium">{v}</dd>
                  </div>
                ))}
              </dl>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-sm text-muted-foreground">
          Free includes one group and 5-minute breaks. Pro unlocks unlimited
          groups, custom break lengths and the breathing exercise.
        </p>
      </div>
    </section>
  );
}
