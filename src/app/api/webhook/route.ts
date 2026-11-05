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
        await handleSuccessfulCheckout(event.data.object);
        break;
      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(event.data.object);
        break;
      case "charge.refunded":
        await handleRefund(event.data.object);
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

const handleSuccessfulCheckout = async (session: Stripe.Checkout.Session) => {
  let customerId = session.customer as string;

  if (!customerId && session.client_reference_id) {
    const user = await prisma.user.findUnique({
      where: { id: session.client_reference_id },
      select: { stripeCustomerId: true },
    });
    customerId = user?.stripeCustomerId || "";
  }

  if (!customerId) {
    console.error("Customer ID not found in session or user record");
    return;
  }

  const customer = await stripe.customers.retrieve(customerId);
  if ("deleted" in customer) {
    console.error("Customer has been deleted");
    return;
  }
  const email = customer.email;
  if (!email) {
    console.error("Customer email not found");
    return;
  }

  await prisma.user.updateMany({
    where: { email },
    data: { isSubscribed: true, stripeCustomerId: customerId },
  });
};

const handleSubscriptionDeleted = async (subscription: Stripe.Subscription) => {
  await prisma.licenseKey.updateMany({
    where: { stripeSubscriptionId: subscription.id },
    data: { status: "revoked" },
  });

  const customerId =
    typeof subscription.customer === "string"
      ? subscription.customer
      : subscription.customer.id;
  await prisma.user.updateMany({
    where: { stripeCustomerId: customerId },
    data: { isSubscribed: false },
  });
};

const handleRefund = async (charge: Stripe.Charge) => {
  if (!charge.refunded || !charge.payment_intent) return;

  const paymentIntent =
    typeof charge.payment_intent === "string"
      ? charge.payment_intent
      : charge.payment_intent.id;
  const sessions = await stripe.checkout.sessions.list({
    payment_intent: paymentIntent,
  });

  await prisma.licenseKey.updateMany({
    where: { stripeSessionId: { in: sessions.data.map((s) => s.id) } },
    data: { status: "revoked" },
  });
};
