"use client";

import { useEffect, useState } from "react";
import { CHROME_STORE_URL, FIREFOX_STORE_URL, storeUrl } from "@/lib/pricing";

export function StoreLink({
  placement,
  suffix = "",
  className,
}: {
  placement: string;
  suffix?: string;
  className?: string;
}) {
  const [firefoxUrl, setFirefoxUrl] = useState<string | null>(null);

  useEffect(() => {
    if (FIREFOX_STORE_URL && /firefox/i.test(navigator.userAgent)) {
      setFirefoxUrl(FIREFOX_STORE_URL);
    }
  }, []);

  return (
    <a
      href={storeUrl(placement, firefoxUrl ?? CHROME_STORE_URL)}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      Add to {firefoxUrl ? "Firefox" : "Chrome"}
      {suffix}
    </a>
  );
}
