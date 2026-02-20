import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USDT');
  const [tradeType, setTradeType] = useState('SELL'); // 'BUY' or 'SELL'
  const rates = {
    USDT: 1605,
    USDC: 1600,
    BTC: 145000000,
    ETH: 4850000,
    SOL: 285000,
    RMB: 215,
  };

  const result = amount ? (amount * rates[currency]).toLocaleString() : '0.00';

  const handleTrade = () => {
    const phoneNumber = '2349123991180';
    const action = tradeType === 'SELL' ? 'sell' : 'buy';
    const text = `Hello E-Max Trade, I want to ${action} ${amount || 'some'} ${currency}. Please provide details.`;
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedText}`, '_blank');
  };

  // Staff portal link removed from Home — admin login is at /admin-login

  return (
    <div className="home-wrapper">
      {/* HERO SECTION */}
      <section className="hero-container">
        <div className="hero-content">
          <div className="hero-text">
            <span className="promo-badge">Trusted by 5,000+ Traders</span>
            <p className="hero-motto">Fast. Secure. Reliable.</p>
            <h1 className="main-title">
              The Most Reliable Way to <span className="gradient-text">Trade Assets.</span>
            </h1>
            <p className="sub-text">
              Don't get stuck with slow exchanges. Get your Naira or Crypto in less than 5 minutes at the best rates in Nigeria.
            </p>

            <div className="asset-grid">
              {Object.keys(rates).map((coin) => (
                <div className="asset-pill" key={coin}>
                  <span className="dot"></span> {coin}
                </div>
              ))}
            </div>
          </div>

          <div className="calculator-box">
            <div className="calc-card">
              {/* BUY/SELL TOGGLE */}
              <div className="trade-type-tabs">
                <button 
                  className={`type-tab ${tradeType === 'SELL' ? 'active sell' : ''}`}
                  onClick={() => { setTradeType('SELL'); setAmount(''); }}
                >
                  Sell Crypto
                </button>
                <button 
                  className={`type-tab ${tradeType === 'BUY' ? 'active buy' : ''}`}
                  onClick={() => { setTradeType('BUY'); setAmount(''); }}
                >
                  Buy Crypto
                </button>
              </div>

              <div className="currency-toggle">
                {['USDT', 'BTC', 'ETH', 'SOL'].map((type) => (
                  <button
                    key={type}
                    className={`toggle-btn ${currency === type ? 'active' : ''}`}
                    onClick={() => { setCurrency(type); setAmount(''); }}
                  >
                    {type}
                  </button>
                ))}
              </div>

              <div className="live-rate-tag">1 {currency} = ₦{rates[currency].toLocaleString()}</div>

              <div className="input-field">
                <label>{tradeType === 'SELL' ? 'You Send' : 'You Receive'} ({currency})</label>
                <div className="input-row">
                  <input
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                  <span className="curr-label">{currency}</span>
                </div>
              </div>

              <div className="calc-divider"><span>↓</span></div>

              <div className="input-field">
                <label>{tradeType === 'SELL' ? 'You Receive' : 'You Pay'} (Naira)</label>
                <div className="result-row">
                  <span className="naira-icon">₦</span>
                  <span className="final-amount">{result}</span>
                </div>
              </div>

              <button className={`whatsapp-btn ${tradeType.toLowerCase()}`} onClick={handleTrade}>
                {tradeType === 'SELL' ? 'Sell' : 'Buy'} {currency} Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features-section">
        <div className="feature">
          <div className="feature-icon">⚡</div>
          <h3>Instant Payout</h3>
          <p>We pay within 5 minutes of confirmation. No stories.</p>
        </div>
        <div className="feature">
          <div className="feature-icon">🛡️</div>
          <h3>Highly Secure</h3>
          <p>Your transactions are encrypted and safe with us.</p>
        </div>
        <div className="feature">
          <div className="feature-icon">💰</div>
          <h3>Best Rates</h3>
          <p>We offer the highest possible rates for your assets.</p>
        </div>
      </section>

      {/* TICKER */}
      <div className="payout-ticker">
        <div className="ticker-track">
          <span>Recent: ₦450,000 paid to Opay User ✅</span>
          <span>Recent: ₦1,200,000 paid to Kuda User ✅</span>
          <span>Recent: $500 USDT bought from Binance User ✅</span>
          <span>Recent: ₦85,000 paid to GTB User ✅</span>
          <span>Recent: ₦450,000 paid to Opay User ✅</span>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="main-footer">
        <div className="footer-container">
          <div className="footer-brand">
            <span className="footer-logo">E-MAX <span className="logo-dot"></span></span>
            <p>© 2026 All rights Reserved.</p>
          </div>
          
          <div className="footer-links">
            {/* Staff Portal removed from public home footer; admin login available at /admin-login */}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;