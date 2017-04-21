import React from 'react';
import GradientWords from '../gradient-words';

function HomeWelcomeMessage({ showPopup }) {
  return (
    <h1>
      <span>We team up with people like you to </span><GradientWords
        word="make"
        color="cold"
      /><span> meaningful  </span><GradientWords
        word="digital"
        color="lukewarm"
      /><span> </span><GradientWords
        word="experiences"
        color="hot"
      />
    </h1>
  );
}

export default HomeWelcomeMessage;
