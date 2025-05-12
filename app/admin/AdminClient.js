'use client';

import { useState } from 'react';
import DeleteUserButton from "@/components/DeleteUserButton";

export default function AdminClient({ allUsers }) {
  const [users, setUsers] = useState(allUsers);

  async function updateUser(userId, isActive, subscriptionStart, subscriptionEnd) {
    try {
      await fetch("/api/admin/update-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, isActive, subscriptionStart, subscriptionEnd }),
      });

      // Update the local state after successful update
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, isActive, subscriptionStart, subscriptionEnd } : user
        )
      );
    } catch (error) {
      alert("Failed to update user data.");
    }
  }

  return (
    <div className="space-y-4">
      {users.map((user) => (
        <div
          key={user.id}
          className="p-4 border rounded-md bg-gray-50 shadow-sm flex flex-col justify-between gap-4"
        >
          <div>
            <p className="text-lg font-medium">
              {user.email} ({user.isActive ? "Active" : "Inactive"})
            </p>
            <p className="text-sm text-gray-600">Role: {user.role}</p>
            <p className="text-sm text-gray-600">API Key: {user.apiKey}</p>
            <p className="text-sm text-gray-600">
              Subscription Start: {new Date(user.subscriptionStart).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-600">
              Subscription End: {user.subscriptionEnd ? new Date(user.subscriptionEnd).toLocaleDateString() : "No end date"}
            </p>
          </div>
          
          <div className="flex justify-end items-center gap-2 border-t pt-3 mt-3">
            <button
              onClick={() => updateUser(user.id, !user.isActive)}
              className={`px-3 py-1 rounded ${
                user.isActive ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
              }`}
            >
              {user.isActive ? "Deactivate" : "Activate"}
            </button>
            <input
              type="date"
              value={user.subscriptionStart ? new Date(user.subscriptionStart).toISOString().substring(0, 10) : ''}
              onChange={(e) => updateUser(user.id, user.isActive, e.target.value, user.subscriptionEnd)}
              className="border rounded px-2 py-1"
              title="Subscription Start"
            />
            <input
              type="date"
              value={user.subscriptionEnd ? new Date(user.subscriptionEnd).toISOString().substring(0, 10) : ''}
              onChange={(e) => updateUser(user.id, user.isActive, user.subscriptionStart, e.target.value)}
              className="border rounded px-2 py-1"
              title="Subscription End"
            />
            <DeleteUserButton userId={user.id} />
          </div>
        </div>
      ))}
    </div>
  );
}
