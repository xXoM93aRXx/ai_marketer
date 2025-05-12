import { db } from "@/db/client";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { chatQueue, chatQueueEvents } from "@/lib/queue";
import { NextResponse } from "next/server";
import dayjs from "dayjs";

export async function POST(req) {
  try {
    const { prompt } = await req.json();
    const apiKey = req.headers.get("x-api-key");

    // ✅ Validate presence of API key and prompt
    if (!apiKey || !prompt) {
      return NextResponse.json({ error: "Missing API key or prompt" }, { status: 400 });
    }

    // ✅ Fetch user and validate API key
    const [user] = await db.select().from(users).where(eq(users.apiKey, apiKey));

    // ✅ User not found or invalid API key
    if (!user) {
      return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
    }

    // ✅ Check if the account is active
    if (!user.isActive) {
      return NextResponse.json({ error: "API key is inactive" }, { status: 403 });
    }

    // ✅ Check subscription validity
    const currentDate = dayjs();
    const subscriptionEnd = user.subscriptionEnd ? dayjs(user.subscriptionEnd) : null;

    if (subscriptionEnd && currentDate.isAfter(subscriptionEnd)) {
      return NextResponse.json({ error: "Subscription has expired. Please renew to continue using the service." }, { status: 403 });
    }

    // ✅ Add the job to the queue if the key and subscription are valid
    const job = await chatQueue.add("chat", { prompt });

    // ✅ Wait for the job to finish using QueueEvents
    const result = await job.waitUntilFinished(chatQueueEvents);

    return NextResponse.json({ response: result });
  } catch (err) {
    console.error(`❌ Job processing failed: ${err.message}`);
    return NextResponse.json({ error: `Job processing failed: ${err.message}` }, { status: 500 });
  }
}
