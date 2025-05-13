'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 text-gray-800">
      <div className="text-center space-y-8 p-8 bg-white bg-opacity-70 rounded-xl shadow-lg">
        
        {/* Logo */}
        <div className="flex flex-col items-center justify-center">
          <Image src="/logo.png" alt="PostBot Logo" width={120} height={120} className="mb-4" />
          <h1 className="text-5xl font-extrabold text-gray-900">PostBot</h1>
          <p className="text-lg text-gray-600 mt-2">Automate your content creation with AI-powered insights.</p>
        </div>

        {/* Buttons */}
        <div className="flex justify-center space-x-6">
          <button
            onClick={() => router.push('/auth/signup')}
            className="px-8 py-3 bg-blue-600 text-white text-lg font-semibold rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg transition"
          >
            Sign Up
          </button>
          <button
            onClick={() => router.push('/auth/signin')}
            className="px-8 py-3 bg-gray-300 text-gray-800 text-lg font-semibold rounded-full shadow-md hover:bg-gray-400 hover:shadow-lg transition"
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}
