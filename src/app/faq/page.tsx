import { Metadata } from "next/types";
import { FaqSection } from "@/components/v3/faq-section";
import { JsonLdSchemas } from "@/components/v3/json-ld-schemas";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about FocusMode — the mindful website blocker Chrome extension. Learn about intervention types, pricing, privacy, and more.",
};

export default function FaqPage() {
  return (
    <>
      <JsonLdSchemas />
      <div className="flex min-h-screen flex-col">
        <main className="flex-1">
          <FaqSection />
        </main>
        <Footer />
      </div>
    </>
  );
}
