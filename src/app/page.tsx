import { HeroSection } from "@/components/v3/hero-section";
import { HowItWorks } from "@/components/v3/how-it-works";
import { InterventionTypes } from "@/components/v3/intervention-types";
import { FeatureDeepDive } from "@/components/v3/feature-deep-dive";
import { AnalyticsStreaks } from "@/components/v3/analytics-streaks";
import { PricingSection } from "@/components/v3/pricing-section";
import { Testimonials } from "@/components/testimonials";
import { FaqSection } from "@/components/v3/faq-section";
import { CompetitorsSection } from "@/components/v3/competitors-section";
import { CtaSection } from "@/components/v3/cta-section";
import { JsonLdSchemas } from "@/components/v3/json-ld-schemas";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <JsonLdSchemas />
      <div className="flex min-h-screen flex-col">
        <main className="flex-1">
          <HeroSection />
          <HowItWorks />
          <InterventionTypes />
          <FeatureDeepDive />
          <AnalyticsStreaks />
          <PricingSection />
          <Testimonials />
          <FaqSection />
          <CompetitorsSection />
          <CtaSection />
        </main>
        <Footer />
      </div>
    </>
  );
}
