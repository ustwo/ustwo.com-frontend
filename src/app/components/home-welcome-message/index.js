import React from 'react';
import TextUnderline from '../text-underline';

function HomeWelcomeMessage({ showPopup }) {
  return (
    <h1>
      <span>We make digital </span><TextUnderline
        showPopup={showPopup}
        word="products"
        color="cold"
      /><span> and </span><TextUnderline
        showPopup={showPopup}
        word="services"
        color="lukewarm"
      /><span> for the smartest </span><TextUnderline
        showPopup={showPopup}
        word="brands"
        color="hot"
      />
    </h1>
  );
}

export default HomeWelcomeMessage;
