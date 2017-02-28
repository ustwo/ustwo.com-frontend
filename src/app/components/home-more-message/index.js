import React from 'react';

function HomeMoreMessage({ showPopup }) {
  return (
    <h1>
      <span>We build and </span><span
        className="home-gradient-text-cold home-text-block-button"
        onClick={showPopup('invest')}
      >invest</span><span> in new </span><span
        className="home-gradient-text-lukewarm home-text-block-button"
        onClick={showPopup('ventures')}
      >ventures</span><span> that make a </span><span
        className="home-gradient-text-hot home-text-block-button"
        onClick={showPopup('difference')}
      >difference</span>
    </h1>
  );
}

export default HomeMoreMessage;
