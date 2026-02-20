import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const navigate = useNavigate();

  const handleAdminAccess = (e) => {
    e.preventDefault();
    setIsVerifying(true);

    // Simulated Security Check Delay
    setTimeout(() => {
      if (email.toLowerCase() === "admin@emax.com") {
        // Navigate to the admin dashboard
        navigate('/admin');
      } else {
        alert("Unauthorized Admin Identity");
        setIsVerifying(false);
      }
    }, 1500);
  };

  return (
    <div className="admin-login-page">
      <div className="login-glass-card">
        <div className="status-badge">RESRICTED AREA</div>
        <h1>Staff Login</h1>
        <p className="login-subtitle">Please verify your identity to continue to the terminal.</p>

        <form onSubmit={handleAdminAccess}>
          <div className="input-box">
            <label>Admin Email</label>
            <input 
              type="email" 
              placeholder="name@emax.com" 
              required 
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button type="submit" className="login-trigger" disabled={isVerifying}>
            {isVerifying ? "Verifying Identity..." : "Continue to Terminal"}
          </button>
        </form>

        <div className="login-footer">
          <p>Encryption: AES-256 Enabled</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;