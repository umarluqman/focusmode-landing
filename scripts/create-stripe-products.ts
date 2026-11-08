import { stripe } from "@/lib/stripe";
import { SALE, TIERS, browsersLabel } from "@/lib/pricing";

const apply = process.argv.includes("--apply");

async function main() {
  const env: string[] = [];
  if (!apply) console.log("Dry run, pass --apply to create in Stripe\n");

  for (const t of TIERS) {
    const tier = t.id;
    const amount = t.price * 100;
    const discount = (t.price - t.salePrice) * 100;
    const lookupKey = `focusmode_pro_${tier}`;
    const couponId = `bf2026_${tier}`;
    const metadata = {
      tier,
      max_activations: String(t.browsers ?? "unlimited"),
    };

    const { data } = await stripe.prices.list({ lookup_keys: [lookupKey] });
    let price = data[0];
    if (price) {
      console.log(`price ${lookupKey} exists: ${price.id}`);
    } else if (apply) {
      const product = await stripe.products.create({
        name: `FocusMode Pro ${t.name} (${browsersLabel(t)})`,
        metadata,
      });
      price = await stripe.prices.create({
        product: product.id,
        currency: "usd",
        unit_amount: amount,
        lookup_key: lookupKey,
        metadata,
      });
      console.log(`created ${lookupKey}: ${price.id}`);
    } else {
      console.log(`would create ${lookupKey}: $${amount / 100} ${JSON.stringify(metadata)}`);
    }

    const coupon = await stripe.coupons.retrieve(couponId).catch(() => null);
    if (coupon) {
      console.log(`coupon ${couponId} exists`);
    } else if (apply && price) {
      await stripe.coupons.create({
        id: couponId,
        name: "Black Friday",
        amount_off: discount,
        currency: "usd",
        duration: "once",
        redeem_by: Math.floor(SALE.end.getTime() / 1000),
        applies_to: { products: [price.product as string] },
      });
      console.log(`created coupon ${couponId}`);
    } else {
      console.log(`would create coupon ${couponId}: $${discount / 100} off until ${SALE.end.toISOString()}`);
    }

    env.push(
      `STRIPE_PRICE_${tier.toUpperCase()}=${price?.id ?? "<price id>"}`,
      `STRIPE_SALE_COUPON_${tier.toUpperCase()}=${couponId}`
    );
  }

  console.log(`\nSet on Vercel:\n${env.join("\n")}`);
}

main();
