import { useEffect, useState } from "react";
import api from "../api/axios";

const AdminDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ticketsRes, usersRes] = await Promise.all([
          api.get("/tickets/admin/all"),
          api.get("/users"),
        ]);
        setTickets(ticketsRes.data.tickets || []);
        setUsers(usersRes.data.users || []);
      } catch (err) {
        console.error("Admin fetch error:", err);
        setError(err.response?.data?.message || "Failed to load admin data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getStatusStyle = (status) => {
    if (status === "Resolved") return "bg-green-50 text-green-600";
    if (status === "In Progress") return "bg-blue-50 text-blue-600";
    if (status === "Assigned") return "bg-purple-50 text-purple-600";
    return "bg-gray-100 text-gray-600";
  };

  const totalTickets = tickets.length;
  const newCount = tickets.filter((t) => t.status === "New").length;
  const assignedCount = tickets.filter((t) => t.status === "Assigned").length;
  const inProgressCount = tickets.filter((t) => t.status === "In Progress").length;
  const resolvedCount = tickets.filter((t) => t.status === "Resolved").length;

  const totalCustomers = users.filter((u) => u.role === "customer").length;
  const totalWorkers = users.filter((u) => u.role === "worker").length;

  const statusBars = [
    { label: "New", count: newCount, color: "bg-gray-400" },
    { label: "Assigned", count: assignedCount, color: "bg-purple-500" },
    { label: "In Progress", count: inProgressCount, color: "bg-blue-500" },
    { label: "Resolved", count: resolvedCount, color: "bg-green-500" },
  ];

  const maxCount = Math.max(...statusBars.map((s) => s.count), 1);

  const recentUsers = [...users].reverse().slice(0, 8);

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <p className="text-sm font-medium text-blue-600">Admin Dashboard</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-900">
            Welcome, {user.name || "Admin"}
          </h1>
          <p className="mt-2 text-gray-600">
            Overview of all tickets and users across the platform.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8">
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
            {error}
          </div>
        )}

        {loading ? (
          <div className="p-10 text-center text-sm text-gray-500">
            Loading dashboard...
          </div>
        ) : (
          <>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-medium text-gray-500">Total Tickets</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">{totalTickets}</p>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-medium text-gray-500">New</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">{newCount}</p>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-medium text-gray-500">In Progress</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">{inProgressCount}</p>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-medium text-gray-500">Resolved</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">{resolvedCount}</p>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-medium text-gray-500">Customers</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">{totalCustomers}</p>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-medium text-gray-500">Workers</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">{totalWorkers}</p>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900">Ticket Status Overview</h2>
              <div className="mt-6 space-y-4">
                {statusBars.map((bar) => (
                  <div key={bar.label}>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span className="font-medium text-gray-700">{bar.label}</span>
                      <span className="text-gray-500">{bar.count}</span>
                    </div>
                    <div className="h-3 w-full overflow-hidden rounded-full bg-gray-100">
                      <div
                        className={`h-full rounded-full ${bar.color} transition-all duration-500`}
                        style={{ width: `${(bar.count / maxCount) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              <div className="rounded-2xl border border-gray-200 bg-white shadow-sm lg:col-span-2">
                <div className="border-b border-gray-100 p-6">
                  <h2 className="text-xl font-bold text-gray-900">All Tickets</h2>
                </div>

                {tickets.length === 0 ? (
                  <div className="p-10 text-center text-sm text-gray-500">
                    No tickets yet.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="border-b border-gray-100 bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-xs font-semibold uppercase text-gray-500">
                            Ticket
                          </th>
                          <th className="px-6 py-3 text-xs font-semibold uppercase text-gray-500">
                            Customer
                          </th>
                          <th className="px-6 py-3 text-xs font-semibold uppercase text-gray-500">
                            Worker
                          </th>
                          <th className="px-6 py-3 text-xs font-semibold uppercase text-gray-500">
                            Status
                          </th>
                          <th className="px-6 py-3 text-xs font-semibold uppercase text-gray-500">
                            Rating
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {tickets.map((t) => (
                          <tr key={t._id}>
                            <td className="px-6 py-4">
                              <p className="text-sm font-semibold text-gray-900">
                                {t.subject}
                              </p>
                              <p className="text-xs text-gray-500">{t.ticketNumber}</p>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600">
                              {t.customer?.name || "—"}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600">
                              {t.assignedWorker?.name || "Unassigned"}
                            </td>
                            <td className="px-6 py-4">
                              <span
                                className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                                  t.status
                                )}`}
                              >
                                {t.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600">
                              {t.rating ? `${t.rating} ★` : "—"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
                <div className="border-b border-gray-100 p-6">
                  <h2 className="text-lg font-bold text-gray-900">Recent Signups</h2>
                  <p className="mt-1 text-xs text-gray-500">Who joined the platform</p>
                </div>

                {recentUsers.length === 0 ? (
                  <div className="p-6 text-center text-sm text-gray-500">
                    No users yet.
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {recentUsers.map((u) => (
                      <div
                        key={u._id}
                        className="flex items-center justify-between px-6 py-4"
                      >
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-gray-900">
                            {u.name}
                          </p>
                          <p className="truncate text-xs text-gray-500">{u.email}</p>
                        </div>
                        <span
                          className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                            u.role === "worker"
                              ? "bg-blue-50 text-blue-600"
                              : u.role === "admin"
                              ? "bg-purple-50 text-purple-600"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {u.role}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </section>
    </main>
  );
};

export default AdminDashboard;