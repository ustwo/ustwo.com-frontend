import React, { Component } from 'react';
import classnames from 'classnames';
import PageLoader from 'app/components/page-loader';
import HomeLoader from 'app/components/home-loader';

class LoaderWrapper extends Component {

  constructor(props) {
    super(props);

    this.state = { hide: false }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loaded) {
      setTimeout(() => {
        this.setState({ hide: true });
      }.bind(this), 500);
    }
  }

  render() {
    const { currentPage, homeLoaderShown, loaded } = this.props;

    let renderLoader;
    if (this.state.hide) {
      renderLoader = null;
    } else {
      if (currentPage === 'home' && !homeLoaderShown) {
        renderLoader = (<HomeLoader />);
      } else {
        renderLoader = (<PageLoader key="loader" pageId={currentPage} />);
      }
    }

    const classes = classnames('loader-wrapper', `loader-wrapper-${currentPage}`, {
      hide: loaded
    });

    return (
      <div className={classes}>
        {renderLoader}
      </div>
    );
  }
};

export default LoaderWrapper;
