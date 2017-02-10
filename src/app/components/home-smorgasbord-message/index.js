import React from 'react';

function HomeSmorgasbordMessage({ showRollover }) {
  return (
    <h1>
      <span>More </span>
      <span className="home-gradient-text-cold" onMouseEnter={showRollover('yes')} onMouseLeave={showRollover('hidden')}>yes</span><br />
      <span>More </span>
      <span className="home-gradient-text-lukewarm" onMouseEnter={showRollover('can')} onMouseLeave={showRollover('hidden')}>can</span><br />
      <span>More </span>
      <span className="home-gradient-text-hot" onMouseEnter={showRollover('wow')} onMouseLeave={showRollover('hidden')}>wow</span>
    </h1>
  );
}

export default HomeSmorgasbordMessage;
