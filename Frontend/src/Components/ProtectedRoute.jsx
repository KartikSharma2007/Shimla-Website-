import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, role }) => {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div className="sh-loading-screen" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If user is banned/inactive, send them to login with banned notice
  if (user && user.isActive === false) {
    return <Navigate to="/login?banned=true" replace />;
  }

  // Role-based guard — used for /admin route
  if (role && user?.role !== role) {
    return <Navigate to="/account" replace />;
  }

  return children;
};

export default ProtectedRoute;
