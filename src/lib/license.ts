import { randomBytes } from "crypto";
import { Prisma, type LicenseKey } from "@prisma/client";
import type Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

export const newKey = () =>
  "FM-" +
  randomBytes(16)
    .toString("hex")
    .toUpperCase()
    .match(/.{8}/g)!
    .join("-");

const idOf = (value: string | { id: string } | null) =>
  typeof value === "string" ? value : value?.id ?? null;

export async function issueKey(session: Stripe.Checkout.Session) {
  if (
    session.payment_status !== "paid" &&
    session.payment_status !== "no_payment_required"
  ) {
    return null;
  }

  const email = session.customer_details?.email;
  if (!email) throw new Error(`No email on checkout session ${session.id}`);

  const where = { stripeSessionId: session.id };
  const license = await prisma.licenseKey
    .upsert({
      where,
      update: {},
      create: {
        key: newKey(),
        email,
        stripeSessionId: session.id,
        stripeCustomerId: idOf(session.customer),
        stripeSubscriptionId: idOf(session.subscription),
      },
    })
    // webhook and success page can race on the same session
    .catch((e) => {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === "P2002"
      ) {
        return prisma.licenseKey.findUniqueOrThrow({ where });
      }
      throw e;
    });

  return emailKey(license, "Thanks for purchasing FocusMode PRO!");
}

export async function emailKey(license: LicenseKey, intro: string) {
  if (license.emailedAt) return license;

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send(
    {
      from: process.env.RESEND_FROM_EMAIL!,
      to: license.email,
      subject: "Your FocusMode PRO license key",
      text: `${intro}\n\nYour license key: ${license.key}\n\nTo activate, open FocusMode → Settings → License and paste the key.`,
      html: `<p>${intro}</p><p>Your license key:</p><p style="font-family:monospace;font-size:18px;font-weight:bold">${license.key}</p><p>To activate, open FocusMode → Settings → License and paste the key.</p>`,
    },
    { idempotencyKey: `license-${license.id}` }
  );
  if (error) throw new Error(`Failed to email license key: ${error.message}`);

  return prisma.licenseKey.update({
    where: { id: license.id },
    data: { emailedAt: new Date() },
  });
}
