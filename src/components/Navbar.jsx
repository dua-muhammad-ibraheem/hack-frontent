
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight text-gray-900"
        >
          Support<span className="text-blue-600">Desk</span>
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            to="/"
            className="text-sm font-medium text-gray-700 transition hover:text-blue-600"
          >
            Home
          </Link>

          <a
            href="/#about"
            className="text-sm font-medium text-gray-700 transition hover:text-blue-600"
          >
            About
          </a>

          <a
            href="/#how-it-works"
            className="text-sm font-medium text-gray-700 transition hover:text-blue-600"
          >
            How It Works
          </a>
        </div>

        {/* Auth */}
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Get Started
          </Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;

