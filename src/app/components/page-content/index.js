import React, { Component } from 'react';
import PageLoader from 'app/components/page-loader';
import TransitionManager from 'react-transition-manager';

const tickerStart = 3000;
const tickerFrequency = 500;

class PageContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ticker: tickerStart,
      renderPage: false
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.ticker === 0;
  }

  ticker() {
    const { ticker } = this.state;

    if (ticker > 0) {
      this.setState({ ticker: ticker - tickerFrequency });
    } else {
      clearInterval(this.timer);
    }
  }

  componentDidMount() {
    this.timer = setInterval(this.ticker.bind(this), tickerFrequency);
  }

  render() {
    const { currentPage, pageLoading, pageState, pageMap, homeLoaderShown, backgroundVideoReady } = this.props;

    let content;
    if ((currentPage === 'home' && !homeLoaderShown) || (!this.props.pageLoading && this.state.ticker === 0)) {
      content = React.createElement(pageMap[currentPage], pageState);
    } else {
      content = (
        <PageLoader key="loader" pageId={currentPage} />
      );
    }

    return (
      <TransitionManager
        component="div"
        className="page-content"
        duration={200}
      >
        {content}
      </TransitionManager>
    );
  }
};

export default PageContent;
