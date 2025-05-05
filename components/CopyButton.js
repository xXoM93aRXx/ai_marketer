'use client';

import { useState } from 'react';

export default function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button onClick={handleCopy} style={{ marginLeft: 10 }}>
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}
