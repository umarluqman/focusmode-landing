import { MetadataRoute } from "next";
import { BLOCK_PAGES } from "@/lib/block-pages";

const BASE = "https://focusmode.app";

const PAGES: [path: string, lastModified: string, priority: number][] = [
  ["/", "2026-11-16", 1],
  ["/pricing/", "2026-11-16", 0.8],
  ["/faq/", "2026-11-16", 0.7],
  ["/whats-new/", "2026-11-16", 0.6],
  ["/changelog/", "2026-11-16", 0.5],
  ["/license/", "2026-11-16", 0.4],
  ["/privacy-policy/", "2026-11-16", 0.3],
  ["/block/", "2026-11-16", 0.7],
  ...BLOCK_PAGES.map((p): [string, string, number] => [`/block/${p.slug}/`, "2026-11-16", 0.7]),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map(([path, lastModified, priority]) => ({
    url: `${BASE}${path}`,
    lastModified,
    priority,
  }));
}
