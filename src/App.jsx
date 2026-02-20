import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './Components/Shared/Nav';

import './App.css';
import Home from './Components/Home';
import LiveRatesPage from './Pages/LiveRates';
import AdminDashboardPage from './Pages/AdminDashboard';
import AdminLoginPage from './Pages/AdminLogin';
import AuthPage from './Pages/Auth';
import HowItWorks from './Pages/HowItWorks';
import UserDashboardPage from './Pages/UserDashboard';
import AdminLogin from './Pages/AdminLogin';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Nav is outside Routes so it stays on every page */}
        <Nav /> 
        
        <Routes>
          {/* This tells React: "When the URL is '/', show the Home component" */}
          <Route path="/" element={<Home />} />
          <Route path="/rates" element={<LiveRatesPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/admin-login" element={<AdminLoginPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/user-dashboard" element={<UserDashboardPage />} />
          <Route path="/staff-login" element={<AdminLogin />} />
          
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;