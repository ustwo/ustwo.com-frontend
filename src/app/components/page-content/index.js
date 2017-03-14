import React, { Component } from 'react';
import PageLoader from 'app/components/page-loader';
import TransitionManager from 'react-transition-manager';

const tickerStart = 3000;
const tickerFrequency = 500;

class PageContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      ticker: tickerStart
    }
  }

  ticker() {
    const { ticker } = this.state;

    if (ticker > 0) {
      this.setState({ ticker: ticker - tickerFrequency });
    } else {
      this.setState({ ticker: tickerStart });
      clearInterval(this.timer);
    }
  }

  componentDidMount() {
    if (this.props.pageLoading) {
      this.timer = setInterval(this.ticker.bind(this), tickerFrequency);
    }
  }

  render() {
    const { currentPage, pageLoading, pageState, pageMap } = this.props;

    let content;
    if (!pageLoading && this.state.ticker === tickerStart) {
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
