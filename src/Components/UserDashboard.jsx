import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserDashboard.css';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [userEmail] = useState(localStorage.getItem('userEmail') || 'Trader');
  const [showBalance, setShowBalance] = useState(true);

  // Security Check
  useEffect(() => {
    if (localStorage.getItem('isAuthenticated') !== 'true') {
      navigate('/auth');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="dashboard-wrapper">
      {/* SIDEBAR - Desktop Only */}
      <aside className="db-sidebar">
        <div className="db-logo">E-MAX<span>.</span></div>
        <nav className="desktop-nav">
          <div className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>📊 Overview</div>
          <div className={`nav-item ${activeTab === 'history' ? 'active' : ''}`} onClick={() => setActiveTab('history')}>💸 Trade History</div>
          <div className={`nav-item ${activeTab === 'payout' ? 'active' : ''}`} onClick={() => setActiveTab('payout')}>🏦 Payout Accounts</div>
          <div className={`nav-item ${activeTab === 'security' ? 'active' : ''}`} onClick={() => setActiveTab('security')}>🔐 Security</div>
        </nav>
        <button className="db-logout" onClick={handleLogout}>Logout</button>
      </aside>

      {/* MOBILE TOP BAR */}
      <div className="mobile-top-bar">
        <div className="db-logo">E-MAX<span>.</span></div>
        <div className="avatar-circle small">{userEmail[0].toUpperCase()}</div>
      </div>

      {/* MAIN CONTENT AREA */}
      <main className="db-content">
        <header className="db-header desktop-only">
          <div className="header-text">
            <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
            <p>Welcome back, {userEmail.split('@')[0]}</p>
          </div>
          <div className="header-profile">
            <div className="avatar-circle">{userEmail[0].toUpperCase()}</div>
          </div>
        </header>

        {/* --- TAB 1: OVERVIEW --- */}
        {activeTab === 'overview' && (
          <div className="section-fade">
            <div className="wallet-card">
              <div className="wallet-main">
                <div className="wallet-label-row">
                  <label>Total Traded Balance</label>
                  <button className="eye-btn" onClick={() => setShowBalance(!showBalance)}>
                    {showBalance ? '👁️' : '🙈'}
                  </button>
                </div>
                <h2>{showBalance ? '$12,450.00' : '****.***'}</h2>
              </div>
              <div className="wallet-stats">
                <span>Profit: <strong className="txt-green">+$450.00</strong></span>
                <span>Active: <strong>1 Trade</strong></span>
              </div>
            </div>

            <div className="overview-cards">
              <div className="ov-card gold">
                <label>Recent Order</label>
                <h3>$500.00 USDT</h3>
                <span className="pill yellow">Verifying</span>
              </div>
              <div className="ov-card">
                <label>Market Rate</label>
                <h3>₦1,650 / $1</h3>
                <span className="txt-green">Live Rate</span>
              </div>
            </div>
          </div>
        )}

        {/* --- TAB 2: TRADE HISTORY --- */}
        {activeTab === 'history' && (
          <div className="section-fade">
            <div className="table-card">
              <table className="db-table">
                <thead>
                  <tr>
                    <th>Trade ID</th>
                    <th>Asset</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td data-label="ID">#EMX-992</td>
                    <td data-label="Asset">USDT</td>
                    <td data-label="Type" className="txt-red">SELL</td>
                    <td data-label="Amount">$500.00</td>
                    <td data-label="Status"><span className="pill green">Paid</span></td>
                  </tr>
                  <tr>
                    <td data-label="ID">#EMX-105</td>
                    <td data-label="Asset">BTC</td>
                    <td data-label="Type" className="txt-green">BUY</td>
                    <td data-label="Amount">$1,200.00</td>
                    <td data-label="Status"><span className="pill yellow">Pending</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- TAB 3: PAYOUT ACCOUNTS --- */}
        {activeTab === 'payout' && (
          <div className="section-fade">
            <div className="payout-container">
              <div className="account-card primary">
                <div className="bank-info">
                  <div className="bank-logo">OP</div>
                  <div>
                    <h3>Opay Digital Bank</h3>
                    <p>9123991180 • Anita Imohiedfe</p>
                  </div>
                </div>
                <span className="badge-verified">Primary</span>
              </div>
              <button className="add-acc-btn">+ Add New Account</button>
            </div>
          </div>
        )}

        {/* --- TAB 4: SECURITY SETTINGS --- */}
        {activeTab === 'security' && (
          <div className="section-fade">
            <div className="settings-container">
              <div className="settings-profile-card">
                <div className="avatar-large">{userEmail[0].toUpperCase()}</div>
                <div className="profile-info">
                  <h3>{userEmail.split('@')[0]}</h3>
                  <p>{userEmail}</p>
                  <span className="badge-verified">ID Verified</span>
                </div>
              </div>

              <div className="settings-group">
                <h4>Security</h4>
                <div className="setting-card">
                  <div className="setting-icon">🛡️</div>
                  <div className="setting-text">
                    <strong>Two-Factor Auth</strong>
                    <p>Keep your trades extra secure</p>
                  </div>
                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider round"></span>
                  </label>
                </div>
              </div>

              <div className="settings-group">
                <h4>System</h4>
                <div className="setting-card" onClick={handleLogout}>
                  <div className="setting-icon">🚪</div>
                  <div className="setting-text">
                    <strong className="txt-red">Logout</strong>
                    <p>Securely exit your account</p>
                  </div>
                  <span className="arrow">›</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      <nav className="mobile-nav">
        <div className={`mob-nav-item ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
          <span className="nav-icon">📊</span><span>Home</span>
        </div>
        <div className={`mob-nav-item ${activeTab === 'history' ? 'active' : ''}`} onClick={() => setActiveTab('history')}>
          <span className="nav-icon">💸</span><span>History</span>
        </div>
        <div className="nav-fab-wrap">
          <button className="nav-fab" onClick={() => alert("Trade System Loading...")}>+</button>
        </div>
        <div className={`mob-nav-item ${activeTab === 'payout' ? 'active' : ''}`} onClick={() => setActiveTab('payout')}>
          <span className="nav-icon">🏦</span><span>Bank</span>
        </div>
        <div className={`mob-nav-item ${activeTab === 'security' ? 'active' : ''}`} onClick={() => setActiveTab('security')}>
          <span className="nav-icon">🔐</span><span>Settings</span>
        </div>
      </nav>
    </div>
  );
};

export default UserDashboard;