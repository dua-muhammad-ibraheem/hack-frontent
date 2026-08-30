
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CustomerDashboard from "./pages/CustomerDashboard";
import CreateTicket from "./pages/CreateTicket";
const App = () => {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />

      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/customer-dashboard"
            element={<CustomerDashboard />}
          />
          <Route path="/create-ticket" element={<CreateTicket />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
};

export default App;

