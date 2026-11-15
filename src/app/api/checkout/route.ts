import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { isTier, saleCoupon, tierPriceId } from "@/lib/license";
import { isSaleActive } from "@/lib/pricing";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_WEBSITE_URL ?? "https://focusmode.app";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const tier = body?.tier;
  const price = isTier(tier) ? tierPriceId(tier) : undefined;

  if (!isTier(tier) || !price) {
    return NextResponse.json({ error: "Invalid tier" }, { status: 422 });
  }

  const coupon = isSaleActive() ? saleCoupon() : undefined;
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{ price, quantity: 1 }],
    customer_creation: "always",
    metadata: { tier },
    ...(coupon
      ? { discounts: [{ coupon }] }
      : { allow_promotion_codes: true }),
    success_url: `${SITE_URL}/pro/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${SITE_URL}/pro`,
  });

  return NextResponse.json({ url: session.url });
}
