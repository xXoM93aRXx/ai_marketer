const { Queue, QueueEvents } = require("bullmq");
const { redis } = require("./redis");

// Create the queue
const chatQueue = new Queue("chatQueue", {
  connection: redis,
});

// Create the queue events
const chatQueueEvents = new QueueEvents("chatQueue", {
  connection: redis,
});

module.exports = { chatQueue, chatQueueEvents };
