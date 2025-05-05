import { db } from "@/db/client";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import crypto from "crypto";
import { NextResponse } from "next/server";
const { sendPasswordSetupEmail } = require('@/lib/email');

export async function POST(req) {
  const formData = await req.formData();
  const email = formData.get("email");

  const existing = await db.select().from(users).where(eq(users.email, email));
  if (existing.length) {
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/admin?error=user-exists`);
  }

  const token = crypto.randomBytes(32).toString("hex");

  await db.insert(users).values({
    email,
    apiKey: crypto.randomBytes(32).toString("hex"),
    role: "user",
    isActive: false,
    passwordSetupToken: token,
  });

  await sendPasswordSetupEmail({ to: email, token });

  return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/admin?created=1`);
}
