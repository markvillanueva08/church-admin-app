import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import AddServiceForm from "@/components/AddServiceForm";
import EventCalendar from "@/components/EventCalendar";
import EventCard from "@/components/EventCard";
import { Calendar, Lock, History } from "lucide-react";

const prisma = new PrismaClient();

export default async function SchedulePage() {
  const session = await getServerSession(authOptions);
  const isSuperUser = session?.user?.role === "SUPER_USER";
  const allEvents = await prisma.serviceEvent.findMany({
    orderBy: { date: "asc" },
    include: {
      schedules: {
        include: { user: true },
      },
    },
  });

  const users = await prisma.user.findMany({ orderBy: { name: "asc" } });

  // Split upcoming vs past
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const upcomingEvents = allEvents.filter((e) => new Date(e.date) >= today);
  const pastEvents = allEvents.filter((e) => new Date(e.date) < today);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-5 border-b border-slate-200 dark:border-slate-800">
        <h1 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
          Service Schedule
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Plan services by location and time slot, and assign volunteers to each.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 items-start">
        {/* Left/Middle: Calendar + Event list (spans 2 columns on large screens) */}
        <div className="space-y-6 lg:col-span-2">
          {/* Calendar Card */}
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm p-6">
            <EventCalendar events={allEvents} />
          </div>

          {/* Upcoming Services */}
          <div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
              <Calendar size={18} className="text-indigo-500" />
              Upcoming Services
            </h3>
            <div className="space-y-4">
              {upcomingEvents.length === 0 ? (
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-8 text-center text-slate-500 dark:text-slate-400 text-sm shadow-sm">
                  No upcoming services. Create one using the panel on the right.
                </div>
              ) : (
                upcomingEvents.map((event) => (
                  <EventCard key={event.id} event={event} isSuperUser={isSuperUser} />
                ))
              )}
            </div>
          </div>

          {/* Past Services */}
          {pastEvents.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-slate-400 dark:text-slate-500 mb-4 flex items-center gap-2">
                <History size={18} />
                Past Services
              </h3>
              <div className="space-y-4 opacity-70">
                {pastEvents.map((event) => (
                  <EventCard key={event.id} event={event} isSuperUser={isSuperUser} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right column: Create / Assign form */}
        <div className="lg:col-span-1">
          {isSuperUser ? (
            <div className="sticky top-20 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-4">
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-3">
                Schedule New Service
              </h3>
              <AddServiceForm users={users} events={allEvents} />
            </div>
          ) : (
            <div className="flex items-center gap-2 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 p-4 text-amber-800 dark:text-amber-300 text-sm">
              <Lock size={16} />
              <span>Only Super Users can create or edit service events.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
