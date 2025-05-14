import { db } from '@/db/client';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET(req, context) {
   const { token } = await context.params; // ✅ access token like this

  if (!token) {
    return NextResponse.json({ error: "Missing token" }, { status: 400 });
  }

  const found = await db.select().from(users).where(eq(users.verificationToken, token));
  if (!found.length) {
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
  }

  await db.update(users)
    .set({ isActive: true, verificationToken: null })
    .where(eq(users.id, found[0].id));

    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/verify/success`);
}
