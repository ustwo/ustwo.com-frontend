'use strict';

import React from 'react';
import classnames from 'classnames';

export default class LoadMoreButton extends React.Component {
  render() {
    const classes = classnames({
      loading: this.props.loading
    });
    return (
      <div className="load-more-button">
        <button onClick={this.onClick} className={classes}>Load more <div className="loader"></div></button>
      </div>
    );
  }
  onClick = (e) => {
    e.preventDefault();
    this.props.onClick && this.props.onClick();
  }
};
