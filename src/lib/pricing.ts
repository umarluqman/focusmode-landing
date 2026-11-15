export type TierId = "personal" | "plus" | "unlimited";

export type Tier = {
  id: TierId;
  name: string;
  browsers: number | null;
  price: number;
  salePrice: number;
  blurb: string;
};

export const TIERS: Tier[] = [
  {
    id: "personal",
    name: "Personal",
    browsers: 1,
    price: 20,
    salePrice: 5,
    blurb: "One browser you live in.",
  },
  {
    id: "plus",
    name: "Plus",
    browsers: 3,
    price: 30,
    salePrice: 9,
    blurb: "Work laptop, home desktop, and one more.",
  },
  {
    id: "unlimited",
    name: "Unlimited",
    browsers: null,
    price: 45,
    salePrice: 15,
    blurb: "Every browser, every profile, the whole household.",
  },
];

export const SALE = {
  name: "Black Friday",
  start: new Date("2026-11-27T00:00:00-08:00"),
  end: new Date("2026-12-01T23:59:59-08:00"),
};

export const isSaleActive = (now = new Date()) =>
  now >= SALE.start && now <= SALE.end;

export const priceOf = (tier: Tier, sale: boolean) =>
  sale ? tier.salePrice : tier.price;

export const lowestPrice = (sale: boolean) =>
  Math.min(...TIERS.map((t) => priceOf(t, sale)));

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
