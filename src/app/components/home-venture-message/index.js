import React from 'react';
import GradientWords from '../gradient-words';
import Flux from 'app/flux';

function homeVentureMessageButton() {
  return (e) => {
    e.preventDefault();
    Flux.navigate('/about-us');
  }
}

function HomeVentureMessage({ showPopup }) {
  return (
    <div className="home-message-text" onClick={homeVentureMessageButton()}>
      <span>We </span><GradientWords
        word="ship"
        color="cold"
      /><span> products, </span><GradientWords
        word="launch"
        color="lukewarm"
      /><span> ventures and </span><GradientWords
        word="invest"
        color="hot"
      /><span> in startups</span>
    </div>
  );
}

export default HomeVentureMessage;
