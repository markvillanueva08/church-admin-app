import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import AddServiceForm from "@/components/AddServiceForm";
import EventCalendar from "@/components/EventCalendar";
import EventCard from "@/components/EventCard";

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
    <div>
      <div className="dashboard-header flex justify-between items-end">
        <div>
          <h1 className="mb-2">Service Schedule</h1>
          <p className="text-muted">
            Plan services by location and time slot, and assign volunteers to each.
          </p>
        </div>
      </div>

      <div
        className="grid gap-8"
        style={{ display: "grid", gridTemplateColumns: "1fr 360px", alignItems: "start" }}
      >
        {/* Left: Calendar + Event list */}
        <div>
          <EventCalendar events={allEvents} />

          {/* Upcoming */}
          <h3 className="mb-3">Upcoming Services</h3>
          <div className="flex flex-col gap-4 mb-8">
            {upcomingEvents.length === 0 ? (
              <div className="card text-center text-muted" style={{ padding: "2rem" }}>
                No upcoming services. Create one using the panel on the right.
              </div>
            ) : (
              upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} isSuperUser={isSuperUser} />
              ))
            )}
          </div>

          {/* Past */}
          {pastEvents.length > 0 && (
            <>
              <h3 className="mb-3 text-muted">Past Services</h3>
              <div className="flex flex-col gap-4" style={{ opacity: 0.6 }}>
                {pastEvents.map((event) => (
                  <EventCard key={event.id} event={event} isSuperUser={isSuperUser} />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Right: Create / Assign form — only shown to super users */}
        {isSuperUser ? (
          <div className="sticky" style={{ top: "1rem" }}>
            <AddServiceForm users={users} events={allEvents} />
          </div>
        ) : (
          <div className="card text-muted text-sm" style={{ padding: "1rem", display: "inline-flex", alignItems: "center", gap: "0.5rem", height: "fit-content" }}>
            🔒 Only Super Users can create or edit events.
          </div>
        )}
      </div>
    </div>
  );
}
