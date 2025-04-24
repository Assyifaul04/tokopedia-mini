import React from 'react'
import { Navigate } from 'react-router-dom'

const UserPrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")); // Perlu parse JSON

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== 'user') {
    return <Navigate to="/dashboard" replace />; // Arahkan admin ke dashboard
  }

  return children;
};

export default UserPrivateRoute;
