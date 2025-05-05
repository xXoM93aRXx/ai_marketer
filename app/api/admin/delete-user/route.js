export const runtime = 'nodejs';

import { db } from '@/db/client';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(req) {
  const { userId } = await req.json();

  if (!userId) {
    return new Response("Missing userId", { status: 400 });
  }

  await db.delete(users).where(eq(users.id, userId));
  return new Response("User deleted", { status: 200 });
}
