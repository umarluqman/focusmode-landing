const LISTING_URL =
  "https://chromewebstore.google.com/detail/ollmdedpknmlcdmpehclmgbogpifahdc?hl=en";

export type CwsStats = {
  ratingValue: number;
  ratingCount: number;
  users: number;
};

function toCount(raw: string, suffix = "") {
  const n = Number(raw.replace(/,/g, ""));
  return Math.round(n * ({ K: 1e3, M: 1e6 }[suffix.toUpperCase()] ?? 1));
}

export function parseCwsStats(html: string): CwsStats | null {
  const rating =
    html.match(/>([\d.]+) out of 5</) ??
    html.match(/Average rating ([\d.]+) out of 5/);
  const count = html.match(/>([\d,.]+)([KkM]?) ratings?</);
  const users = html.match(/>([\d,]+)\+? users</);
  if (!rating || !count || !users) return null;

  const stats = {
    ratingValue: Number(rating[1]),
    ratingCount: toCount(count[1], count[2]),
    users: toCount(users[1]),
  };
  const valid =
    stats.ratingValue > 0 &&
    stats.ratingValue <= 5 &&
    Number.isInteger(stats.ratingCount) &&
    stats.ratingCount > 0 &&
    stats.users > 0;
  return valid ? stats : null;
}

export async function getCwsStats(): Promise<CwsStats | null> {
  try {
    const res = await fetch(LISTING_URL, {
      headers: { "Accept-Language": "en-US,en;q=0.9" },
      next: { revalidate: 86400 },
    });
    if (!res.ok) return null;
    return parseCwsStats(await res.text());
  } catch {
    return null;
  }
}
