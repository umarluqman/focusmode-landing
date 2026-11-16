import Link from "next/link";
import { BLOCK_PAGES } from "@/lib/block-pages";

export function BlockSites() {
  return (
    <section id="block-a-site" className="scroll-mt-20 border-b border-border py-20 lg:py-28">
      <div className="container">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-orange-ink">Block a specific site</p>
          <h2 className="mt-3 text-[clamp(2rem,4.5vw,3.2rem)] leading-[1.02]">
            Rules you can copy for the usual suspects
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Block the whole site or only the feed. Each guide has the exact rules and the options
            you have without an extension.
          </p>
        </div>
        <ul className="mt-10 flex flex-wrap gap-2">
          {BLOCK_PAGES.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/block/${p.slug}/`}
                className="inline-block rounded-full border border-border bg-card px-4 py-2 text-sm transition-colors hover:border-foreground"
              >
                {p.name}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/block/"
              className="inline-block rounded-full px-4 py-2 text-sm font-medium underline underline-offset-4"
            >
              All guides
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
