import React from 'react';
import './HowItWorks.css';

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      icon: "📱",
      title: "Set Your Amount",
      description: "Enter how much you want to sell in our calculator to see the current best rate."
    },
    {
      id: 2,
      icon: "🤝",
      title: "Connect with Agent",
      description: "Our system matches you with a verified E-Max agent instantly via WhatsApp or Escrow."
    },
    {
      id: 3,
      icon: "💸",
      title: "Get Paid Instantly",
      description: "Once your asset is confirmed, we send your Naira. Average time: 4 minutes."
    }
  ];

  return (
    <section className="how-it-works">
      <div className="section-intro">
        <span className="section-tag">Simple Process</span>
        <h2 className="section-title">Trade in 3 Easy Steps</h2>
      </div>

      <div className="steps-container">
        {steps.map((step) => (
          <div key={step.id} className="step-card">
            <div className="step-icon-wrapper">
              <span className="step-icon">{step.icon}</span>
              <div className="step-number">{step.id}</div>
            </div>
            <h3 className="step-title">{step.title}</h3>
            <p className="step-description">{step.description}</p>
            {step.id !== 3 && <div className="step-connector"></div>}
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;