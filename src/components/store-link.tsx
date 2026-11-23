"use client";

import { useEffect, useState } from "react";
import { CHROME_STORE_URL, EDGE_STORE_URL, FIREFOX_STORE_URL, storeUrl } from "@/lib/pricing";

type Store = { name: string; url: string };
type Brands = { brands: { brand: string }[]; mobile: boolean };

const CHROME: Store = { name: "Chrome", url: CHROME_STORE_URL };

const RENAMES: Record<string, string> = { "Microsoft Edge": "Edge", YaBrowser: "Yandex" };

// Chromium forks list their own brand next to "Chromium" and a random "Not A Brand" decoy.
function chromiumBrand() {
  const data = (navigator as Navigator & { userAgentData?: Brands }).userAgentData;
  if (!data || data.mobile) return null;
  const brand = data.brands.find((b) => !/chromium|google chrome|not.a.brand/i.test(b.brand))?.brand;
  return brand ? RENAMES[brand] ?? brand : null;
}

const isArc = () =>
  getComputedStyle(document.documentElement).getPropertyValue("--arc-palette-title") !== "";

function detectStore(): Store {
  if (FIREFOX_STORE_URL && /firefox/i.test(navigator.userAgent)) return { name: "Firefox", url: FIREFOX_STORE_URL };
  const name = chromiumBrand() ?? (isArc() ? "Arc" : "Chrome");
  return { name, url: (name === "Edge" && EDGE_STORE_URL) || CHROME_STORE_URL };
}

export function StoreLink({
  placement,
  suffix = "",
  className,
}: {
  placement: string;
  suffix?: string;
  className?: string;
}) {
  const [store, setStore] = useState(CHROME);

  useEffect(() => {
    setStore(detectStore());
    // Arc injects its CSS variables shortly after load.
    const timer = setTimeout(() => setStore(detectStore()), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <a
      href={storeUrl(placement, store.url)}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      Add to {store.name}
      {suffix}
    </a>
  );
}
