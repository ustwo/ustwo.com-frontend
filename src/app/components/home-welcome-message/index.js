import React from 'react';

function HomeWelcomeMessage({ showPopup, showRollover }) {
  return (
    <h1>
      <span>We make digital </span><span
        className="home-gradient-text-cold question-cursor"
        onClick={showPopup('products')}
        onMouseEnter={showRollover('products')}
        onMouseLeave={showRollover('hidden')}
      >products</span><span> and </span><span
        className="home-gradient-text-lukewarm question-cursor"
        onClick={showPopup('services')}
        onMouseEnter={showRollover('services')}
        onMouseLeave={showRollover('hidden')}
      >services</span><span> for the smartest </span><span
        className="home-gradient-text-hot question-cursor"
        onClick={showPopup('brands')}
        onMouseEnter={showRollover('brands')}
        onMouseLeave={showRollover('hidden')}
      >brands</span>
    </h1>
  );
}

export default HomeWelcomeMessage;
