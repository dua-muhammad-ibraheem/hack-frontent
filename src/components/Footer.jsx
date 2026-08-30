
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-gray-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-3">
        
        <div>
          <Link to="/" className="text-2xl font-bold">
            Support<span className="text-blue-500">Desk</span>
          </Link>

          <p className="mt-4 max-w-sm text-sm leading-6 text-gray-400">
            A focused customer support desk that helps teams manage,
            triage, and resolve customer issues efficiently.
          </p>
        </div>

        <div>
          <h3 className="font-semibold">Explore</h3>

          <div className="mt-4 flex flex-col gap-3 text-sm text-gray-400">
            <Link to="/" className="transition hover:text-white">
              Home
            </Link>

            <Link to="/about" className="transition hover:text-white">
              About
            </Link>

            <Link to="/how-it-works" className="transition hover:text-white">
              How It Works
            </Link>
          </div>
        </div>

        <div>
          <h3 className="font-semibold">Get Started</h3>

          <p className="mt-4 text-sm leading-6 text-gray-400">
            Sign in to create and manage your support tickets.
          </p>

          <Link
            to="/login"
            className="mt-5 inline-block rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold transition hover:bg-blue-700"
          >
            Login
          </Link>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="mx-auto max-w-7xl px-6 py-5 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} SupportDesk. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

