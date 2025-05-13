'use client';

import { useState } from 'react';
import CopyButton from "@/components/CopyButton";
import LogoutButton from "@/components/LogoutButton";

export default function DashboardClient({ user }) {
  const [message, setMessage] = useState("");
  const [targetAudience, setTargetAudience] = useState(user.targetAudience || '');
  const [goal, setGoal] = useState(user.goal || '');
  const [tone, setTone] = useState(user.tone || '');
  const [ageGroup, setAgeGroup] = useState(user.ageGroup || '');

  // Format dates for display
  const subscriptionStart = new Date(user.subscriptionStart).toLocaleDateString();
  const subscriptionEnd = user.subscriptionEnd
    ? new Date(user.subscriptionEnd).toLocaleDateString()
    : "No end date";

  async function handleUpdatePreferences(e) {
    e.preventDefault();
    try {
      const res = await fetch('/api/user/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': user.apiKey,
        },
        body: JSON.stringify({ targetAudience, goal, tone, ageGroup }),
      });

      if (res.ok) {
        setMessage("✅ Preferences updated successfully!");
      } else {
        setMessage("❌ Failed to update preferences.");
      }
    } catch (err) {
      setMessage(`❌ Error: ${err.message}`);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Welcome, {user.email}
        </h1>

        {/* API Key Display */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Your API Key</h2>
          <div className="flex items-center justify-between p-3 bg-gray-200 rounded-lg">
            <span className="font-mono break-all">{user.apiKey}</span>
            <CopyButton text={user.apiKey} />
          </div>
        </div>

        {/* User Preferences Form */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold">Set Your Preferences</h2>
          <form onSubmit={handleUpdatePreferences} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Target Audience</label>
              <input
                type="text"
                placeholder="e.g., Marketers, Students"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Goal/Objective</label>
              <input
                type="text"
                placeholder="e.g., Increase engagement"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Tone of Voice</label>
              <input
                type="text"
                placeholder="e.g., Professional, Casual"
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Age Group</label>
              <input
                type="text"
                placeholder="e.g., 18-25, 30-50"
                value={ageGroup}
                onChange={(e) => setAgeGroup(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 mt-2 rounded-md"
            >
              Update Preferences
            </button>
          </form>
        </div>

        {message && <p className="text-green-600">{message}</p>}

        <div className="mb-6">
          <h2 className="text-lg font-semibold">Subscription Details</h2>
          <p>Start: {subscriptionStart}</p>
          <p>End: {subscriptionEnd}</p>
        </div>

        <LogoutButton />
      </div>
    </div>
  );
}
