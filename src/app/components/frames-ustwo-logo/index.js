'use strict';

import React, { Component } from 'react';

function FramesUstwoLogo({ scrollProgress, componentStyle, isReverse }) {
  const numberOfFrames = 35;
  let framePosition = Math.ceil(scrollProgress * numberOfFrames);

  // We only want positions from 1 to the nth frame
  if (framePosition === 0) {
    framePosition = 1;
  }

  // If we are playing in reverse we need to make sure we don't get currentFrame = 0
  const currentFrame = isReverse ? (numberOfFrames - framePosition + 1) : framePosition;

  let frames = [];
  for (let i = 1; i <= numberOfFrames; i++) {
    const style = { display: (i === currentFrame - 1) ? 'inline-block' : 'none' }
    const number = (i < 10) ? `0${i}` : i;
    frames.push(
      <img key={`frame${i}`} src={`/images/temp/ustwo_logo_draw_IN${number}.png`} style={style} />
    );
  }

  return (
    <div className="frames-ustwo-logo" style={componentStyle}>
      <div id="frames">
        {frames}
      </div>
    </div>
  );
};

module.exports = FramesUstwoLogo;
