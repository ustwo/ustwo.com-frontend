'use strict';

import React from 'react';
import Flux from '../flux';
import classnames from 'classnames';

export default class LoadMoreButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    }
  }
  render() {
    const classes = classnames({
      loading: this.state.loading
    });
    return (
      <div className="load-more-button">
        <button onClick={this.onClickLoadMore} className={classes}>Load more <div className="loader"></div></button>
      </div>
    );
  }
  onClickLoadMore = () => {
    Flux.loadMorePosts();
    this.setState({
      loading: !this.state.loading
    });
  }
};
