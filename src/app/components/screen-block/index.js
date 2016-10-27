'use strict';

import React from 'react';
import classnames from 'classnames';

const ScreenBlock = React.createClass({
  render() {
    const { textColour, bgColour, customClass, children } = this.props;
    const classes = classnames('screen-block', customClass);
    const styles = { color: textColour, backgroundColor: bgColour };
    return (
      <section className={classes} style={styles}>
        <div className="wrapper">{children}</div>
      </section>
    );
  }
});

export default ScreenBlock;
