import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/db/client";
import { users } from "@/db/schema";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import AdminClient from "./adminClient";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/signin");

  const [currentUser] = await db
    .select()
    .from(users)
    .where(eq(users.email, session.user.email));

  if (!currentUser || currentUser.role !== "admin") {
    redirect("/not-authorized");
  }

  const allUsers = await db.select().from(users);

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Panel</h1>
        
        <form
          action="/api/admin/create-user"
          method="POST"
          className="mb-8 space-y-4 bg-gray-50 p-4 rounded-lg shadow-sm"
        >
          <h2 className="text-xl font-semibold mb-2">Create New User</h2>
          <input
            type="email"
            name="email"
            placeholder="User email"
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Send Invite
          </button>
        </form>

        <h2 className="text-2xl font-semibold mb-4">User Accounts</h2>
        <AdminClient allUsers={allUsers} />
      </div>
    </div>
  );
}
