import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

// Temporary rule-based category suggestion — will be replaced by a real
// backend AI call (/api/ai/suggest-category) once the backend AI phase is built.
const CATEGORY_KEYWORDS = {
  Billing: ["payment", "invoice", "charge", "refund", "bill", "subscription", "price", "paid"],
  Account: ["login", "password", "account", "signup", "sign up", "profile", "email", "verify", "otp"],
  Technical: ["bug", "error", "crash", "not working", "issue", "broken", "slow", "loading", "app", "website"],
  Orders: ["order", "delivery", "shipment", "tracking", "package", "return", "courier"],
  General: [],
};

const ALL_CATEGORIES = Object.keys(CATEGORY_KEYWORDS);

const suggestCategories = (text) => {
  const lower = text.toLowerCase();

  const scored = ALL_CATEGORIES.map((cat) => {
    const words = CATEGORY_KEYWORDS[cat];
    const score = words.filter((w) => lower.includes(w)).length;
    return { cat, score };
  });

  const matched = scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((s) => s.cat);

  const rest = ALL_CATEGORIES.filter((c) => !matched.includes(c));

  return [...matched, ...rest].slice(0, 3);
};

const CreateTicket = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    subject: "",
    description: "",
    category: "",
  });

  const [suggestions, setSuggestions] = useState([]);
  const [showManualPicker, setShowManualPicker] = useState(false);

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

  // Suggest categories as the user describes their issue (debounced)
  useEffect(() => {
    const combinedText = `${formData.subject} ${formData.description}`.trim();

    if (combinedText.length < 8) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(() => {
      setSuggestions(suggestCategories(combinedText));
    }, 400);

    return () => clearTimeout(timer);
  }, [formData.subject, formData.description]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
    setSuccess(false);
  };

  const handleSelectCategory = (cat) => {
    setFormData({
      ...formData,
      category: cat,
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

      setSuggestions([]);
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

            {/* Category — suggested */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-900">
                Category
              </label>

              {suggestions.length > 0 ? (
                <>
                  <p className="mb-3 text-xs text-gray-500">
                    Based on your description, pick the closest match:
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {suggestions.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => handleSelectCategory(cat)}
                        className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                          formData.category === cat
                            ? "border-blue-600 bg-blue-600 text-white"
                            : "border-gray-300 text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <p className="text-xs text-gray-500">
                  Start typing your subject or description to see suggested
                  categories.
                </p>
              )}

              <button
                type="button"
                onClick={() => setShowManualPicker((prev) => !prev)}
                className="mt-3 text-xs font-semibold text-blue-600 hover:text-blue-700"
              >
                {showManualPicker
                  ? "Hide category list"
                  : formData.category
                  ? `Selected: ${formData.category} · choose a different one`
                  : "Or choose manually"}
              </button>

              {showManualPicker && (
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="mt-3 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Select a category</option>
                  {ALL_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              )}
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