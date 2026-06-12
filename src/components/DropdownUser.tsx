"use client";

import { useState, useRef, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { LogOut, ChevronDown, Shield } from "lucide-react";

export default function DropdownUser() {
  const { data: session } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef<HTMLButtonElement>(null);
  const dropdown = useRef<HTMLDivElement>(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target as Node) ||
        trigger.current?.contains(target as Node)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  const name = session?.user?.name || "Admin User";
  const email = session?.user?.email || "admin@servelink.com";
  const role = session?.user?.role || "USER";

  return (
    <div className="relative">
      <button
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4 cursor-pointer"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-semibold text-slate-800 dark:text-slate-100">
            {name}
          </span>
          <span className="block text-xs text-slate-500 dark:text-slate-400 capitalize">
            {role.toLowerCase().replace("_", " ")}
          </span>
        </span>

        <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-600 dark:text-indigo-200 font-bold border border-slate-200 dark:border-slate-700">
          {name.charAt(0).toUpperCase()}
        </div>

        <ChevronDown size={18} className="text-slate-500 transition-transform duration-200" style={{ transform: dropdownOpen ? 'rotate(180deg)' : 'none' }} />
      </button>

      {/* <!-- Dropdown Start --> */}
      {dropdownOpen && (
        <div
          ref={dropdown}
          className="absolute right-0 mt-4 flex w-62 flex-col rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-xl"
        >
          <div className="border-b border-slate-100 dark:border-slate-700 px-4 py-3">
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">{name}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{email}</p>
            <div className="mt-1.5 flex items-center gap-1">
              <Shield size={12} className="text-indigo-500" />
              <span className="text-[10px] font-bold tracking-wider text-indigo-500 uppercase">{role}</span>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors w-full text-left rounded-b-lg cursor-pointer"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      )}
      {/* <!-- Dropdown End --> */}
    </div>
  );
}
