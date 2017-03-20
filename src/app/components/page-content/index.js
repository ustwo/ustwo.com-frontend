import React, { Component } from 'react';
import classnames from 'classnames';
import PageLoader from 'app/components/page-loader';
import TransitionManager from 'react-transition-manager';
import HomeLoader from 'app/components/home-loader';

const tickerTotalPage = 3000;
const tickerTotalHome = 5500;
const tickerFrequency = 500;

class PageContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ticker: this.props.currentPage === 'home' && !this.props.homeLoaderShown ? tickerTotalHome : tickerTotalPage
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.ticker === 0 || nextProps.pageLoading != this.props.pageLoading;
  }

  ticker() {
    const { ticker } = this.state;
    const { currentPage, homeLoaderShown } = this.props;

    if (ticker > 0) {
      this.setState({ ticker: ticker - tickerFrequency });
    } else {
      if (currentPage === 'home' && !homeLoaderShown) {
        Flux.homeIntroVideoViewed(true);
      }
      clearInterval(this.timer);
    }
  }

  componentDidMount() {
    this.timer = setInterval(this.ticker.bind(this), tickerFrequency);
  }

  render() {
    const { currentPage, pageLoading, pageState, pageMap, homeLoaderShown, backgroundVideoReady } = this.props;
    const heroReady = currentPage === 'home' || currentPage === 'work' ? backgroundVideoReady : true;

    let loaded, renderLoader;
    loaded = !pageLoading && this.state.ticker === 0 && heroReady;

    if (currentPage === 'home' && !homeLoaderShown) {
      renderLoader = (<HomeLoader loaded={loaded} />);
    } else {
      renderLoader = (<PageLoader loaded={loaded} key="loader" pageId={currentPage} />);
    }


    let props = pageState;
    props.loaded = loaded;

    const renderPage = !pageLoading ? React.createElement(pageMap[currentPage], props) : (<div />);

    return (
      <div className="page-content">
        {renderPage}
        {renderLoader}
      </div>
    );
  }
};

export default PageContent;
