import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const NavLink = ({ to, children, isAnchor = false, onClick }) => {
  const Component = isAnchor ? "a" : Link;
  const linkProps = isAnchor ? { href: to } : { to };

  return (
    <Component
      {...linkProps}
      onClick={onClick}
      className="group relative text-sm font-medium text-gray-700 transition-colors duration-300 hover:text-blue-600"
    >
      {children}
      <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-blue-600 transition-all duration-300 group-hover:w-full" />
    </Component>
  );
};

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setMenuOpen(false);
    navigate("/login", { replace: true });
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" onClick={closeMenu} className="text-2xl font-bold tracking-tight text-gray-900">
          Support<span className="text-blue-600">Desk</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/#about" isAnchor>About</NavLink>
          <NavLink to="/#how-it-works" isAnchor>How It Works</NavLink>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {token ? (
            <>
              <span className="text-sm font-medium text-gray-600">
                {user.name} ({user.role})
              </span>
              <button
                onClick={handleLogout}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
              >
                Logout
              </button>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>

        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100 md:hidden"
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-gray-100 bg-white md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              <Link to="/" onClick={closeMenu} className="rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
                Home
              </Link>
              <a href="/#about" onClick={closeMenu} className="rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
                About
              </a>
              <a href="/#how-it-works" onClick={closeMenu} className="rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
                How It Works
              </a>

              <div className="mt-2 border-t border-gray-100 pt-3">
                {token ? (
                  <>
                    <p className="px-3 pb-2 text-sm font-medium text-gray-500">
                      {user.name} ({user.role})
                    </p>
                    <button
                      onClick={handleLogout}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-left text-sm font-semibold text-gray-700 hover:bg-gray-50"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Link
                      to="/login"
                      onClick={closeMenu}
                      className="rounded-lg border border-gray-300 px-3 py-2.5 text-center text-sm font-semibold text-gray-700 hover:bg-gray-50"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      onClick={closeMenu}
                      className="rounded-lg bg-blue-600 px-3 py-2.5 text-center text-sm font-semibold text-white hover:bg-blue-700"
                    >
                      Get Started
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;