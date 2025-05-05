const { Redis } = require("ioredis");

const redis = new Redis(process.env.REDIS_URL, {
  maxRetriesPerRequest: null,     // ✅ Required by BullMQ
  enableReadyCheck: false         // ✅ Optional, recommended by BullMQ
});

module.exports = { redis };