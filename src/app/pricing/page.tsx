import type { Metadata } from "next/types";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { Faq } from "@/components/home/faq";
import { Pricing } from "@/components/home/pricing";
import { browsersLabel, isSaleActive, TIERS } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Pricing",
  description: `FocusMode is free for one focus group. Pro is a one-time payment: ${TIERS.map((t) => `${t.name} $${t.price} (${browsersLabel(t).toLowerCase()})`).join(", ")}.`,
};

export default function PricingPage() {
  return (
    <>
      <JsonLd />
      <main id="main">
        <Pricing initialSale={isSaleActive()} heading="h1" />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
