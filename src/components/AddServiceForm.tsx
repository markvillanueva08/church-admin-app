"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const LOCATION_SLOTS: Record<string, string[]> = {
  "SM Dasma": ["9:00 AM", "11:00 AM"],
  "Ventura Mall": ["9:00 AM", "11:00 AM", "3:00 PM", "5:00 PM"],
};

const LOCATIONS = Object.keys(LOCATION_SLOTS);

export default function AddServiceForm({ users, events }: { users: any[], events: any[] }) {
  const router = useRouter();
  const [tab, setTab] = useState<'event' | 'schedule'>('event');

  // Event Form State
  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventLocation, setEventLocation] = useState(LOCATIONS[0]);
  const [eventTimeSlot, setEventTimeSlot] = useState(LOCATION_SLOTS[LOCATIONS[0]][0]);
  const [eventDesc, setEventDesc] = useState("");
  const [useCustomTime, setUseCustomTime] = useState(false);
  const [customTime, setCustomTime] = useState("");

  // Schedule Form State
  const [selectedEvent, setSelectedEvent] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [teamName, setTeamName] = useState("Admin Team");
  const [position, setPosition] = useState("");

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState<"success" | "error">("success");

  const handleLocationChange = (loc: string) => {
    setEventLocation(loc);
    setUseCustomTime(false);
    setEventTimeSlot(LOCATION_SLOTS[loc][0]);
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setMsg("");
    const finalTime = useCustomTime ? customTime : eventTimeSlot;
    try {
      const res = await fetch("/api/schedule/event", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: eventTitle, date: eventDate, location: eventLocation, timeSlot: finalTime, description: eventDesc })
      });
      const data = await res.json();
      if (res.ok) {
        setMsg("Event created!"); setMsgType("success");
        setEventTitle(""); setEventDate(""); setEventDesc("");
        router.refresh();
      } else {
        setMsg(data.message || "Failed to create event"); setMsgType("error");
      }
    } catch (err) {
      setMsg("Failed to create event"); setMsgType("error");
    } finally { setLoading(false); }
  };

  const handleCreateSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setMsg("");
    try {
      const res = await fetch("/api/schedule/assign", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serviceEventId: selectedEvent, userId: selectedUser, teamName, position })
      });
      const data = await res.json();
      if (res.ok) {
        setMsg("Volunteer scheduled!"); setMsgType("success");
        setSelectedUser(""); setPosition("");
        router.refresh();
      } else {
        setMsg(data.message || "Failed to assign"); setMsgType("error");
      }
    } catch (err) {
      setMsg("Failed to assign volunteer"); setMsgType("error");
    } finally { setLoading(false); }
  };

  return (
    <div className="card" style={{ padding: "1.25rem" }}>
      <div className="flex mb-4 gap-2" style={{ borderBottom: "1px solid var(--border)", paddingBottom: "0.75rem" }}>
        <button
          onClick={() => setTab('event')}
          className={`btn ${tab === 'event' ? 'btn-primary' : 'btn-secondary'} flex-1`}
          style={{ padding: "0.4rem 0.75rem", fontSize: "0.8rem" }}
        >
          + New Event
        </button>
        <button
          onClick={() => setTab('schedule')}
          className={`btn ${tab === 'schedule' ? 'btn-primary' : 'btn-secondary'} flex-1`}
          style={{ padding: "0.4rem 0.75rem", fontSize: "0.8rem" }}
        >
          Assign Volunteer
        </button>
      </div>

      {msg && (
        <div className="mb-4 text-sm" style={{
          padding: "0.5rem 0.75rem",
          borderRadius: "var(--radius-md)",
          backgroundColor: msgType === "success" ? "var(--success-bg)" : "var(--error-bg)",
          color: msgType === "success" ? "var(--success-text)" : "var(--error-text)",
        }}>
          {msg}
        </div>
      )}

      {tab === 'event' && (
        <form onSubmit={handleCreateEvent} className="flex flex-col gap-4">
          {/* Title */}
          <div>
            <label className="form-label">Service Title</label>
            <input className="form-input" required placeholder="e.g., Sunday Morning Service" value={eventTitle} onChange={e => setEventTitle(e.target.value)} />
          </div>

          {/* Date */}
          <div>
            <label className="form-label">Date</label>
            <input type="date" className="form-input" required value={eventDate} onChange={e => setEventDate(e.target.value)} />
          </div>

          {/* Location */}
          <div>
            <label className="form-label">Location</label>
            <select className="form-input" value={eventLocation} onChange={e => handleLocationChange(e.target.value)}>
              {LOCATIONS.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          {/* Time Slot */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="form-label" style={{ margin: 0 }}>Time Slot</label>
              <button
                type="button"
                onClick={() => setUseCustomTime(!useCustomTime)}
                className="text-sm"
                style={{ color: "var(--primary)", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}
              >
                {useCustomTime ? "Use preset ↩" : "Custom time ✎"}
              </button>
            </div>

            {useCustomTime ? (
              <input
                className="form-input"
                placeholder="e.g., 2:00 PM"
                value={customTime}
                onChange={e => setCustomTime(e.target.value)}
              />
            ) : (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {LOCATION_SLOTS[eventLocation].map(slot => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setEventTimeSlot(slot)}
                    className={`badge ${eventTimeSlot === slot ? "badge-primary" : "badge-secondary"}`}
                    style={{ cursor: "pointer", padding: "0.3rem 0.75rem", border: "1px solid var(--border)", fontSize: "0.8rem" }}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="form-label">Notes (optional)</label>
            <input className="form-input" placeholder="Any additional notes..." value={eventDesc} onChange={e => setEventDesc(e.target.value)} />
          </div>

          <button type="submit" className="btn btn-primary w-full" disabled={loading}>
            {loading ? "Creating..." : "Create Event"}
          </button>
        </form>
      )}

      {tab === 'schedule' && (
        <form onSubmit={handleCreateSchedule} className="flex flex-col gap-4">
          <div>
            <label className="form-label">Select Event</label>
            <select className="form-input" required value={selectedEvent} onChange={e => setSelectedEvent(e.target.value)}>
              <option value="">-- Select Event --</option>
              {events.map(ev => (
                <option key={ev.id} value={ev.id}>
                  {ev.title} — {ev.location} {ev.timeSlot ? `@ ${ev.timeSlot}` : ""}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="form-label">Select Volunteer</label>
            <select className="form-input" required value={selectedUser} onChange={e => setSelectedUser(e.target.value)}>
              <option value="">-- Select Volunteer --</option>
              {users.map(u => <option key={u.id} value={u.id}>{u.name} ({u.email})</option>)}
            </select>
          </div>
          <div>
            <label className="form-label">Team</label>
            <input className="form-input" required value={teamName} onChange={e => setTeamName(e.target.value)} placeholder="e.g., Admin Team" />
          </div>
          <div>
            <label className="form-label">Position / Role</label>
            <input className="form-input" required value={position} onChange={e => setPosition(e.target.value)} placeholder="e.g., Usher, Host, Greeter" />
          </div>
          <button type="submit" className="btn btn-primary w-full" disabled={loading}>
            {loading ? "Saving..." : "Assign Volunteer"}
          </button>
        </form>
      )}
    </div>
  );
}
