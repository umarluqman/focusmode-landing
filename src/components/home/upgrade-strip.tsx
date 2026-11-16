import Link from "next/link";

const CARRIED = ["Groups and blocked sites", "Schedules and time limits", "Break settings and streaks", "Your Pro status"];

export function UpgradeStrip() {
  return (
    <section aria-labelledby="upgrade" className="bg-primary text-primary-foreground">
      <div className="container grid gap-8 py-14 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:py-16">
        <div>
          <h2 id="upgrade" className="text-[clamp(1.6rem,3.5vw,2.25rem)] leading-tight">
            On focusmode 2? 3.0 arrives as a normal update.
          </h2>
          <p className="mt-3 opacity-80">
            Chrome updates it for you. Nothing to reinstall. Strict mode is
            still here. PIN lock isn&apos;t in 3.0 yet.
          </p>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold opacity-80">Comes with you</p>
          <ul className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
            {CARRIED.map((c) => (
              <li key={c} className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-orange" aria-hidden="true" />
                {c}
              </li>
            ))}
          </ul>
          <Link
            href="/pricing/#already-pro"
            className="mt-6 inline-flex font-semibold text-orange underline-offset-4 hover:underline"
          >
            Paid for v2 Pro? Get your lifetime key
          </Link>
        </div>
      </div>
    </section>
  );
}
