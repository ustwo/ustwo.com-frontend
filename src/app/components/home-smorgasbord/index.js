import React, { Component } from 'react';
import classnames from 'classnames';
import ScrollWrapper from 'app/components/scroll-wrapper';
import transitionOnScroll from 'app/lib/transition-on-scroll';

const distance = 100;

class HomeSmorgasbord extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    let { scrollProgress } = this.props;

    let styles = {
      // opacity: transitionOnScroll(scrollProgress, 0, 0.23, 0.77, 1),
      transform: `translate3d(0,${transitionOnScroll(scrollProgress, 0, 0.33, 1, 1, distance, true)}px,0)`
    }

    return (
      <div className="home-smorgasbord" style={styles}>
        <div className="home-section-title">Still Hungry?</div>
        <h1>More <span className="home-gradient-text-cold">yes</span><br /> More <span className="home-gradient-text-lukewarm">can</span><br /> More <span className="home-gradient-text-hot">wow</span></h1>
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
