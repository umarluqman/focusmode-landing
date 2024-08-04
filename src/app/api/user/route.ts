import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userRef = doc(db, "users", session.user.id);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    return NextResponse.json({ user: userSnap.data() });
  } else {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
}
