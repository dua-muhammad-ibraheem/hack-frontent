import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    const dashboardByRole = {
      customer: "/customer-dashboard",
      worker: "/worker-dashboard",
      admin: "/admin-dashboard",
    };

    const target = dashboardByRole[user.role] || "/";

    return <Navigate to={target} replace />;
  }

  return children;
};

export default ProtectedRoute;