import React from 'react';
import GradientWords from '../gradient-words';

function HomeMoreMessage({ showPopup }) {
  return (
    <h1>
      <GradientWords
        word="Shipping"
        color="cold"
      /><span> ustwo products. </span><GradientWords
        word="Launching"
        color="lukewarm"
      /><span> ventures. </span><GradientWords
        word="Investing"
        color="hot"
      /><span> in startups. We do more, to learn more.</span>
    </h1>
  );
}

export default HomeMoreMessage;
