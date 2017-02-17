import React from 'react';

function HomeMoreMessage({ showPopup, showRollover }) {
  return (
    <h1>
      <span>We build and </span>
      <span
        className="home-gradient-text-cold question-cursor"
        onClick={showPopup('invest')}
        onMouseEnter={showRollover('invest')}
        onMouseLeave={showRollover('hidden')}
      >invest</span>
      <span> in new </span>
      <span
        className="home-gradient-text-lukewarm question-cursor"
        onClick={showPopup('ventures')}
        onMouseEnter={showRollover('ventures')}
        onMouseLeave={showRollover('hidden')}
      >ventures</span>
      <span> that make a </span>
      <span
        className="home-gradient-text-hot question-cursor"
        onClick={showPopup('difference')}
        onMouseEnter={showRollover('difference')}
        onMouseLeave={showRollover('hidden')}
      >difference</span>
    </h1>
  );
}

export default HomeMoreMessage;
