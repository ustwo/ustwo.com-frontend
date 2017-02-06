import React, { Component } from 'react';
import classnames from 'classnames';
import ScrollWrapper from 'app/components/scroll-wrapper';
import transitionOnScroll from 'app/lib/transition-on-scroll';

class HomeSmorgasbord extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="home-smorgasbord">
        <div className="smorgasbord-block smorgasbord-video"></div>
        <div className="smorgasbord-block-wrapper">
          <div className="smorgasbord-block smorgasbord-event"></div>
          <div className="smorgasbord-block smorgasbord-studios"></div>
        </div>
        <div className="smorgasbord-block smorgasbord-news"></div>
      </div>
    );
  }
}

export default HomeSmorgasbord;
