import type { Metadata } from "next/types";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { BLOCK_PAGES } from "@/lib/block-pages";

export const metadata: Metadata = {
  title: "Block a Website on Chrome: YouTube, Reddit, Instagram, X and More",
  description:
    "Step-by-step guides to block the sites that eat your day on Chrome, with rules you can copy. Block a whole site or just the feed.",
};

export default function BlockHub() {
  return (
    <>
      <main id="main" className="container max-w-3xl py-12 lg:py-20">
        <h1 className="text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.02] tracking-[-0.02em]">
          Block a website on Chrome
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          Guides for the sites people block most, with focusmode rules you can copy and the
          options you have without an extension. Block the whole site, or only the feed that
          pulls you in.
        </p>
        <ul className="mt-10 divide-y divide-border border-y border-border">
          {BLOCK_PAGES.map((p) => (
            <li key={p.slug}>
              <Link href={`/block/${p.slug}/`} className="group block py-6">
                <h2 className="text-xl group-hover:underline group-hover:underline-offset-4">{p.h1}</h2>
                <p className="mt-1 text-muted-foreground">{p.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  );
}
