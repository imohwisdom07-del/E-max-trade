import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserDashboard from '../Components/UserDashboard.jsx';

function UserDashboardPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated before rendering dashboard
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const userRole = localStorage.getItem('userRole');

    if (!isAuthenticated || userRole !== 'client') {
      // If not authenticated or not a client, redirect to auth page
      navigate('/auth');
    }
  }, [navigate]);

  return (
    <UserDashboard />
  );
}

export default UserDashboardPage;
