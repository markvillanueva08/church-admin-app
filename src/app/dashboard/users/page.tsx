import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import AddUserForm from "@/components/AddUserForm";

const prisma = new PrismaClient();

export default async function UsersPage() {
  const session = await getServerSession(authOptions);
  const isSuperUser = session?.user?.role === "SUPER_USER";

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="dashboard-header flex justify-between items-end">
        <div>
          <h1 className="mb-2">User Management</h1>
          <p className="text-muted">Manage volunteers, leaders, and their details.</p>
        </div>
      </div>

      <div
        className="grid gap-8"
        style={{
          display: "grid",
          gridTemplateColumns: isSuperUser ? "1fr 350px" : "1fr",
          alignItems: "start",
        }}
      >
        <div className="card" style={{ overflow: "hidden" }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Birthday</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td style={{ fontWeight: "500" }}>{user.name || "N/A"}</td>
                  <td className="text-muted">{user.email}</td>
                  <td>
                    <span
                      className={`badge ${
                        user.role === "SUPER_USER"
                          ? "badge-primary"
                          : "badge-secondary"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="text-muted">
                    {user.dateOfBirth
                      ? new Date(user.dateOfBirth).toLocaleDateString()
                      : "Not set"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {isSuperUser && (
          <div className="sticky" style={{ top: "1rem" }}>
            <AddUserForm />
          </div>
        )}
      </div>

      {!isSuperUser && (
        <div
          className="card text-muted text-sm"
          style={{ padding: "0.75rem 1rem", marginTop: "1.5rem", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
        >
          🔒 Only Super Users can add or manage user accounts.
        </div>
      )}
    </div>
  );
}

