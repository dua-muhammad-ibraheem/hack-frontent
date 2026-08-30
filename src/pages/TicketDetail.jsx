import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

const TicketDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [actionLoading, setActionLoading] = useState(false);

  // AI suggestion review — worker edits these before accepting
  const [reviewCategory, setReviewCategory] = useState("");
  const [reviewPriority, setReviewPriority] = useState("");
  const [reviewSummary, setReviewSummary] = useState("");

  // Reply thread
  const [replyText, setReplyText] = useState("");
  const [replySending, setReplySending] = useState(false);
  const [replyError, setReplyError] = useState("");

  const fetchTicket = async () => {
    try {
      setError("");

      const response = await api.get(`/tickets/${id}`);
      const data = response.data.ticket || response.data;

      setTicket(data);

      setReviewCategory(data.category || "");
      setReviewPriority(data.priority || "Medium");
      setReviewSummary(data.aiSummary || "");
    } catch (err) {
      console.error("Fetch ticket error:", err);
      setError(
        err.response?.data?.message || "Failed to load this ticket"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTicket();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

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

  const getPriorityStyle = (priority) => {
    if (priority === "High") return "bg-red-50 text-red-600";
    if (priority === "Medium") return "bg-yellow-50 text-yellow-700";
    return "bg-green-50 text-green-600";
  };

  const handleAccept = async () => {
    try {
      setActionLoading(true);

      await api.patch(`/tickets/${id}/accept`, {
        category: reviewCategory,
        priority: reviewPriority,
        summary: reviewSummary,
      });

      await fetchTicket();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to accept ticket");
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to reject this request? It will be permanently deleted."
    );
    if (!confirmed) return;

    try {
      setActionLoading(true);

      await api.delete(`/tickets/${id}/reject`);

      navigate("/worker-dashboard", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reject request");
      setActionLoading(false);
    }
  };

  const handleComplete = async () => {
    try {
      setActionLoading(true);

      await api.patch(`/tickets/${id}/complete`);

      await fetchTicket();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to complete request");
    } finally {
      setActionLoading(false);
    }
  };

  const handleReply = async (e) => {
    e.preventDefault();

    if (!replyText.trim()) return;

    try {
      setReplySending(true);
      setReplyError("");

      await api.post(`/tickets/${id}/replies`, {
        message: replyText.trim(),
      });

      setReplyText("");
      await fetchTicket();
    } catch (err) {
      setReplyError(
        err.response?.data?.message || "Failed to send reply"
      );
    } finally {
      setReplySending(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 px-6 py-16 text-center text-sm text-gray-500">
        Loading ticket...
      </main>
    );
  }

  if (error && !ticket) {
    return (
      <main className="min-h-screen bg-gray-50 px-6 py-16">
        <div className="mx-auto max-w-2xl rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
          {error}
        </div>
      </main>
    );
  }

  if (!ticket) return null;

  const backLink =
    user.role === "worker" ? "/worker-dashboard" : "/customer-dashboard";

  const isWorker = user.role === "worker";
  const isResolved = ticket.status === "Resolved" || ticket.status === "Completed";

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-8">
          <Link
            to={backLink}
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            ← Back to Dashboard
          </Link>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              {ticket.subject}
            </h1>

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

          <p className="mt-1 text-xs text-gray-500">{ticket.ticketNumber}</p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-8">
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
            {error}
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main column */}
          <div className="space-y-6 lg:col-span-2">
            {/* Ticket details */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-sm font-semibold text-gray-900">
                Description
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                {ticket.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500">
                <span>
                  Category:{" "}
                  <strong className="text-gray-700">{ticket.category}</strong>
                </span>

                {ticket.customer && (
                  <span>
                    Customer:{" "}
                    <strong className="text-gray-700">
                      {ticket.customer.name}
                    </strong>
                  </span>
                )}

                {ticket.assignedAgent && (
                  <span>
                    Worker:{" "}
                    <strong className="text-gray-700">
                      {ticket.assignedAgent.name || "Assigned"}
                    </strong>
                  </span>
                )}
              </div>
            </div>

            {/* Conversation */}
            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-100 p-6">
                <h2 className="text-lg font-bold text-gray-900">
                  Conversation
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Replies between you and{" "}
                  {isWorker ? "the customer" : "the assigned worker"}.
                </p>
              </div>

              <div className="max-h-96 space-y-4 overflow-y-auto p-6">
                {(!ticket.replies || ticket.replies.length === 0) && (
                  <p className="text-center text-sm text-gray-500">
                    No replies yet.
                  </p>
                )}

                {ticket.replies?.map((reply) => {
                  const isMine = reply.sender?._id === user.id || reply.sender?._id === user._id;

                  return (
                    <div
                      key={reply._id}
                      className={`flex ${isMine ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                          isMine
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        <p
                          className={`mb-1 text-xs font-semibold ${
                            isMine ? "text-blue-100" : "text-gray-500"
                          }`}
                        >
                          {reply.sender?.name || "User"}
                        </p>
                        <p className="leading-6">{reply.message}</p>
                        <p
                          className={`mt-1 text-[10px] ${
                            isMine ? "text-blue-100" : "text-gray-400"
                          }`}
                        >
                          {new Date(reply.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Reply form */}
              <form
                onSubmit={handleReply}
                className="flex items-end gap-3 border-t border-gray-100 p-4"
              >
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Write a reply..."
                  rows={2}
                  className="flex-1 resize-none rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                <button
                  type="submit"
                  disabled={replySending || !replyText.trim()}
                  className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {replySending ? "Sending..." : "Send"}
                </button>
              </form>

              {replyError && (
                <p className="px-4 pb-4 text-sm font-medium text-red-600">
                  {replyError}
                </p>
              )}
            </div>
          </div>

          {/* Sidebar — worker actions */}
          {isWorker && (
            <div className="space-y-6">
              {ticket.status === "Assigned" && (
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                  <h2 className="text-sm font-semibold text-gray-900">
                    Review before accepting
                  </h2>
                  <p className="mt-1 text-xs text-gray-500">
                    These are AI-suggested — edit anything before you
                    accept.
                  </p>

                  <div className="mt-4 space-y-4">
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                        Category
                      </label>
                      <select
                        value={reviewCategory}
                        onChange={(e) => setReviewCategory(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      >
                        {["Billing", "Account", "Technical", "Orders", "General"].map(
                          (c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          )
                        )}
                      </select>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                        Priority
                      </label>
                      <select
                        value={reviewPriority}
                        onChange={(e) => setReviewPriority(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      >
                        {["Low", "Medium", "High"].map((p) => (
                          <option key={p} value={p}>
                            {p}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                        Summary
                      </label>
                      <textarea
                        value={reviewSummary}
                        onChange={(e) => setReviewSummary(e.target.value)}
                        rows={3}
                        placeholder="Short summary of the issue..."
                        className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>
                  </div>

                  <div className="mt-5 flex gap-3">
                    <button
                      onClick={handleReject}
                      disabled={actionLoading}
                      className="flex-1 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Reject
                    </button>

                    <button
                      onClick={handleAccept}
                      disabled={actionLoading}
                      className="flex-1 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {actionLoading ? "..." : "Accept"}
                    </button>
                  </div>
                </div>
              )}

              {ticket.status === "In Progress" && (
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                  <button
                    onClick={handleComplete}
                    disabled={actionLoading}
                    className="w-full rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {actionLoading ? "Completing..." : "Mark Completed"}
                  </button>
                </div>
              )}

              {isResolved && (
                <div className="rounded-2xl border border-green-200 bg-green-50 p-6 text-center text-sm font-semibold text-green-700">
                  This ticket is resolved.
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default TicketDetail;