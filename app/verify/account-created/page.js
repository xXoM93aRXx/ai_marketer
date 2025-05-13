// app/auth/verification-success/page.js
'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function VerificationSuccessPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
       <Image src="/logo.png" alt="PostBot Logo" width={120} height={120} className="mb-4" />
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">Account Created ✅</h1>
        <p className="text-gray-700 mb-6">
          Your account has been successfully created. You can now sign in to your account.
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
