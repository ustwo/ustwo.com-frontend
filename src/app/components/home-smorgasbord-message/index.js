import React from 'react';

function HomeSmorgasbordMessage({ showPopup, showRollover }) {
  return (
    <h1>
      <span>More </span>
      <span
        className="home-gradient-text-cold question-cursor"
        onClick={showPopup('yes')}
        onMouseEnter={showRollover('yes')}
        onMouseLeave={showRollover('hidden')}
      >yes</span><br />
      <span>More </span>
      <span
        className="home-gradient-text-lukewarm question-cursor"
        onClick={showPopup('can')}
        onMouseEnter={showRollover('can')}
        onMouseLeave={showRollover('hidden')}
      >can</span><br />
      <span>More </span>
      <span
        className="home-gradient-text-hot question-cursor"
        onClick={showPopup('wow')}
        onMouseEnter={showRollover('wow')}
        onMouseLeave={showRollover('hidden')}
      >wow</span>
    </h1>
  );
}

export default HomeSmorgasbordMessage;
