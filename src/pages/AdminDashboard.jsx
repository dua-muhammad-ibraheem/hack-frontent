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
  const resolvedTickets = tickets.filter((t) => t.status === "Resolved").length;
  const inProgressTickets = tickets.filter((t) => t.status === "In Progress").length;
  const openTickets = tickets.filter(
    (t) => t.status === "New" || t.status === "Assigned"
  ).length;

  const totalCustomers = users.filter((u) => u.role === "customer").length;
  const totalWorkers = users.filter((u) => u.role === "worker").length;

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
                <p className="text-sm font-medium text-gray-500">Open</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">{openTickets}</p>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-medium text-gray-500">In Progress</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">{inProgressTickets}</p>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-medium text-gray-500">Resolved</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">{resolvedTickets}</p>
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

            <div className="mt-8 rounded-2xl border border-gray-200 bg-white shadow-sm">
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
                          Category
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
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {t.category}
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
          </>
        )}
      </section>
    </main>
  );
};

export default AdminDashboard;