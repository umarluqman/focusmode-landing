"use client";

import { motion } from "framer-motion";
import { Leaf, Eye, Coffee } from "lucide-react";

const steps = [
  {
    icon: Eye,
    title: "Visit a blocked site",
    description:
      "When you navigate to a distracting website, FocusMode gently intervenes with a calming overlay instead of a harsh block screen.",
  },
  {
    icon: Leaf,
    title: "Complete a mindful intervention",
    description:
      "Choose from 4 intervention types — hold, slide, watch pixels bloom, or pause. Each one creates a moment of awareness before you proceed.",
  },
  {
    icon: Coffee,
    title: "Take a break or return to focus",
    description:
      "Decide mindfully: take a timed break (5-30 min) to browse, or return to what matters. Your choice, your pace.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="w-full py-16 md:py-24 bg-card">
      <div className="container px-4 md:px-6">
        <motion.div
          className="text-center space-y-4 mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm font-medium text-primary uppercase tracking-wider">
            How It Works
          </p>
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Mindful browsing in three steps
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            FocusMode doesn&apos;t lock you out. It creates a moment of awareness so
            you can make intentional choices about your screen time.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15 } } }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              className="relative flex flex-col items-center text-center space-y-4"
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary">
                <step.icon className="w-7 h-7" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-primary">{index + 1}</span>
                <h3 className="font-heading text-xl font-semibold">{step.title}</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
