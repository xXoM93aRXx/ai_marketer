'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminSignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '', token: '' });
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch('/api/admin/signup', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      router.push('/auth/signin');
    } else {
      const text = await res.text();
      setError(text);
    }
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Create Admin Account</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          required
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        /><br /><br />
        <input
          type="password"
          placeholder="Password"
          required
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
        /><br /><br />
        <input
          type="text"
          placeholder="Admin Access Token"
          required
          value={form.token}
          onChange={e => setForm({ ...form, token: e.target.value })}
        /><br /><br />
        <button type="submit">Create Admin</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}
