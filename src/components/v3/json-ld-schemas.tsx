const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://focusmode.app/#organization",
  name: "FocusMode",
  url: "https://focusmode.app",
  logo: {
    "@type": "ImageObject",
    url: "https://focusmode.app/focusmode-logo.png",
    width: 128,
    height: 128,
  },
  email: "focusmode.app@gmail.com",
  sameAs: [
    "https://chromewebstore.google.com/detail/focus-mode-stay-focused-b/ollmdedpknmlcdmpehclmgbogpifahdc",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://focusmode.app/#website",
  name: "FocusMode",
  url: "https://focusmode.app",
  publisher: { "@id": "https://focusmode.app/#organization" },
  description:
    "Reduce mindless browsing with gentle interventions. A Chrome extension for mindful, intentional browsing.",
  inLanguage: "en-US",
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": "https://focusmode.app/#software",
  name: "FocusMode",
  description:
    "A Chrome extension that reduces mindless browsing through calming interventions instead of hard blocks. 4 intervention types, break management, streak tracking, and analytics.",
  url: "https://focusmode.app",
  applicationCategory: "BrowserApplication",
  operatingSystem: "Chrome",
  browserRequirements: "Requires Google Chrome",
  softwareVersion: "3.0",
  installUrl:
    "https://chromewebstore.google.com/detail/focus-mode-stay-focused-b/ollmdedpknmlcdmpehclmgbogpifahdc",
  author: { "@id": "https://focusmode.app/#organization" },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.7",
    bestRating: "5",
    worstRating: "1",
    ratingCount: "15000",
  },
  offers: [
    {
      "@type": "Offer",
      name: "Free",
      price: "0",
      priceCurrency: "USD",
      description: "1 group, all 4 intervention types, 5-min breaks",
      availability: "https://schema.org/InStock",
    },
    {
      "@type": "Offer",
      name: "PRO Lifetime",
      price: "20.99",
      priceCurrency: "USD",
      description:
        "Unlimited groups, all break durations, full analytics, data export",
      availability: "https://schema.org/InStock",
      url: "https://focusmode.app/pricing",
    },
  ],
  featureList: [
    "4 mindful intervention types",
    "Group-based website blocking",
    "Schedule-based triggering",
    "Usage-based triggering",
    "Break management with escalation",
    "Mindfulness streak tracking",
    "Analytics dashboard",
    "Path-based blocking with wildcards",
    "Shadow DOM isolation",
    "Privacy-respecting local storage",
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://focusmode.app/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Pricing",
      item: "https://focusmode.app/pricing/",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "FAQ",
      item: "https://focusmode.app/faq/",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Changelog",
      item: "https://focusmode.app/changelog/",
    },
    {
      "@type": "ListItem",
      position: 5,
      name: "Privacy Policy",
      item: "https://focusmode.app/privacy-policy/",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is FocusMode?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "FocusMode is a Chrome extension that reduces mindless browsing through calming interventions instead of hard blocks. Rather than simply preventing access to websites, it uses 4 unique mindfulness-based approaches to help you make conscious decisions about your browsing habits.",
      },
    },
    {
      "@type": "Question",
      name: "Is FocusMode free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, FocusMode has a free tier that includes 1 group and all 4 intervention types (hold, slide, pixel, and instant). The PRO version is a one-time payment of $20.99 that unlocks unlimited groups, full analytics, flexible break durations, and data export. No subscription required.",
      },
    },
    {
      "@type": "Question",
      name: "How is FocusMode different from other website blockers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "FocusMode uses 4 unique mindfulness-based interventions (hold, slide, pixel, and instant) instead of simply blocking sites. It respects user autonomy with flexible breaks and progressive escalation, encouraging mindful browsing rather than rigid restriction.",
      },
    },
    {
      "@type": "Question",
      name: "Does FocusMode work on all websites?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, FocusMode uses Shadow DOM isolation to work on any website without style conflicts. This ensures the intervention overlays display correctly regardless of a website's existing CSS or JavaScript.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use FocusMode during work hours only?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, schedule-based triggering lets you activate blocking during specific time windows. You can configure FocusMode to only intervene during your work hours or study sessions, and browse freely outside those windows.",
      },
    },
    {
      "@type": "Question",
      name: "What happens when I exceed my break limit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Optional escalation increases intervention duration, removes easy interventions, and shows streak warnings. This progressive approach helps reinforce mindful browsing habits without being overly punitive. You control what escalation behaviors are enabled per group.",
      },
    },
    {
      "@type": "Question",
      name: "Does FocusMode collect my data?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No, all data is stored locally in your browser. FocusMode is privacy-respecting with no external tracking. Your browsing data never leaves your device.",
      },
    },
    {
      "@type": "Question",
      name: "Can I block specific pages instead of entire websites?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, FocusMode supports path-based blocking with wildcards. For example, you can block youtube.com/shorts while still allowing access to youtube.com for other content. You can also use exclusion patterns like !allowed.example.com.",
      },
    },
  ],
};

export function JsonLdSchemas() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
