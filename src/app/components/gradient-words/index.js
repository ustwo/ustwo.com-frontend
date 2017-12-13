import React from 'react';
import env from 'app/adaptors/server/env';

function GradientWords({ word, color, reverse }) {
  const classes = `gradient-words gradient-words-${color} ${reverse ? 'gradient-words-reverse' : null}`;

  let replacementColor;
  if (color === 'cold') {
    replacementColor = "#16D6D9";
  }
  if (color === 'lukewarm') {
    replacementColor = "#96CC29";
  }
  if (color === 'hot') {
    replacementColor = "#ED0082";
  }
  if (color === 'auto') {
    replacementColor = "#f8e467";
  }
  if (color === 'auto2') {
    replacementColor = "#ffbf00";
  }

  let style;
  if (!env.Modernizr.backgroundcliptext) {
    style = {
      color: replacementColor
    }
  }

  return (
    <span className={classes} style={style}>{word}</span>
  );
}

export default GradientWords;
