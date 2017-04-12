import React, { Component } from 'react';
import classnames from 'classnames';
import LoaderWrapper from 'app/components/loader-wrapper';

const tickerTotalPage = 1500;
const tickerTotalHome = 5000;
const tickerFrequency = 500;

class PageContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showPage: true,
      ticker: this.props.currentPage === 'home' && !this.props.homeLoaderShown ? tickerTotalHome : tickerTotalPage
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

  componentWillUnmount() {
    console.log('unmount');
  }

  componentDidMount() {
    this.timer = setInterval(this.ticker.bind(this), tickerFrequency);
  }

  render() {
    const { viewportDimensions, currentPage, dataLoading, pageState, pageMap, homeLoaderShown, heroVideoReady } = this.props;
    const heroReady = currentPage === 'home' || currentPage === 'work' ? heroVideoReady : true;
    const loaded = !dataLoading && this.state.ticker === 0 && heroReady;

    let props = pageState;
    props.loaded = loaded;

    return (
      <div className="page-content">
        {React.createElement(pageMap[currentPage], props)}
        <LoaderWrapper currentPage={currentPage} homeLoaderShown={homeLoaderShown} loaded={loaded} />
      </div>
    );
  }
};

export default PageContent;
