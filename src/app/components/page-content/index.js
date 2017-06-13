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

    this.rafTicking = false;
    this.newFixedHeight = window.innerHeight;
    this.setFixedHeightBound = this.setFixedHeight.bind(this);
    this.updateFixedHeightBound = this.updateFixedHeight.bind(this);
  }

  componentDidMount() {
    this.timer = setInterval(this.ticker.bind(this), tickerFrequency);

    this.setFixedHeight()

    window.addEventListener('orientationchange', this.setFixedHeightBound);
    window.addEventListener('resize', this.setFixedHeightBound);
  }

  componentWillUnmount() {
    window.removeEventListener('orientationchange', this.setFixedHeightBound);
    window.removeEventListener('resize', this.setFixedHeightBound);
  }

  requestTick() {
    if(!this.rafTicking) {
      window.requestAnimationFrame(this.updateFixedHeightBound);
    }
    this.rafTicking = true;
  }

  updateFixedHeight() {
    this.rafTicking = false;
    this.setState({ fixedHeight: this.newFixedHeight });
    Flux.setWindowHeight(this.newFixedHeight);
  }

  setFixedHeight() {
    this.newFixedHeight = window.innerHeight;
    this.requestTick();
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
