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
    case "checkout.session.completed":
      const session = event.data.object as Stripe.Checkout.Session;
      await handleSuccessfulCheckout(session);
      break;

    // ... you can add more event types as needed ...
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

const handleSuccessfulCheckout = async (session: Stripe.Checkout.Session) => {
  if (session.customer && typeof session.customer === "string") {
    const customerId = session.customer;

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
          isSubscribed: true,
          stripeCustomerId: customerId,
        },
      });

      console.log(`Subscription activated for user ${email}`);
    } catch (error) {
      console.error("Error updating user subscription status:", error);
    }
  } else {
    console.error("Invalid customer ID in session");
  }
};
