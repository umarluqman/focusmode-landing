"use client";

import { useEffect, useState } from "react";
import { CHROME_STORE_URL, EDGE_STORE_URL, FIREFOX_STORE_URL, storeUrl } from "@/lib/pricing";

type Store = { name: string; url: string };

const CHROME: Store = { name: "Chrome", url: CHROME_STORE_URL };

function detectStore(ua: string): Store {
  if (FIREFOX_STORE_URL && /firefox/i.test(ua)) return { name: "Firefox", url: FIREFOX_STORE_URL };
  if (EDGE_STORE_URL && /edg\//i.test(ua)) return { name: "Edge", url: EDGE_STORE_URL };
  return CHROME;
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
    setStore(detectStore(navigator.userAgent));
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
