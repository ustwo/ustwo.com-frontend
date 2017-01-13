import React from 'react';

function HomeWelcomeMessage({ scrollProgress, handleNextClick, handlePrevClick }) {
  let position = 50 - (scrollProgress * 100);
  const styles = {
    transform: `translate3d(0, -${position}px, 0)`
  }

  return (
    <div className="home-text-block welcome-message">
      <div className="home-prev-slide" onClick={handlePrevClick}></div>
      <h1 style={styles}>
        We make digital&nbsp;
        <span className="home-gradient-text-cold">products</span> and&nbsp;
        <span className="home-gradient-text-lukewarm">services</span> for the&nbsp;
        <span className="home-gradient-text-hot">smartest</span> brands
      </h1>
      <div className="home-next-slide" onClick={handleNextClick}></div>
    </div>
  );
}

module.exports = HomeWelcomeMessage;
