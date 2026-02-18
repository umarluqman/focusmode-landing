import { Metadata } from "next/types";
import { PricingSection } from "@/components/v3/pricing-section";
import { FaqSection } from "@/components/v3/faq-section";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "FocusMode pricing — free forever with 1 group and all 4 intervention types. PRO is a one-time $20.99 for unlimited groups, analytics, and flexible break durations.",
};

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <PricingSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}
