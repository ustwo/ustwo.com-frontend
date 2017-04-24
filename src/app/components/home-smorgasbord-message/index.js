import React from 'react';
import GradientWords from '../gradient-words';

function HomeSmorgasbordMessage({ showPopup }) {
  return (
    <h1>
      <span>We scale </span><GradientWords
        word="collaboration"
        color="cold"
      /><span>. Because genius lives where </span><GradientWords
        word="amazing"
        color="lukewarm"
      /><span> </span><GradientWords
        word="people"
        color="hot"
      /><span> get along best.</span>
    </h1>
  );
}

export default HomeSmorgasbordMessage;
