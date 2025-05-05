'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PasswordSetupPage({ params }) {
  const router = useRouter();
  const token = params.token;
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch("/api/auth/setup-password", {
      method: "POST",
      body: JSON.stringify({ token, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      router.push("/auth/signin?setup=1");
    } else {
      const text = await res.text();
      setError(text);
    }
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Set Your Password</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br /><br />
        <button type="submit">Submit</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
