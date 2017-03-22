import React, { Component } from 'react';
import classnames from 'classnames';
import Flux from 'app/flux';

class PageLoader extends Component {

  componentDidMount() {
    Flux.homeLoaderShown();
    Flux.overflowHidden();
  }

  componentWillUnmount() {
    Flux.overflowAuto();
  }

  render() {
    const { pageId, heightStyle } = this.props;
    const classes = classnames('page-loader', `loading-${pageId}`);

    return (
      <div className={classes} style={heightStyle}>
        <div className="page-loader-icon">
          <img src="/images/page-loader-placeholder.gif" />
        </div>
      </div>
    );
  }
};

export default PageLoader;
