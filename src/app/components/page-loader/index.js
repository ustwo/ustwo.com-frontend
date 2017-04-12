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
    const { pageId, workSubpage } = this.props;
    const classes = classnames('page-loader', `loading-${pageId}`, { workSubpage });

    return (
      <div className={classes}>
        <div className="page-loader-icon">
          <div className="page-loader-icon-inner">
            <div className="half left">
              <div className="bg"></div>
            </div>
            <div className="half right">
              <div className="bg"></div>
            </div>
          </div>
          <div className="page-loader-icon-images" />
        </div>
      </div>
    );
  }
};

export default PageLoader;
