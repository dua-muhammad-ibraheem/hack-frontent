
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

const CreateTicket = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    subject: "",
    description: "",
    category: "",
  });

  const [workers, setWorkers] = useState([]);
  const [selectedWorker, setSelectedWorker] = useState("");

  const [loadingWorkers, setLoadingWorkers] = useState(true);
  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Fetch workers from MongoDB
  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const response = await api.get("/tickets/workers");

        setWorkers(response.data.workers || []);
      } catch (error) {
        console.error("Fetch workers error:", error);

        setError(
          error.response?.data?.message ||
            "Failed to load available workers"
        );
      } finally {
        setLoadingWorkers(false);
      }
    };

    fetchWorkers();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
    setSuccess(false);
  };

  const handleSubmit = async (e) => {
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

    if (!formData.category) {
      setError("Please select a category.");
      return;
    }

    if (!selectedWorker) {
      setError("Please select a worker.");
      return;
    }

    setLoading(true);

    try {
      await api.post("/tickets", {
        subject: formData.subject.trim(),
        description: formData.description.trim(),
        category: formData.category,
        assignedAgent: selectedWorker,
      });

      setSuccess(true);

      setFormData({
        subject: "",
        description: "",
        category: "",
      });

      setSelectedWorker("");

      setTimeout(() => {
        navigate("/customer-dashboard");
      }, 1000);
    } catch (error) {
      console.error("Create ticket error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to create ticket"
      );
    } finally {
      setLoading(false);
    }
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
            Create a Support Request
          </h1>

          <p className="mt-2 text-gray-600">
            Tell us about your issue and choose a worker to handle it.
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
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="mb-2 block text-sm font-semibold text-gray-900"
              >
                Category
              </label>

              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                required
              >
                <option value="">Select a category</option>
                <option value="Billing">Billing</option>
                <option value="Account">Account</option>
                <option value="Technical">Technical</option>
                <option value="Orders">Orders</option>
                <option value="General">General</option>
              </select>
            </div>

            {/* Worker */}
            <div>
              <label
                htmlFor="worker"
                className="mb-2 block text-sm font-semibold text-gray-900"
              >
                Select Worker
              </label>

              <select
                id="worker"
                value={selectedWorker}
                onChange={(e) => {
                  setSelectedWorker(e.target.value);
                  setError("");
                  setSuccess(false);
                }}
                disabled={loadingWorkers}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
                required
              >
                <option value="">
                  {loadingWorkers
                    ? "Loading workers..."
                    : "Select a worker"}
                </option>

                {workers.map((worker) => (
                  <option key={worker._id} value={worker._id}>
                    {worker.name}
                  </option>
                ))}
              </select>

              <p className="mt-2 text-xs text-gray-500">
                Workers are loaded from the system.
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
                Please include enough details to help the worker understand
                your problem.
              </p>
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
                Request created successfully!
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
                disabled={loading || loadingWorkers}
                className="rounded-xl bg-blue-600 px-7 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Creating..." : "Submit Request"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default CreateTicket;

