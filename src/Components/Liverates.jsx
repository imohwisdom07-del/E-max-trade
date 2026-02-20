import React from 'react';
import './LiveRates.css';

const LiveRates = () => {
  const marketData = [
    { name: 'Tether', symbol: 'USDT', buy: 1585, sell: 1550, change: '0.00%', icon: '💵' },
    { name: 'Bitcoin', symbol: 'BTC', buy: 155200000, sell: 145000000, change: '+2.45%', icon: '₿' },
    { name: 'Ethereum', symbol: 'ETH', buy: 5100000, sell: 4850000, change: '+1.12%', icon: 'Ξ' },
    { name: 'Solana', symbol: 'SOL', buy: 315000, sell: 285000, change: '-0.85%', icon: '☀️' },
    { name: 'USD Coin', symbol: 'USDC', buy: 1580, sell: 1545, change: '0.01%', icon: '🪙' },
    { name: 'Chinese Yuan', symbol: 'RMB', buy: 230, sell: 215, change: '+0.10%', icon: '¥' },
  ];

  const handleTrade = (coin, type) => {
    const phoneNumber = "2349123991180";
    const message = encodeURIComponent(`Hello E-Max Trade, I saw your live rates and I want to ${type} ${coin}.`);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="live-rates-page">
      <div className="rates-container">
        <header className="rates-hero">
          <span className="live-indicator">
            <span className="ping"></span> LIVE MARKET RATES
          </span>
          <h1>Real-Time <span className="gradient-text">Exchange Rates</span></h1>
          <p>Best spreads in Nigeria • Instant settlements • Trusted by thousands</p>
        </header>

        <div className="rates-table-card">
          <div className="table-wrapper">
            <table className="rates-table">
              <thead>
                <tr>
                  <th>Asset</th>
                  <th>We Buy (₦)</th>
                  <th>We Sell (₦)</th>
                  <th className="change-header">24h Change</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {marketData.map((coin, index) => (
                  <tr key={index}>
                    <td className="asset-cell">
                      <span className="asset-icon">{coin.icon}</span>
                      <div className="asset-info">
                        <span className="asset-name">{coin.name}</span>
                        <span className="asset-symbol">{coin.symbol}</span>
                      </div>
                    </td>
                    <td className="price buy">₦{coin.buy.toLocaleString()}</td>
                    <td className="price sell">₦{coin.sell.toLocaleString()}</td>
                    <td className={`change ${coin.change.startsWith('+') ? 'positive' : coin.change.startsWith('-') ? 'negative' : 'neutral'}`}>
                      {coin.change}
                    </td>
                    <td className="action-cell">
                      <button 
                        className="trade-action-btn"
                        onClick={() => handleTrade(coin.symbol, 'sell')}
                      >
                        Sell {coin.symbol}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rates-disclaimer">
          <p>⚠️ Prices are indicative and subject to change based on market conditions.</p>
          <p>For large volume trades (₦10M+), <button className="contact-link" onClick={() => handleTrade('bulk', 'discuss')}>contact support</button> for custom rates.</p>
        </div>
      </div>
    </div>
  );
};

export default LiveRates;
