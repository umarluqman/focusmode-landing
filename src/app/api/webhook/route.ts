import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

// Add OPTIONS method to handle preflight requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Allow': 'POST',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type, stripe-signature',
    },
  });
}

export async function POST(req: NextRequest) {
  // Immediate logging
  console.log('==== WEBHOOK DEBUG START ====');
  console.log('Request received at:', new Date().toISOString());
  console.log('Request URL:', req.url);
  console.log('Request method:', req.method);
  
  try {
    // Log all headers
    const headers = Object.fromEntries(req.headers.entries());
    console.log('Request headers:', JSON.stringify(headers, null, 2));
    
    // Get the raw body
    const body = await req.text();
    console.log('Request body length:', body.length);
    
    const sig = req.headers.get("stripe-signature");
    console.log('Stripe signature present:', !!sig);
    console.log('Webhook secret present:', !!webhookSecret);

    if (!sig || !webhookSecret) {
      console.error('Missing signature or webhook secret');
      return NextResponse.json(
        { error: "Missing signature or webhook secret" },
        { status: 400 }
      );
    }

    // For now, return early to test if we're hitting this endpoint
    return NextResponse.json({ debug: true, message: 'Webhook endpoint hit successfully' });

    // Comment out the rest of the code for now
    /*
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

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ received: true });
    */
  } catch (error) {
    console.error('Unexpected error in webhook handler:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    console.log('==== WEBHOOK DEBUG END ====');
  }
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
