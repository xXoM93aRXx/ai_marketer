// app/dashboard/page.js
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/db/client";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import CopyButton from "@/components/CopyButton";
import LogoutButton from "@/components/LogoutButton";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/signin");

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, session.user.email));

  if (!user) redirect("/auth/signin");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Welcome, {user.email}
        </h1>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Your API Key</h2>
          <div className="flex items-center justify-between p-3 bg-gray-200 rounded-lg">
            <span className="font-mono break-all">{user.apiKey}</span>
            <CopyButton text={user.apiKey} />
          </div>
        </div>

        <LogoutButton />
      </div>
    </div>
  );
}
