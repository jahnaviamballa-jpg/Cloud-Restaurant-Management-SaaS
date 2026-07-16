import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const userRole = user.role.toLowerCase();

  const roles = allowedRoles.map(role => role.toLowerCase());

  if (!roles.includes(userRole)) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;