// components/DeleteUserButton.js
'use client';

import { useTransition } from 'react';

export default function DeleteUserButton({ userId }) {
  const [isPending, startTransition] = useTransition();

  async function handleDelete() {
    const confirmed = confirm("Are you sure you want to delete this user?");
    if (!confirmed) return;

    try {
      const res = await fetch("/api/admin/delete-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      if (res.ok) {
        window.location.reload();
      } else {
        alert("Failed to delete user. Please try again.");
      }
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("An error occurred. Please try again.");
    }
  }

  return (
    <button
      onClick={() => startTransition(handleDelete)}
      disabled={isPending}
      className={`px-4 py-2 text-sm font-semibold rounded-lg transition duration-200 ease-in-out 
        ${isPending ? "bg-gray-400 text-white cursor-not-allowed" : "bg-red-500 text-white hover:bg-red-600"}`}
    >
      {isPending ? "Deleting..." : "Delete"}
    </button>
  );
}
