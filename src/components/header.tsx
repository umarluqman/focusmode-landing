import Link from "next/link";
import { StoreLink } from "@/components/store-link";
import { Wordmark } from "./logo";

const links = [
  { href: "/#shaders", label: "Shaders", wide: true },
  { href: "/#groups", label: "Groups", wide: true },
  { href: "/pricing/", label: "Pricing", wide: false },
  { href: "/changelog/", label: "Changelog", wide: true },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <nav className="container flex h-16 items-center justify-between gap-4">
        <Link href="/" aria-label="FocusMode home">
          <Wordmark />
        </Link>
        <div className="flex items-center gap-1 sm:gap-2">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`${l.wide ? "hidden md:inline-flex" : "inline-flex"} h-9 items-center rounded-full px-3 text-sm text-muted-foreground transition-colors hover:text-foreground`}
            >
              {l.label}
            </Link>
          ))}
          <StoreLink
            placement="header"
            className="ml-1 inline-flex h-9 items-center rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          />
        </div>
      </nav>
    </header>
  );
}
