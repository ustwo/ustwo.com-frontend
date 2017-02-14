import React, { Component } from 'react';
import classnames from 'classnames';

import Flux from 'app/flux';

class Popup extends Component {

  onClick() {
    Flux.closePopup();
  }

  render() {
    const { className, children } = this.props;
    const classes = classnames('popup', className.replace('shown',''));

    return (
      <div className={classes} onClick={this.onClick}>
        This is a popup for {this.props.type}
      </div>
    );
  }
}

export default Popup
