
import { Link } from "react-router-dom";

const CustomerDashboard = () => {
  const tickets = [
    {
      id: "TKT-1001",
      subject: "Duplicate payment",
      category: "Billing",
      priority: "High",
      status: "In Progress",
      date: "Today",
    },
    {
      id: "TKT-1002",
      subject: "Unable to login",
      category: "Account",
      priority: "Medium",
      status: "Assigned",
      date: "Yesterday",
    },
    {
      id: "TKT-1003",
      subject: "Order delivery status",
      category: "Orders",
      priority: "Low",
      status: "Resolved",
      date: "2 days ago",
    },
  ];

  const getPriorityStyle = (priority) => {
    if (priority === "High") {
      return "bg-red-50 text-red-600";
    }

    if (priority === "Medium") {
      return "bg-yellow-50 text-yellow-700";
    }

    return "bg-green-50 text-green-600";
  };

  const getStatusStyle = (status) => {
    if (status === "Resolved") {
      return "bg-green-50 text-green-600";
    }

    if (status === "In Progress") {
      return "bg-blue-50 text-blue-600";
    }

    return "bg-gray-100 text-gray-600";
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-medium text-blue-600">
                Customer Dashboard
              </p>

              <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-900">
                Welcome back, Ayesha 👋
              </h1>

              <p className="mt-2 text-gray-600">
                Manage your support requests and track their progress.
              </p>
            </div>

            <Link
              to="/create-ticket"
              className="inline-flex w-fit items-center rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              + Create Ticket
            </Link>
          </div>
        </div>
      </section>

      {/* Dashboard */}
      <section className="mx-auto max-w-7xl px-6 py-8">
        {/* Statistics */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Total Tickets
            </p>

            <p className="mt-2 text-3xl font-bold text-gray-900">3</p>

            <p className="mt-2 text-xs text-gray-500">
              All your support requests
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              New
            </p>

            <p className="mt-2 text-3xl font-bold text-gray-900">0</p>

            <p className="mt-2 text-xs text-gray-500">
              Waiting for assignment
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              In Progress
            </p>

            <p className="mt-2 text-3xl font-bold text-gray-900">1</p>

            <p className="mt-2 text-xs text-gray-500">
              Currently being handled
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Resolved
            </p>

            <p className="mt-2 text-3xl font-bold text-gray-900">1</p>

            <p className="mt-2 text-xs text-gray-500">
              Successfully resolved
            </p>
          </div>
        </div>

        {/* Tickets */}
        <div className="mt-8 rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="flex flex-col justify-between gap-3 border-b border-gray-100 p-6 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                My Tickets
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                View and track your recent support requests.
              </p>
            </div>

            <Link
              to="/create-ticket"
              className="text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              Create new ticket →
            </Link>
          </div>

          {/* Desktop Table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full text-left">
              <thead className="border-b border-gray-100 bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Ticket
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Category
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Priority
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Status
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Date
                  </th>

                  <th className="px-6 py-4"></th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {tickets.map((ticket) => (
                  <tr
                    key={ticket.id}
                    className="transition hover:bg-gray-50"
                  >
                    <td className="px-6 py-5">
                      <p className="font-semibold text-gray-900">
                        {ticket.subject}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        {ticket.id}
                      </p>
                    </td>

                    <td className="px-6 py-5 text-sm text-gray-600">
                      {ticket.category}
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${getPriorityStyle(
                          ticket.priority
                        )}`}
                      >
                        {ticket.priority}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                          ticket.status
                        )}`}
                      >
                        {ticket.status}
                      </span>
                    </td>

                    <td className="px-6 py-5 text-sm text-gray-500">
                      {ticket.date}
                    </td>

                    <td className="px-6 py-5 text-right">
                      <Link
                        to={`/tickets/${ticket.id}`}
                        className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="divide-y divide-gray-100 md:hidden">
            {tickets.map((ticket) => (
              <div key={ticket.id} className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-gray-900">
                      {ticket.subject}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {ticket.id}
                    </p>
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${getPriorityStyle(
                      ticket.priority
                    )}`}
                  >
                    {ticket.priority}
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">
                      {ticket.category}
                    </p>

                    <span
                      className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                        ticket.status
                      )}`}
                    >
                      {ticket.status}
                    </span>
                  </div>

                  <Link
                    to={`/tickets/${ticket.id}`}
                    className="text-sm font-semibold text-blue-600"
                  >
                    View →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default CustomerDashboard;

