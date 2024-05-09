import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { Button } from "./ui/button";
import Link from "next/link";
import { ArrowBigRight, MoveRightIcon } from "lucide-react";

const testimonials = [
  {
    quote:
      "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.",
    name: "Charles Dickens",
  },
  {
    quote:
      "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
    name: "William Shakespeare",
  },
  {
    quote: "All that we see or seem is but a dream within a dream.",
    name: "Edgar Allan Poe",
  },
  {
    quote:
      "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
    name: "Jane Austen",
  },
  {
    quote:
      "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
    name: "Herman Melville",
  },
];

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
