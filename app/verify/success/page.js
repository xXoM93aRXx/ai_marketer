'use client';

import { useRouter } from 'next/navigation';

export default function VerificationSuccessPage() {
  const router = useRouter();

  return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      <h1>Email Verified ✅</h1>
      <p>Your email has been successfully verified. You can now sign in to your account.</p>
      <br />
      <button
        onClick={() => router.push('/auth/signin')}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
        }}
      >
        Sign In
      </button>
    </div>
  );
}
