"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";

const CHROME_STORE_URL =
  "https://chromewebstore.google.com/detail/focus-mode-stay-focused-b/ollmdedpknmlcdmpehclmgbogpifahdc";

export function HeroSection() {
  return (
    <section className="w-full py-16 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center text-center space-y-8 max-w-3xl mx-auto"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12 } },
          }}
        >
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
            <Link href="/changelog" className="inline-block hover:opacity-80 transition-opacity">
              <Badge className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary hover:bg-primary/15 border-primary/20">
                v3.0 — Complete Rewrite
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><path d="m9 18 6-6-6-6" /></svg>
              </Badge>
            </Link>
          </motion.div>

          <motion.h1
            className="font-heading text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
          >
            Block Distracting Websites{" "}
            <span className="text-primary">Mindfully</span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
          >
            The Chrome extension that helps you reduce screen time without going
            cold turkey. Gentle interventions, not hard blocks — used by{" "}
            <strong>15,000+ people</strong> to browse with intention.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
          >
            <Button size="lg" asChild className="text-base px-8">
              <Link href={CHROME_STORE_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <Image src="/chrome.png" alt="Chrome" width={20} height={20} />
                Install Free
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-base px-8">
              <Link href="#how-it-works">See How It Works</Link>
            </Button>
          </motion.div>

          <motion.div
            className="flex items-center gap-3 pt-4"
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
          >
            <div className="flex -space-x-2">
              {["/users/6.png", "/users/3.png", "/users/4.jpeg", "/users/8.jpeg"].map((src, i) => (
                <Image key={i} src={src} alt="User" width={32} height={32} className="rounded-full border-2 border-background" />
              ))}
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">4.7/5 from 15k+ users</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
