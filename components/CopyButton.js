// components/CopyButton.js
'use client';

import { useState } from 'react';

export default function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  }

  return (
    <button
      onClick={handleCopy}
      className={`ml-2 px-4 py-1 text-sm font-semibold rounded-lg 
        ${copied ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'}
        hover:bg-blue-600 transition duration-200 ease-in-out`}
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}
