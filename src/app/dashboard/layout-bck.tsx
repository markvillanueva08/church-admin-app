import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import ClientSessionProvider from "@/components/ClientSessionProvider";
import DashboardContent from "@/components/DashboardContent";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <ClientSessionProvider session={session}>
      <DashboardContent>
        {children}
      </DashboardContent>
    </ClientSessionProvider>
  );
}
