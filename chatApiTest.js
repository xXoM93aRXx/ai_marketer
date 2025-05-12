const apiKey = "ebf8336be4ce236aa189dfae7c499dc64e5d913c5ce791793c771dbd09715960";
const prompt = "Create a linkedIn post about";

async function testChatApi() {
  try {
    const res = await fetch("http://localhost:3000/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({ prompt }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error(`❌ ${res.status} Error: ${text}`);
      return;
    }

    const data = await res.json();
    console.log("✅ Success:", data.response);
  } catch (err) {
    console.error("❌ Request failed:", err);
  }
}

testChatApi();
