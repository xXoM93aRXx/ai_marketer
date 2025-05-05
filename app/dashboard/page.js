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
    <div style={{ padding: 40 }}>
      <h1>Welcome, {user.email}</h1>

      <div
        style={{
          marginTop: 30,
          border: "1px solid #ccc",
          padding: 20,
          borderRadius: 8,
          maxWidth: 600,
          background: "#f9f9f9",
        }}
      >
        <h2>Your API Key</h2>
        <div
          style={{
            marginTop: 10,
            padding: "10px",
            background: "#eee",
            fontFamily: "monospace",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            wordBreak: "break-all",
          }}
        >
          <span>{user.apiKey}</span>
          <CopyButton text={user.apiKey} />
          
        </div>
        
      </div>
      <LogoutButton/>
    </div>
  );
}
