// app/verify/notification/page.js
'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function VerificationNotificationPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Image src="/logo.png" alt="PostBot Logo" width={120} height={120} className="mb-4" />
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-blue-600 mb-4">Verification Email Sent 📧</h1>
        <p className="text-gray-700 mb-6">
          A verification email has been sent to your inbox. Please check your email and follow the link to verify your account.
        </p>
        <button
          onClick={() => router.push('/auth/signin')}
          className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Back to Sign In
        </button>
      </div>
    </div>
  );
}
