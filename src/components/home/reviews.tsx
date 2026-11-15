import { Stars } from "@/components/stars";
import { getCwsStats } from "@/lib/cws";
import { CHROME_STORE_URL } from "@/lib/pricing";

const REVIEWS = [
  {
    quote: "this is one of the most cleanest most asthetic and most productive extension ever that too for free.",
    name: "Aniket Singh Chauhan",
  },
  {
    quote: "The most valuable extension I've ever used! Thank you so much!",
    name: "林家鋒",
  },
  {
    quote:
      "This is simply perfect, makes you do conscient choices! … it makes you think twice before entering a distracting website with the interventions.",
    name: "Victor Armbruster",
  },
  {
    quote:
      "Great extension, it definitely stops me from going down those internet rabbit holes when I should be working on something. Simple, straightforward, and I especially like the new scheduled feature. Just what I needed.",
    name: "Gabby M",
  },
  {
    quote:
      "… keep you more aware of NOT entering blocked sites ( instead of mindlessly turning off extention for a second and entering)",
    name: "Iman Shams M",
  },
];

export async function Reviews() {
  const stats = await getCwsStats();

  return (
    <section id="reviews" className="scroll-mt-20 border-t border-border py-20 lg:py-28">
      <div className="container">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-orange-ink">Reviews</p>
            <h2 className="mt-3 text-[clamp(2rem,4.5vw,3.2rem)] leading-[1.02]">
              Don&apos;t take it from us.
            </h2>
          </div>
          {stats && (
            <div className="flex items-center gap-3">
              <span className="text-4xl font-semibold tracking-tight">{stats.ratingValue}</span>
              <div>
                <Stars rating={stats.ratingValue} className="size-5" />
                <p className="mt-1 text-sm text-muted-foreground">
                  {stats.ratingCount.toLocaleString("en-US")} ratings on the Chrome Web Store
                </p>
              </div>
            </div>
          )}
        </div>

        <ul className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {REVIEWS.map((r) => (
            <li key={r.name} className="mb-4 break-inside-avoid rounded-[20px] border border-border bg-card p-5">
              <Stars rating={5} className="size-3.5" />
              <blockquote className="mt-3 leading-relaxed">&ldquo;{r.quote}&rdquo;</blockquote>
              <p className="mt-4 text-sm font-semibold text-muted-foreground">{r.name}</p>
            </li>
          ))}
        </ul>

        <a
          href={`${CHROME_STORE_URL.split("?")[0]}/reviews`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex font-semibold text-orange-ink underline-offset-4 hover:underline"
        >
          Read all reviews on the Chrome Web Store
        </a>
      </div>
    </section>
  );
}
