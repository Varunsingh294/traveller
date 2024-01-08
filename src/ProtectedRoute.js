import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, isAuthenticated, fallbackPath }) => {
  return isAuthenticated ? (
    element
  ) : (
    <Navigate to={fallbackPath} replace state={{ from: window.location.pathname }} />
  );
};

export default ProtectedRoute;