import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  // --- STATE MANAGEMENT ---
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('rates'); // 'rates' or 'trades'

  // Market States
  const [dollarRate, setDollarRate] = useState(1605);
  const [profitMargin, setProfitMargin] = useState(2);
  const [autoPrices, setAutoPrices] = useState({});
  const [isOnline, setIsOnline] = useState(true);

  // Transaction States (Mock Data for now)
  const [transactions, setTransactions] = useState([
    { id: 'TX-8821', user: 'Chidi Okafor', type: 'SELL', asset: '0.045 BTC', payout: '₦6,850,000', status: 'Pending', time: '5m ago', bank: 'Access Bank - 0122334455' },
    { id: 'TX-8822', user: 'Amaka Smith', type: 'BUY', asset: '500 USDT', payout: '₦802,500', status: 'Completed', time: '2h ago', bank: 'Kuda - 2011223344' },
    { id: 'TX-8823', user: 'Tunde Dev', type: 'SELL', asset: '1.2 ETH', payout: '₦5,200,000', status: 'Pending', time: '12m ago', bank: 'Zenith - 1022334455' },
  ]);

  // --- API FETCH LOGIC ---
  useEffect(() => {
    if (!isUnlocked) return;
    const fetchPrices = async () => {
      try {
        const coins = 'bitcoin,ethereum,tether,solana,binancecoin,cardano,ripple,dogecoin,tron,polkadot';
        const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coins}&vs_currencies=usd`);
        const data = await response.json();
        setAutoPrices(data);
      } catch (err) { console.error("Price Error:", err); }
    };
    fetchPrices();
    const interval = setInterval(fetchPrices, 60000);
    return () => clearInterval(interval);
  }, [isUnlocked]);

  const handleUnlock = (e) => {
    e.preventDefault();
    if (password === "EMax_Admin_2026!@") { setIsUnlocked(true); setError(''); }
    else { setError('Invalid Authorization Key'); }
  };

  const calculatePayout = (usdPrice) => {
    const rawNaira = (usdPrice || 0) * dollarRate;
    return Math.floor(rawNaira - (rawNaira * profitMargin / 100));
  };

  const handleAction = (id, newStatus) => {
    setTransactions(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t));
  };

  // --- RENDER 1: VAULT ---
  if (!isUnlocked) {
    return (
      <div className="vault-overlay">
        <div className="vault-card">
          <div className="lock-icon">🔐</div>
          <h2>E-Max Secure Terminal</h2>
          <form onSubmit={handleUnlock}>
            <input type="password" placeholder="Enter Admin Key..." onChange={(e) => setPassword(e.target.value)} autoFocus />
            {error && <p className="error-text">{error}</p>}
            <button type="submit" className="unlock-btn">Access System</button>
          </form>
        </div>
      </div>
    );
  }

  // --- RENDER 2: DASHBOARD ---
  return (
    <div className="admin-wrapper">
      <aside className="side-nav">
        <div className="side-logo">E-MAX <span className="admin-tag">ADMIN</span></div>
        <div className="nav-group">
          <div className={`nav-item ${activeTab === 'rates' ? 'active' : ''}`} onClick={() => setActiveTab('rates')}>
            📊 Market Rates
          </div>
          <div className={`nav-item ${activeTab === 'trades' ? 'active' : ''}`} onClick={() => setActiveTab('trades')}>
            🛒 Transactions 
            {transactions.filter(t => t.status === 'Pending').length > 0 && <span className="notif-dot"></span>}
          </div>
        </div>
        <button className="lock-out" onClick={() => setIsUnlocked(false)}>Lock System</button>
      </aside>

      <main className="main-content">
        <header className="main-header">
          <div>
            <h1>{activeTab === 'rates' ? 'Market Control' : 'Order Management'}</h1>
            <p className="subtitle">Welcome back, Administrator.</p>
          </div>
          <div className={`status-toggle ${isOnline ? 'online' : 'offline'}`}>
             <span>Status: <strong>{isOnline ? 'ONLINE' : 'OFFLINE'}</strong></span>
             <button onClick={() => setIsOnline(!isOnline)}>Toggle</button>
          </div>
        </header>

        {activeTab === 'rates' ? (
          <div className="fade-in">
            <section className="global-settings">
              <div className="control-card">
                <label>Dollar Exchange Rate (₦)</label>
                <input type="number" value={dollarRate} onChange={(e) => setDollarRate(e.target.value)} />
              </div>
              <div className="control-card">
                <label>Profit Margin (%)</label>
                <input type="number" value={profitMargin} onChange={(e) => setProfitMargin(e.target.value)} />
              </div>
            </section>

            <section className="rates-table-section">
              <table className="admin-table">
                <thead>
                  <tr><th>Asset</th><th>Global USD</th><th>Live Payout (NGN)</th></tr>
                </thead>
                <tbody>
                  {Object.keys(autoPrices).map(coin => (
                    <tr key={coin}>
                      <td className="coin-name">{coin.toUpperCase()}</td>
                      <td>${autoPrices[coin].usd?.toLocaleString()}</td>
                      <td className="payout-cell">₦{calculatePayout(autoPrices[coin].usd).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </div>
        ) : (
          <div className="fade-in">
            <div className="trades-grid">
              {transactions.map(trade => (
                <div className={`trade-card ${trade.status.toLowerCase()}`} key={trade.id}>
                  <div className="trade-header">
                    <span className="trade-id">{trade.id} • {trade.time}</span>
                    <span className={`status-pill ${trade.status.toLowerCase()}`}>{trade.status}</span>
                  </div>
                  <div className="trade-body">
                    <div className="user-info">
                      <h3>{trade.user}</h3>
                      <p>{trade.bank}</p>
                    </div>
                    <div className="asset-info">
                      <span className={`type-tag ${trade.type.toLowerCase()}`}>{trade.type}</span>
                      <p className="asset-val">{trade.asset}</p>
                      <p className="payout-val">{trade.payout}</p>
                    </div>
                  </div>
                  {trade.status === 'Pending' && (
                    <div className="trade-actions">
                      <button className="btn-approve" onClick={() => handleAction(trade.id, 'Completed')}>Mark as Paid</button>
                      <button className="btn-reject" onClick={() => handleAction(trade.id, 'Declined')}>Decline</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
