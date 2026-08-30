import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
};

const Home = () => {
  return (
    <main>
      {/* ================= HERO ================= */}
      <section id="home" className="bg-white">
        <div className="mx-auto grid min-h-[calc(100vh-64px)] max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-2 lg:py-24">
          <motion.div
            initial="hidden"
            animate="show"
            variants={staggerContainer}
          >
            <motion.div
              variants={fadeUp}
              className="mb-6 inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600"
            >
              AI-Powered Customer Support
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="max-w-2xl text-5xl font-bold leading-tight tracking-tight text-gray-900 md:text-6xl"
            >
              Resolve customer issues
              <span className="text-blue-600"> faster and smarter.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-xl text-lg leading-8 text-gray-600"
            >
              Submit support tickets, get AI-assisted triage, communicate
              with support agents, and track your issue from start to
              resolution.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/signup"
                  className="rounded-xl bg-blue-600 px-7 py-3.5 font-semibold text-white transition hover:bg-blue-700"
                >
                  Get Started
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/login"
                  className="rounded-xl border border-gray-300 px-7 py-3.5 font-semibold text-gray-800 transition hover:bg-gray-50"
                >
                  Login
                </Link>
              </motion.div>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-8">
              <div>
                <p className="text-xl font-bold text-gray-900">AI</p>
                <p className="mt-1 text-sm text-gray-500">Smart ticket triage</p>
              </div>

              <div>
                <p className="text-xl font-bold text-gray-900">24/7</p>
                <p className="mt-1 text-sm text-gray-500">Ticket tracking</p>
              </div>

              <div>
                <p className="text-xl font-bold text-gray-900">Live</p>
                <p className="mt-1 text-sm text-gray-500">Agent communication</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          >
            <div className="rounded-3xl border border-gray-200 bg-gray-50 p-4 shadow-2xl">
              <div className="rounded-2xl bg-white p-6">
                <div className="flex items-center justify-between border-b border-gray-100 pb-5">
                  <div>
                    <p className="text-sm text-gray-500">Support Dashboard</p>
                    <h2 className="mt-1 text-xl font-bold text-gray-900">
                      Ticket Overview
                    </h2>
                  </div>

                  <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600">
                    Live
                  </span>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  <div className="rounded-xl bg-gray-50 p-4">
                    <p className="text-xs text-gray-500">New</p>
                    <p className="mt-1 text-2xl font-bold text-gray-900">12</p>
                  </div>

                  <div className="rounded-xl bg-gray-50 p-4">
                    <p className="text-xs text-gray-500">Progress</p>
                    <p className="mt-1 text-2xl font-bold text-gray-900">08</p>
                  </div>

                  <div className="rounded-xl bg-gray-50 p-4">
                    <p className="text-xs text-gray-500">Resolved</p>
                    <p className="mt-1 text-2xl font-bold text-gray-900">24</p>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center justify-between rounded-xl border border-gray-100 p-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        Duplicate payment
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        Billing · #TKT-1024
                      </p>
                    </div>

                    <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
                      High
                    </span>
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-gray-100 p-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        Unable to login
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        Account · #TKT-1025
                      </p>
                    </div>

                    <span className="rounded-full bg-yellow-50 px-3 py-1 text-xs font-semibold text-yellow-700">
                      Medium
                    </span>
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-gray-100 p-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        Order status
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        Orders · #TKT-1026
                      </p>
                    </div>

                    <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600">
                      Low
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section
        id="about"
        className="border-t border-gray-100 bg-gray-50 px-6 py-20"
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <p className="text-sm font-semibold text-blue-600">
                About SupportDesk
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
                One place for the complete support journey.
              </h2>

              <p className="mt-5 leading-7 text-gray-600">
                SupportDesk helps customers and support agents manage
                customer issues from the first ticket to final resolution.
              </p>

              <p className="mt-4 leading-7 text-gray-600">
                AI assists agents by suggesting the category, priority,
                and summary of each ticket, while the final decision
                always remains with the human agent.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
              className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm"
            >
              <div className="space-y-6">
                <div>
                  <p className="text-sm font-semibold text-gray-900">Customer</p>
                  <p className="mt-1 text-sm text-gray-500">
                    Creates and tracks support tickets.
                  </p>
                </div>

                <div className="h-px bg-gray-100" />

                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    AI Assistant
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Suggests category, priority and summary.
                  </p>
                </div>

                <div className="h-px bg-gray-100" />

                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Support Agent
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Reviews, responds and resolves the issue.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section id="how-it-works" className="bg-white px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mx-auto max-w-2xl text-center"
          >
            <p className="text-sm font-semibold text-blue-600">How It Works</p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              From issue to resolution
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              A simple workflow keeps every customer issue organized.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="mt-12 grid gap-6 md:grid-cols-4"
          >
            {[
              { num: "01", title: "Submit Ticket", desc: "Customer describes the issue and submits a support ticket." },
              { num: "02", title: "AI Triage", desc: "AI suggests the category, priority and issue summary." },
              { num: "03", title: "Agent Handles", desc: "Agent reviews the AI result, replies and updates the ticket." },
              { num: "04", title: "Resolve", desc: "Agent adds a resolution note and resolves the ticket." },
            ].map((step) => (
              <motion.div
                key={step.num}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl border border-gray-200 p-6"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 font-bold text-blue-600">
                  {step.num}
                </div>

                <h3 className="mt-5 font-semibold text-gray-900">{step.title}</h3>

                <p className="mt-2 text-sm leading-6 text-gray-600">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-gray-50 px-6 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-4xl rounded-3xl bg-gray-950 px-8 py-14 text-center text-white md:px-14"
        >
          <h2 className="text-3xl font-bold md:text-4xl">
            Ready to get better support?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-400">
            Create an account and start managing your support requests
            with a smarter workflow.
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="mt-8 inline-block"
          >
            <Link
              to="/signup"
              className="inline-block rounded-xl bg-blue-600 px-7 py-3.5 font-semibold text-white transition hover:bg-blue-700"
            >
              Get Started
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
};

export default Home;