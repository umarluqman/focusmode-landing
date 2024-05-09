import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { Button } from "./ui/button";
import Link from "next/link";
import { ArrowBigRight, MoveRightIcon } from "lucide-react";

const testimonials = [
  {
    quote:
      "this is one of the most cleanest most asthetic and most productive extension ever that too for free.",
    name: "Aniket Singh Chauhan",
  },
  {
    quote: "The most valuable extension I've ever used! Thank you so much!",
    name: "林家鋒",
  },
  {
    quote:
      "New update is great ! with gamification block and more visuals, keep you more aware of NOT entering blocked sites ( instead of mindlessly turning off extention for a second and entering)",
    name: "Iman Shams M",
  },
  {
    quote:
      "This is simply perfect, makes you do conscient choices! Version 2.0 is better than before, because it makes you think twice before entering a distracting website with the interventions.",
    name: "Victor Armbruster",
  },
  {
    quote:
      "Great extension, it definitely stops me from going down those internet rabbit holes when I should be working on something. Simple, straightforward, and I especially like the new scheduled feature. Just what I needed.",
    name: "Gabby M",
  },
];

export let Testimonials = () => {
  return (
    <div className="h-[40rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2 mb-8">
          <h2
            className="text-3xl font-bold tracking-wide sm:text-5xl"
            style={{ fontFamily: "var(--font-cal-sans)" }}
          >
            Don&#39;t take it from us
          </h2>
          <p className="max-w-[900px] text-gray-500 dark:text-gray-400">
            See what others have to say.
          </p>
        </div>
      </div>
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
      <Button variant={"outline"} className="mt-20">
        <Link
          href="https://chromewebstore.google.com/detail/focus-mode-stay-focused-b/ollmdedpknmlcdmpehclmgbogpifahdc"
          target="_blank"
          rel="noopener noreferrer"
          className="flex space-x-3 items-center"
        >
          <span>More reviews</span> <MoveRightIcon />
        </Link>
      </Button>
    </div>
  );
};
