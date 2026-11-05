"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Leaf } from "lucide-react";

const CHROME_STORE_URL =
  "https://chromewebstore.google.com/detail/focus-mode-stay-focused-b/ollmdedpknmlcdmpehclmgbogpifahdc";
const PRO_URL = "https://polar.sh/focusmode";

export function CtaSection() {
  return (
    <section className="w-full py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <motion.div
          className="relative rounded-3xl bg-primary px-8 py-16 md:px-16 md:py-20 overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute top-4 right-8 opacity-10">
            <Leaf className="w-32 h-32 text-white" />
          </div>
          <div className="absolute bottom-4 left-8 opacity-10">
            <Leaf className="w-24 h-24 text-white rotate-180" />
          </div>

          <div className="relative z-10 flex flex-col items-center text-center space-y-6 max-w-2xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Start Browsing Mindfully
            </h2>
            <p className="text-lg text-white/80 leading-relaxed">
              Join 15,000+ people who&apos;ve reclaimed their focus. Install
              FocusMode for free and experience the difference gentle
              interventions make.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" asChild className="bg-white text-primary hover:bg-white/90 text-base px-8">
                <Link href={CHROME_STORE_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <Image src="/chrome.png" alt="Chrome" width={20} height={20} />
                  Install Free
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-white/30 text-white hover:bg-white/10 text-base px-8">
                <Link href={PRO_URL} target="_blank" rel="noopener noreferrer">
                  Get PRO — $20.99
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
