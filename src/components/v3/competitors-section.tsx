"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const competitors = [
  {
    name: "FocusMode",
    highlight: true,
    price: "$20.99 one-time",
    interventions: "4 types",
    breaks: true,
    streaks: true,
    analytics: true,
    privacy: true,
  },
  {
    name: "Freedom",
    highlight: false,
    price: "$8.99/mo",
    interventions: "Hard block",
    breaks: false,
    streaks: false,
    analytics: false,
    privacy: false,
  },
  {
    name: "Cold Turkey",
    highlight: false,
    price: "$39 one-time",
    interventions: "Hard block",
    breaks: false,
    streaks: false,
    analytics: false,
    privacy: true,
  },
  {
    name: "LeechBlock",
    highlight: false,
    price: "Free",
    interventions: "Block page",
    breaks: false,
    streaks: false,
    analytics: false,
    privacy: true,
  },
];

const rows = [
  { label: "Price", key: "price" as const },
  { label: "Intervention types", key: "interventions" as const },
  { label: "Break management", key: "breaks" as const },
  { label: "Streak tracking", key: "streaks" as const },
  { label: "Analytics dashboard", key: "analytics" as const },
  { label: "Privacy-first", key: "privacy" as const },
];

function CellValue({ value }: { value: string | boolean }) {
  if (typeof value === "string") return <span className="text-xs">{value}</span>;
  return value ? (
    <Check className="w-4 h-4 text-primary mx-auto" />
  ) : (
    <X className="w-4 h-4 text-muted-foreground/40 mx-auto" />
  );
}

export function CompetitorsSection() {
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
          <p className="text-sm font-medium text-primary uppercase tracking-wider">Compare</p>
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Why FocusMode?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            The only website blocker that uses mindful interventions instead of
            brute-force blocking.
          </p>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto overflow-x-auto"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="text-left p-3 font-medium text-muted-foreground">Feature</th>
                {competitors.map((c) => (
                  <th
                    key={c.name}
                    className={`p-3 text-center font-semibold ${
                      c.highlight ? "text-primary bg-primary/5 rounded-t-lg" : ""
                    }`}
                  >
                    {c.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-t border-border">
                  <td className="p-3 text-muted-foreground">{row.label}</td>
                  {competitors.map((c) => (
                    <td
                      key={c.name}
                      className={`p-3 text-center ${c.highlight ? "bg-primary/5" : ""}`}
                    >
                      <CellValue value={c[row.key]} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}
