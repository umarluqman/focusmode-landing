import { MountainIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";

export let Header = () => {
  return (
    <header className="grid grid-cols-[auto,1fr,auto] items-center gap-4 px-4 py-3 md:px-6 bg-white dark:bg-zinc-900">
      <Link className="flex items-center" href="#">
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
        <Button>
          <Link
            href="https://chromewebstore.google.com/detail/focus-mode-stay-focused-b/ollmdedpknmlcdmpehclmgbogpifahdc"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download Now
          </Link>
        </Button>
      </div>
    </header>
  );
};
