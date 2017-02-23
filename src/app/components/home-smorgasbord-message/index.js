import React from 'react';

function HomeSmorgasbordMessage({ showPopup, showRollover }) {
  return (
    <h1>
      <span
        className="home-gradient-text-cold question-cursor"
        onClick={showPopup('yes')}
        onMouseEnter={showRollover('yes')}
        onMouseLeave={showRollover('hidden')}
      >Together</span><span> we work to unleash the </span><span
        className="home-gradient-text-lukewarm question-cursor"
        onClick={showPopup('can')}
        onMouseEnter={showRollover('can')}
        onMouseLeave={showRollover('hidden')}
      >collective</span><span> </span><span
        className="home-gradient-text-hot question-cursor"
        onClick={showPopup('wow')}
        onMouseEnter={showRollover('wow')}
        onMouseLeave={showRollover('hidden')}
      >genius</span><span>. No Big Deal.</span>
    </h1>
  );
}

export default HomeSmorgasbordMessage;
