import { prisma } from "@/lib/prisma";
import { emailKey, newKey } from "@/lib/license";

const send = process.argv.includes("--send");
const INTRO =
  "Thank you for being an early FocusMode Pro supporter! FocusMode v3 is here, and you keep Pro for life. Here's your license key. It works on as many browsers as you like.";
const GRANDFATHER = {
  tier: "unlimited",
  maxActivations: null,
  grandfathered: true,
  stripeSubscriptionId: null,
};

async function main() {
  const users = await prisma.user.findMany({
    where: { isSubscribed: true, email: { not: null } },
  });
  console.log(
    `${users.length} grandfathered users${send ? "" : " (dry run, pass --send to issue and email)"}`
  );

  for (const user of users) {
    const email = user.email!;
    const stripeSessionId = `backfill_${user.id}`;
    try {
      // keys from the old backfill or legacy subscription checkouts stay revocable until upgraded
      const legacy = await prisma.licenseKey.findMany({
        where: {
          email: { equals: email, mode: "insensitive" },
          grandfathered: false,
          OR: [{ stripeSessionId }, { stripeSubscriptionId: { not: null } }],
        },
      });
      const existing =
        (await prisma.licenseKey.findUnique({ where: { stripeSessionId } })) ??
        legacy[0];

      if (!send) {
        console.log(
          `would ${legacy.length ? `upgrade ${legacy.length} key(s) and ` : ""}${existing?.emailedAt ? "skip email for" : existing ? "email" : "issue"} ${email}`
        );
        continue;
      }

      if (legacy.length) {
        await prisma.licenseKey.updateMany({
          where: { id: { in: legacy.map((l) => l.id) } },
          data: GRANDFATHER,
        });
      }
      if (existing?.emailedAt) {
        console.log(`skip ${email}: already emailed`);
        continue;
      }

      const license =
        existing ??
        (await prisma.licenseKey.create({
          data: {
            ...GRANDFATHER,
            key: newKey(),
            email,
            stripeSessionId,
            stripeCustomerId: user.stripeCustomerId,
          },
        }));
      await emailKey({ ...license, ...GRANDFATHER }, INTRO);
      console.log(`issued ${email}`);
      await new Promise((r) => setTimeout(r, 600)); // Resend rate limit
    } catch (e) {
      console.error(`fail ${email}:`, e instanceof Error ? e.message : e);
    }
  }
}

main().finally(() => prisma.$disconnect());
