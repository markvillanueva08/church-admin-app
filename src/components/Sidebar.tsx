"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Calendar, ArrowLeft, Shield } from "lucide-react";
import { useSession } from "next-auth/react";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

export default function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  const pathname = usePathname();
  const trigger = useRef<HTMLButtonElement>(null);
  const sidebar = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();
  const role = session?.user?.role || "USER";

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target as Node) ||
        trigger.current.contains(target as Node)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  const menuItems = [
    {
      name: "Overview",
      route: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "User Management",
      route: "/dashboard/users",
      icon: Users,
    },
    {
      name: "Service Schedule",
      route: "/dashboard/schedule",
      icon: Calendar,
    },
  ];

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72 flex-col overflow-y-hidden bg-slate-900 duration-300 ease-linear dark:bg-slate-950 lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-extrabold text-white tracking-tight">
            Serve<span className="text-indigo-500">Link</span>
          </span>
        </Link>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden text-slate-400 hover:text-white cursor-pointer"
        >
          <ArrowLeft size={20} />
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER END --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
          <div>
            <h3 className="mb-4 ml-4 text-xs font-semibold text-slate-400 uppercase tracking-widest">
              Menu
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.route;
                return (
                  <li key={item.name}>
                    <Link
                      href={item.route}
                      onClick={() => setSidebarOpen(false)}
                      className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2.5 font-medium text-slate-300 duration-300 ease-in-out hover:bg-slate-800 dark:hover:bg-slate-900 hover:text-white ${
                        isActive ? "bg-slate-800 dark:bg-slate-900 text-white border-l-4 border-indigo-500 pl-3" : ""
                      }`}
                    >
                      <Icon size={18} className={`${isActive ? "text-indigo-400" : "text-slate-400 group-hover:text-white"}`} />
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu End --> */}
      </div>

      {/* Role Indicator Footer */}
      <div className="mt-auto p-6 border-t border-slate-800 dark:border-slate-900 bg-slate-950/40">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-slate-800 dark:bg-slate-900 text-indigo-400 rounded-lg">
            <Shield size={18} />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold tracking-wide uppercase">System Role</p>
            <p className="text-sm text-white font-bold truncate max-w-44">
              {role.replace("_", " ")}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
