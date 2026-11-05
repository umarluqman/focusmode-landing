import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const key = body?.key;

  if (typeof key !== "string") {
    return NextResponse.json(
      { error: "Invalid key" },
      { status: 422, headers: corsHeaders }
    );
  }

  const license = await prisma.licenseKey.findUnique({
    where: { key: key.trim() },
    select: { status: true, expiresAt: true },
  });

  if (!license) {
    return NextResponse.json(
      { error: "Not found" },
      { status: 404, headers: corsHeaders }
    );
  }

  return NextResponse.json(
    {
      status: license.status,
      expires_at: license.expiresAt?.toISOString() ?? null,
    },
    { headers: corsHeaders }
  );
}
