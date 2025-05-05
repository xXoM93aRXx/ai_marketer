import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/db/client";
import { users } from "@/db/schema";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import DeleteUserButton from "@/components/DeleteUserButton";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/signin");

  const [currentUser] = await db.select().from(users).where(eq(users.email, session.user.email));
  if (!currentUser || currentUser.role !== "admin") {
    redirect("/not-authorized"); // ✅ Or return 403 page
  }

  const allUsers = await db.select().from(users);

  return (
    <div style={{ padding: 40 }}>
      <h1>Admin Panel</h1>
      <form action="/api/admin/create-user" method="POST" style={{ marginBottom: 40 }}>
        <h2>Create New User</h2>
        <input type="email" name="email" placeholder="User email" required />
        <button type="submit">Send Invite</button>
      </form>
      <h2>User Accounts</h2>
      <ul>
        {allUsers.map(user => (
          <li key={user.id}>
            {user.email} ({user.isActive ? "Active" : "Inactive"}) — Role: {user.role}<br />
            API Key: {user.apiKey}<br />
            <DeleteUserButton userId={user.id} />
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}
