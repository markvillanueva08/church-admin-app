"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function DarkModeSwitcher() {
  const [colorMode, setColorMode] = useState<"light" | "dark">("light");

  useEffect(() => {
    const root = window.document.documentElement;
    const initialColorMode = localStorage.getItem("color-theme") as "light" | "dark" | null;
    
    if (initialColorMode) {
      setColorMode(initialColorMode);
      if (initialColorMode === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    } else {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      setColorMode(systemTheme);
      if (systemTheme === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }
  }, []);

  const toggleColorMode = () => {
    const root = window.document.documentElement;
    const nextMode = colorMode === "light" ? "dark" : "light";
    setColorMode(nextMode);
    localStorage.setItem("color-theme", nextMode);
    if (nextMode === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  };

  return (
    <button
      onClick={toggleColorMode}
      className="relative flex h-8 w-14 cursor-pointer items-center rounded-full bg-slate-200 p-1 transition-colors duration-300 dark:bg-slate-700"
      aria-label="Toggle dark mode"
    >
      <div
        className={`flex h-6 w-6 items-center justify-center rounded-full bg-white text-slate-800 shadow-md transition-transform duration-300 ${
          colorMode === "dark" ? "translate-x-6 bg-slate-900 text-yellow-500" : ""
        }`}
      >
        {colorMode === "dark" ? (
          <Moon size={14} className="fill-current" />
        ) : (
          <Sun size={14} className="fill-current" />
        )}
      </div>
    </button>
  );
}
