
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      const response = await api.post("/auth/login", formData);

      // Save token
      localStorage.setItem("token", response.data.token);

      // Save complete user including role
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      // Get role from backend
      const role = response.data.user.role;

      // Redirect according to role
      if (role === "worker") {
        navigate("/worker-dashboard", {
          replace: true,
        });
      } else if (role === "admin") {
        navigate("/admin-dashboard", {
          replace: true,
        });
      } else {
        navigate("/customer-dashboard", {
          replace: true,
        });
      }

    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Invalid email or password"
      );

      setLoading(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-64px)] bg-gray-50 px-6 py-12">
      <div className="mx-auto flex min-h-[calc(100vh-160px)] max-w-md items-center justify-center">

        <div className="w-full rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

          {/* Heading */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Welcome back
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Login to continue to your account
            </p>
          </div>


          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              />
            </div>


            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              />
            </div>


            {/* Error */}
            {message && (
              <div className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                {message}
              </div>
            )}


            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-blue-600 py-3.5 font-semibold text-white transition hover:bg-blue-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Logging in..."
                : "Login"}
            </button>

          </form>


          {/* Signup */}
          <p className="mt-7 text-center text-sm text-gray-500">
            Don't have an account?{" "}

            <Link
              to="/signup"
              className="font-semibold text-blue-600 transition hover:text-blue-700"
            >
              Create account
            </Link>
          </p>

        </div>
      </div>
    </main>
  );
};

export default Login;

