import { db } from "@/db/client";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { apiKey } = await req.json();

    if (!apiKey) {
      return NextResponse.json({ error: "API key is required" }, { status: 400 });
    }

    // Validate the API key
    const [user] = await db.select().from(users).where(eq(users.apiKey, apiKey));

    if (!user) {
      return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
    }

    if (!user.isActive) {
      return NextResponse.json({ error: "API key is inactive" }, { status: 403 });
    }

    return NextResponse.json({ message: "Connection authorized", user: user.email });
  } catch (err) {
    console.error("Authorization Error:", err.message);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
