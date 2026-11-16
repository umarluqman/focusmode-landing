import type { Metadata } from "next/types";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { Faq } from "@/components/home/faq";
import { Pricing } from "@/components/home/pricing";
import { browsersLabel, isSaleActive, TIERS } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Pricing: Free Website Blocker, Lifetime Pro (No Subscription)",
  description: `FocusMode is free for one focus group. Pro is a one-time payment: ${TIERS.map((t) => `${t.name} $${t.price} (${browsersLabel(t).toLowerCase()})`).join(", ")}.`,
};

export default function PricingPage() {
  return (
    <>
      <JsonLd />
      <main id="main">
        <Pricing initialSale={isSaleActive()} heading="h1" />
        <p className="container -mt-12 pb-16 text-sm text-muted-foreground lg:-mt-20 lg:pb-20">
          Coming from FocusMode 2?{" "}
          <Link href="/whats-new/?pro=1" className="font-semibold text-foreground underline underline-offset-4">
            See what changed in v3
          </Link>
        </p>
        <Faq />
      </main>
      <Footer />
    </>
  );
}
