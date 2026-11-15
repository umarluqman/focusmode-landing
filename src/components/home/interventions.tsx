const INTERVENTIONS = [
  ["Shader Light", "A live GPU scene rises and settles while the timer runs.", true],
  ["Texture Field", "A quiet animated pattern. Let it settle, then decide.", true],
  ["Breathing Exercise", "Four guided patterns, from 4‑7‑8 to box breathing.", false],
  ["Hold to Continue", "Press and hold for 3–15 seconds to go through.", false],
  ["Slide to Continue", "Slide a handle all the way across. No flicking past it.", false],
  ["Pixel Animation", "Pixel blocks fill the screen, one by one.", false],
  ["Instant Block", "A calm stop with one question. No timer.", false],
] as const;

const PRO_INTERVENTION = "Breathing Exercise";

export function Interventions() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="text-sm font-semibold text-orange-ink">{INTERVENTIONS.length} interventions</p>
          <h2 className="mt-3 text-[clamp(2rem,4.5vw,3.2rem)] leading-[1.02]">
            Friction, not force.
          </h2>
          <p className="mt-5 max-w-md text-lg text-muted-foreground">
            The same wall every time becomes wallpaper. Mix several in a group
            and FocusMode rotates them, so the pause never turns into a reflex.
          </p>
          <p className="mt-4 max-w-md text-muted-foreground">
            Need a hard stop instead? Strict mode blocks every active group
            instantly for up to 15 minutes. No breaks, no switching off.
          </p>
        </div>
        <ol className="grid gap-x-10 sm:grid-cols-2">
          {INTERVENTIONS.map(([name, body, isNew], i) => (
            <li key={name} className="border-t border-border py-5">
              <div className="flex items-baseline gap-3">
                <span className="tnum text-sm text-muted-foreground">0{i + 1}</span>
                <h3 className="text-lg">{name}</h3>
                {isNew && (
                  <span className="rounded-full bg-orange/20 px-2 py-0.5 text-[11px] font-semibold">
                    New in 3.0
                  </span>
                )}
                {name === PRO_INTERVENTION && (
                  <span className="text-sm font-semibold text-primary">Pro</span>
                )}
              </div>
              <p className="mt-1.5 pl-8 text-muted-foreground">{body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
