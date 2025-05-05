// app/dashboard/page.js
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // ✅ shared version
import { redirect } from "next/navigation";
import LogoutButton from '@/components/LogoutButton'; 

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/signin");

  return (
    <div style={{ padding: 40 }}>
      <h1>Welcome, {session.user.email}</h1>
      <LogoutButton />
    </div>
  );
}
