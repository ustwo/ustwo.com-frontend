import React from 'react';
import GradientWords from '../gradient-words';

function HomeWelcomeMessage({ showPopup }) {
  return (
    <h1>
      <span>We make digital </span><GradientWords
        word="products"
        color="cold"
      /><span> and </span><GradientWords
        word="services"
        color="lukewarm"
      /><span> for the world's best </span><GradientWords
        word="brands"
        color="hot"
      />
    </h1>
  );
}

export default HomeWelcomeMessage;
