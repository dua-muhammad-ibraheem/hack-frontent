
import { useState } from "react";
import { Link } from "react-router-dom";

const CreateTicket = () => {
  const [formData, setFormData] = useState({
    subject: "",
    description: "",
    category: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
    setSuccess(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");
    setSuccess(false);

    if (formData.subject.trim().length < 5) {
      setError("Subject must be at least 5 characters long.");
      return;
    }

    if (formData.description.trim().length < 10) {
      setError("Please provide more details about your issue.");
      return;
    }

    setLoading(true);

    // Temporary frontend behavior.
    // This will be replaced with the real backend API.
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);

      setFormData({
        subject: "",
        description: "",
        category: "",
      });
    }, 800);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-4xl px-6 py-8">
          <Link
            to="/customer-dashboard"
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            ← Back to Dashboard
          </Link>

          <h1 className="mt-5 text-3xl font-bold tracking-tight text-gray-900">
            Create a Support Ticket
          </h1>

          <p className="mt-2 text-gray-600">
            Tell us about your issue and our support team will help you.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="mx-auto max-w-4xl px-6 py-10">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Subject */}
            <div>
              <label
                htmlFor="subject"
                className="mb-2 block text-sm font-semibold text-gray-900"
              >
                Subject
              </label>

              <input
                id="subject"
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="What do you need help with?"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                required
              />

              <p className="mt-2 text-xs text-gray-500">
                Keep your subject short and clear.
              </p>
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="mb-2 block text-sm font-semibold text-gray-900"
              >
                Category
                <span className="ml-1 font-normal text-gray-400">
                  (Optional)
                </span>
              </label>

              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="">Let AI suggest a category</option>
                <option value="Billing">Billing</option>
                <option value="Account">Account</option>
                <option value="Technical">Technical</option>
                <option value="Orders">Orders</option>
                <option value="General">General</option>
              </select>

              <p className="mt-2 text-xs text-gray-500">
                You can leave this empty and let AI suggest the category.
              </p>
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-semibold text-gray-900"
              >
                Describe your issue
              </label>

              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Explain what happened and how we can help..."
                rows={7}
                className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                required
              />

              <p className="mt-2 text-xs text-gray-500">
                Please include any details that may help our support team.
              </p>
            </div>

            {/* AI Info */}
            <div className="rounded-xl border border-blue-100 bg-blue-50 p-5">
              <div className="flex gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
                  AI
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">
                    AI-assisted triage
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    After you submit your ticket, AI will analyze your issue
                    and suggest a category, priority, and short summary.
                    A support agent will review the suggestions before they
                    are finalized.
                  </p>
                </div>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                {error}
              </div>
            )}

            {/* Success */}
            {success && (
              <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-600">
                Ticket created successfully!
              </div>
            )}

            {/* Buttons */}
            <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">
              <Link
                to="/customer-dashboard"
                className="rounded-xl border border-gray-300 px-6 py-3 text-center text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={loading}
                className="rounded-xl bg-blue-600 px-7 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Creating Ticket..." : "Submit Ticket"}
              </button>
            </div>

          </form>
        </div>
      </section>
    </main>
  );
};

export default CreateTicket;

