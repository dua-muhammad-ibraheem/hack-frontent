
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

const CustomerDashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await api.get("/tickets/my");

        setTickets(response.data.tickets || response.data || []);
      } catch (error) {
        console.error("Fetch tickets error:", error);
        setError(
          error.response?.data?.message || "Failed to load your tickets"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const getPriorityStyle = (priority) => {
    if (priority === "High") {
      return "bg-red-50 text-red-600";
    }

    if (priority === "Medium") {
      return "bg-yellow-50 text-yellow-700";
    }

    return "bg-green-50 text-green-600";
  };

  const getStatusStyle = (status) => {
    if (status === "Resolved" || status === "Completed") {
      return "bg-green-50 text-green-600";
    }

    if (status === "In Progress") {
      return "bg-blue-50 text-blue-600";
    }

    if (status === "Assigned" || status === "Accepted") {
      return "bg-purple-50 text-purple-600";
    }

    return "bg-gray-100 text-gray-600";
  };

  const totalTickets = tickets.length;

  const newTickets = tickets.filter(
    (ticket) => ticket.status === "New"
  ).length;

  const inProgressTickets = tickets.filter(
    (ticket) => ticket.status === "In Progress"
  ).length;

  const resolvedTickets = tickets.filter(
    (ticket) =>
      ticket.status === "Resolved" ||
      ticket.status === "Completed"
  ).length;

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-medium text-blue-600">
                Customer Dashboard
              </p>

              <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-900">
                Welcome back, {user.name || "Customer"} 👋
              </h1>

              <p className="mt-2 text-gray-600">
                Manage your support requests and track their progress.
              </p>
            </div>

            <Link
              to="/create-ticket"
              className="inline-flex w-fit items-center rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              + Create Ticket
            </Link>
          </div>
        </div>
      </section>

      {/* Dashboard */}
      <section className="mx-auto max-w-7xl px-6 py-8">
        {/* Statistics */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Total Tickets
            </p>

            <p className="mt-2 text-3xl font-bold text-gray-900">
              {totalTickets}
            </p>

            <p className="mt-2 text-xs text-gray-500">
              All your support requests
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              New
            </p>

            <p className="mt-2 text-3xl font-bold text-gray-900">
              {newTickets}
            </p>

            <p className="mt-2 text-xs text-gray-500">
              Waiting for assignment
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              In Progress
            </p>

            <p className="mt-2 text-3xl font-bold text-gray-900">
              {inProgressTickets}
            </p>

            <p className="mt-2 text-xs text-gray-500">
              Currently being handled
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Resolved
            </p>

            <p className="mt-2 text-3xl font-bold text-gray-900">
              {resolvedTickets}
            </p>

            <p className="mt-2 text-xs text-gray-500">
              Successfully resolved
            </p>
          </div>
        </div>

        {/* Tickets */}
        <div className="mt-8 rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="flex flex-col justify-between gap-3 border-b border-gray-100 p-6 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                My Tickets
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                View and track your recent support requests.
              </p>
            </div>

            <Link
              to="/create-ticket"
              className="text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              Create new ticket →
            </Link>
          </div>

          {/* Error */}
          {error && (
            <div className="m-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              {error}
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="p-8 text-center text-sm text-gray-500">
              Loading your tickets...
            </div>
          )}

          {/* Empty */}
          {!loading && !error && tickets.length === 0 && (
            <div className="p-10 text-center">
              <p className="font-semibold text-gray-900">
                No tickets yet
              </p>

              <p className="mt-2 text-sm text-gray-500">
                Create your first support request.
              </p>

              <Link
                to="/create-ticket"
                className="mt-5 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Create Ticket
              </Link>
            </div>
          )}

          {/* Desktop Table */}
          {!loading && tickets.length > 0 && (
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full text-left">
                <thead className="border-b border-gray-100 bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Ticket
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Category
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Priority
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Status
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Date
                    </th>

                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {tickets.map((ticket) => (
                    <tr
                      key={ticket._id}
                      className="transition hover:bg-gray-50"
                    >
                      <td className="px-6 py-5">
                        <p className="font-semibold text-gray-900">
                          {ticket.subject}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          {ticket.ticketNumber}
                        </p>
                      </td>

                      <td className="px-6 py-5 text-sm text-gray-600">
                        {ticket.category}
                      </td>

                      <td className="px-6 py-5">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${getPriorityStyle(
                            ticket.priority
                          )}`}
                        >
                          {ticket.priority}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                            ticket.status
                          )}`}
                        >
                          {ticket.status}
                        </span>
                      </td>

                      <td className="px-6 py-5 text-sm text-gray-500">
                        {new Date(ticket.createdAt).toLocaleDateString()}
                      </td>

                      <td className="px-6 py-5 text-right">
                        <Link
                          to={`/tickets/${ticket._id}`}
                          className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Mobile Cards */}
          {!loading && tickets.length > 0 && (
            <div className="divide-y divide-gray-100 md:hidden">
              {tickets.map((ticket) => (
                <div key={ticket._id} className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold text-gray-900">
                        {ticket.subject}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        {ticket.ticketNumber}
                      </p>
                    </div>

                    <span
                      className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${getPriorityStyle(
                        ticket.priority
                      )}`}
                    >
                      {ticket.priority}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500">
                        {ticket.category}
                      </p>

                      <span
                        className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                          ticket.status
                        )}`}
                      >
                        {ticket.status}
                      </span>
                    </div>

                    <Link
                      to={`/tickets/${ticket._id}`}
                      className="text-sm font-semibold text-blue-600"
                    >
                      View →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default CustomerDashboard;

