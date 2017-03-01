import React from 'react';
import TextUnderline from '../text-underline';

function HomeSmorgasbordMessage({ showPopup }) {
  return (
    <h1>
      <TextUnderline
        showPopup={showPopup}
        word="together"
        color="cold"
      /><span> we work to unleash the </span><TextUnderline
        showPopup={showPopup}
        word="collective"
        color="lukewarm"
      /><span> </span><TextUnderline
        showPopup={showPopup}
        word="genius"
        color="hot"
      /><span>. No Big Deal.</span>
    </h1>
  );
}

export default HomeSmorgasbordMessage;
