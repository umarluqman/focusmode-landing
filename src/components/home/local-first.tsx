const POINTS = [
  {
    title: "Stays in your browser",
    body: "Your blocked sites, schedules, usage stats and streaks live in your browser's own storage. Not on our servers, because we don't have any for that.",
  },
  {
    title: "No server tracking",
    body: "Time per site is counted on your device, so you can see your own stats. None of it is sent to us: no analytics SDK, no trackers, no telemetry.",
  },
  {
    title: "No account",
    body: "Install it and it works. No sign-up, no email, no profile to build.",
  },
  {
    title: "One exception, stated plainly",
    body: "If you buy Pro, the extension sends your license key, a random install ID and your browser's name to check that it's valid. No browsing data goes with it.",
  },
];

export function LocalFirst() {
  return (
    <section id="privacy" className="scroll-mt-20 border-t border-border py-20 lg:py-28">
      <div className="container grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <div className="max-w-xl">
          <p className="text-sm font-semibold text-orange-ink">Local-first</p>
          <h2 className="mt-3 text-[clamp(2rem,4.5vw,3.2rem)] leading-[1.02]">
            A private site blocker. Your browsing stays yours.
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            A focus tool sees every site you open. That&apos;s exactly why
            focusmode keeps all of it on your device and never sends it
            to us.
          </p>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2">
          {POINTS.map((p) => (
            <li key={p.title} className="rounded-[20px] border border-border bg-card p-5">
              <h3 className="flex items-center gap-2 text-lg">
                <span className="size-1.5 rounded-full bg-orange" aria-hidden="true" />
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
