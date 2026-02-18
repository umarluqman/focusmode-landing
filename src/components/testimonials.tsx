"use client";

import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { Button } from "./ui/button";
import Link from "next/link";
import { MoveRight } from "lucide-react";

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

export function Testimonials() {
  return (
    <section className="w-full py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <p className="text-sm font-medium text-primary uppercase tracking-wider">
            Testimonials
          </p>
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Loved by 15,000+ users
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            See what people are saying on the Chrome Web Store.
          </p>
        </div>

        <InfiniteMovingCards
          items={testimonials}
          direction="right"
          speed="slow"
        />

        <div className="flex justify-center mt-12">
          <Button variant="outline" asChild>
            <Link
              href="https://chromewebstore.google.com/detail/focus-mode-stay-focused-b/ollmdedpknmlcdmpehclmgbogpifahdc"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              More reviews
              <MoveRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
