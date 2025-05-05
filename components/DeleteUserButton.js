'use client';

import { useTransition } from 'react';

export default function DeleteUserButton({ userId }) {
  const [isPending, startTransition] = useTransition();

  async function handleDelete() {
    const confirmed = confirm("Are you sure you want to delete this user?");
    if (!confirmed) return;

    const res = await fetch("/api/admin/delete-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });

    if (res.ok) window.location.reload();
  }

  return (
    <button onClick={() => startTransition(handleDelete)} disabled={isPending}>
      {isPending ? "Deleting..." : "Delete"}
    </button>
  );
}
