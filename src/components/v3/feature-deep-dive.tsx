"use client";

import { motion } from "framer-motion";
import { FolderOpen, Clock, Timer, TrendingUp, Leaf } from "lucide-react";

const features = [
  {
    icon: FolderOpen,
    title: "Group-Based Blocking",
    description:
      "Organize blocked sites into logical groups like Social Media, News, or Video. Each group gets its own intervention settings, break limits, and trigger rules. Use wildcards, path-based blocking, and exclusion patterns for granular control.",
    highlights: [
      "Unlimited groups with PRO",
      "Wildcard URL matching",
      "Path-based blocking (e.g., youtube.com/shorts)",
    ],
  },
  {
    icon: Clock,
    title: "Smart Scheduling",
    description:
      "Three trigger modes let you control exactly when interventions activate. Always On for constant mindfulness, On Schedule for work-hours-only blocking, or After Usage to allow a daily time budget before interventions begin.",
    highlights: [
      "Always On, Scheduled, or Usage-based",
      "Multiple schedules per group",
      "Daily time limits in minutes",
    ],
  },
  {
    icon: Timer,
    title: "Break Management",
    description:
      "When you choose to take a break, pick a duration that fits your needs \u2014 5, 10, 15, or 30 minutes. A badge countdown shows remaining time, and sites block again automatically when your break ends.",
    highlights: [
      "Flexible break durations (PRO)",
      "Daily break limits per group",
      "Badge countdown timer",
    ],
  },
  {
    icon: TrendingUp,
    title: "Progressive Escalation",
    description:
      "When you exceed your limits, FocusMode can optionally make interventions harder \u2014 doubling wait times, removing easy intervention types, and showing streak warnings. Firm but encouraging, never punitive.",
    highlights: [
      "Opt-in per group",
      "Double intervention duration",
      "Streak warning banners",
    ],
  },
];

export function FeatureDeepDive() {
  return (
    <section className="w-full py-16 md:py-24 bg-card">
      <div className="container px-4 md:px-6">
        <motion.div
          className="text-center space-y-4 mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm font-medium text-primary uppercase tracking-wider">Features</p>
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Built for real focus habits
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A digital wellness Chrome extension with the tools you need to build
            lasting focus habits — not just block websites.
          </p>
        </motion.div>

        <div className="space-y-12 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className={`flex flex-col md:flex-row gap-8 items-start ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading text-2xl font-semibold">{feature.title}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-center gap-2 text-sm">
                      <Leaf className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex-1 w-full md:w-auto">
                <div className="aspect-[4/3] rounded-2xl bg-muted border border-border flex items-center justify-center text-muted-foreground text-sm">
                  Screenshot placeholder
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
