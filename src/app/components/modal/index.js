import React, { Component } from 'react';
import classnames from 'classnames';

import Flux from 'app/flux';

class Modal extends Component {

  constructor(props) {
    super(props);

    this.state = {
      disableClose: false
    }
  }

  closeModal() {
    if (!this.state.disableClose) {
      Flux.closeModal();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps != this.props) {
      if (nextProps.className.includes('video-overlay')) {
        this.setState({ disableClose: true });
      }
    }
  }

  render() {
    const { className, belowHeader, children } = this.props;
    const classes = classnames('modal', className.replace('shown',''), {
      'below-header': belowHeader
    });

    return (
      <div className={classes} onClick={this.closeModal.bind(this)}>
        {this.props.children}
      </div>
    );
  }
}

export default Modal;
