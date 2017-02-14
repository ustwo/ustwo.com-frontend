import React from 'react';

function HomeSmorgasbordMessage({ showPopup }) {
  return (
    <h1>
      <span>More </span>
      <span className="home-gradient-text-cold" onClick={showPopup('yes')}>yes</span><br />
      <span>More </span>
      <span className="home-gradient-text-lukewarm" onClick={showPopup('can')}>can</span><br />
      <span>More </span>
      <span className="home-gradient-text-hot" onClick={showPopup('wow')}>wow</span>
    </h1>
  );
}

export default HomeSmorgasbordMessage;
