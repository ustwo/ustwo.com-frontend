import React from 'react';
import classnames from 'classnames';
import SVG from 'app/components/svg';

function TimerUI({ timer, darkStyle, loaded }) {

  let style;
  if (loaded) {
    background: `url('/images/timer-bg.png') no-repeat 50% 50%`
  }

  let rotateRight = timer >= 180 ? 360 - timer : 180;
  let rotateLeft = timer <= 180 ? 180 - timer : 0;

  let stylesRight = {
    transform: `rotate(${rotateRight}deg)`
  };

  let stylesLeft = {
    transform: `rotate(${rotateLeft}deg)`
  };

  let classes = classnames('timer-ui', { darkStyle });

  return (
    <div className={classes} style={style}>
      <div className="half left">
        <div className="bg" style={stylesLeft}></div>
      </div>
      <div className="half right">
        <div className="bg" style={stylesRight}></div>
      </div>
      <SVG title="Shuffle icon" spritemapID="shuffle" />
    </div>
  );
}

module.exports = TimerUI;
