import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

/** Returns the session if the user is a SUPER_USER, otherwise returns a 403 response. */
export async function requireSuperUser() {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "SUPER_USER") {
    return {
      session: null,
      forbidden: NextResponse.json(
        { message: "Forbidden: Only Super Users can perform this action." },
        { status: 403 }
      ),
    };
  }
  return { session, forbidden: null };
}
