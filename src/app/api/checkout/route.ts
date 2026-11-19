import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { isTier, tierPriceId } from "@/lib/license";
import { SALE, isSaleActive } from "@/lib/pricing";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_WEBSITE_URL ?? "https://focusmode.app";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const tier = body?.tier;
  const source = typeof body?.source === "string" ? body.source.slice(0, 100) : "unknown";
  const price = isTier(tier) ? tierPriceId(tier) : undefined;

  if (!isTier(tier) || !price) {
    return NextResponse.json({ error: "Invalid tier" }, { status: 422 });
  }

  const salePromo = isSaleActive()
    ? (await stripe.promotionCodes.list({ code: SALE.code, active: true, limit: 1 })).data[0]
    : undefined;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{ price, quantity: 1 }],
    customer_creation: "always",
    metadata: { tier, source },
    ...(salePromo
      ? { discounts: [{ promotion_code: salePromo.id }] }
      : { allow_promotion_codes: true }),
    success_url: `${SITE_URL}/pro/success/?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${SITE_URL}/pricing/`,
  });

  return NextResponse.json({ url: session.url });
}
