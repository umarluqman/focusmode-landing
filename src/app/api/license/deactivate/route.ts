import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { corsJson, corsOptions, ipOf, rateLimited } from "@/lib/http";

export const dynamic = "force-dynamic";

export const OPTIONS = corsOptions;

export async function POST(req: NextRequest) {
  if (rateLimited(`deactivate:${ipOf(req)}`, 30)) {
    return corsJson({ ok: false, error: "rate_limited" }, 429);
  }

  const body = await req.json().catch(() => null);
  const key = body?.license_key;
  const instanceId = body?.instance_id;

  if (typeof key !== "string" || typeof instanceId !== "string") {
    return corsJson({ ok: false, error: "Invalid request" }, 422);
  }

  await prisma.licenseActivation.deleteMany({
    where: { instanceId, licenseKey: { key: key.trim() } },
  });

  return corsJson({ ok: true });
}
