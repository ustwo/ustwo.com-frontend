import React, { Component } from 'react';
import classnames from 'classnames';
import LoaderWrapper from 'app/components/loader-wrapper';

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

  componentDidMount() {
    this.timer = setInterval(this.ticker.bind(this), tickerFrequency);
  }

  render() {
    const { viewportDimensions, currentPage, dataLoading, pageState, pageMap, homeLoaderShown, heroVideoReady } = this.props;
    const heroReady = currentPage === 'home' || currentPage === 'work' ? heroVideoReady : true;
    let loaded = !dataLoading && this.state.ticker === 0 && heroReady;
    
    let props = pageState;
    props.loaded = loaded;

    const renderPage = !dataLoading ? React.createElement(pageMap[currentPage], props) : (<div />);

    return (
      <div className="page-content">
        {renderPage}
        <LoaderWrapper currentPage={currentPage} homeLoaderShown={homeLoaderShown} loaded={loaded} />
      </div>
    );
  }
};

export default PageContent;
