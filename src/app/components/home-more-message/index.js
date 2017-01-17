import React from 'react';

function HomeMoreMessage({ scrollProgress }) {
  return (
    <div className="home-text-block more-message">
      <div className="home-section-title">Want moar?</div>
      <h1>
        We build and&nbsp;
        <span className="home-gradient-text-cold">invest</span> in new&nbsp;
        <span className="home-gradient-text-lukewarm">ventures</span> that make a&nbsp;
        <span className="home-gradient-text-hot">difference</span>
      </h1>
    </div>
  );
}

module.exports = HomeMoreMessage;
