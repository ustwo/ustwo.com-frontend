import React, { Component } from 'react';
import { debounce } from 'lodash';
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

    this.setFixedHeightBound = debounce(this.setFixedHeight.bind(this), 20);
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
    const { currentPage, pageState, pageMap, extraClasses } = this.props;

    const propsToPass = pageState;
    propsToPass.loaded = this.state.ticker <= 0;
    propsToPass.fixedHeight = this.state.fixedHeight;

    return (
      <div className={'page-content ' + extraClasses}>
        {React.createElement(pageMap[currentPage], propsToPass)}
      </div>
    );
  }
};

export default PageContent;
