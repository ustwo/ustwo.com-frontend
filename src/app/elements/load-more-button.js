'use strict';

import React from 'react';
import classnames from 'classnames';

export default class LoadMoreButton extends React.Component {
  render() {
    const props = this.props;
    const classes = classnames({
      loading: props.loading
    });

    return (
      <div className="load-more-button">
        <button onClick={this.onClick} className={classes} disabled={props.disabled}>Load more <div className="loader"></div></button>
      </div>
    );
  }
  onClick = (e) => {
    e.preventDefault();
    this.props.onClick && this.props.onClick();
  }
};
