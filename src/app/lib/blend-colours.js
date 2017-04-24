import hexRgb from 'hex-rgb';
import rgbHex from 'rgb-hex';

export default (colour1, colour2, percentage) => {
  let rgbColour1 = hexRgb(colour1);
  let rgbColour2 = hexRgb(colour2);

  let rgbColour3 = [
    (1 - percentage) * rgbColour1[0] + percentage * rgbColour2[0],
    (1 - percentage) * rgbColour1[1] + percentage * rgbColour2[1],
    (1 - percentage) * rgbColour1[2] + percentage * rgbColour2[2]
  ];

  return rgbHex(rgbColour3[0], rgbColour3[1], rgbColour3[2]);
};
