"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "What is FocusMode?",
    answer:
      "FocusMode is a Chrome extension that reduces mindless browsing through calming interventions instead of hard blocks. Rather than simply preventing access to websites, it uses 4 unique mindfulness-based approaches to help you make conscious decisions about your browsing habits.",
  },
  {
    question: "Is FocusMode free?",
    answer:
      "Yes, FocusMode has a free tier that includes 1 group and all 4 intervention types (hold, slide, pixel, and instant). The PRO version is a one-time payment of $20.99 that unlocks unlimited groups, full analytics, flexible break durations, and data export. No subscription required.",
  },
  {
    question: "How is FocusMode different from other website blockers?",
    answer:
      "FocusMode uses 4 unique mindfulness-based interventions (hold, slide, pixel, and instant) instead of simply blocking sites. It respects user autonomy with flexible breaks and progressive escalation, encouraging mindful browsing rather than rigid restriction.",
  },
  {
    question: "Does FocusMode work on all websites?",
    answer:
      "Yes, FocusMode uses Shadow DOM isolation to work on any website without style conflicts. This ensures the intervention overlays display correctly regardless of a website's existing CSS or JavaScript.",
  },
  {
    question: "Can I use FocusMode during work hours only?",
    answer:
      "Yes, schedule-based triggering lets you activate blocking during specific time windows. You can configure FocusMode to only intervene during your work hours or study sessions, and browse freely outside those windows.",
  },
  {
    question: "What happens when I exceed my break limit?",
    answer:
      "Optional escalation increases intervention duration, removes easy interventions, and shows streak warnings. This progressive approach helps reinforce mindful browsing habits without being overly punitive. You control what escalation behaviors are enabled per group.",
  },
  {
    question: "Does FocusMode collect my data?",
    answer:
      "No, all data is stored locally in your browser. FocusMode is privacy-respecting with no external tracking. Your browsing data never leaves your device.",
  },
  {
    question: "Can I block specific pages instead of entire websites?",
    answer:
      "Yes, FocusMode supports path-based blocking with wildcards. For example, you can block youtube.com/shorts while still allowing access to youtube.com for other content. You can also use exclusion patterns like !allowed.example.com.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="w-full py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-16">
          <p className="text-sm font-medium text-primary uppercase tracking-wider">
            FAQ
          </p>
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Frequently asked questions
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to know about FocusMode.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-2">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-border rounded-xl overflow-hidden"
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="flex items-center justify-between w-full p-5 text-left hover:bg-muted/50 transition-colors"
              >
                <span className="font-semibold pr-4">{faq.question}</span>
                <ChevronDown
                  className={cn(
                    "w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-200",
                    openIndex === index && "rotate-180"
                  )}
                />
              </button>
              <div
                className={cn(
                  "overflow-hidden transition-all duration-200",
                  openIndex === index ? "max-h-96" : "max-h-0"
                )}
              >
                <p className="px-5 pb-5 text-muted-foreground leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
