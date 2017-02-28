import React from 'react';

function HomeSmorgasbordMessage({ showPopup }) {
  return (
    <h1>
      <span
        className="home-gradient-text-cold home-text-block-button"
        onClick={showPopup('yes')}
      >Together</span><span> we work to unleash the </span><span
        className="home-gradient-text-lukewarm home-text-block-button"
        onClick={showPopup('can')}
      >collective</span><span> </span><span
        className="home-gradient-text-hot home-text-block-button"
        onClick={showPopup('wow')}
      >genius</span><span>. No Big Deal.</span>
    </h1>
  );
}

export default HomeSmorgasbordMessage;
