// app/api/auth/signup/route.js

import { db } from "@/db/client";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import dayjs from "dayjs";
const { sendConfirmationEmail } = require('@/lib/email');

function generateApiKey() {
  return crypto.randomBytes(32).toString("hex");
}

export async function POST(req) {
  const { email, name, password } = await req.json();

  const existing = await db.select().from(users).where(eq(users.email, email));
  if (existing.length) {
    return new Response("User already exists", { status: 409 });
  }

  const subscriptionEnd = dayjs().add(14, 'day').toDate();

  const hashedPassword = await bcrypt.hash(password, 10);
  const apiKey = generateApiKey();
  const token = crypto.randomBytes(32).toString("hex");

  await db.insert(users).values({
    name,
    email,
    password: hashedPassword,
    apiKey,
    isActive: false,
    verificationToken: token,
    subscriptionEnd
  });

  await sendConfirmationEmail({
    to: email,
    name: '',
    token,
  });

  return new Response("User created", { status: 201 });
}
