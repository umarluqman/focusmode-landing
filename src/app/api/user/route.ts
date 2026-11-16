import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { decode } from "next-auth/jwt";
import { prisma } from "@/lib/prisma";
import { authOptions } from "../auth/[...nextauth]/route";

export { PATCH as PATCH } from "./free-trial";

export async function GET(req: NextRequest) {
  let userId: string | null = null;

  // Try cookie-based auth first (for web app)
  const session = await getServerSession(authOptions);
  if (session?.user?.id) {
    userId = session.user.id;
  }

  // Fallback to Bearer token auth (for Chrome extension)
  if (!userId) {
    const authHeader = req.headers.get("authorization");
    if (authHeader?.startsWith("Bearer ")) {
      const token = authHeader.slice(7);
      try {
        const decoded = await decode({
          token,
          secret: process.env.NEXTAUTH_SECRET!,
        });

        if (decoded?.id) {
          userId = decoded.id as string;
        }
      } catch (error) {
        console.error("JWT decode failed:", error);
        return NextResponse.json({ error: "Invalid token" }, { status: 401 });
      }
    }
  }

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        stripeCustomerId: true,
        isSubscribed: true,
        hasUsedFreeTrial: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json(
      { user },
      {
        status: 200,
        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate, proxy-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
