import React from 'react';
import Flux from 'app/flux';

export default (name) => {
  let navigateTo;
  switch(name) {
    case 'discovery':
      navigateTo = '/work/discovery-strategy';
      break;
    case 'design':
      navigateTo = '/work/design-build';
      break;
    case 'launch':
      navigateTo = '/work/launch-scale';
      break;
    case 'working':
      navigateTo = '/work/ways-of-working';
      break;
    default:
      navigateTo = '/work';
  }

  Flux.navigate(navigateTo);
}
