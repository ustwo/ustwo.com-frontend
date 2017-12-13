import React from 'react';
import GradientWords from '../gradient-words';
import Flux from 'app/flux';

function homeMoreMessageButton() {
  return (e) => {
    e.preventDefault();
    Flux.navigate('/blog');
  }
}

function HomeMoreMessage({ showPopup }) {
  return (
    <div className="home-message-text" onClick={homeMoreMessageButton()}>
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
    </div>
  );
}

export default HomeMoreMessage;
