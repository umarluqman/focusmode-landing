import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { Button } from "./ui/button";
import Link from "next/link";
import { ArrowBigRight, MoveRightIcon } from "lucide-react";

export let CtaSection = () => {
  return (
    <div className="h-[40rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2 mb-8">
          <h2
            className="text-3xl font-bold tracking-wide sm:text-5xl"
            style={{ fontFamily: "var(--font-cal-sans)" }}
          >
            Try focusmode Now
          </h2>
          <p className="max-w-[900px] text-gray-500 dark:text-gray-400">
            Reclaim Your Focus, Be More Present
          </p>
        </div>
      </div>

      <Button>
        <Link
          href="https://chromewebstore.google.com/detail/focus-mode-stay-focused-b/ollmdedpknmlcdmpehclmgbogpifahdc"
          target="_blank"
          rel="noopener noreferrer"
          className="flex space-x-3 items-center"
        >
          <span>Download Now</span> <MoveRightIcon />
        </Link>
      </Button>
    </div>
  );
};
