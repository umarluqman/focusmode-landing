"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

export let Header = ({ showCta = true }: { showCta?: boolean }) => {
  const { data: session } = useSession();

  const handleSignIn = () => {
    signIn("google");
  };
  const isLoggedIn = !!session;
  return (
    <header className="grid grid-cols-[auto,1fr,auto] items-center gap-4 px-4 py-3 md:px-6 bg-white dark:bg-zinc-900">
      <Link className="flex items-center" href="/">
        <div className="flex space-x-3 items-center">
          <Image
            src="/focusmode-logo.png"
            alt="focusmode logo"
            width={32}
            height={32}
          />
          <span className="sr-only">focusmode</span>
          <div
            className="tracking-wide"
            style={{ fontFamily: "var(--font-cal-sans)" }}
          >
            focusmode
          </div>
        </div>
      </Link>
      <nav className="hidden justify-center gap-4 sm:flex md:gap-6"></nav>
      <div className="ml-auto">
        {showCta ? (
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
              Install Now
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
