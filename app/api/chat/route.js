import { db } from "@/db/client";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { chatQueue } from "@/lib/queue";

export async function POST(req) {
  const { prompt } = await req.json();
  const apiKey = req.headers.get("x-api-key");

  if (!apiKey || !prompt) {
    return new Response("Missing API key or prompt", { status: 400 });
  }

  const [user] = await db.select().from(users).where(eq(users.apiKey, apiKey));
  if (!user || !user.isActive) {
    return new Response("Invalid or inactive API key", { status: 401 });
  }

  // Add job to the queue
  const job = await chatQueue.add("chat", { prompt });

  // Wait for job completion (or use webhook/polling instead)
  const result = await job.waitUntilFinished();

  return Response.json({ response: result });
}
