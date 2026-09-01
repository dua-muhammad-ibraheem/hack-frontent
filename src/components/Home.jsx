import { Link } from "react-router-dom";

const Home = () => {
return ( <main>
{/* Hero */} <section className="bg-white"> <div className="mx-auto grid min-h-[calc(100vh-64px)] max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-2 lg:py-24">


      <div>
        <div className="mb-6 inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
          Customer Support Management
        </div>

        <h1 className="max-w-2xl text-5xl font-bold leading-tight tracking-tight text-gray-900 md:text-6xl">
          Support customers
          <span className="text-blue-600"> faster and easier.</span>
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
          Create support tickets, connect with support workers,
          communicate about your issues, and track every resolution
          from one simple dashboard.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            to="/signup"
            className="rounded-xl bg-blue-600 px-7 py-3.5 font-semibold text-white transition hover:bg-blue-700"
          >
            Get Started
          </Link>

          <Link
            to="/how-it-works"
            className="rounded-xl border border-gray-300 px-7 py-3.5 font-semibold text-gray-800 transition hover:bg-gray-50"
          >
            How It Works
          </Link>
        </div>

        <div className="mt-10 flex flex-wrap gap-8 text-sm text-gray-600">
          <div>
            <span className="font-bold text-gray-900">Easy</span>
            <p>Create support tickets</p>
          </div>

          <div>
            <span className="font-bold text-gray-900">Direct</span>
            <p>Worker communication</p>
          </div>

          <div>
            <span className="font-bold text-gray-900">Secure</span>
            <p>Protected support areas</p>
          </div>
        </div>
      </div>

      {/* Dashboard Preview */}
      <div className="relative">
        <div className="rounded-3xl border border-gray-200 bg-gray-50 p-4 shadow-2xl">
          <div className="rounded-2xl bg-white p-6">
            
            <div className="flex items-center justify-between border-b border-gray-100 pb-5">
              <div>
                <p className="text-sm text-gray-500">Support Dashboard</p>
                <h2 className="mt-1 text-xl font-bold text-gray-900">
                  Ticket Overview
                </h2>
              </div>

              <div className="rounded-lg bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-600">
                Active
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs text-gray-500">New</p>
                <p className="mt-1 text-2xl font-bold text-gray-900">12</p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs text-gray-500">In Progress</p>
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
      </div>

    </div>
  </section>

  {/* Features */}
  <section className="border-t border-gray-100 bg-gray-50 px-6 py-20">
    <div className="mx-auto max-w-7xl">
      
      <div className="max-w-2xl">
        <p className="text-sm font-semibold text-blue-600">
          Everything in one place
        </p>

        <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
          A simpler way to handle support
        </h2>

        <p className="mt-4 leading-7 text-gray-600">
          From the first customer request to the final resolution,
          SupportDesk keeps the entire support workflow organized.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        
        <div className="rounded-2xl border border-gray-200 bg-white p-7">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 font-bold text-blue-600">
            ✓
          </div>

          <h3 className="mt-5 text-lg font-semibold text-gray-900">
            Smart Worker Assignment
          </h3>

          <p className="mt-2 leading-6 text-gray-600">
            Customers can select a category and choose an available
            support worker to handle their request.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-7">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 font-bold text-blue-600">
            ↔
          </div>

          <h3 className="mt-5 text-lg font-semibold text-gray-900">
            Direct Communication
          </h3>

          <p className="mt-2 leading-6 text-gray-600">
            Customers and workers can communicate through ticket replies
            and keep all issue details in one place.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-7">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 font-bold text-blue-600">
            ✓
          </div>

          <h3 className="mt-5 text-lg font-semibold text-gray-900">
            Clear Resolution
          </h3>

          <p className="mt-2 leading-6 text-gray-600">
            Workers can manage ticket priority, update progress, and
            complete requests when the issue has been resolved.
          </p>
        </div>

      </div>
    </div>
  </section>
</main>


);
};

export default Home;
