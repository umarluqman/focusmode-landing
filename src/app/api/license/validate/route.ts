import { NextRequest } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { corsJson, corsOptions, ipOf, rateLimited } from "@/lib/http";

export const dynamic = "force-dynamic";

export const OPTIONS = corsOptions;

const optionalString = (value: unknown, max: number) =>
  typeof value === "string" && value.trim() ? value.trim().slice(0, max) : null;

export async function POST(req: NextRequest) {
  if (rateLimited(`validate:${ipOf(req)}`, 30)) {
    return corsJson({ valid: false, error: "rate_limited" }, 429);
  }

  const body = await req.json().catch(() => null);
  // `key` is what v3 builds before seat limits send
  const key = body?.license_key ?? body?.key;

  if (typeof key !== "string") {
    return corsJson({ valid: false, error: "Invalid key" }, 422);
  }

  const license = await prisma.licenseKey.findUnique({
    where: { key: key.trim() },
    select: {
      id: true,
      status: true,
      expiresAt: true,
      tier: true,
      maxActivations: true,
      grandfathered: true,
    },
  });

  if (!license) {
    return corsJson({ valid: false, error: "Not found" }, 404);
  }

  const instanceId = optionalString(body.instance_id, 200);
  let valid =
    license.status === "granted" &&
    (!license.expiresAt || license.expiresAt > new Date());
  let error: string | undefined;

  if (valid && instanceId) {
    const seat = { licenseKeyId: license.id, instanceId };
    const updated = await prisma.licenseActivation.updateMany({
      where: seat,
      data: { lastSeenAt: new Date() },
    });
    if (!updated.count) {
      const used = await prisma.licenseActivation.count({
        where: { licenseKeyId: license.id },
      });
      if (license.maxActivations !== null && used >= license.maxActivations) {
        valid = false;
        error = "seat_limit";
      } else {
        await prisma.licenseActivation
          .create({ data: { ...seat, label: optionalString(body.label, 100) } })
          .catch((e) => {
            const raced =
              e instanceof Prisma.PrismaClientKnownRequestError &&
              e.code === "P2002";
            if (!raced) throw e;
          });
      }
    }
  } else if (!valid) {
    error =
      license.status === "granted"
        ? "License key expired"
        : `License key is ${license.status}`;
  }

  const activations = await prisma.licenseActivation.count({
    where: { licenseKeyId: license.id },
  });

  return corsJson({
    valid,
    ...(error && { error }),
    status: license.status,
    expires_at: license.expiresAt?.toISOString() ?? null,
    tier: license.tier ?? "unlimited",
    maxActivations: license.maxActivations,
    activations,
    grandfathered: license.grandfathered,
  });
}
