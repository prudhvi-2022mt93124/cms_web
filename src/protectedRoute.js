import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component, role, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem('authToken');
  const userRole = localStorage.getItem('userRole');

  if (isAuthenticated && userRole === role) {
    return Component;
  } else {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
