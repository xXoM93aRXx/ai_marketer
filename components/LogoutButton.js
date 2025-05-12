// components/LogoutButton.js
'use client';

import { signOut } from 'next-auth/react';

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/auth/signin' })}
      className="px-4 py-2 mt-4 text-sm font-semibold text-white bg-gray-700 rounded-lg hover:bg-gray-800 transition duration-200 ease-in-out"
    >
      Log Out
    </button>
  );
}
