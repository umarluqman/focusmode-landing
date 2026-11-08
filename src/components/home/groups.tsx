const GROUPS = [
  {
    name: "Deep work",
    note: "Keeps the morning for the hard thing.",
    sites: ["slack.com", "mail.google.com", "linear.app"],
    settings: [
      ["Active", "Mon–Fri, 9:00–12:00"],
      ["Pause", "Hold to continue, 10s"],
      ["Breaks", "2 a day"],
      ["Over the limit", "Longer holds, no easy exits"],
    ],
  },
  {
    name: "Doom-scroll",
    note: "The feeds that eat evenings.",
    sites: ["x.com", "reddit.com", "instagram.com", "tiktok.com"],
    settings: [
      ["Active", "Always"],
      ["Pause", "Shader · Marble Ink, 8s"],
      ["Breaks", "1 a day"],
      ["Message", "“Is this how you want to feel tonight?”"],
    ],
  },
  {
    name: "Research video",
    note: "Tutorials stay open. Shorts don't.",
    sites: ["youtube.com", "!youtube.com/playlist*"],
    settings: [
      ["Active", "After 20 min a day"],
      ["Pause", "Breathing, 4‑7‑8"],
      ["Breaks", "3 a day"],
      ["Message", "“Still research?”"],
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

        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {GROUPS.map((g) => (
            <li key={g.name} className="flex flex-col rounded-[20px] border border-border bg-background p-5">
              <h3 className="text-xl">{g.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{g.note}</p>
              <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Sites">
                {g.sites.map((s) => (
                  <li
                    key={s}
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${s.startsWith("!") ? "bg-orange/15 text-foreground" : "bg-secondary"}`}
                  >
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
          Free includes one group. Pro unlocks unlimited groups and the
          over-the-limit escalation. A <code className="rounded bg-secondary px-1">!</code> rule
          lets a path through.
        </p>
      </div>
    </section>
  );
}
