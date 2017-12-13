import React from 'react';
import GradientWords from '../gradient-words';

function HomeWelcomeMessage({ showPopup }) {
  return (
    <div className="home-message-text">
      <span>We drive positive change for </span><GradientWords
        word="people"
        color="hot"
      /><span>, </span><GradientWords
        word="businesses"
        color="cold"
      /><span> and </span><GradientWords
        word="organisations"
        color="lukewarm"
      />
    </div>
  );
}

export default HomeWelcomeMessage;
