import { MetadataRoute } from "next";
import { BLOCK_PAGES } from "@/lib/block-pages";
import { ALTERNATIVE_PAGES } from "@/lib/alternatives";

const BASE = "https://focusmode.app";

const PAGES: [path: string, lastModified: string, priority: number][] = [
  ["/", "2026-11-16", 1],
  ["/pricing/", "2026-11-16", 0.8],
  ["/faq/", "2026-11-16", 0.7],
  ["/changelog/", "2026-11-16", 0.5],
  ["/privacy-policy/", "2026-11-16", 0.3],
  ["/block/", "2026-11-16", 0.7],
  ...BLOCK_PAGES.map((p): [string, string, number] => [`/block/${p.slug}/`, "2026-11-22", 0.7]),
  ["/guides/how-to-block-websites-on-chrome/", "2026-11-16", 0.8],
  ["/blog/how-to-stop-doomscrolling/", "2026-11-16", 0.6],
  ["/alternatives/", "2026-11-22", 0.7],
  ...ALTERNATIVE_PAGES.map((p): [string, string, number] => [`/alternatives/${p.slug}/`, "2026-11-22", 0.6]),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map(([path, lastModified, priority]) => ({
    url: `${BASE}${path}`,
    lastModified,
    priority,
  }));
}
