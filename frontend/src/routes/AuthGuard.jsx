import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function AuthGuard({ children }) {
  const { pathname } = useLocation();
  const isAuthenticated = localStorage.getItem("token") !== null;

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return <Navigate to="/login" state={{ from: pathname }} replace />;
}
