import React, { Component } from 'react';
import classnames from 'classnames';
import Flux from 'app/flux';

import PageLoadingIcon from 'app/components/page-loading-icon';

class PageLoader extends Component {

  constructor(props) {
    super(props);

    this.state = { hide: false }
  }

  componentDidMount() {
    Flux.homeLoaderShown();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loaded) {
      setTimeout(() => {
        this.setState({ hide: true });
      }.bind(this), 1000);
    }
  }

  render() {
    const { pageId, className, loaded } = this.props;
    const classes = classnames('page-loader', `loading-${pageId}`, className, {
      hide: loaded
    });

    let content;
    if (this.state.hide) {
      content = <div />;
    } else {
      content = (
        <div className={classes}>
          <div className="page-loader-icon">
            <img src="/images/page-loader-placeholder.gif" />
          </div>
        </div>
      );
    }

    return content;
  }
};

export default PageLoader;
