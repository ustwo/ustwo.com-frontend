import React from 'react';
import GradientWords from '../gradient-words';

function HomeWelcomeMessage({ showPopup }) {
  return (
    <h1>
      <span>We </span><GradientWords
        word="team up"
        color="cold"
      /><span> with companies to </span><GradientWords
        word="make"
        color="lukewarm"
      /><span> meaningful digital </span><GradientWords
        word="experiences"
        color="hot"
      />
    </h1>
  );
}

export default HomeWelcomeMessage;
