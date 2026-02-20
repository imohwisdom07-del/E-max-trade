import React from 'react';
import './TradeModal.css';

const TradeModal = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  const phoneNumber = "2349123991180";

  const handleAction = (type) => {
    let message = "";
    
    if (type === 'sell') {
      message = `Hello E-Max! I want to SELL ${data.amount} ${data.currency} at the rate I saw on the site (₦${data.result}). Please send your WALLET ADDRESS.`;
    } else {
      message = `Hello E-Max! I want to BUY ${data.currency}. My budget is ₦${data.result}. Please send your BANK DETAILS and current selling rate.`;
    }

    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()}>
        <button className="close-x" onClick={onClose}>&times;</button>
        
        <div className="modal-header">
          <h2>Ready to Trade?</h2>
          <p>You've calculated: <strong>{data.amount} {data.currency}</strong> ⇋ <strong>₦{data.result}</strong></p>
        </div>

        <div className="trade-options">
          <button className="option-btn sell" onClick={() => handleAction('sell')}>
            <span className="icon">🚀</span>
            <div className="text">
              <h3>I want to Sell</h3>
              <p>Request Wallet Address</p>
            </div>
          </button>

          <button className="option-btn buy" onClick={() => handleAction('buy')}>
            <span className="icon">💰</span>
            <div className="text">
              <h3>I want to Buy</h3>
              <p>Request Bank Details</p>
            </div>
          </button>
        </div>

        <p className="modal-footer">Average response time: 2 mins</p>
      </div>
    </div>
  );
};

export default TradeModal;