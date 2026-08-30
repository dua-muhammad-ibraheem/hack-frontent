
const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Create a Ticket",
      text: "The customer submits a subject, description, and optional category.",
    },
    {
      number: "02",
      title: "AI Triage",
      text: "AI analyzes the issue and suggests a category, priority, and short summary.",
    },
    {
      number: "03",
      title: "Agent Review",
      text: "The support agent reviews and can edit the AI suggestions before they are finalized.",
    },
    {
      number: "04",
      title: "Conversation",
      text: "The customer and assigned agent exchange messages while the issue is being handled.",
    },
    {
      number: "05",
      title: "Resolution",
      text: "The agent adds a resolution note and marks the ticket as resolved.",
    },
  ];

  return (
    <main className="bg-white">
      <section className="mx-auto max-w-4xl px-6 py-20 text-center">
        <div className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
          How It Works
        </div>

        <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
          From customer issue to resolution.
        </h1>

        <p className="mt-5 text-lg leading-8 text-gray-600">
          A simple workflow designed to help support teams understand,
          communicate, and resolve customer issues efficiently.
        </p>
      </section>

      <section className="border-t border-gray-100 bg-gray-50 px-6 py-16">
        <div className="mx-auto max-w-4xl space-y-5">
          {steps.map((step) => (
            <div
              key={step.number}
              className="flex gap-5 rounded-2xl border border-gray-200 bg-white p-6"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 font-bold text-blue-600">
                {step.number}
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {step.title}
                </h2>

                <p className="mt-2 leading-6 text-gray-600">
                  {step.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default HowItWorks;

