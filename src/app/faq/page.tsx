import type { Metadata } from "next/types";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { Faq } from "@/components/home/faq";

export const metadata: Metadata = {
  title: "FAQ: Website Blocker for Chrome",
  description:
    "Answers about focusmode: what's free, lifetime Pro, browsers per license, v2 Pro upgrades, refunds and privacy.",
};

export default function FaqPage() {
  return (
    <>
      <JsonLd faq />
      <main id="main">
        <Faq heading="h1" />
      </main>
      <Footer />
    </>
  );
}
