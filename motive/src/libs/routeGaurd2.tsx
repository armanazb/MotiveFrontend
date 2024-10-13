// RouteGuard.tsx
import React from "react";
import { Navigate } from "react-router-dom";

interface RouteGuardProps {
  children: React.ReactNode;
}

const RouteGuard: React.FC<RouteGuardProps> = ({ children }) => {
  // Check if token exists in localStorage
  const token = localStorage.getItem("authToken"); // You can change this to sessionStorage if needed

  if (token) {
    // Redirect to login or any other route if token is not present
    return <Navigate to="/" />;
  } else return <>{children}</>;
};

export default RouteGuard;
