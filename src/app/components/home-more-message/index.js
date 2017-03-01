import React from 'react';
import TextUnderline from '../text-underline';

function HomeMoreMessage({ showPopup }) {
  return (
    <h1>
      <span>We build and </span><TextUnderline
        showPopup={showPopup}
        word="invest"
        color="cold"
      /><span> in new </span><TextUnderline
        showPopup={showPopup}
        word="ventures"
        color="lukewarm"
      /><span> that make a </span><TextUnderline
        showPopup={showPopup}
        word="difference"
        color="hot"
      />
    </h1>
  );
}

export default HomeMoreMessage;
