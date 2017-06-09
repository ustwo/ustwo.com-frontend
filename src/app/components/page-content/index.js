import React, { Component } from 'react';
import classnames from 'classnames';
import LoaderWrapper from 'app/components/loader-wrapper';
import env from 'app/adaptors/server/env';
import window from 'app/adaptors/server/window';
import Flux from 'app/flux';

const tickerTotalPage = 1000;
const tickerFrequency = 200;

function setFixedHeight(component) {
  return () => {
    const windowHeight = window.innerHeight;
    component.setState({ fixedHeight: windowHeight });
    Flux.setWindowHeight(windowHeight);
  }
}

class PageContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showPage: true,
      ticker: tickerTotalPage,
      fixedHeight: window.innerHeight
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

  componentDidMount() {
    this.timer = setInterval(this.ticker.bind(this), tickerFrequency);

    const windowHeight = window.innerHeight;
    this.setState({ fixedHeight: windowHeight });
    Flux.setWindowHeight(windowHeight);

    window.addEventListener('orientationchange', setFixedHeight(this), false);
    if (this.props.documentScrollPosition > window.innerHeight + 100) {
      window.addEventListener('resize', setFixedHeight(this), false);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('orientationchange', setFixedHeight(this), false);
    if (this.props.documentScrollPosition > window.innerHeight + 100) {
      window.removeEventListener('resize', setFixedHeight(this), false);
    }
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
