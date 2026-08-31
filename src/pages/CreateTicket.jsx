import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

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

  if (matched.length === 0) {
    return ["General"];
  }

  return matched;
};

const CreateTicket = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    subject: "",
    description: "",
    category: "",
  });

  const [categoryConfirmed, setCategoryConfirmed] = useState("");

  const [workers, setWorkers] = useState([]);
  const [selectedWorker, setSelectedWorker] = useState("");
  const [loadingWorkers, setLoadingWorkers] = useState(false);

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!categoryConfirmed) {
      setWorkers([]);
      setSelectedWorker("");
      return;
    }

    const fetchWorkers = async () => {
      try {
        setLoadingWorkers(true);
        setSelectedWorker("");

        const response = await api.get(
          `/tickets/workers?category=${categoryConfirmed}`
        );

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
  }, [categoryConfirmed]);

  useEffect(() => {
    const combinedText = `${formData.subject} ${formData.description}`.trim();

    if (combinedText.length < 3) {
      setFormData((prev) => ({ ...prev, category: "" }));
      setCategoryConfirmed("");
      return;
    }

    const timer = setTimeout(() => {
      const topCategory = suggestCategories(combinedText)[0];
      setFormData((prev) => ({ ...prev, category: topCategory }));
    }, 300);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.subject, formData.description]);

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

      setCategoryConfirmed("");
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

      <section className="mx-auto max-w-4xl px-6 py-10">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">

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

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-900">
                Category
              </label>

              {formData.category ? (
                <div>
                  <button
                    type="button"
                    onClick={() => setCategoryConfirmed(formData.category)}
                    className={`inline-block rounded-full px-4 py-2 text-sm font-semibold transition ${
                      categoryConfirmed === formData.category
                        ? "bg-blue-600 text-white"
                        : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                    }`}
                  >
                    {formData.category}
                    {categoryConfirmed === formData.category ? " ✓" : ""}
                  </button>

                  <p className="mt-2 text-xs text-gray-500">
                    {categoryConfirmed === formData.category
                      ? "Category confirmed."
                      : "Tap the category above to confirm it."}
                  </p>
                </div>
              ) : (
                <p className="text-xs text-gray-500">
                  Start typing your subject — category will be detected
                  automatically.
                </p>
              )}
            </div>

            {categoryConfirmed && (
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-900">
                  Select Worker
                </label>

                {loadingWorkers && (
                  <p className="text-sm text-gray-500">Finding matching workers...</p>
                )}

                {!loadingWorkers && workers.length === 0 && (
                  <p className="text-sm text-gray-500">
                    No workers available for {categoryConfirmed} right now.
                  </p>
                )}

                {!loadingWorkers && workers.length > 0 && (
                  <div className="grid gap-3 sm:grid-cols-2">
                    {workers.map((worker) => (
                      <button
                        key={worker._id}
                        type="button"
                        onClick={() => setSelectedWorker(worker._id)}
                        className={`rounded-xl border px-4 py-3 text-left transition ${
                          selectedWorker === worker._id
                            ? "border-blue-600 bg-blue-50"
                            : "border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        <p className="text-sm font-semibold text-gray-900">
                          {worker.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {worker.email}
                        </p>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                {error}
              </div>
            )}

            {success && (
              <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-600">
                Request created successfully!
              </div>
            )}

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