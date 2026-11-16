import Link from "next/link";
import { storeUrl } from "@/lib/pricing";
import { BLOCK_PAGES } from "@/lib/block-pages";
import { Wordmark } from "./logo";

const columns = [
  {
    title: "Block a site",
    links: [
      ...BLOCK_PAGES.map((p) => ({ href: `/block/${p.slug}/`, label: p.name })),
      { href: "/block/", label: "All guides" },
    ],
  },
  {
    title: "Product",
    links: [
      { href: "/#shaders", label: "Shaders" },
      { href: "/pricing/", label: "Pricing" },
      { href: "/changelog/", label: "Changelog" },
      { href: storeUrl("footer"), label: "Chrome Web Store" },
    ],
  },
  {
    title: "Help",
    links: [
      { href: "/faq/", label: "FAQ" },
      { href: "/license/", label: "Find my license key" },
      { href: "/sign-in/", label: "v2 sign in" },
      { href: "mailto:focusmode.app@gmail.com", label: "Email support" },
      { href: "/privacy-policy/", label: "Privacy" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div className="space-y-3">
          <Wordmark />
          <p className="max-w-xs text-sm text-muted-foreground">
            A pause before the scroll. Built and supported by an indie developer.
          </p>
        </div>
        {columns.map((c) => (
          <div key={c.title}>
            <h2 className="mb-3 text-sm font-semibold">{c.title}</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {c.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="transition-colors hover:text-foreground">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="container border-t border-border py-6 text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} FocusMode
      </div>
    </footer>
  );
}
