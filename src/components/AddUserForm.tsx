"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddUserForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER",
    dateOfBirth: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Something went wrong");
      }

      setSuccess("User added successfully!");
      setFormData({ name: "", email: "", password: "", role: "USER", dateOfBirth: "" });
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card glass">
      <h3 className="mb-4">Add New User</h3>
      {error && <div className="mb-4 text-center" style={{ color: "var(--error)" }}>{error}</div>}
      {success && <div className="mb-4 text-center" style={{ color: "var(--success)" }}>{success}</div>}
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="form-label" htmlFor="name">Name</label>
          <input className="form-input" id="name" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
        </div>
        <div>
          <label className="form-label" htmlFor="email">Email</label>
          <input className="form-input" type="email" id="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
        </div>
        <div>
          <label className="form-label" htmlFor="password">Password</label>
          <input className="form-input" type="password" id="password" required value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
        </div>
        <div>
          <label className="form-label" htmlFor="role">Role</label>
          <select className="form-input" id="role" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}>
            <option value="USER">User (Volunteer)</option>
            <option value="LEADER">Leader</option>
            <option value="SUPER_USER">Super User</option>
          </select>
        </div>
        <div>
          <label className="form-label" htmlFor="dateOfBirth">Date of Birth</label>
          <input className="form-input" type="date" id="dateOfBirth" value={formData.dateOfBirth} onChange={e => setFormData({...formData, dateOfBirth: e.target.value})} />
        </div>
        <button type="submit" className="btn btn-primary mt-4" disabled={loading}>
          {loading ? "Adding..." : "Add User"}
        </button>
      </form>
    </div>
  );
}
