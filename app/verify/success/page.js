// app/auth/verification-success/page.js
'use client';

import { useRouter } from 'next/navigation';

export default function VerificationSuccessPage() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">Email Verified ✅</h1>
        <p className="text-gray-700 mb-6">
          Your email has been successfully verified. You can now sign in to your account.
        </p>
        <button
          onClick={() => router.push('/auth/signin')}
          className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
