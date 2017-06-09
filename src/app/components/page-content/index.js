import React, { Component } from 'react';
import classnames from 'classnames';
import env from 'app/adaptors/server/env';
import window from 'app/adaptors/server/window';
import Flux from 'app/flux';

const tickerTotalPage = 1000;
const tickerFrequency = 200;

class PageContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ticker: tickerTotalPage,
      fixedHeight: window.innerHeight
    }

    this.setFixedHeightBound = this.setFixedHeight.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.ticker === 0 || nextProps.dataLoading != this.props.dataLoading;
  }

  componentDidMount() {
    this.timer = setInterval(this.ticker.bind(this), tickerFrequency);

    this.setFixedHeight()

    window.addEventListener('orientationchange', this.setFixedHeightBound);
    if (this.props.documentScrollPosition > window.innerHeight + 100) {
      window.addEventListener('resize', this.setFixedHeightBound);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('orientationchange', this.setFixedHeightBound);
    window.removeEventListener('resize', this.setFixedHeightBound);
  }

  setFixedHeight() {
    const windowHeight = window.innerHeight;
    this.setState({ fixedHeight: windowHeight });
    Flux.setWindowHeight(windowHeight);
  }

  ticker() {
    const { ticker } = this.state;

    if (ticker > 0) {
      this.setState({ ticker: ticker - tickerFrequency });
    } else {
      clearInterval(this.timer);
    }
  }

  render() {
    const { viewportDimensions, currentPage, dataLoading, pageState, pageMap, visitedWorkCapabilities } = this.props;
    const capability = ['work/discovery-strategy', 'work/design-build', 'work/launch-scale', 'work/ways-of-working'];

    let loaded = !dataLoading && this.state.ticker <= 0;

    const props = pageState;
    const disableLoaderForCapabilities = capability.includes(currentPage) && visitedWorkCapabilities;
    props.loaded = disableLoaderForCapabilities ? true : loaded;
    props.fixedHeight = this.state.fixedHeight;

    return (
      <div className="page-content">
        {React.createElement(pageMap[currentPage], props)}
      </div>
    );
  }
};

export default PageContent;
