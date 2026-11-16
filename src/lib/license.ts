import { randomBytes } from "crypto";
import { Prisma, type LicenseKey } from "@prisma/client";
import type Stripe from "stripe";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { FIREFOX_LIVE, TIERS, type TierId } from "@/lib/pricing";

export const isTier = (value: unknown): value is TierId =>
  TIERS.some((t) => t.id === value);

const tierOf = (id: TierId) => TIERS.find((t) => t.id === id)!;

export const tierPriceId = (tier: TierId) =>
  process.env[`STRIPE_PRICE_${tier.toUpperCase()}`];

const SITE_URL = process.env.NEXT_PUBLIC_WEBSITE_URL ?? "https://focusmode.app";

export const newKey = () =>
  "FM-" +
  randomBytes(16)
    .toString("hex")
    .toUpperCase()
    .match(/.{8}/g)!
    .join("-");

const idOf = (value: string | { id: string } | null) =>
  typeof value === "string" ? value : value?.id ?? null;

async function sessionTier(sessionId: string) {
  const { data } = await stripe.checkout.sessions.listLineItems(sessionId);
  const price = data[0]?.price;
  const tier =
    TIERS.find((t) => tierPriceId(t.id) === price?.id)?.id ??
    price?.metadata.tier;
  if (isTier(tier)) return tier;

  console.warn(`Unknown tier for session ${sessionId}, issuing unlimited`);
  return null;
}

export async function issueKey(session: Stripe.Checkout.Session) {
  if (
    session.payment_status !== "paid" &&
    session.payment_status !== "no_payment_required"
  ) {
    return null;
  }

  const where = { stripeSessionId: session.id };
  const intro = "Thanks for buying FocusMode Pro!";
  const existing = await prisma.licenseKey.findUnique({ where });
  if (existing) return emailKey(existing, intro);

  const email = session.customer_details?.email;
  if (!email) throw new Error(`No email on checkout session ${session.id}`);

  const tier = await sessionTier(session.id);
  const license = await prisma.licenseKey
    .create({
      data: {
        key: newKey(),
        email,
        tier,
        maxActivations: tier && tierOf(tier).browsers,
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

  return emailKey(license, intro);
}

export async function emailKey(license: LicenseKey, intro: string) {
  if (license.emailedAt) return license;

  await sendEmail(license.email, renderKeysEmail(intro, [license]), {
    idempotencyKey: `license-${license.id}`,
  });

  return prisma.licenseKey.update({
    where: { id: license.id },
    data: { emailedAt: new Date() },
  });
}

export async function resendKeys(email: string) {
  const licenses = await prisma.licenseKey.findMany({
    where: { email: { equals: email, mode: "insensitive" }, status: "granted" },
    orderBy: { createdAt: "asc" },
  });
  if (!licenses.length) return;

  await sendEmail(
    licenses[0].email,
    renderKeysEmail("Here are your FocusMode Pro license keys.", licenses)
  );
}

async function sendEmail(
  to: string,
  { subject, text, html }: { subject: string; text: string; html: string },
  options?: { idempotencyKey: string }
) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send(
    { from: process.env.RESEND_FROM_EMAIL!, to, subject, text, html },
    options
  );
  if (error) throw new Error(`Failed to send email: ${error.message}`);
}

const browsersOf = (license: LicenseKey) =>
  license.maxActivations === null
    ? "Unlimited browsers"
    : `${license.maxActivations} browser${license.maxActivations === 1 ? "" : "s"}`;

const tierNameOf = (license: LicenseKey) =>
  license.grandfathered
    ? "Lifetime (v2 supporter)"
    : isTier(license.tier)
      ? tierOf(license.tier).name
      : "Unlimited";

const STEPS = [
  "Open the FocusMode extension.",
  "Go to Settings → License.",
  "Paste your key and press Activate.",
];

const V3_NOTE =
  "Keys need FocusMode 3.0 or later. Chrome updates automatically; check your version at chrome://extensions.";
const GRANDFATHER_NOTE =
  `Already on 3.0? You're Pro already, nothing to do. Use this key on a new browser, Edge${FIREFOX_LIVE ? " or Firefox" : ""}.`;

function renderKeysEmail(intro: string, licenses: LicenseKey[]) {
  const resendUrl = `${SITE_URL}/license/`;
  const grandfathered = licenses.every((l) => l.grandfathered);
  const subject = grandfathered
    ? "You're FocusMode Pro for life — here's your key"
    : licenses.length > 1
      ? "Your FocusMode Pro license keys"
      : "Your FocusMode Pro license key";
  const notes = grandfathered ? [GRANDFATHER_NOTE, V3_NOTE] : [V3_NOTE];

  const text = [
    intro,
    ...licenses.map(
      (l) => `\n${tierNameOf(l)} (${browsersOf(l)}): ${l.key}`
    ),
    "\nTo activate:",
    ...STEPS.map((s, i) => `${i + 1}. ${s}`),
    ...notes.map((n) => `\n${n}`),
    `\nLost this email? Get your keys again at ${resendUrl}`,
  ].join("\n");

  const keysHtml = licenses
    .map(
      (l) => `
      <div style="margin:16px 0;padding:16px;border-radius:12px;background:#f2f6f8;border-left:4px solid #ff7c43">
        <div style="font-size:13px;color:#4a6572">${tierNameOf(l)} · ${browsersOf(l)}</div>
        <div style="margin-top:6px;font-family:ui-monospace,Menlo,monospace;font-size:17px;font-weight:700;color:#003f5c;word-break:break-all">${l.key}</div>
      </div>`
    )
    .join("");

  const html = `<!doctype html>
<html>
  <body style="margin:0;padding:24px;background:#eef2f4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#1c2b33">
    <div style="max-width:520px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden">
      <div style="padding:20px 24px;background:#003f5c;color:#ffffff;font-size:20px;font-weight:700">
        FocusMode <span style="color:#ff7c43">Pro</span>
      </div>
      <div style="padding:24px">
        <p style="margin:0 0 8px;font-size:16px">${intro}</p>
        ${keysHtml}
        <p style="margin:20px 0 8px;font-weight:600">To activate</p>
        <ol style="margin:0;padding-left:20px;line-height:1.7">
          ${STEPS.map((s) => `<li>${s}</li>`).join("")}
        </ol>
        ${notes.map((n) => `<p style="margin:16px 0 0;font-size:14px;color:#1c2b33">${n}</p>`).join("")}
        <p style="margin:24px 0 0;font-size:13px;color:#4a6572">
          Lost this email? <a href="${resendUrl}" style="color:#003f5c">Get your keys again</a>.
        </p>
      </div>
    </div>
  </body>
</html>`;

  return { subject, text, html };
}
