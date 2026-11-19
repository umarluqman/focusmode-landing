import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { issueKey } from "@/lib/license";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig || !webhookSecret) {
    console.error("Missing signature or webhook secret");
    return NextResponse.json(
      { error: "Missing signature or webhook secret" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: unknown) {
    const error = err as Stripe.errors.StripeError;
    console.error(`Webhook Error: ${error.message}`);
    return NextResponse.json(
      { error: `Webhook Error: ${error.message}` },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
      case "checkout.session.async_payment_succeeded":
        await issueKey(event.data.object);
        break;
      case "charge.refunded":
        if (event.data.object.refunded) await revokeCharge(event.data.object);
        break;
      case "charge.dispute.created":
        await revokeCharge(
          await stripe.charges.retrieve(idOf(event.data.object.charge))
        );
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (error) {
    console.error(`Error handling ${event.type} (${event.id}):`, error);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

const idOf = (value: string | { id: string }) =>
  typeof value === "string" ? value : value.id;

const revokeCharge = async (charge: Stripe.Charge) => {
  const sessionIds = charge.payment_intent
    ? (
        await stripe.checkout.sessions.list({
          payment_intent: idOf(charge.payment_intent),
        })
      ).data.map((s) => s.id)
    : [];

  // subscription renewals have no checkout session, fall back to the customer
  const where = sessionIds.length
    ? { stripeSessionId: { in: sessionIds } }
    : charge.customer
      ? { stripeCustomerId: idOf(charge.customer), grandfathered: false }
      : null;
  if (!where) return;

  await prisma.licenseKey.updateMany({ where, data: { status: "revoked" } });
};
