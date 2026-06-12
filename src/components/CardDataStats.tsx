import React from "react";

interface CardDataStatsProps {
  title: string;
  total: string | number;
  children: React.ReactNode;
}

export default function CardDataStats({
  title,
  total,
  children,
}: CardDataStatsProps) {
  return (
    <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm flex items-center gap-5">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
        {children}
      </div>

      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {title}
        </span>
        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-1">
          {total}
        </h3>
      </div>
    </div>
  );
}
