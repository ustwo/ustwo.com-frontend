import React from 'react';
import GradientWords from '../gradient-words';

function HomeSmorgasbordMessage({ showPopup }) {
  return (
    <h1>
      <GradientWords
        word="together"
        color="cold"
      /><span> we work to unleash the </span><GradientWords
        word="collective"
        color="lukewarm"
      /><span> </span><GradientWords
        word="genius"
        color="hot"
      /><span>. No Big Deal.</span>
    </h1>
  );
}

export default HomeSmorgasbordMessage;
