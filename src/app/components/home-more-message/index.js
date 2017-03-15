import React from 'react';
import TextUnderline from '../text-underline';

function HomeMoreMessage({ showPopup }) {
  return (
    <h1>
      <span>We </span><TextUnderline
        showPopup={showPopup}
        word="invest"
        color="cold"
      /><span> in and launch our </span><TextUnderline
        showPopup={showPopup}
        word="own products"
        color="lukewarm"
      /><span>, businesses and </span><TextUnderline
        showPopup={showPopup}
        word="ventures"
        color="hot"
      />
    </h1>
  );
}

export default HomeMoreMessage;
