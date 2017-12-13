import React from 'react';
import GradientWords from '../gradient-words';

function HomeMoreMessage({ showPopup }) {
  return (
    <h1>
      <span>We </span><GradientWords
        word="disrupt"
        color="cold"
      /><span> industries, </span><GradientWords
        word="define"
        color="lukewarm"
      /><span> new frontiers, and </span><GradientWords
        word="deliver"
        color="hot"
      /><span> tangible results</span>
    </h1>
  );
}

export default HomeMoreMessage;
