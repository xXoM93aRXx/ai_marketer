require("dotenv").config({ path: "../.env.local" });

const { Worker } = require("bullmq");
const { OpenAI } = require("openai");
const { redis } = require("../lib/redis");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const worker = new Worker(
  "chatQueue",
  async (job) => {
    console.log(`🟡 [Job ${job.id}] Started: "${job.data.prompt}"`);

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: job.data.prompt }],
    });

    const reply = response.choices[0].message.content;
    console.log(`✅ [Job ${job.id}] Completed`);
    return reply;
  },
  {
    connection: redis,
  }
);

// ✅ Log success
worker.on("completed", (job) => {
  console.log(`🎉 [Job ${job.id}] Result sent`);
});

// ❌ Log failure
worker.on("failed", (job, err) => {
  console.error(`❌ [Job ${job?.id}] Failed:`, err);
});

redis.ping().then(() => {
  console.log("🚀 ChatGPT worker is running and connected to Redis.");
}).catch((err) => {
  console.error("❌ Redis connection failed:", err);
});
