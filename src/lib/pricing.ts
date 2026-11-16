export type TierId = "personal" | "plus" | "unlimited";

export type Tier = {
  id: TierId;
  name: string;
  browsers: number | null;
  price: number;
  blurb: string;
};

export const TIERS: Tier[] = [
  {
    id: "personal",
    name: "Personal",
    browsers: 1,
    price: 20,
    blurb: "One browser you live in.",
  },
  {
    id: "plus",
    name: "Plus",
    browsers: 3,
    price: 30,
    blurb: "Work laptop, home desktop, and one more.",
  },
  {
    id: "unlimited",
    name: "Unlimited",
    browsers: null,
    price: 45,
    blurb: "Every browser, every profile, the whole household.",
  },
];

export const SALE = {
  name: "Black Friday",
  code: "BRIGHTFRIDAY",
  percentOff: 50,
  start: new Date("2026-11-16T00:00:00-08:00"),
  end: new Date("2026-12-15T23:59:59-08:00"),
};

export const isSaleActive = (now = new Date()) =>
  now >= SALE.start && now <= SALE.end;

export const priceOf = (tier: Tier, sale: boolean) =>
  sale ? (tier.price * (100 - SALE.percentOff)) / 100 : tier.price;

export const formatPrice = (n: number) =>
  Number.isInteger(n) ? String(n) : n.toFixed(2);

export const lowestPrice = () => Math.min(...TIERS.map((t) => t.price));

export const browsersLabel = (tier: Tier) =>
  tier.browsers === null
    ? "Unlimited browsers"
    : `${tier.browsers} browser${tier.browsers > 1 ? "s" : ""}`;

export const FREE_SHADER_FAMILIES = ["Dither"];

export const FREE_FEATURES = [
  "1 focus group",
  "6 of 7 interventions",
  `${FREE_SHADER_FAMILIES.join(" and ")} shaders`,
  "Schedules and daily time limits",
  "Block lists and allow-only groups",
  "Strict mode",
  "5-minute breaks and streaks",
  "Escalation when you overdo breaks",
];

export const PRO_FEATURES = [
  "Unlimited focus groups",
  "Breathing exercise intervention",
  "Full shader gallery, 23 scenes",
  "Longer, custom break lengths",
  "Usage analytics",
  "Every future update",
];

export const CHROME_STORE_URL =
  "https://chromewebstore.google.com/detail/focus-mode-stay-focused-b/ollmdedpknmlcdmpehclmgbogpifahdc";

// Set once the Firefox Add-ons (AMO) listing is live; turns on Firefox copy site-wide.
export const FIREFOX_STORE_URL: string | null = null;
export const FIREFOX_LIVE = FIREFOX_STORE_URL !== null;

// Set once the Edge Add-ons listing is live. Edge copy stays on regardless (Edge installs from the Chrome Web Store); this only sends Edge visitors to Edge Add-ons.
export const EDGE_STORE_URL: string | null = null;

export const storeUrl = (placement: string, base = CHROME_STORE_URL) =>
  `${base}?utm_source=focusmode.app&utm_medium=${placement}&utm_campaign=v3`;
