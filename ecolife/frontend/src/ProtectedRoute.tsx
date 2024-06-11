// src/ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

interface ProtectedRouteProps {
  component: React.ComponentType<any>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, ...rest }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a proper loading indicator
  }

  return currentUser ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
