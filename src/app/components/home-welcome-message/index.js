import React from 'react';

function HomeWelcomeMessage({ showRollover }) {
  return (
    <h1>
      <span>We make digital </span>
      <span className="home-gradient-text-cold" onMouseEnter={showRollover('products')} onMouseLeave={showRollover('hidden')}>products</span>
      <span> and </span>
      <span className="home-gradient-text-lukewarm" onMouseEnter={showRollover('services')} onMouseLeave={showRollover('hidden')}>services</span>
      <span> for the smartest </span>
      <span className="home-gradient-text-hot" onMouseEnter={showRollover('brands')} onMouseLeave={showRollover('hidden')}>brands</span>
    </h1>
  );
}

export default HomeWelcomeMessage;
