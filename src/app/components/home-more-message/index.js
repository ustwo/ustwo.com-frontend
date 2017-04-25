import React from 'react';
import GradientWords from '../gradient-words';

function HomeMoreMessage({ showPopup }) {
  return (
    <h1>
      <span>We </span><GradientWords
        word="ship"
        color="cold"
      /><span> products, </span><GradientWords
        word="launch"
        color="lukewarm"
      /><span> ventures, and </span><GradientWords
        word="invest"
        color="hot"
      /><span> in startups</span>
    </h1>
  );
}

export default HomeMoreMessage;
