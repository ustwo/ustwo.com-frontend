import React from 'react';
import classnames from 'classnames';

import Flux from '../../flux';

const Modal = React.createClass({
  onClick() {
    Flux.closeModal();
  },
  onClickContent(e) {
    e.stopPropagation();
  },
  render() {
    const { className, belowHeader, children } = this.props;
    const classes = classnames('modal', className, {
      'below-header': belowHeader
    });
    return <div
      className={classes}
      onClick={this.onClick}
    >
      {children}
    </div>;
  }
});

export default Modal;
