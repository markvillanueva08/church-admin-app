"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const LOCATION_SLOTS: Record<string, string[]> = {
  "SM Dasma": ["9:00 AM", "11:00 AM"],
  "Ventura Mall": ["9:00 AM", "11:00 AM", "3:00 PM", "5:00 PM"],
};
const LOCATIONS = Object.keys(LOCATION_SLOTS);

function toDateInputValue(date: Date | string): string {
  const d = new Date(date);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export default function EditEventModal({
  event,
  onClose,
}: {
  event: any;
  onClose: () => void;
}) {
  const router = useRouter();
  const [title, setTitle] = useState(event.title);
  const [date, setDate] = useState(toDateInputValue(event.date));
  const [location, setLocation] = useState(event.location || LOCATIONS[0]);
  const [timeSlot, setTimeSlot] = useState(event.timeSlot || "");
  const [description, setDescription] = useState(event.description || "");
  const [useCustomTime, setUseCustomTime] = useState(false);
  const [customTime, setCustomTime] = useState("");

  const [loading, setLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState<"success" | "error">("success");

  // Check if current timeSlot is a preset or custom
  useEffect(() => {
    const presets = LOCATION_SLOTS[location] || [];
    if (event.timeSlot && !presets.includes(event.timeSlot)) {
      setUseCustomTime(true);
      setCustomTime(event.timeSlot);
    }
  }, []);

  const handleLocationChange = (loc: string) => {
    setLocation(loc);
    setUseCustomTime(false);
    setTimeSlot(LOCATION_SLOTS[loc][0]);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    const finalTime = useCustomTime ? customTime : timeSlot;

    try {
      const res = await fetch(`/api/schedule/event/${event.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, date, location, timeSlot: finalTime, description }),
      });
      const data = await res.json();
      if (res.ok) {
        setMsg("Event updated successfully!");
        setMsgType("success");
        router.refresh();
        setTimeout(() => onClose(), 800);
      } else {
        setMsg(data.message || "Failed to update");
        setMsgType("error");
      }
    } catch {
      setMsg("Network error. Please try again.");
      setMsgType("error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/schedule/event/${event.id}`, { method: "DELETE" });
      if (res.ok) {
        router.refresh();
        onClose();
      } else {
        setMsg("Failed to delete event.");
        setMsgType("error");
        setConfirmDelete(false);
      }
    } catch {
      setMsg("Network error.");
      setMsgType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    // Backdrop
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 50,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex", alignItems: "center", justifyContent: "center",
        backdropFilter: "blur(2px)",
      }}
    >
      {/* Modal panel */}
      <div
        onClick={e => e.stopPropagation()}
        className="card"
        style={{
          width: "100%", maxWidth: "520px",
          padding: "1.75rem",
          margin: "1rem",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h3>Edit Service Event</h3>
          <button
            onClick={onClose}
            style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.25rem", color: "var(--secondary)" }}
          >
            ✕
          </button>
        </div>

        {/* Feedback message */}
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

        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
          {/* Title */}
          <div>
            <label className="form-label">Service Title</label>
            <input className="form-input" required value={title} onChange={e => setTitle(e.target.value)} />
          </div>

          {/* Date */}
          <div>
            <label className="form-label">Date</label>
            <input type="date" className="form-input" required value={date} onChange={e => setDate(e.target.value)} />
          </div>

          {/* Location */}
          <div>
            <label className="form-label">Location</label>
            <select className="form-input" value={location} onChange={e => handleLocationChange(e.target.value)}>
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
                style={{ color: "var(--primary)", background: "none", border: "none", cursor: "pointer", fontSize: "0.8rem", fontFamily: "inherit" }}
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
                {LOCATION_SLOTS[location].map(slot => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setTimeSlot(slot)}
                    className={`badge ${timeSlot === slot ? "badge-primary" : "badge-secondary"}`}
                    style={{ cursor: "pointer", padding: "0.3rem 0.75rem", border: "1px solid var(--border)", fontSize: "0.8rem" }}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notes */}
          <div>
            <label className="form-label">Notes (optional)</label>
            <input className="form-input" value={description} onChange={e => setDescription(e.target.value)} />
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 mt-2">
            <button type="submit" className="btn btn-primary flex-1" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </button>
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={loading}>
              Cancel
            </button>
          </div>
        </form>

        {/* Delete section */}
        <div className="mt-6 pt-4" style={{ borderTop: "1px solid var(--border)" }}>
          {!confirmDelete ? (
            <button
              onClick={() => setConfirmDelete(true)}
              className="btn w-full"
              style={{ backgroundColor: "var(--error-bg)", color: "var(--error-text)", border: "1px solid var(--error)", fontSize: "0.875rem" }}
            >
              Delete Event
            </button>
          ) : (
            <div>
              <p className="text-sm mb-3" style={{ color: "var(--error-text)" }}>
                ⚠️ This will permanently delete the event and all volunteer assignments. Are you sure?
              </p>
              <div className="flex gap-2">
                <button
                  onClick={handleDelete}
                  className="btn flex-1"
                  disabled={loading}
                  style={{ backgroundColor: "var(--error)", color: "white", border: "none" }}
                >
                  {loading ? "Deleting..." : "Yes, Delete"}
                </button>
                <button
                  onClick={() => setConfirmDelete(false)}
                  className="btn btn-secondary flex-1"
                  disabled={loading}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
