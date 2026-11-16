import { browsersLabel, CHROME_STORE_URL, isSaleActive, priceOf, SALE, TIERS } from "@/lib/pricing";
import { FAQS } from "@/components/home/faq";

const ORG = "https://focusmode.app/#organization";

export function JsonLd({ faq = false }: { faq?: boolean }) {
  const sale = isSaleActive();
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": ORG,
      name: "focusmode",
      url: "https://focusmode.app",
      logo: "https://focusmode.app/focusmode-logo.png",
      email: "hey@focusmode.app",
      sameAs: [
        CHROME_STORE_URL,
        "https://alternativeto.net/software/focusmode/about/",
        "https://www.saashub.com/focusmode",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "focusmode",
      description:
        "A Chrome extension that replaces hard blocks with mindful pauses: live shader overlays, 7 interventions, per-group schedules, time limits, breaks and strict mode.",
      url: "https://focusmode.app",
      applicationCategory: "BrowserApplication",
      operatingSystem: "Chrome",
      softwareVersion: "3.0",
      installUrl: CHROME_STORE_URL,
      author: { "@id": ORG },
      offers: [
        { "@type": "Offer", name: "Free", price: "0", priceCurrency: "USD" },
        ...TIERS.map((t) => ({
          "@type": "Offer",
          name: `Pro ${t.name} (${browsersLabel(t)})`,
          price: String(priceOf(t, sale)),
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: "https://focusmode.app/pricing/",
          ...(sale && { priceValidUntil: SALE.end.toISOString().slice(0, 10) }),
        })),
      ],
    },
    ...(faq
      ? [
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQS.map(({ q, a }) => ({
              "@type": "Question",
              name: q,
              acceptedAnswer: { "@type": "Answer", text: a },
            })),
          },
        ]
      : []),
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
    />
  );
}
