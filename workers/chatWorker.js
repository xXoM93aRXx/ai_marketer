require("dotenv").config({ path: "../.env.local" });

const { Worker } = require("bullmq");
const { OpenAI } = require("openai");
const { redis } = require("../lib/redis");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const worker = new Worker(
  "chatQueue",
  async (job) => {
    console.log(`🟡 [Job ${job.id}] Processing: "${job.data.prompt}"`);

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: job.data.prompt }],
      });

      const result = response.choices[0].message.content;
      console.log(`✅ [Job ${job.id}] Completed: ${result}`);
      return result;
    } catch (err) {
      console.error(`❌ [Job ${job.id}] Failed: ${err.message}`);
      throw new Error(`OpenAI API error: ${err.message}`);
    }
  },
  { connection: redis }
);

// Worker Status Log
worker.on("completed", (job, returnvalue) => {
  console.log(`🎉 [Job ${job.id}] Success: ${returnvalue}`);
});

worker.on("failed", (job, err) => {
  console.error(`❌ [Job ${job?.id}] Error: ${err.message}`);
});

redis.ping().then(() => {
  console.log("🚀 ChatGPT worker is running and connected to Redis.");
}).catch((err) => {
  console.error("❌ Redis connection failed:", err);
});
