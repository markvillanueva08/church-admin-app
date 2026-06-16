import { PrismaClient } from "@prisma/client";
import CardDataStats from "@/components/CardDataStats";
import EventCard from "@/components/EventCard";
import { Users, CalendarCheck, CalendarDays } from "lucide-react";

const prisma = new PrismaClient();

export default async function DashboardPage() {
  const usersCount = await prisma.user.count();
  const schedulesCount = await prisma.schedule.count();
  const upcomingEvents = await prisma.serviceEvent.findMany({
    where: { date: { gte: new Date() } },
    orderBy: { date: 'asc' },
    take: 6,
    include: { schedules: { include: { user: true } } }
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">Overview</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">A concise summary of your congregation and upcoming services.</p>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-medium shadow-sm hover:shadow transition">Export</button>
          <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold shadow">New Event</button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <CardDataStats title="Total Volunteers" total={usersCount}>
          <Users size={20} />
        </CardDataStats>

        <CardDataStats title="Upcoming Schedules" total={schedulesCount}>
          <CalendarCheck size={20} />
        </CardDataStats>

        <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Next Service</span>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-1">{upcomingEvents[0]?.title ?? 'No Services'}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">{upcomingEvents[0]?.description ?? 'Schedule a new service to get started.'}</p>
            </div>
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400">
              <CalendarDays size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Chart + Upcoming Events */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Activity / Chart placeholder */}
        <div className="lg:col-span-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Attendance (Last 30 days)</h4>
            <div className="text-sm text-slate-500 dark:text-slate-400">Updated just now</div>
          </div>

          <div className="h-56 rounded-lg bg-linear-to-br from-indigo-50 to-white dark:from-indigo-900/10 dark:to-slate-900 flex items-center justify-center text-indigo-400 border border-dashed border-slate-200 dark:border-slate-800">
            {/* Placeholder for chart - integrate real chart (e.g., Chart.js, Recharts) later */}
            <div className="text-center">
              <div className="text-2xl font-bold">—</div>
              <div className="text-sm text-slate-500">Chart placeholder</div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800">
              <div className="text-xs text-slate-500">Average Attendance</div>
              <div className="text-xl font-bold">120</div>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800">
              <div className="text-xs text-slate-500">This Week</div>
              <div className="text-xl font-bold">3 Services</div>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800">
              <div className="text-xs text-slate-500">Volunteers Active</div>
              <div className="text-xl font-bold">{usersCount}</div>
            </div>
          </div>
        </div>

        {/* Right: Upcoming Events List */}
        <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Upcoming Services</h4>
            <span className="text-sm text-slate-500 dark:text-slate-400">Next 6</span>
          </div>

          <div className="space-y-4">
            {upcomingEvents.length === 0 ? (
              <div className="text-center py-6 text-slate-500">No upcoming services scheduled.</div>
            ) : (
              upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} isSuperUser={false} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
