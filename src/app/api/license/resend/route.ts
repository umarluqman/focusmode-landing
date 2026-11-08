import { NextRequest } from "next/server";
import { resendKeys } from "@/lib/license";
import { corsJson, corsOptions, ipOf, rateLimited } from "@/lib/http";

export const dynamic = "force-dynamic";

export const OPTIONS = corsOptions;

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim() : "";

  if (
    email.includes("@") &&
    !rateLimited(`resend:${ipOf(req)}`, 5, 10 * 60_000) &&
    !rateLimited(`resend:${email.toLowerCase()}`, 2, 10 * 60_000)
  ) {
    await resendKeys(email).catch((e) =>
      console.error("Failed to resend license keys:", e)
    );
  }

  return corsJson({ ok: true });
}
