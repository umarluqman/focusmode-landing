import type { Metadata } from "next/types";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";
import { StoreLink } from "@/components/store-link";
import { ALTERNATIVE_PAGES, getAlternativePage } from "@/lib/alternatives";

export const dynamicParams = false;

export const generateStaticParams = () => ALTERNATIVE_PAGES.map((p) => ({ tool: p.slug }));

export function generateMetadata({ params }: { params: { tool: string } }): Metadata {
  const page = getAlternativePage(params.tool);
  if (!page) return {};
  return {
    title: { absolute: page.title },
    description: page.description,
    openGraph: { title: page.title, description: page.description, url: "./" },
  };
}

const h2 = "mt-14 text-[clamp(1.6rem,3.5vw,2.2rem)] leading-tight";

export default function AlternativePage({ params }: { params: { tool: string } }) {
  const page = getAlternativePage(params.tool);
  if (!page) notFound();

  const others = ALTERNATIVE_PAGES.filter((p) => p.slug !== page.slug);
  const cta = `alternatives_${page.slug}`;

  return (
    <>
      <main id="main" className="container max-w-3xl py-12 lg:py-20">
        <nav className="text-sm text-muted-foreground">
          <Link href="/alternatives/" className="hover:text-foreground">
            Website blockers
          </Link>{" "}
          / {page.name}
        </nav>

        <h1 className="mt-4 text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.02] tracking-[-0.02em]">
          {page.h1}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{page.intro}</p>

        <div className="mt-8 rounded-[20px] border border-border bg-card p-6">
          <p className="text-sm font-semibold text-orange-ink">The short answer</p>
          <p className="mt-2">
            If you browse on a computer and want fewer reflex visits rather than a locked door,
            try focusmode. Copy your {page.name} list into a group and pick a pause. It&apos;s
            free for one group, and your data stays in your browser.
          </p>
          <StoreLink
            placement={cta}
            suffix=", it's free"
            className="mt-5 inline-flex h-12 items-center justify-center rounded-full bg-primary px-7 text-[15px] font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          />
        </div>

        <h2 className={h2}>What {page.name} does well</h2>
        <div className="mt-6 space-y-6">
          {page.theyDoWell.map((t) => (
            <div key={t.title}>
              <h3 className="text-lg">{t.title}</h3>
              <p className="mt-1 text-muted-foreground">{t.body}</p>
            </div>
          ))}
        </div>

        <h2 className={h2}>{page.name} vs focusmode</h2>
        <div className="mt-6 overflow-x-auto rounded-[20px] border border-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-card text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-semibold" />
                <th className="px-4 py-3 font-semibold">{page.name}</th>
                <th className="px-4 py-3 font-semibold">focusmode</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {page.rows.map(([feature, them, us]) => (
                <tr key={feature}>
                  <td className="min-w-32 px-4 py-3 font-semibold">{feature}</td>
                  <td className="min-w-40 px-4 py-3">{them}</td>
                  <td className="min-w-40 px-4 py-3">{us}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          {page.name} details are from its own site and Chrome Web Store listing, checked November
          2026. Features change, so check theirs before you decide.
        </p>

        <h2 className={h2}>Where focusmode is different</h2>
        <div className="mt-6 space-y-6">
          {page.differs.map((d) => (
            <div key={d.title}>
              <h3 className="text-lg">{d.title}</h3>
              <p className="mt-1 text-muted-foreground">{d.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-[20px] border border-border bg-card p-6">
          <p className="text-sm font-semibold text-orange-ink">Stay with {page.name} if</p>
          <p className="mt-2">{page.stayIf}</p>
        </div>

        <h2 className={h2}>Moving from {page.name}</h2>
        <ol className="mt-6 list-decimal space-y-4 pl-5 marker:font-semibold marker:text-muted-foreground">
          {page.move.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>

        <h2 className={h2}>Questions</h2>
        <div className="mt-4 divide-y divide-border border-y border-border">
          {page.faqs.map(({ q, a }) => (
            <div key={q} className="py-5">
              <h3 className="text-[17px] font-semibold">{q}</h3>
              <p className="mt-1 text-muted-foreground">{a}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-[20px] bg-primary p-8 text-center text-primary-foreground">
          <p className="text-2xl font-semibold">Try focusmode next to {page.name}.</p>
          <p className="mt-2 opacity-80">Free forever for one group. Lifetime Pro if you want more.</p>
          <StoreLink
            placement={cta}
            className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-orange px-7 text-[15px] font-semibold text-orange-foreground transition-colors hover:bg-orange/90"
          />
        </div>

        <h2 className="mt-14 text-lg">More comparisons</h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          <li>
            <Link
              href="/alternatives/"
              className="inline-flex h-9 items-center rounded-full border border-border px-4 text-sm hover:bg-secondary"
            >
              All website blockers
            </Link>
          </li>
          {others.map((o) => (
            <li key={o.slug}>
              <Link
                href={`/alternatives/${o.slug}/`}
                className="inline-flex h-9 items-center rounded-full border border-border px-4 text-sm hover:bg-secondary"
              >
                {o.name} alternative
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  );
}
