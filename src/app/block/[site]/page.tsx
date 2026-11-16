import type { Metadata } from "next/types";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";
import { BLOCK_PAGES, getBlockPage } from "@/lib/block-pages";
import { StoreLink } from "@/components/store-link";
import { storeUrl } from "@/lib/pricing";

export const dynamicParams = false;

export const generateStaticParams = () => BLOCK_PAGES.map((p) => ({ site: p.slug }));

export function generateMetadata({ params }: { params: { site: string } }): Metadata {
  const page = getBlockPage(params.site);
  if (!page) return {};
  return {
    title: { absolute: page.title },
    description: page.description,
    openGraph: { title: page.title, description: page.description, url: "./", images: ["/og-image.jpg"] },
    twitter: { title: page.title, description: page.description },
  };
}

const TRIGGERS = [
  ["Always", "The pause shows every time."],
  ["On a schedule", "For example weekdays 9:00 to 17:30."],
  ["After a daily limit", "Open freely until you've spent, say, 30 minutes, then pause."],
];

export default function BlockSitePage({ params }: { params: { site: string } }) {
  const page = getBlockPage(params.site);
  if (!page) notFound();

  const related = BLOCK_PAGES.filter((p) => page.related.includes(p.slug));
  const cta = `block_${page.slug.replace(/-/g, "_")}`;

  return (
    <>
      <main id="main" className="container max-w-3xl py-12 lg:py-20">
        <nav className="text-sm text-muted-foreground">
          <Link href="/block/" className="hover:text-foreground">
            Block a site
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
            Install FocusMode, create a group and add{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 text-[15px]">{page.rules[0][0]}</code>.
            Next time you open {page.name}, a calm pause covers the page and you decide whether to
            go on.
          </p>
          <StoreLink
            placement={cta}
            suffix=", it's free"
            className="mt-5 inline-flex h-12 items-center justify-center rounded-full bg-primary px-7 text-[15px] font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          />
        </div>

        <h2 className="mt-14 text-[clamp(1.6rem,3.5vw,2.2rem)] leading-tight">
          Block {page.name} with FocusMode
        </h2>
        <ol className="mt-6 list-decimal space-y-4 pl-5 marker:font-semibold marker:text-muted-foreground">
          <li>
            <a href={storeUrl(cta)} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
              Add FocusMode to Chrome
            </a>{" "}
            (free, works in Edge, Brave and Arc too).
          </li>
          <li>{page.setup}</li>
          <li>
            Pick when the group is on:
            <ul className="mt-2 space-y-1 text-muted-foreground">
              {TRIGGERS.map(([name, body]) => (
                <li key={name}>
                  <b className="text-foreground">{name}.</b> {body}
                </li>
              ))}
            </ul>
          </li>
          <li>
            Choose the pause: a living shader, hold to continue, slide, pixels, an instant stop or a
            breathing exercise (Pro). Mix several and FocusMode rotates them.
          </li>
          <li>
            Want no way around it for a while? Turn on strict mode for 1 to 15 minutes: no breaks,
            and the group can&apos;t be edited until the time is up.
          </li>
        </ol>

        <h2 className="mt-14 text-[clamp(1.6rem,3.5vw,2.2rem)] leading-tight">Rules you can copy</h2>
        <div className="mt-6 overflow-x-auto rounded-[20px] border border-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-card text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-semibold">Rule</th>
                <th className="px-4 py-3 font-semibold">What it pauses</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {page.rules.map(([pattern, effect]) => (
                <tr key={pattern}>
                  <td className="whitespace-nowrap px-4 py-3">
                    <code>{pattern}</code>
                  </td>
                  <td className="px-4 py-3">{effect}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          A line starting with ! is an exception: it&apos;s let through even when a broader rule
          matches.
        </p>

        <h2 className="mt-14 text-[clamp(1.6rem,3.5vw,2.2rem)] leading-tight">
          Block {page.name} without an extension
        </h2>
        <div className="mt-6 space-y-6">
          {page.native.map((n) => (
            <div key={n.title}>
              <h3 className="text-lg">{n.title}</h3>
              <p className="mt-1 text-muted-foreground">{n.body}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-14 text-[clamp(1.6rem,3.5vw,2.2rem)] leading-tight">
          Why a pause works better than a wall
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{page.why}</p>

        <h2 className="mt-14 text-[clamp(1.6rem,3.5vw,2.2rem)] leading-tight">Questions</h2>
        <div className="mt-4 divide-y divide-border border-y border-border">
          {page.faqs.map(({ q, a }) => (
            <div key={q} className="py-5">
              <h3 className="text-[17px] font-semibold">{q}</h3>
              <p className="mt-1 text-muted-foreground">{a}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-[20px] bg-primary p-8 text-center text-primary-foreground">
          <p className="text-2xl font-semibold">Try the pause on {page.name}.</p>
          <p className="mt-2 opacity-80">Free forever for one group. Lifetime Pro if you want more.</p>
          <StoreLink
            placement={cta}
            className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-orange px-7 text-[15px] font-semibold text-orange-foreground transition-colors hover:bg-orange/90"
          />
        </div>

        <h2 className="mt-14 text-lg">Block other sites</h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {related.map((r) => (
            <li key={r.slug}>
              <Link
                href={`/block/${r.slug}/`}
                className="inline-flex h-9 items-center rounded-full border border-border px-4 text-sm hover:bg-secondary"
              >
                {r.name}
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  );
}
