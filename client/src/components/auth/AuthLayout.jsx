import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../Loader";

// Component for routes that require authentication
export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading, token } = useSelector(
    (state) => state.auth,
  );
  const location = useLocation();

  if (loading && token) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

// Component for routes that require owner role
export const OwnerRoute = ({ children }) => {
  const { isAuthenticated, isOwner, loading, token } = useSelector(
    (state) => state.auth,
  );
  const location = useLocation();

  if (loading && token) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (!isOwner) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// Component for routes that should redirect authenticated users
export const PublicRoute = ({ children, redirectTo = "/" }) => {
  const { isAuthenticated, loading, token } = useSelector(
    (state) => state.auth,
  );

  if (loading && token) {
    return <Loader />;
  }

  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};

// Component for routes accessible to anyone (no restrictions)
export const PublicLayout = ({ children }) => {
  return children;
};
