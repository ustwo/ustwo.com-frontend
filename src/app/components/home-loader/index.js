import React, { Component } from 'react';
import classnames from 'classnames';

import UstwoLogoSequenceCutout from 'app/components/ustwo-logo-sequence-cutout';

class HomeLoader extends Component {

  constructor(props) {
    super(props);

    /* Show loader as default */
    this.state = { hide: false }
  }

  componentWillReceiveProps(nextProps) {
    /*
      As the parent component becomes 'loaded' we hide this component using css on page-home.
      However, we want to remove it completely AFTER the transition so we have a timeout before
      setting the state to show:false.
    */
    if (nextProps.loaded) {
      setTimeout(() => {
        this.setState({ hide: true });
      }.bind(this), 1000);
    }
  }

  render() {
    let content;
    /* Then throw it away when we know it's not longer visible */
    if (this.state.hide) {
      content = <div />;
    } else {
      /* autoAnim delay so the component can 'collect it's thoughts' before playing the animation smoothly */
      content = (
        <div className="home-loader">
          <div className="home-intro-logo">
            <UstwoLogoSequenceCutout autoAnim={500} />
          </div>
        </div>
      );
    }
    return content;
  }

}

export default HomeLoader;
