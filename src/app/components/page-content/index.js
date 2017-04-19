import React, { Component } from 'react';
import classnames from 'classnames';
import LoaderWrapper from 'app/components/loader-wrapper';
import env from 'app/adaptors/server/env';
import window from 'app/adaptors/server/window';
import Flux from 'app/flux';

const tickerTotalPage = 1500;
const tickerTotalHome = 3500;
const tickerFrequency = 500;

class PageContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showPage: true,
      ticker: this.props.currentPage === 'home' && !this.props.homeLoaderShown ? tickerTotalHome : tickerTotalPage,
      fixedHeight: `${window.innerHeight}px`
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentPage != this.props.currentPage) {
      setTimeout(() => {
        console.log(nextProps.currentPage);
        this.setState({ showPage: false });
      }, 1000);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.ticker === 0 || nextProps.dataLoading != this.props.dataLoading;
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

  setFixedHeight() {
    const windowHeight = window.innerHeight;
    console.log(windowHeight);
    this.setState({ fixedHeight: `${windowHeight}px` });
    Flux.setWindowHeight(windowHeight);
  }

  componentDidMount() {
    this.timer = setInterval(this.ticker.bind(this), tickerFrequency);

    if (env.Modernizr.touchevents) {
      // this.setFixedHeight.bind(this);
      const windowHeight = window.innerHeight;
      console.log(windowHeight);
      this.setState({ fixedHeight: `${windowHeight}px` });
      Flux.setWindowHeight(windowHeight);
      window.addEventListener('orientationchange', this.setFixedHeight.bind(this), false);
    }
  }

  componentWillUnmount() {
    if (env.Modernizr.touchevents) {
      window.removeEventListener('orientationchange', this.setFixedHeight.bind(this), false);
    }
  }

  render() {
    const { viewportDimensions, currentPage, dataLoading, pageState, pageMap, homeLoaderShown, heroVideoReady } = this.props;
    const heroReady = (currentPage === 'home' || currentPage === 'work') && !env.Modernizr.touchevents ? heroVideoReady : true;
    const loaded = !dataLoading && this.state.ticker === 0 && heroReady;
    const props = pageState;
    props.loaded = loaded;
    props.fixedHeight = this.state.fixedHeight;

    return (
      <div className="page-content">
        {React.createElement(pageMap[currentPage], props)}
        <LoaderWrapper currentPage={currentPage} homeLoaderShown={homeLoaderShown} loaded={loaded} />
      </div>
    );
  }
};

export default PageContent;
