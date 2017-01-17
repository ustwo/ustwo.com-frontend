import React from 'react';

function HomeWelcomeMessage({ scrollProgress }) {
  let position = 200 - (scrollProgress * 400);
  let styles = {
    transform: `translate3d(0, ${position}px, 0)`
  }

  return (
    <div className="home-text-block welcome-message" style={styles}>
      <div className="home-section-title">Hi. We're ustwo.</div>
      <h1>
        We make digital&nbsp;
        <span className="home-gradient-text-cold">products</span> and&nbsp;
        <span className="home-gradient-text-lukewarm">services</span> for the&nbsp;
        <span className="home-gradient-text-hot">smartest</span> brands
      </h1>
    </div>
  );
}

module.exports = HomeWelcomeMessage;
