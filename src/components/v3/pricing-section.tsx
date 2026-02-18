"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const CHROME_STORE_URL =
  "https://chromewebstore.google.com/detail/focus-mode-stay-focused-b/ollmdedpknmlcdmpehclmgbogpifahdc";
const PRO_URL = "https://polar.sh/focusmode";

const features = [
  { name: "Focus groups", free: "1", pro: "Unlimited" },
  { name: "Intervention types", free: "All 4", pro: "All 4" },
  { name: "Break durations", free: "5 min", pro: "5 / 10 / 15 / 30 min" },
  { name: "Schedule-based triggering", free: true, pro: true },
  { name: "Usage-based triggering", free: true, pro: true },
  { name: "Escalation system", free: true, pro: true },
  { name: "Streak tracking", free: true, pro: true },
  { name: "Analytics dashboard", free: "Basic", pro: "Full" },
  { name: "Website usage charts", free: false, pro: true },
  { name: "Data export/import", free: false, pro: true },
  { name: "Custom intervention messages", free: true, pro: true },
  { name: "Dark mode", free: true, pro: true },
];

function FeatureValue({ value }: { value: boolean | string }) {
  if (typeof value === "string") {
    return <span className="text-sm">{value}</span>;
  }
  return value ? (
    <Check className="w-5 h-5 text-primary" />
  ) : (
    <X className="w-5 h-5 text-muted-foreground/40" />
  );
}

export function PricingSection() {
  return (
    <section id="pricing" className="w-full py-16 md:py-24 bg-card">
      <div className="container px-4 md:px-6">
        <motion.div
          className="text-center space-y-4 mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm font-medium text-primary uppercase tracking-wider">Pricing</p>
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Free to start, one-time to unlock
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            No subscriptions. No recurring fees. Pay once, own it forever.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15 } } }}
        >
          {/* Free tier */}
          <motion.div
            className="rounded-2xl border border-border bg-background p-8 space-y-6"
            variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
          >
            <div>
              <h3 className="font-heading text-2xl font-bold">Free</h3>
              <div className="mt-2">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-muted-foreground ml-1">forever</span>
              </div>
            </div>
            <Button size="lg" variant="outline" asChild className="w-full">
              <Link href={CHROME_STORE_URL} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                <Image src="/chrome.png" alt="Chrome" width={20} height={20} />
                Install Free
              </Link>
            </Button>
            <ul className="space-y-3">
              {features.map((f) => (
                <li key={f.name} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{f.name}</span>
                  <FeatureValue value={f.free} />
                </li>
              ))}
            </ul>
          </motion.div>

          {/* PRO tier */}
          <motion.div
            className="rounded-2xl border-2 border-primary bg-background p-8 space-y-6 relative"
            variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                LIFETIME
              </span>
            </div>
            <div>
              <h3 className="font-heading text-2xl font-bold">PRO</h3>
              <div className="mt-2">
                <span className="text-4xl font-bold">$20.99</span>
                <span className="text-muted-foreground ml-1">one-time</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Not $8.99/month — pay once, own it forever
              </p>
            </div>
            <Button size="lg" asChild className="w-full">
              <Link href={PRO_URL} target="_blank" rel="noopener noreferrer">Get PRO</Link>
            </Button>
            <ul className="space-y-3">
              {features.map((f) => (
                <li key={f.name} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{f.name}</span>
                  <FeatureValue value={f.pro} />
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
