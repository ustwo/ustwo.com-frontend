import React, { Component } from 'react';
import classnames from 'classnames';
import Flux from 'app/flux';

class PageLoader extends Component {

  constructor(props) {
    super(props);

    this.state = {
      alt: false
    }
  }

  componentDidMount() {
    Flux.homeLoaderShown();
    Flux.overflowHidden();

    this.setState({
      alt: Math.random() >= 0.5
    })
  }

  componentWillUnmount() {
    Flux.overflowAuto();
  }

  render() {
    const { pageId } = this.props;
    const { alt } = this.state;
    const classes = classnames('page-loader', `loading-${pageId}`, { alt });

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
