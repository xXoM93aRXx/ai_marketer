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

    if (!apiKey || !prompt) {
      return NextResponse.json({ error: "Missing API key or prompt" }, { status: 400 });
    }

    // ✅ Fetch user and validate API key
    const [user] = await db.select().from(users).where(eq(users.apiKey, apiKey));

    if (!user) {
      return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
    }

    if (!user.isActive) {
      return NextResponse.json({ error: "API key is inactive" }, { status: 403 });
    }

    // ✅ Check subscription validity
    const currentDate = dayjs();
    const subscriptionEnd = user.subscriptionEnd ? dayjs(user.subscriptionEnd) : null;

    if (subscriptionEnd && currentDate.isAfter(subscriptionEnd)) {
      return NextResponse.json({ error: "Subscription has expired." }, { status: 403 });
    }

    // ✅ Construct the prompt using user preferences
    let enhancedPrompt = prompt;

    if (user.targetAudience) {
      enhancedPrompt += `\nTarget Audience: ${user.targetAudience}.`;
    }

    if (user.goal) {
      enhancedPrompt += `\nGoal: ${user.goal}.`;
    }

    if (user.tone) {
      enhancedPrompt += `\nTone of Voice: ${user.tone}.`;
    }

    if (user.ageGroup) {
      enhancedPrompt += `\nAge Group: ${user.ageGroup}.`;
    }

    console.log(`Enhanced Prompt: ${enhancedPrompt}`);

    // ✅ Add the job to the queue if valid
    const job = await chatQueue.add("chat", { prompt: enhancedPrompt });
    const result = await job.waitUntilFinished(chatQueueEvents);

    const response = NextResponse.json({ response: result });
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, x-api-key");
    return response;
  } catch (err) {
    console.error(`❌ Job processing failed: ${err.message}`);
    return NextResponse.json({ error: `Job processing failed: ${err.message}` }, { status: 500 });
  }
}

export async function OPTIONS() {
  const response = NextResponse.json({}, { status: 200 });
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, x-api-key");
  return response;
}
