/*
  A somewhat crazy, unintuitive function that returns a value to be used for inline CSS such as
  parallaxing or fade in/outs
  TODO: Revisit this!
*/
export default (scrollProgress, inStart, inEnd, outStart, outEnd, modifier, transition) => {

  let value;
  if (scrollProgress >= 0 && scrollProgress <= inEnd) {
    value = (scrollProgress - inStart) / inEnd;
    if (transition) { value = 1 - value }
  } else if (scrollProgress >= outStart && scrollProgress <= outEnd) {
    value = (1 - scrollProgress) / (outEnd - outStart);
    if (transition) { value = (1 - value) * -1 }
  } else {
    value = 1;
    if (transition) { value = 0 }
  }

  let modify = modifier ? modifier : 1;

  return value * modify;
}
