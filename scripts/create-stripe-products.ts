import { stripe } from "@/lib/stripe";
import { SALE, TIERS, browsersLabel } from "@/lib/pricing";

const apply = process.argv.includes("--apply");

async function main() {
  const env: string[] = [];
  const productIds: string[] = [];
  if (!apply) console.log("Dry run, pass --apply to create in Stripe\n");

  for (const t of TIERS) {
    const tier = t.id;
    const amount = t.price * 100;
    const lookupKey = `focusmode_pro_${tier}`;
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

    if (price) productIds.push(price.product as string);

    env.push(`STRIPE_PRICE_${tier.toUpperCase()}=${price?.id ?? "<price id>"}`);
  }

  const coupon = await stripe.coupons.retrieve(SALE.code).catch(() => null);
  if (coupon) {
    console.log(`coupon ${SALE.code} exists`);
  } else if (apply && productIds.length === TIERS.length) {
    await stripe.coupons.create({
      id: SALE.code,
      name: `${SALE.name} ${SALE.percentOff}% off`,
      percent_off: SALE.percentOff,
      duration: "once",
      redeem_by: Math.floor(SALE.end.getTime() / 1000),
      applies_to: { products: productIds },
    });
    console.log(`created coupon ${SALE.code}`);
  } else {
    console.log(`would create coupon ${SALE.code}: ${SALE.percentOff}% off until ${SALE.end.toISOString()}`);
  }

  const { data: codes } = await stripe.promotionCodes.list({ code: SALE.code });
  if (codes.length) {
    console.log(`promo code ${SALE.code} exists`);
  } else if (apply) {
    await stripe.promotionCodes.create({
      coupon: SALE.code,
      code: SALE.code,
      expires_at: Math.floor(SALE.end.getTime() / 1000),
    });
    console.log(`created promo code ${SALE.code}`);
  } else {
    console.log(`would create promo code ${SALE.code}`);
  }

  console.log(`\nSet on Amplify:\n${env.join("\n")}`);
}

main();
