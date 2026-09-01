import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [deletingId, setDeletingId] = useState("");

  const fetchData = async () => {
    try {
      setError("");
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

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  const handleDeleteUser = async (id) => {
    const confirmed = window.confirm("Delete this account permanently?");
    if (!confirmed) return;

    try {
      setDeletingId(id);
      await api.delete(`/users/${id}`);
      await fetchData();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete user");
    } finally {
      setDeletingId("");
    }
  };

  const getStatusStyle = (status) => {
    if (status === "Resolved") return "bg-green-50 text-green-600";
    if (status === "In Progress") return "bg-blue-50 text-blue-600";
    if (status === "Assigned") return "bg-purple-50 text-purple-600";
    return "bg-gray-100 text-gray-600";
  };

  const customers = users.filter((u) => u.role === "customer");
  const workers = users.filter((u) => u.role === "worker");

  const totalTickets = tickets.length;
  const newCount = tickets.filter((t) => t.status === "New").length;
  const inProgressCount = tickets.filter((t) => t.status === "In Progress").length;
  const resolvedCount = tickets.filter((t) => t.status === "Resolved").length;

  const navItems = [
    { key: "overview", label: "Overview" },
    { key: "tickets", label: "All Tickets" },
    { key: "customers", label: `Customers (${customers.length})` },
    { key: "workers", label: `Workers (${workers.length})` },
  ];

  return (
    <main className="min-h-screen bg-gray-50 md:flex">
      {/* Sidebar */}
      <aside className="border-b border-gray-200 bg-white md:w-64 md:min-h-screen md:border-b-0 md:border-r">
        <div className="p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
            Admin Panel
          </p>
          <h2 className="mt-1 text-lg font-bold text-gray-900">{user.name || "Admin"}</h2>
        </div>

        <nav className="flex gap-1 overflow-x-auto px-3 pb-3 md:flex-col md:overflow-visible md:px-3">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`shrink-0 rounded-lg px-4 py-2.5 text-left text-sm font-semibold transition ${
                activeTab === item.key
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="border-t border-gray-100 p-3">
          <button
            onClick={handleLogout}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 p-6 md:p-10">
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
            {error}
          </div>
        )}

        {loading ? (
          <div className="p-10 text-center text-sm text-gray-500">Loading...</div>
        ) : (
          <>
            {activeTab === "overview" && (
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Overview</h1>
                <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
                    <p className="mt-2 text-3xl font-bold text-gray-900">{customers.length}</p>
                  </div>
                  <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                    <p className="text-sm font-medium text-gray-500">Workers</p>
                    <p className="mt-2 text-3xl font-bold text-gray-900">{workers.length}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "tickets" && (
              <div>
                <h1 className="text-2xl font-bold text-gray-900">All Tickets</h1>
                <div className="mt-6 rounded-2xl border border-gray-200 bg-white shadow-sm">
                  {tickets.length === 0 ? (
                    <div className="p-10 text-center text-sm text-gray-500">
                      No tickets yet.
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead className="border-b border-gray-100 bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-xs font-semibold uppercase text-gray-500">Ticket</th>
                            <th className="px-6 py-3 text-xs font-semibold uppercase text-gray-500">Customer</th>
                            <th className="px-6 py-3 text-xs font-semibold uppercase text-gray-500">Worker</th>
                            <th className="px-6 py-3 text-xs font-semibold uppercase text-gray-500">Status</th>
                            <th className="px-6 py-3 text-xs font-semibold uppercase text-gray-500">Rating</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {tickets.map((t) => (
                            <tr key={t._id}>
                              <td className="px-6 py-4">
                                <p className="text-sm font-semibold text-gray-900">{t.subject}</p>
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
              </div>
            )}

            {activeTab === "customers" && (
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
                <div className="mt-6 rounded-2xl border border-gray-200 bg-white shadow-sm">
                  {customers.length === 0 ? (
                    <div className="p-10 text-center text-sm text-gray-500">
                      No customers yet.
                    </div>
                  ) : (
                    <div className="divide-y divide-gray-100">
                      {customers.map((u) => (
                        <div key={u._id} className="flex items-center justify-between px-6 py-4">
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{u.name}</p>
                            <p className="text-xs text-gray-500">{u.email}</p>
                          </div>
                          <button
                            onClick={() => handleDeleteUser(u._id)}
                            disabled={deletingId === u._id}
                            className="rounded-lg border border-red-200 px-4 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                          >
                            {deletingId === u._id ? "..." : "Delete"}
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "workers" && (
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Workers</h1>
                <div className="mt-6 rounded-2xl border border-gray-200 bg-white shadow-sm">
                  {workers.length === 0 ? (
                    <div className="p-10 text-center text-sm text-gray-500">
                      No workers yet.
                    </div>
                  ) : (
                    <div className="divide-y divide-gray-100">
                      {workers.map((u) => (
                        <div key={u._id} className="flex items-center justify-between px-6 py-4">
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{u.name}</p>
                            <p className="text-xs text-gray-500">{u.email}</p>
                            {u.specialization && (
                              <span className="mt-1 inline-block rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-600">
                                {u.specialization}
                              </span>
                            )}
                          </div>
                          <button
                            onClick={() => handleDeleteUser(u._id)}
                            disabled={deletingId === u._id}
                            className="rounded-lg border border-red-200 px-4 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                          >
                            {deletingId === u._id ? "..." : "Delete"}
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default AdminDashboard;