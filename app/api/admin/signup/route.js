export const runtime = 'nodejs';

import { db } from '@/db/client';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

function generateApiKey() {
  return crypto.randomBytes(32).toString('hex');
}

export async function POST(req) {
  const { email, password, token } = await req.json();

  if (token !== process.env.ADMIN_SIGNUP_TOKEN) {
    return new Response("Unauthorized access", { status: 401 });
  }

  const exists = await db.select().from(users).where(eq(users.email, email));
  if (exists.length > 0) {
    return new Response("User already exists", { status: 409 });
  }

  const hash = await bcrypt.hash(password, 10);
  const apiKey = generateApiKey();
  

  await db.insert(users).values({
    email,
    password: hash,
    apiKey,
    role: 'admin',         // ✅ make this user an admin
    isActive: true,        // optionally activate
  });

  return new Response("Admin account created", { status: 201 });
}
