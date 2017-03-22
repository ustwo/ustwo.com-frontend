import React, { Component } from 'react';
import classnames from 'classnames';
import Flux from 'app/flux';

class PageLoader extends Component {

  constructor(props) {
    super(props);

    this.state = {
      height: this.props.viewportDimensions.height
    }
  }

  componentDidMount() {
    Flux.homeLoaderShown();
    Flux.overflowHidden();
  }

  componentWillUnmount() {
    Flux.overflowAuto();
  }

  render() {
    const { pageId } = this.props;
    const classes = classnames('page-loader', `loading-${pageId}`);

    const styles = {
      height: `${this.state.height}px`
    }

    return (
      <div className={classes} style={styles}>
        <div className="page-loader-icon">
          <img src="/images/page-loader-placeholder.gif" />
        </div>
      </div>
    );
  }
};

export default PageLoader;
