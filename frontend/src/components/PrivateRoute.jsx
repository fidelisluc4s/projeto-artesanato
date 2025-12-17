import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-amber-600 text-lg">Carregando...</div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;