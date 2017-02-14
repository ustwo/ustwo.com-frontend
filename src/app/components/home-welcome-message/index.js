import React from 'react';

function HomeWelcomeMessage({ showPopup }) {
  return (
    <h1>
      <span>We make digital </span>
      <span className="home-gradient-text-cold" onClick={showPopup('products')}>products</span>
      <span> and </span>
      <span className="home-gradient-text-lukewarm" onClick={showPopup('services')}>services</span>
      <span> for the smartest </span>
      <span className="home-gradient-text-hot" onClick={showPopup('brands')}>brands</span>
    </h1>
  );
}

export default HomeWelcomeMessage;
