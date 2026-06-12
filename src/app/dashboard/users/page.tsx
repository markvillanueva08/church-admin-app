import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import AddUserForm from "@/components/AddUserForm";
import { Users2, Lock } from "lucide-react";

const prisma = new PrismaClient();

export default async function UsersPage() {
  const session = await getServerSession(authOptions);
  const isSuperUser = session?.user?.role === "SUPER_USER";

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-5 border-b border-slate-200 dark:border-slate-800">
        <h1 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
          User Management
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Manage volunteers, leaders, and their permission access levels.
        </p>
      </div>

      {/* Grid container */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 items-start">
        {/* Left: Volunteer List table */}
        <div className={`bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden ${isSuperUser ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2 bg-slate-50/50 dark:bg-slate-900/50">
            <Users2 size={20} className="text-indigo-500" />
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
              Volunteers List
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                  <th className="p-4 font-semibold text-slate-600 dark:text-slate-300">Name</th>
                  <th className="p-4 font-semibold text-slate-600 dark:text-slate-300">Email</th>
                  <th className="p-4 font-semibold text-slate-600 dark:text-slate-300">Role</th>
                  <th className="p-4 font-semibold text-slate-600 dark:text-slate-300">Birthday</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="p-4 font-semibold text-slate-800 dark:text-slate-100">{user.name || "N/A"}</td>
                    <td className="p-4 text-slate-500 dark:text-slate-400">{user.email}</td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          user.role === "SUPER_USER"
                            ? "bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300"
                            : "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="p-4 text-slate-500 dark:text-slate-400">
                      {user.dateOfBirth
                        ? new Date(user.dateOfBirth).toLocaleDateString()
                        : "Not set"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: AddUserForm (Super Users only) */}
        {isSuperUser && (
          <div className="sticky top-20 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-4">
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-3">
              Add New Volunteer
            </h3>
            <AddUserForm />
          </div>
        )}
      </div>

      {/* Lock alert for non-super users */}
      {!isSuperUser && (
        <div className="flex items-center gap-2 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 p-4 text-amber-800 dark:text-amber-300 text-sm max-w-xl">
          <Lock size={16} />
          <span>Only Super Users can add or manage volunteer accounts.</span>
        </div>
      )}
    </div>
  );
}

