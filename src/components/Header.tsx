"use client";

import React from "react";
import DarkModeSwitcher from "./DarkModeSwitcher";
import DropdownUser from "./DropdownUser";
import { Menu } from "lucide-react";

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

export default function Header({ sidebarOpen, setSidebarOpen }: HeaderProps) {
  return (
    <header className="sticky top-0 z-999 flex w-full bg-white dark:bg-slate-900 drop-shadow-sm dark:drop-shadow-none border-b border-slate-200 dark:border-slate-800">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* <!-- Hamburger Toggle Button --> */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(!sidebarOpen);
            }}
            className="z-99999 block rounded-sm border border-slate-200 bg-white p-1.5 shadow-sm dark:border-slate-700 dark:bg-slate-800 lg:hidden cursor-pointer"
          >
            <Menu size={20} className="text-slate-800 dark:text-slate-100" />
          </button>
          {/* <!-- Hamburger Toggle Button End --> */}
        </div>

        <div className="hidden sm:block">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">
            Dashboard
          </h2>
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7 ml-auto">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            <DarkModeSwitcher />
          </ul>

          <DropdownUser />
        </div>
      </div>
    </header>
  );
}
