import React from 'react';
import GradientWords from '../gradient-words';

function HomeSmorgasbordMessage({ showPopup }) {
  return (
    <h1>
      <span>We scale </span><GradientWords
        word="collaboration"
        color="cold"
      /><span>. When you </span><GradientWords
        word="develop"
        color="lukewarm"
      /><span> the right teams, </span><GradientWords
        word="genius"
        color="hot"
      /><span> happens</span>
    </h1>
  );
}

export default HomeSmorgasbordMessage;
