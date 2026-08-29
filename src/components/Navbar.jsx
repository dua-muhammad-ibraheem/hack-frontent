import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight text-gray-900"
        >
          Resume<span className="text-blue-600">AI</span>
        </Link>

        <Link
          to="/login"
          className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Login
        </Link>

      </div>
    </nav>
  );
};

export default Navbar;