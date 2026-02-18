"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const CHROME_STORE_URL =
  "https://chromewebstore.google.com/detail/focus-mode-stay-focused-b/ollmdedpknmlcdmpehclmgbogpifahdc";

const navLinks = [
  { href: "/pricing", label: "Pricing" },
  { href: "/changelog", label: "Changelog" },
];

export function Header() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isProPage = pathname === "/pro" || pathname === "/pricing";
  const isSignInPage = pathname === "/sign-in";
  const isLoggedIn = !!session;

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/focusmode-logo.png"
            alt="FocusMode logo"
            width={28}
            height={28}
          />
          <span className="font-heading font-bold text-lg tracking-tight">
            FocusMode
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}

          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={() => signOut()}>
                Sign Out
              </Button>
              <Avatar className="w-8 h-8">
                <AvatarImage src={session?.user?.image ?? ""} />
                <AvatarFallback>
                  {session?.user?.name?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
          ) : isProPage || isSignInPage ? (
            <Button variant="outline" size="sm" onClick={() => signIn("google")}>
              Sign In
            </Button>
          ) : (
            <Button size="sm" asChild>
              <Link
                href={CHROME_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Image
                  src="/chrome.png"
                  alt="Chrome"
                  width={16}
                  height={16}
                />
                Install
              </Link>
            </Button>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background px-4 py-4 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-sm text-muted-foreground hover:text-foreground"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          {isLoggedIn ? (
            <div className="flex items-center gap-3 pt-2">
              <Button variant="outline" size="sm" onClick={() => signOut()}>
                Sign Out
              </Button>
              <span className="text-sm text-muted-foreground">
                {session?.user?.email}
              </span>
            </div>
          ) : isProPage || isSignInPage ? (
            <Button variant="outline" size="sm" onClick={() => signIn("google")} className="w-full">
              Sign In
            </Button>
          ) : (
            <Button size="sm" asChild className="w-full">
              <Link
                href={CHROME_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                <Image
                  src="/chrome.png"
                  alt="Chrome"
                  width={16}
                  height={16}
                />
                Install
              </Link>
            </Button>
          )}
        </div>
      )}
    </nav>
  );
}
