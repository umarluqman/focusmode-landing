import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { BlockedMoment } from "@/components/home/blocked-moment";
import { ClosingCta } from "@/components/home/closing-cta";
import { Faq } from "@/components/home/faq";
import { Groups } from "@/components/home/groups";
import { Hero } from "@/components/home/hero";
import { Interventions } from "@/components/home/interventions";
import { Pricing } from "@/components/home/pricing";
import { ShaderGallery } from "@/components/home/shader-gallery";
import { UpgradeStrip } from "@/components/home/upgrade-strip";
import { UseCases } from "@/components/home/use-cases";
import { isSaleActive } from "@/lib/pricing";

export default function Home() {
  return (
    <>
      <JsonLd />
      <main id="main">
        <Hero />
        <BlockedMoment />
        <ShaderGallery />
        <Groups />
        <UseCases />
        <Interventions />
        <Pricing initialSale={isSaleActive()} />
        <UpgradeStrip />
        <Faq />
        <ClosingCta />
      </main>
      <Footer />
    </>
  );
}
