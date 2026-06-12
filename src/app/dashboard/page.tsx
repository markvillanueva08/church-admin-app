import { PrismaClient } from "@prisma/client";
import CardDataStats from "@/components/CardDataStats";
import { Users, CalendarCheck, CalendarDays } from "lucide-react";

const prisma = new PrismaClient();

export default async function DashboardPage() {
  const usersCount = await prisma.user.count();
  const schedulesCount = await prisma.schedule.count();
  const upcomingEvents = await prisma.serviceEvent.findMany({
    where: { date: { gte: new Date() } },
    orderBy: { date: 'asc' },
    take: 3
  });

  return (
    <div className="space-y-6">
      {/* Overview header */}
      <div className="pb-5 border-b border-slate-200 dark:border-slate-800">
        <h1 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
          Overview
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Welcome back. Here is what is happening today in your congregation.
        </p>
      </div>
      
      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <CardDataStats title="Total Volunteers" total={usersCount}>
          <Users size={24} />
        </CardDataStats>
        
        <CardDataStats title="Upcoming Schedules" total={schedulesCount}>
          <CalendarCheck size={24} />
        </CardDataStats>
      </div>

      {/* Upcoming Services Section */}
      <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <CalendarDays size={20} className="text-indigo-500" />
            Upcoming Services
          </h3>
        </div>
        
        <div className="p-6">
          {upcomingEvents.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                No upcoming services scheduled.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h4 className="text-base font-bold text-slate-800 dark:text-slate-100">
                      {event.title}
                    </h4>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">
                      {event.description || "No description provided."}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-800 dark:bg-slate-800 dark:text-slate-200">
                      {event.date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
