"use client";

import { useState } from "react";

export default function EventCalendar({ events }: { events: any[] }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Get first day of the month (0 = Sunday, 1 = Monday, etc.)
  const firstDay = new Date(year, month, 1).getDay();
  // Get number of days in the month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Helper to check if an event is on a specific day
  const getEventsForDay = (day: number) => {
    return events.filter(e => {
      const d = new Date(e.date);
      return d.getFullYear() === year && d.getMonth() === month && d.getDate() === day;
    });
  };

  return (
    <div className="card" style={{ padding: "1.5rem", marginBottom: "2rem" }}>
      <div className="flex justify-between items-center mb-4">
        <h3 style={{ fontSize: "1.1rem" }}>{monthNames[month]} {year}</h3>
        <div className="flex gap-2">
          <button onClick={prevMonth} className="btn btn-secondary" style={{ padding: "0.25rem 0.75rem" }}>&larr;</button>
          <button onClick={nextMonth} className="btn btn-secondary" style={{ padding: "0.25rem 0.75rem" }}>&rarr;</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "0.5rem" }}>
        {dayNames.map(day => (
          <div key={day} className="text-center text-sm font-semibold text-muted uppercase tracking-wider mb-2">
            {day}
          </div>
        ))}
        
        {/* Empty slots before first day */}
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} style={{ minHeight: "80px", backgroundColor: "var(--surface-muted)", borderRadius: "var(--radius-md)", opacity: 0.5 }}></div>
        ))}
        
        {/* Days of the month */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const dayEvents = getEventsForDay(day);
          const isToday = new Date().getDate() === day && new Date().getMonth() === month && new Date().getFullYear() === year;

          return (
            <div key={day} style={{ 
              minHeight: "80px", 
              border: isToday ? "2px solid var(--primary)" : "1px solid var(--border)",
              borderRadius: "var(--radius-md)", 
              padding: "0.5rem",
              backgroundColor: "var(--surface)"
            }}>
              <div className="flex justify-between items-start mb-1">
                <span style={{ 
                  fontWeight: isToday ? "bold" : "normal", 
                  color: isToday ? "var(--primary)" : "var(--foreground)",
                  fontSize: "0.875rem"
                }}>{day}</span>
              </div>
              
              <div className="flex flex-col gap-1 mt-1">
                {dayEvents.map(ev => (
                  <div key={ev.id} style={{ 
                    fontSize: "0.7rem", 
                    backgroundColor: "rgba(37, 99, 235, 0.1)", 
                    color: "var(--primary)",
                    padding: "0.15rem 0.3rem",
                    borderRadius: "var(--radius-sm)",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                  }} title={ev.title}>
                    {ev.title}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
