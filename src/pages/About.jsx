
const About = () => {
  return (
    <main className="bg-white">
      <section className="mx-auto max-w-4xl px-6 py-20 text-center">
        <div className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
          About SupportDesk
        </div>

        <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
          Support that keeps the whole conversation together.
        </h1>

        <p className="mt-6 text-lg leading-8 text-gray-600">
          SupportDesk is designed to simplify customer support by bringing
          ticket management, AI-assisted triage, agent communication, and
          resolution tracking into one focused workspace.
        </p>
      </section>

      <section className="border-t border-gray-100 bg-gray-50 px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-7">
            <h2 className="text-xl font-bold text-gray-900">For Customers</h2>
            <p className="mt-3 leading-7 text-gray-600">
              Submit issues, follow ticket status, and communicate with
              your assigned support agent.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-7">
            <h2 className="text-xl font-bold text-gray-900">For Agents</h2>
            <p className="mt-3 leading-7 text-gray-600">
              Review incoming tickets, use AI suggestions, respond to
              customers, and resolve issues efficiently.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-7">
            <h2 className="text-xl font-bold text-gray-900">AI Assisted</h2>
            <p className="mt-3 leading-7 text-gray-600">
              AI helps identify category, priority, and a concise issue
              summary while keeping final decisions with the human agent.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;

