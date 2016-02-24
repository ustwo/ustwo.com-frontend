'use strict';

import React from 'react';
import classnames from 'classnames';

const LoadMoreButton = React.createClass({
  onClick(e) {
    e.preventDefault();
    this.props.onClick && this.props.onClick();
  },
  render() {
    const { loading, disabled } = this.props;
    const props = this.props;
    const topLevelClasses = classnames('load-more-button', { hidden: disabled });
    const buttonClasses = classnames({ loading: loading });

    return <div className={topLevelClasses}>
      <button
        onClick={this.onClick}
        className={buttonClasses}
      >
        Gimme more <div className="loader"></div>
      </button>
    </div>;
  }
});

export default LoadMoreButton;
