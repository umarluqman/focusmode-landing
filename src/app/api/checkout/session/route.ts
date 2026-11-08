import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { issueKey } from "@/lib/license";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session_id");
  if (!sessionId) {
    return NextResponse.json({ error: "Missing session_id" }, { status: 422 });
  }

  let session: Stripe.Checkout.Session;
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId);
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const license = await issueKey(session).catch(() =>
    prisma.licenseKey.findUnique({ where: { stripeSessionId: session.id } })
  );

  if (!license) return NextResponse.json({ pending: true });

  return NextResponse.json({
    email: license.email,
    tier: license.tier ?? "unlimited",
    licenseKey: license.key,
    maxActivations: license.maxActivations,
  });
}
