import React from 'react';
import classnames from 'classnames';

function TimerUI({ timer, paused, darkStyle }) {

  let rotateRight = timer >= 180 ? 360 - timer : 180;
  let rotateLeft = timer <= 180 ? 180 - timer : 0;

  let stylesRight = {
    transform: `rotate(${rotateRight}deg)`
  };

  let stylesLeft = {
    transform: `rotate(${rotateLeft}deg)`
  };

  let classes = classnames('timer-ui', {
    darkStyle,
    pause: paused,
    play: !paused
  });

  return (
    <div className={classes}>
      <div className="half left">
        <div className="bg" style={stylesLeft}></div>
      </div>
      <div className="half right">
        <div className="bg" style={stylesRight}></div>
      </div>
      <div className="icon play"></div>
      <div className="icon pause"></div>
    </div>
  );
}

module.exports = TimerUI;
