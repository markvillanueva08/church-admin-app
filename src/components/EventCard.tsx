"use client";

import { useState } from "react";
import EditEventModal from "./EditEventModal";

export default function EventCard({ event, isSuperUser }: { event: any; isSuperUser: boolean }) {
  const [editOpen, setEditOpen] = useState(false);

  return (
    <>
      <div className="card" style={{ padding: "1.25rem" }}>
        {/* Header row */}
        <div className="flex justify-between items-start mb-3">
          <div style={{ flex: 1 }}>
            <h4 style={{ fontWeight: "600", marginBottom: "0.5rem" }}>{event.title}</h4>
            <div className="flex gap-2" style={{ flexWrap: "wrap" }}>
              <span className="badge badge-secondary">
                📅 {new Date(event.date).toLocaleDateString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric" })}
              </span>
              {event.location && (
                <span className="badge badge-secondary">📍 {event.location}</span>
              )}
              {event.timeSlot && (
                <span className="badge badge-primary">🕐 {event.timeSlot}</span>
              )}
            </div>
            {event.description && (
              <p className="text-muted text-sm" style={{ marginTop: "0.5rem" }}>{event.description}</p>
            )}
          </div>

          {isSuperUser && (
            <button
              onClick={() => setEditOpen(true)}
              className="btn btn-secondary"
              style={{ marginLeft: "1rem", padding: "0.35rem 0.75rem", fontSize: "0.8rem", whiteSpace: "nowrap" }}
            >
              ✏️ Edit
            </button>
          )}
        </div>

        {/* Volunteers */}
        <div className="mt-2 pt-3" style={{ borderTop: "1px solid var(--border)" }}>
          <p className="text-muted text-sm font-semibold uppercase tracking-wide mb-2">
            Volunteers ({event.schedules.length})
          </p>
          {event.schedules.length === 0 ? (
            <p className="text-muted text-sm">No volunteers assigned yet.</p>
          ) : (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {event.schedules.map((s: any) => (
                <div
                  key={s.id}
                  style={{
                    padding: "0.35rem 0.7rem",
                    backgroundColor: "var(--surface-hover)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-md)",
                    fontSize: "0.8rem",
                  }}
                >
                  <strong>{s.user.name}</strong>
                  <span className="text-muted"> · {s.teamName} · {s.position}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Edit/Delete Modal */}
      {editOpen && (
        <EditEventModal event={event} onClose={() => setEditOpen(false)} />
      )}
    </>
  );
}
