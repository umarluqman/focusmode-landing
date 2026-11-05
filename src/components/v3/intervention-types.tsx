"use client";

import { motion } from "framer-motion";
import { Hand, Waves, Grid3X3, Pause } from "lucide-react";

const interventions = [
  {
    icon: Pause,
    name: "Instant Block",
    tagline: "A moment of stillness",
    description:
      "A calm, immediate pause with a leaf icon and pulsing animation. Zero-friction reflection point before choosing to continue or return to focus.",
    color: "bg-sage-50 border-sage-200 dark:bg-sage-900/30 dark:border-sage-700",
    iconColor: "text-sage-400",
  },
  {
    icon: Hand,
    name: "Hold to Complete",
    tagline: "Cultivate patience",
    description:
      "Press and hold a circular button for 3-15 seconds. Watch the SVG progress ring fill as you build the discipline to wait before browsing.",
    color: "bg-teal-50 border-teal-200 dark:bg-teal-900/30 dark:border-teal-700",
    iconColor: "text-teal-400",
  },
  {
    icon: Waves,
    name: "Slide to Continue",
    tagline: "Flow with intention",
    description:
      "A full-screen gradient animation slides across your screen over 3-15 seconds. A meditative, passive observation experience before you proceed.",
    color: "bg-sage-50 border-sage-200 dark:bg-sage-900/30 dark:border-sage-700",
    iconColor: "text-sage-400",
  },
  {
    icon: Grid3X3,
    name: "Pixel Garden",
    tagline: "Watch the garden grow",
    description:
      "400 pixels bloom across your screen in a randomized 20x20 grid with gradient colors. An organic visual experience that makes waiting feel creative.",
    color: "bg-teal-50 border-teal-200 dark:bg-teal-900/30 dark:border-teal-700",
    iconColor: "text-teal-400",
  },
];

export function InterventionTypes() {
  return (
    <section className="w-full py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <motion.div
          className="text-center space-y-4 mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm font-medium text-primary uppercase tracking-wider">
            4 Intervention Types
          </p>
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Friction, not force
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Each intervention uses a different psychological approach to prevent
            habituation. Rotate between them to stay mindful.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        >
          {interventions.map((item) => (
            <motion.div
              key={item.name}
              className={`rounded-2xl border p-8 space-y-4 ${item.color} transition-shadow hover:shadow-md`}
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl bg-card/80 ${item.iconColor}`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-semibold">{item.name}</h3>
                  <p className="text-sm text-primary italic">{item.tagline}</p>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
