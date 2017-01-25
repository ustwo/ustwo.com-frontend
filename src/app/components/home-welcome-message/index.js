import React from 'react';

function HomeWelcomeMessage({ scrollProgress }) {
  let position = 50 - (scrollProgress * 100);
  let styles = {
    transform: `translate3d(0, ${position}px, 0)`
  }

  return (
    <div className="home-text-block welcome-message" style={styles}>
      <div className="home-section-title">Hi. We're ustwo.</div>
      <h1>
        We make digital <span className="home-gradient-text-cold">products</span> and <span className="home-gradient-text-lukewarm">services</span> for the smartest <span className="home-gradient-text-hot">brands</span>
      </h1>
    </div>
  );
}

module.exports = HomeWelcomeMessage;
