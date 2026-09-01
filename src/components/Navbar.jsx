import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const NavLink = ({ to, children, isAnchor = false }) => {
  const Component = isAnchor ? "a" : Link;
  const linkProps = isAnchor ? { href: to } : { to };

  return (
    <Component
      {...linkProps}
      className="group relative text-sm font-medium text-gray-700 transition-colors duration-300 hover:text-blue-600"
    >
      {children}
      <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-blue-600 transition-all duration-300 group-hover:w-full" />
    </Component>
  );
};

const Navbar = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const isLoggedIn = Boolean(token);
  const isAdmin = user.role === "admin";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight text-gray-900"
        >
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="inline-block"
          >
            Support<span className="text-blue-600">Desk</span>
          </motion.span>
        </Link>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="hidden items-center gap-8 md:flex"
        >
          <NavLink to="/">Home</NavLink>
          <NavLink to="/#about" isAnchor>About</NavLink>
          <NavLink to="/#how-it-works" isAnchor>How It Works</NavLink>
        </motion.div>

        {/* Auth */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex items-center gap-3"
        >
          {!isLoggedIn && (
            <>
              <Link
                to="/login"
                className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
              >
                Login
              </Link>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/signup"
                  className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Get Started
                </Link>
              </motion.div>
            </>
          )}

          {isLoggedIn && !isAdmin && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <button
                onClick={handleLogout}
                className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Logout
              </button>
            </motion.div>
          )}

          {/* Admin: no logout here, it's in the sidebar */}
        </motion.div>

      </div>
    </motion.nav>
  );
};

export default Navbar;