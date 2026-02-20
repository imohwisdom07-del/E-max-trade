import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Nav.css';

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  
  // Use useRef to store the timer so it persists across renders
  const timerRef = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // --- SECRET GATEWAY LOGIC ---
  const startTimer = () => {
    // Clear any existing timer just in case
    if (timerRef.current) clearTimeout(timerRef.current);
    
    // Start the 3-second countdown
    timerRef.current = setTimeout(() => {
      navigate('/staff-login'); // The secret path
    }, 3000); 
  };

  const stopTimer = () => {
    // If they let go before 3 seconds, cancel the redirect
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* LOGO WITH SECRET HOLD FEATURE */}
        <div 
          className="nav-logo-container" 
          onMouseDown={startTimer} 
          onMouseUp={stopTimer}
          onMouseLeave={stopTimer}
          onTouchStart={startTimer} // Mobile support
          onTouchEnd={stopTimer}
        >
          <Link to="/" onClick={closeMenu}>
            <img 
              src="/E-max logo.png" 
              alt="E-Max Logo" 
              className="nav-logo-img" 
            />
          </Link>
        </div>

        {/* HAMBURGER ICON */}
        <div className={`hamburger ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        {/* DROP DOWN MENU */}
        <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
          <li><Link to="/" onClick={closeMenu}>Home</Link></li>
          <li><Link to="/rates" onClick={closeMenu}>Rates</Link></li>
          <li><Link to="/how-it-works" onClick={closeMenu}>How It Works</Link></li>
          <li className="mobile-only-item">
            <Link to="/auth" className="nav-btn-mobile" onClick={closeMenu}>Get Started</Link>
          </li>
        </ul>

        {/* DESKTOP BUTTON */}
        <div className="nav-auth-desktop">
          <Link to="/auth" className="nav-btn">Get Started</Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;