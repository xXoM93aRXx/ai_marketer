const { Queue } = require("bullmq");
const { redis } = require("./redis");

const chatQueue = new Queue("chatQueue", {
  connection: redis,
});

module.exports = { chatQueue };

