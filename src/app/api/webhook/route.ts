import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig || !webhookSecret) {
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

  switch (event.type) {
    case "customer.subscription.created":
    case "customer.subscription.updated":
      const subscription = event.data.object as Stripe.Subscription;
      await handleSubscriptionChange(subscription, true);
      break;
    case "customer.subscription.deleted":
      const deletedSubscription = event.data.object as Stripe.Subscription;
      await handleSubscriptionChange(deletedSubscription, false);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

const handleSubscriptionChange = async (
  subscription: Stripe.Subscription,
  isSubscribed: boolean
) => {
  const customerId = subscription.customer as string;

  try {
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

    await prisma.user.update({
      where: { email: email },
      data: {
        isSubscribed: isSubscribed,
        stripeCustomerId: customerId,
      },
    });

    console.log(`Subscription updated for user ${email}`);
  } catch (error) {
    console.error("Error updating user subscription:", error);
  }
};
