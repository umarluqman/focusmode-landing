import { NextRequest, NextResponse } from "next/server";

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export const corsOptions = () =>
  new NextResponse(null, { status: 204, headers: corsHeaders });

export const corsJson = (body: unknown, status = 200) =>
  NextResponse.json(body, { status, headers: corsHeaders });

// Per-instance memory: on Vercel each warm lambda keeps its own window, good enough to blunt abuse
const hits = new Map<string, { count: number; reset: number }>();

export function rateLimited(key: string, limit: number, windowMs = 60_000) {
  const now = Date.now();
  if (hits.size > 10_000) {
    hits.forEach((hit, k) => hit.reset < now && hits.delete(k));
  }

  const hit = hits.get(key);
  if (!hit || hit.reset < now) {
    hits.set(key, { count: 1, reset: now + windowMs });
    return false;
  }
  return ++hit.count > limit;
}

export const ipOf = (req: NextRequest) =>
  req.ip ?? req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
