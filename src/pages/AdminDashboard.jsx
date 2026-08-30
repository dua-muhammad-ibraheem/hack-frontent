const AdminDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-medium text-blue-600">Admin Dashboard</p>

        <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-900">
          Welcome, {user.name || "Admin"}
        </h1>

        <p className="mt-3 text-gray-600">
          Admin tools are coming soon. This is a placeholder page so admin
          login works end-to-end.
        </p>
      </div>
    </main>
  );
};

export default AdminDashboard;