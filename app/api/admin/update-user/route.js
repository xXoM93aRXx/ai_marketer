import { db } from "@/db/client";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { userId, isActive, subscriptionStart, subscriptionEnd } = await req.json();

    await db
      .update(users)
      .set({
        isActive,
        subscriptionStart: subscriptionStart ? new Date(subscriptionStart) : undefined,
        subscriptionEnd: subscriptionEnd ? new Date(subscriptionEnd) : undefined,
      })
      .where(eq(users.id, userId));

    return NextResponse.json({ message: "User updated successfully" });
  } catch (err) {
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}
