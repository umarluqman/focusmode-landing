const CASES = [
  ["News check-ins", "After usage · 15 min a day", "Slide, 5s"],
  ["Shopping cool-off", "amazon.com, shopee.com", "15s wait · “Sleep on it”"],
  ["Late night", "22:00–06:00", "Breathing, 4‑7‑8 (Pro)"],
  ["Deadline day", "Allow only docs and GitHub", "Strict mode, 15 min"],
  ["Inbox hours", "Gmail outside 11:00 and 16:00", "Instant pause"],
  ["Sports scores", "Weekdays only", "Pixel, 8s"],
];

export function UseCases() {
  return (
    <section aria-labelledby="more-groups" className="border-t border-border bg-card pb-20 lg:pb-28">
      <div className="container">
        <h2 id="more-groups" className="pt-2 text-lg">
          More groups people build
        </h2>
        <ul className="-mx-5 mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0 [scrollbar-width:none]">
          {CASES.map(([name, when, pause]) => (
            <li
              key={name}
              className="w-[15rem] shrink-0 snap-start rounded-2xl border border-border bg-background p-4"
            >
              <h3 className="text-base">{name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{when}</p>
              <p className="mt-0.5 text-sm font-medium">{pause}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
