import React, { Component } from 'react';
import classnames from 'classnames';
import LoaderWrapper from 'app/components/loader-wrapper';
import env from 'app/adaptors/server/env';
import window from 'app/adaptors/server/window';
import Flux from 'app/flux';

const tickerTotalPage = 1500;
const tickerTotalHome = 3500;
const tickerFrequency = 500;
const ultimateTimeout = 3500;

function setFixedHeight(component) {
  const windowHeight = window.innerHeight;
  component.setState({ fixedHeight: `${windowHeight}px` });
  Flux.setWindowHeight(windowHeight);
}

class PageContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showPage: true,
      ticker: this.props.currentPage === 'home' && !this.props.homeLoaderShown ? tickerTotalHome : tickerTotalPage,
      fixedHeight: window.innerHeight,
      ultimateTicker: ultimateTimeout
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentPage != this.props.currentPage) {
      setTimeout(() => {
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

  ultimateTicker() {
    const { ultimateTicker } = this.state;

    if (ultimateTicker > 0) {
      this.setState({ ultimateTicker: ultimateTicker - tickerFrequency });
    } else {
      clearInterval(this.ultimateTimeout);
    }
  }

  componentDidMount() {
    this.timer = setInterval(this.ticker.bind(this), tickerFrequency);
    this.ultimateTimeout = setInterval(this.ultimateTicker.bind(this), tickerFrequency);

    if (env.Modernizr.touchevents) {
      const windowHeight = window.innerHeight;
      this.setState({ fixedHeight: windowHeight });
      Flux.setWindowHeight(windowHeight);
      window.addEventListener('orientationchange', setFixedHeight(this), false);
    }
  }

  componentWillUnmount() {
    if (env.Modernizr.touchevents) {
      window.removeEventListener('orientationchange', setFixedHeight(this), false);
    }
  }

  render() {
    const { viewportDimensions, currentPage, dataLoading, pageState, pageMap, homeLoaderShown, heroVideoReady, visitedWorkCapabilities } = this.props;
    const capability = ['work/discovery-strategy', 'work/design-build', 'work/launch-scale', 'work/ways-of-working'];
    const heroReady = (currentPage === 'home' || currentPage === 'work') && !env.Modernizr.touchevents ? heroVideoReady : true;
    let loaded = !dataLoading && this.state.ticker === 0 && heroReady;

    if (loaded) {
      clearInterval(this.ultimateTimeout);
    }

    if (this.state.ultimateTicker === 0 && !loaded) {
      loaded = true;
    }

    const props = pageState;
    const disableLoaderForCapabilities = capability.includes(currentPage) && visitedWorkCapabilities;
    props.loaded = disableLoaderForCapabilities ? true : loaded;
    props.fixedHeight = this.state.fixedHeight;

    const loader = disableLoaderForCapabilities ? null : <LoaderWrapper currentPage={currentPage} homeLoaderShown={homeLoaderShown} loaded={loaded} />;

    return (
      <div className="page-content">
        {React.createElement(pageMap[currentPage], props)}
        {loader}
      </div>
    );
  }
};

export default PageContent;
