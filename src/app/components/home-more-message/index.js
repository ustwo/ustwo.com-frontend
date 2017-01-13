import React from 'react';

function HomeMoreMessage({ scrollProgress, handleNextClick, handlePrevClick }) {
  return (
    <div className="home-text-block more-message">
      <div className="home-prev-slide" onClick={handlePrevClick}></div>
      <h1>
        We create our own&nbsp;
        <span className="home-gradient-text-cold">products</span>,&nbsp;
        <span className="home-gradient-text-lukewarm">services</span> and business&nbsp;
        <span className="home-gradient-text-hot">ventures</span>
      </h1>
      <div className="home-next-slide" onClick={handleNextClick}></div>
    </div>
  );
}

module.exports = HomeMoreMessage;
