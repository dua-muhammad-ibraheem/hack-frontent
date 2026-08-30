import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import TicketDetail from "./pages/TicketDetail";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CustomerDashboard from "./pages/CustomerDashboard";
import WorkerDashboard from "./pages/WorkerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import CreateTicket from "./pages/CreateTicket";
// import TicketDetail from "./pages/TicketDetail";
const App = () => {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />

      <div className="flex-1">
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Customer only */}
          <Route
            path="/customer-dashboard"
            element={
              <ProtectedRoute allowedRoles={["customer"]}>
                <CustomerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
  path="/tickets/:id"
  element={
    <ProtectedRoute allowedRoles={["customer", "worker", "admin"]}>
      <TicketDetail />
    </ProtectedRoute>
  }
/>
          <Route
            path="/create-ticket"
            element={
              <ProtectedRoute allowedRoles={["customer"]}>
                <CreateTicket />
              </ProtectedRoute>
            }
          />

          {/* Worker only */}
          <Route
            path="/worker-dashboard"
            element={
              <ProtectedRoute allowedRoles={["worker"]}>
                <WorkerDashboard />
              </ProtectedRoute>
            }
          />

          <Route
  path="/tickets/:id"
  element={
    <ProtectedRoute allowedRoles={["customer", "worker", "admin"]}>
      <TicketDetail />
    </ProtectedRoute>
  }
/>

          {/* Admin only */}
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>

      <Footer />
    </div>
  );
};

export default App;