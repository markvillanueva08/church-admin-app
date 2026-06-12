import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import DashboardSidebar from "@/components/DashboardSidebar";
import ClientSessionProvider from "@/components/ClientSessionProvider";

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
      <div className="dashboard-layout">
        <DashboardSidebar />
        <main className="dashboard-main">
          {children}
        </main>
      </div>
    </ClientSessionProvider>
  );
}
