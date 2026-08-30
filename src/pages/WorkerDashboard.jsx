
import { useEffect, useState } from "react";
import api from "../api/axios";

const WorkerDashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState("");
  const [error, setError] = useState("");

  const fetchTickets = async () => {
    try {
      setError("");

      const response = await api.get("/tickets/worker");

      setTickets(response.data.tickets || []);
    } catch (error) {
      console.error("Fetch worker requests error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to load requests"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleAccept = async (id) => {
    try {
      setActionLoading(id);

      await api.patch(`/tickets/${id}/accept`);

      await fetchTickets();
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to accept request"
      );
    } finally {
      setActionLoading("");
    }
  };

  const handleReject = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to reject this request? It will be permanently deleted."
    );

    if (!confirmed) return;

    try {
      setActionLoading(id);

      await api.delete(`/tickets/${id}/reject`);

      await fetchTickets();
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to reject request"
      );
    } finally {
      setActionLoading("");
    }
  };

  const handleComplete = async (id) => {
    try {
      setActionLoading(id);

      await api.patch(`/tickets/${id}/complete`);

      await fetchTickets();
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to complete request"
      );
    } finally {
      setActionLoading("");
    }
  };

  const getStatusStyle = (status) => {
    if (status === "Assigned") {
      return "bg-yellow-50 text-yellow-700";
    }

    if (status === "In Progress") {
      return "bg-blue-50 text-blue-600";
    }

    if (status === "Resolved") {
      return "bg-green-50 text-green-600";
    }

    return "bg-gray-100 text-gray-600";
  };

  const getPriorityStyle = (priority) => {
    if (priority === "High") {
      return "bg-red-50 text-red-600";
    }

    if (priority === "Medium") {
      return "bg-yellow-50 text-yellow-700";
    }

    return "bg-green-50 text-green-600";
  };

  const assignedCount = tickets.filter(
    (ticket) => ticket.status === "Assigned"
  ).length;

  const inProgressCount = tickets.filter(
    (ticket) => ticket.status === "In Progress"
  ).length;

  const completedCount = tickets.filter(
    (ticket) => ticket.status === "Resolved"
  ).length;

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Header */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <p className="text-sm font-medium text-blue-600">
            Worker Dashboard
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-900">
            Manage Your Requests
          </h1>

          <p className="mt-2 text-gray-600">
            Review assigned requests and update their progress.
          </p>
        </div>
      </section>


      {/* Dashboard */}
      <section className="mx-auto max-w-7xl px-6 py-8">

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
            {error}
          </div>
        )}


        {/* Statistics */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Total Requests
            </p>

            <p className="mt-2 text-3xl font-bold text-gray-900">
              {tickets.length}
            </p>
          </div>


          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Pending
            </p>

            <p className="mt-2 text-3xl font-bold text-gray-900">
              {assignedCount}
            </p>
          </div>


          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              In Progress
            </p>

            <p className="mt-2 text-3xl font-bold text-gray-900">
              {inProgressCount}
            </p>
          </div>


          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Completed
            </p>

            <p className="mt-2 text-3xl font-bold text-gray-900">
              {completedCount}
            </p>
          </div>

        </div>


        {/* Requests */}
        <div className="mt-8 rounded-2xl border border-gray-200 bg-white shadow-sm">

          <div className="border-b border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900">
              Assigned Requests
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Requests assigned to you by customers.
            </p>
          </div>


          {/* Loading */}
          {loading && (
            <div className="p-10 text-center text-sm text-gray-500">
              Loading requests...
            </div>
          )}


          {/* Empty */}
          {!loading && tickets.length === 0 && (
            <div className="p-10 text-center">
              <p className="font-semibold text-gray-900">
                No requests yet
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Assigned customer requests will appear here.
              </p>
            </div>
          )}


          {/* Requests */}
          {!loading && tickets.length > 0 && (
            <div className="divide-y divide-gray-100">

              {tickets.map((ticket) => (
                <div
                  key={ticket._id}
                  className="p-6 transition hover:bg-gray-50"
                >

                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

                    {/* Details */}
                    <div className="min-w-0 flex-1">

                      <div className="flex flex-wrap items-center gap-2">

                        <h3 className="text-lg font-bold text-gray-900">
                          {ticket.subject}
                        </h3>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                            ticket.status
                          )}`}
                        >
                          {ticket.status}
                        </span>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${getPriorityStyle(
                            ticket.priority
                          )}`}
                        >
                          {ticket.priority}
                        </span>

                      </div>


                      <p className="mt-1 text-xs text-gray-500">
                        {ticket.ticketNumber}
                      </p>


                      <p className="mt-4 text-sm leading-6 text-gray-600">
                        {ticket.description}
                      </p>


                      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500">

                        <span>
                          Category:{" "}
                          <strong className="text-gray-700">
                            {ticket.category}
                          </strong>
                        </span>

                        {ticket.customer && (
                          <span>
                            Customer:{" "}
                            <strong className="text-gray-700">
                              {ticket.customer.name}
                            </strong>
                          </span>
                        )}

                      </div>

                    </div>


                    {/* Actions */}
                    <div className="flex shrink-0 flex-wrap gap-3">

                      {/* Assigned */}
                      {ticket.status === "Assigned" && (
                        <>
                          <button
                            onClick={() =>
                              handleReject(ticket._id)
                            }
                            disabled={actionLoading === ticket._id}
                            className="rounded-xl border border-red-200 px-5 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {actionLoading === ticket._id
                              ? "..."
                              : "Reject"}
                          </button>

                          <button
                            onClick={() =>
                              handleAccept(ticket._id)
                            }
                            disabled={actionLoading === ticket._id}
                            className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {actionLoading === ticket._id
                              ? "..."
                              : "Accept"}
                          </button>
                        </>
                      )}


                      {/* In Progress */}
                      {ticket.status === "In Progress" && (
                        <button
                          onClick={() =>
                            handleComplete(ticket._id)
                          }
                          disabled={actionLoading === ticket._id}
                          className="rounded-xl bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {actionLoading === ticket._id
                            ? "Completing..."
                            : "Mark Completed"}
                        </button>
                      )}


                      {/* Completed */}
                      {ticket.status === "Resolved" && (
                        <span className="rounded-xl bg-green-50 px-5 py-2.5 text-sm font-semibold text-green-700">
                          Completed
                        </span>
                      )}

                    </div>

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

export default WorkerDashboard;

