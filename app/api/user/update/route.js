import { db } from "@/db/client";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { targetAudience, goal, tone, ageGroup } = await req.json();
    const apiKey = req.headers.get("x-api-key");

    if (!apiKey) {
      return NextResponse.json({ error: "Missing API key" }, { status: 400 });
    }

    const [user] = await db.select().from(users).where(eq(users.apiKey, apiKey));
    if (!user) {
      return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
    }

    await db
      .update(users)
      .set({ targetAudience, goal, tone, ageGroup })
      .where(eq(users.apiKey, apiKey));

    return NextResponse.json({ message: "User info updated successfully!" });
  } catch (err) {
    console.error(`❌ Error: ${err.message}`);
    return NextResponse.json({ error: `Server error: ${err.message}` }, { status: 500 });
  }
}
