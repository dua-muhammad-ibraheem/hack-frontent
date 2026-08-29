import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className="min-h-[calc(100vh-64px)] bg-white">
      
      <section className="mx-auto flex max-w-7xl flex-col items-center px-6 py-20 text-center lg:py-28">
        
        <div className="mb-6 rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600">
          Build your professional future
        </div>

        <h1 className="max-w-4xl text-5xl font-bold leading-tight tracking-tight text-gray-900 md:text-6xl">
          Create a resume that
          <span className="text-blue-600"> stands out.</span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
          Build a professional resume with a simple and modern
          experience. Showcase your skills, experience and
          achievements with confidence.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            to="/signup"
            className="rounded-xl bg-blue-600 px-7 py-3.5 font-semibold text-white transition hover:bg-blue-700"
          >
            Get Started
          </Link>

          <Link
            to="/login"
            className="rounded-xl border border-gray-300 px-7 py-3.5 font-semibold text-gray-800 transition hover:bg-gray-50"
          >
            Login
          </Link>
        </div>

        {/* Preview */}
        <div className="mt-16 w-full max-w-4xl">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 shadow-xl">
            
            <div className="rounded-xl bg-white p-8 text-left">
              
              <div className="flex items-start justify-between border-b border-gray-200 pb-6">
                <div>
                  <div className="h-5 w-48 rounded bg-gray-200" />
                  <div className="mt-3 h-3 w-32 rounded bg-gray-100" />
                </div>

                <div className="h-14 w-14 rounded-full bg-blue-100" />
              </div>

              <div className="mt-7 grid gap-8 md:grid-cols-3">
                
                <div className="md:col-span-1">
                  <div className="h-3 w-24 rounded bg-gray-200" />

                  <div className="mt-4 space-y-3">
                    <div className="h-2 w-full rounded bg-gray-100" />
                    <div className="h-2 w-5/6 rounded bg-gray-100" />
                    <div className="h-2 w-4/6 rounded bg-gray-100" />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <div className="h-3 w-32 rounded bg-gray-200" />

                  <div className="mt-4 space-y-3">
                    <div className="h-2 w-full rounded bg-gray-100" />
                    <div className="h-2 w-full rounded bg-gray-100" />
                    <div className="h-2 w-5/6 rounded bg-gray-100" />
                  </div>

                  <div className="mt-8 h-3 w-28 rounded bg-gray-200" />

                  <div className="mt-4 space-y-3">
                    <div className="h-2 w-full rounded bg-gray-100" />
                    <div className="h-2 w-4/5 rounded bg-gray-100" />
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Features */}
      <section className="border-t border-gray-100 bg-gray-50 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Everything you need
            </h2>

            <p className="mt-3 text-gray-600">
              A simple way to present yourself professionally.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            
            <div className="rounded-2xl bg-white p-7 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 font-bold text-blue-600">
                01
              </div>

              <h3 className="mt-5 text-lg font-semibold text-gray-900">
                Simple
              </h3>

              <p className="mt-2 leading-6 text-gray-600">
                Create your professional profile without unnecessary
                complexity.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-7 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 font-bold text-blue-600">
                02
              </div>

              <h3 className="mt-5 text-lg font-semibold text-gray-900">
                Professional
              </h3>

              <p className="mt-2 leading-6 text-gray-600">
                Present your skills and experience in a clean format.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-7 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 font-bold text-blue-600">
                03
              </div>

              <h3 className="mt-5 text-lg font-semibold text-gray-900">
                Ready to grow
              </h3>

              <p className="mt-2 leading-6 text-gray-600">
                Build a profile that helps you move toward your goals.
              </p>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
};

export default Home;