import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
  console.log('Webhook received:', req.url);
  console.log('Headers:', JSON.stringify(Object.fromEntries(req.headers.entries()), null, 2));
  
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig || !webhookSecret) {
    console.error('Missing signature or webhook secret');
    return NextResponse.json(
      { error: "Missing signature or webhook secret" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    console.log('Event constructed successfully:', event.type);
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
  console.log("Received session:", JSON.stringify(session, null, 2));

  let customerId = session.customer as string;

  if (!customerId && session.client_reference_id) {
    // If customer ID is not in the session, try to get it from the user's Stripe customer ID
    const user = await prisma.user.findUnique({
      where: { id: session.client_reference_id },
      select: { stripeCustomerId: true },
    });
    customerId = user?.stripeCustomerId || "";
  }

  if (customerId) {
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
    console.error("Customer ID not found in session or user record");
  }
};
