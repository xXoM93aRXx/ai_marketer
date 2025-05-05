// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth"; // ✅ this now works

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
