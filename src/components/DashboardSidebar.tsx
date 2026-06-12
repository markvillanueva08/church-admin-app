"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardSidebar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <aside className="dashboard-sidebar">
      <div className="mb-8 px-2">
        <Link href="/" className="gradient-text" style={{ fontSize: "1.25rem" }}>
          ServeLink
        </Link>
      </div>

      <nav className="flex flex-col flex-1">
        <div className="mb-4">
          <p className="px-2 mb-2 text-xs font-semibold uppercase tracking-wider text-muted">Menu</p>
          <Link href="/dashboard" className={`dashboard-nav-link ${pathname === '/dashboard' ? 'active' : ''}`}>
            Overview
          </Link>
          <Link href="/dashboard/users" className={`dashboard-nav-link ${pathname === '/dashboard/users' ? 'active' : ''}`}>
            User Management
          </Link>
          <Link href="/dashboard/schedule" className={`dashboard-nav-link ${pathname === '/dashboard/schedule' ? 'active' : ''}`}>
            Service Schedule
          </Link>
        </div>
      </nav>

      <div className="mt-auto pt-6" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="px-2 mb-4">
          <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>{session?.user?.name || "Admin User"}</p>
          <p className="text-xs text-muted truncate">{session?.user?.email}</p>
          <div className="mt-2">
            <span className="badge badge-secondary">{session?.user?.role}</span>
          </div>
        </div>
        <Link href="/api/auth/signout" className="btn btn-secondary w-full text-center justify-center">
          Sign out
        </Link>
      </div>
    </aside>
  );
}
