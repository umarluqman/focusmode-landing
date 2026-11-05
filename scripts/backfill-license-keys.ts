import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { emailKey, newKey } from "@/lib/license";

const send = process.argv.includes("--send");
const INTRO =
  "Thank you for being an early FocusMode PRO supporter! FocusMode v3 is here and your PRO stays active automatically. As a thank-you, here's a license key you can use to unlock PRO on your other browsers and devices — no limit.";
const ACTIVE = ["active", "trialing", "past_due"];

async function activeSubscriptionId(customerId: string | null) {
  if (!customerId) return { eligible: true, id: null };
  const subs = await stripe.subscriptions.list({
    customer: customerId,
    status: "all",
    limit: 100,
  });
  if (!subs.data.length) return { eligible: true, id: null }; // one-time purchase
  const active = subs.data.find((s) => ACTIVE.includes(s.status));
  return { eligible: !!active, id: active?.id ?? null };
}

async function main() {
  const users = await prisma.user.findMany({
    where: { isSubscribed: true, email: { not: null } },
  });
  console.log(`${users.length} subscribed users${send ? "" : " (dry run, pass --send to issue)"}`);

  for (const user of users) {
    const email = user.email!;
    try {
      const existing = await prisma.licenseKey.findFirst({
        where: {
          OR: [
            { email },
            ...(user.stripeCustomerId ? [{ stripeCustomerId: user.stripeCustomerId }] : []),
          ],
          status: "granted",
          emailedAt: { not: null },
        },
      });
      if (existing) {
        console.log(`skip ${email}: already has key`);
        continue;
      }

      const sub = await activeSubscriptionId(user.stripeCustomerId);
      if (!sub.eligible) {
        console.log(`skip ${email}: subscription ended`);
        continue;
      }
      if (!send) {
        console.log(`would issue ${email} (${sub.id ?? "no subscription"})`);
        continue;
      }

      const stripeSessionId = `backfill_${user.id}`;
      const license = await prisma.licenseKey.upsert({
        where: { stripeSessionId },
        update: {},
        create: {
          key: newKey(),
          email,
          stripeSessionId,
          stripeCustomerId: user.stripeCustomerId,
          stripeSubscriptionId: sub.id,
        },
      });
      await emailKey(license, INTRO);
      console.log(`issued ${email}`);
      await new Promise((r) => setTimeout(r, 600)); // Resend rate limit
    } catch (e) {
      console.error(`fail ${email}:`, e instanceof Error ? e.message : e);
    }
  }
}

main().finally(() => prisma.$disconnect());
