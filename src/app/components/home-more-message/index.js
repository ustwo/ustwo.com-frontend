import React from 'react';

function HomeMoreMessage({ scrollProgress }) {
  return (
    <div className="home-text-block more-message">
      <h1>
        We create our own&nbsp;
        <span className="home-gradient-text-cold">products</span>,&nbsp;
        <span className="home-gradient-text-lukewarm">services</span> and business&nbsp;
        <span className="home-gradient-text-hot">ventures</span>
      </h1>
    </div>
  );
}

module.exports = HomeMoreMessage;
