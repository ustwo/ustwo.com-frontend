import React from 'react';
import Flux from 'app/flux';

function onClickJoinUsButton() {
  return (e) => {
    e.preventDefault();
    Flux.navigate('/join-us');
  }
}

function JoinUsButton({ flavour }) {
  return (
    <a
      href="/join-us"
      onClick={onClickJoinUsButton()}
      className={`join-us-button flavour-${flavour}`}
    >
      <div className="join-us-button-wrapper">
        <div className="join-us-button-text">Join Us</div>
      </div>
    </a>
  );
}

export default JoinUsButton;
