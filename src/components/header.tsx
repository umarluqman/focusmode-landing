"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

export let Header = ({ showCta = true }: { showCta?: boolean }) => {
  const { data: session } = useSession();

  const handleSignIn = () => {
    signIn("google");
  };
  const pathname = usePathname();
  const isProPage = pathname === "/pro";
  const isHomePage = pathname === "/";
  const isSignInPage = pathname === "/sign-in";

  const isLoggedIn = !!session;
  return (
    <header className="grid grid-cols-[auto,1fr,auto] items-center gap-4 px-4 py-3 md:px-12 bg-white dark:bg-zinc-900">
      <Link className="flex items-center" href="/">
        <div className="flex space-x-3 items-center">
          <Image
            className="scale-[3]"
            src="/logo.svg"
            alt="focusmode logo"
            width={32}
            height={32}
          />
          <span className="sr-only">FocusMode</span>
          <div
            className="tracking-wide"
            style={{ fontFamily: "var(--font-cal-sans)" }}
          >
            FocusMode
          </div>
        </div>
      </Link>
      <nav className="hidden justify-center gap-4 sm:flex md:gap-6">
        {" "}
        <Link className="flex items-center" href="/pro">
          <div className="flex space-x-3 items-center">
            <div className="tracking-wide">PRO Version</div>
          </div>
        </Link>
      </nav>
      <div className="ml-auto">
        {!isProPage || !isSignInPage ? (
          <Button>
            <Link
              href="https://chromewebstore.google.com/detail/focus-mode-stay-focused-b/ollmdedpknmlcdmpehclmgbogpifahdc"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Image
                src="/chrome.png"
                alt="chrome logo"
                width={24}
                height={24}
              />
              Add to Chrome
            </Link>
          </Button>
        ) : isLoggedIn ? (
          <div className="flex items-center gap-2">
            <Button variant={"outline"} onClick={() => signOut()}>
              Sign Out
            </Button>
            <Avatar>
              <AvatarImage src={session?.user?.image ?? ""} />
              <AvatarFallback>
                {session?.user?.name?.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
        ) : (
          <Button variant={"outline"} onClick={handleSignIn}>
            Sign In
          </Button>
        )}
      </div>
    </header>
  );
};
