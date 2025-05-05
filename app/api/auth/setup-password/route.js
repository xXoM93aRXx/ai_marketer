import { db } from "@/db/client";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { token, password } = await req.json();

  const found = await db.select().from(users).where(eq(users.passwordSetupToken, token));
  if (!found.length) {
    return new Response("Invalid or expired link", { status: 400 });
  }

  const hash = await bcrypt.hash(password, 10);

  await db.update(users)
    .set({ password: hash, isActive: true, passwordSetupToken: null })
    .where(eq(users.id, found[0].id));

  return new Response("Password set", { status: 200 });
}
