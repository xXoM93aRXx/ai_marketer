const apiKey = "ebf8336be4ce236aa189dfae7c499dc64e5d913c5ce791793c771dbd09715960";

async function testAuthorization() {
  try {
    const res = await fetch("http://localhost:3000/api/auth/authorize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ apiKey })
    });

    if (!res.ok) {
      const text = await res.text();
      console.error(`❌ ${res.status} Error: ${text}`);
      return;
    }

    const data = await res.json();
    console.log("✅ Authorized:", data);
  } catch (err) {
    console.error("❌ Request failed:", err);
  }
}

testAuthorization();
