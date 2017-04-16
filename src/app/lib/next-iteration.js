import React from 'react';

export default (component, timerTotal, totalIteration) => {
  component.setState({ tick: timerTotal });

  if (component.state.iterate === totalIteration - 2) {
    component.setState({ iterate: 0 });
  } else {
    component.setState({ iterate: component.state.iterate + 1 });
  }
}
