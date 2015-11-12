'use strict';

import React from 'react';
import classnames from 'classnames';

const ScreenBlock = React.createClass({
  render() {
    const { hexColour, customClass, colour, children } = this.props;
    const classes = classnames('screen-block', customClass, !hexColour && `u-bg-${colour}`);
    const hexBackground = hexColour ? { backgroundColor: hexColour } : {};
    return <section className={classes} style={hexBackground}>
      <div className="wrapper">{children}</div>
    </section>;
  }
});

export default ScreenBlock;
