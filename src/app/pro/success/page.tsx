import { notFound } from "next/navigation";
import type Stripe from "stripe";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Footer } from "@/components/footer";
import { issueKey } from "@/lib/license";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Thank you",
  robots: { index: false, follow: false },
};

export default async function ProSuccessPage({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) {
  const sessionId = searchParams.session_id;
  if (!sessionId) notFound();

  let session: Stripe.Checkout.Session;
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId);
  } catch {
    notFound();
  }

  const license = await issueKey(session).catch(() =>
    prisma.licenseKey.findUnique({ where: { stripeSessionId: session.id } })
  );

  return (
    <div className="flex min-h-screen flex-col bg-gray-100 dark:bg-gray-950">
      <div className="container mx-auto px-4 py-24 flex-1">
        <Card className="max-w-lg mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">
              {license ? "Welcome to FocusMode PRO" : "Payment pending"}
            </CardTitle>
            <CardDescription>
              {license
                ? license.emailedAt
                  ? `We've also emailed this key to ${license.email}.`
                  : "Copy this key now — we couldn't email it yet."
                : "Your payment is still processing. We'll email your license key once it's confirmed."}
            </CardDescription>
          </CardHeader>
          {license && (
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-zinc-100 dark:bg-zinc-900 p-4 text-center font-mono text-lg font-bold break-all select-all">
                {license.key}
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Open FocusMode → Settings → License, then paste this key to
                activate PRO.
              </p>
            </CardContent>
          )}
        </Card>
      </div>
      <Footer />
    </div>
  );
}
