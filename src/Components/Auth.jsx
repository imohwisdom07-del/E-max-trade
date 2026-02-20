import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleAuth = (e) => {
    e.preventDefault();
    
    // Save authentication state locally
    localStorage.setItem('userEmail', email);
    localStorage.setItem('isAuthenticated', 'true');
    
    // Simple logic: if email contains 'admin', treat as staff, else client
    if (email.toLowerCase().includes('admin') || email.toLowerCase().includes('staff')) {
      localStorage.setItem('userRole', 'admin');
      alert("Welcome to the Staff Portal.");
      navigate('/admin');
    } else {
      localStorage.setItem('userRole', 'client');
      alert(isLogin ? "Welcome back to E-Max!" : "Account created successfully!");
      navigate('/user-dashboard'); // Now sends clients to the dashboard
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <div className="auth-visual">
          <div className="visual-content">
            <span className="visual-badge">E-MAX TRADE</span>
            <h2>{isLogin ? "Welcome Back!" : "Join the Elite."}</h2>
            <p>Experience the fastest asset trading platform in Nigeria. 5-minute payouts guaranteed.</p>
            <div className="auth-stats">
              <span>⚡ Instant Payouts</span>
              <span>🛡️ Secure Transactions</span>
            </div>
          </div>
        </div>

        <div className="auth-form-section">
          <div className="form-header">
            <h1>{isLogin ? "Sign In" : "Create Account"}</h1>
            <p>{isLogin ? "Enter your credentials to continue" : "Join thousands of traders today"}</p>
          </div>

          <form onSubmit={handleAuth}>
            {!isLogin && (
              <div className="input-group">
                <label>Full Name</label>
                <input type="text" placeholder="e.g. John Doe" required />
              </div>
            )}
            
            <div className="input-group">
              <label>Email Address</label>
              <input 
                type="email" 
                placeholder="name@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>

            <button type="submit" className="auth-submit-btn">
              {isLogin ? "Login to Dashboard" : "Get Started Now"}
            </button>
          </form>

          <p className="auth-toggle">
            {isLogin ? "Don't have an account?" : "Already have an account?"} 
            <span onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? " Sign Up" : " Log In"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;