import { PrismaClient } from "@prisma/client";

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
    <div>
      <div className="dashboard-header">
        <h1 className="mb-2">Overview</h1>
        <p className="text-muted">Welcome back. Here's what's happening today.</p>
      </div>
      
      <div className="grid gap-6 mb-8" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}>
        <div className="card" style={{ padding: "1.5rem" }}>
          <h3 className="mb-2 text-sm uppercase tracking-wide text-muted">Total Volunteers</h3>
          <p style={{ fontSize: "2.5rem", fontWeight: "700", color: "var(--foreground)" }}>{usersCount}</p>
        </div>
        
        <div className="card" style={{ padding: "1.5rem" }}>
          <h3 className="mb-2 text-sm uppercase tracking-wide text-muted">Upcoming Schedules</h3>
          <p style={{ fontSize: "2.5rem", fontWeight: "700", color: "var(--foreground)" }}>{schedulesCount}</p>
        </div>
      </div>

      <div className="card" style={{ padding: "1.5rem" }}>
        <div className="flex justify-between items-center mb-6">
          <h3>Upcoming Services</h3>
        </div>
        
        {upcomingEvents.length === 0 ? (
          <p className="text-muted text-sm">No upcoming services found.</p>
        ) : (
          <div className="flex flex-col">
            {upcomingEvents.map((event, i) => (
              <div key={event.id} className="flex justify-between items-center" style={{ 
                padding: "1rem 0", 
                borderBottom: i === upcomingEvents.length - 1 ? "none" : "1px solid var(--border)" 
              }}>
                <div>
                  <h4 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: "0.25rem" }}>{event.title}</h4>
                  <p className="text-muted text-sm">{event.description || "No description provided"}</p>
                </div>
                <div className="text-right">
                  <span className="badge badge-secondary">
                    {event.date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
