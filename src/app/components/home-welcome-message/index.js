import React from 'react';
import GradientWords from '../gradient-words';
import Flux from 'app/flux';

function homeWelcomeMessageButton() {
  return (e) => {
    e.preventDefault();
    Flux.navigate('/work');
  }
}

function HomeWelcomeMessage({ showPopup }) {
  return (
    <div className="home-message-text" onClick={homeWelcomeMessageButton()}>
      <span>We drive positive change for </span><GradientWords
        word="people"
        color="hot"
      /><span>, </span><GradientWords
        word="businesses"
        color="cold"
      /><span> and </span><GradientWords
        word="organisations"
        color="lukewarm"
      />
    </div>
  );
}

export default HomeWelcomeMessage;
