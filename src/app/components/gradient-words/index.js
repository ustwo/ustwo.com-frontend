import React from 'react';
import env from 'app/adaptors/server/env';

function GradientWords({ word, color, reverse }) {

  let color1, color2;
  if (color === 'cold') {
    color1 = "#009CF3";
    color2 = "#16D6D9";
  }
  if (color === 'lukewarm') {
    color1 = "#16D6D9";
    color2 = "#96CC29";
  }
  if (color === 'hot') {
    color1 = "#FFBF02";
    color2 = "#ED0082";
  }
  if (color === 'auto') {
    color1 = "#f8e467";
    color2 = "#ffbf00";
  }

  let style;
  if (env.Modernizr.backgroundcliptext) {
    style = {
      backgroundImage: reverse ? `linear-gradient(to right, ${color2}, ${color1})` : `linear-gradient(to right, ${color1}, ${color2})`
    }
  } else {
    style = {
      color: color2
    }
  }

  return (
    <span className="gradient-words" style={style}>{word}</span>
  );
}

export default GradientWords;
