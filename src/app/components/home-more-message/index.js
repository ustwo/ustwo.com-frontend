import React from 'react';

function HomeMoreMessage({ showPopup }) {
  return (
    <h1>
      <span>We build and </span>
      <span className="home-gradient-text-cold question-cursor" onClick={showPopup('invest')}>invest</span>
      <span> in new </span>
      <span className="home-gradient-text-lukewarm question-cursor" onClick={showPopup('ventures')}>ventures</span>
      <span> that make a </span>
      <span className="home-gradient-text-hot question-cursor" onClick={showPopup('difference')}>difference</span>
    </h1>
  );
}

export default HomeMoreMessage;
