"use client";

import { motion } from "framer-motion";
import { BarChart3, Flame, Calendar, Shield } from "lucide-react";

const stats = [
  {
    icon: Flame,
    label: "Current Streak",
    description: "Track consecutive days staying within your limits",
  },
  {
    icon: Calendar,
    label: "Growth Calendar",
    description: "Visual 7/30/90-day calendar showing mindful vs missed days",
  },
  {
    icon: BarChart3,
    label: "Usage Charts",
    description: "Top 10 domains by time spent with detailed breakdowns",
  },
  {
    icon: Shield,
    label: "Blocks Prevented",
    description: "Running counter of how many times FocusMode intervened",
  },
];

export function AnalyticsStreaks() {
  return (
    <section className="w-full py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-4">
              <p className="text-sm font-medium text-primary uppercase tracking-wider">
                Analytics & Streaks
              </p>
              <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
                Track your progress, build momentum
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                A built-in screen time tracker for Chrome that gamifies your
                focus journey. Watch your streak grow, see which sites consume
                your time, and celebrate your consistency.
              </p>
            </div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
            >
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border"
                  variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <stat.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">{stat.label}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="aspect-square rounded-2xl bg-muted border border-border flex items-center justify-center text-muted-foreground text-sm"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Dashboard screenshot placeholder
          </motion.div>
        </div>
      </div>
    </section>
  );
}
