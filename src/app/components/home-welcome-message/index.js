import React from 'react';
import GradientWords from '../gradient-words';

function HomeWelcomeMessage({ showPopup }) {
  return (
    <h1>
      <span>We help companies shape their </span><GradientWords
        word="future"
        color="cold"
      /><span> by creating digital </span><GradientWords
        word="products"
        color="lukewarm"
      /><span> and </span><GradientWords
        word="services"
        color="hot"
      /> together
    </h1>
  );
}

export default HomeWelcomeMessage;
