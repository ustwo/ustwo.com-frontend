import React from 'react';

function HomeSmorgasbordMessage({ showPopup }) {
  return (
    <h1>
      <span>More </span>
      <span className="home-gradient-text-cold question-cursor" onClick={showPopup('yes')}>yes</span><br />
      <span>More </span>
      <span className="home-gradient-text-lukewarm question-cursor" onClick={showPopup('can')}>can</span><br />
      <span>More </span>
      <span className="home-gradient-text-hot question-cursor" onClick={showPopup('wow')}>wow</span>
    </h1>
  );
}

export default HomeSmorgasbordMessage;
