import React, { Component } from 'react';
import transitionOnScroll from 'app/lib/transition-on-scroll';
import Flux from 'app/flux';

const distance = '100';

class HomeTextBlock extends Component {

  showRollover(name) {
    return () => {
      Flux.showRollover(name);
    }
  }

  render() {
    const { children, scrollProgress, content } = this.props;

    /* Parallax */
    let styles = {
      transform: `translate3d(0,${transitionOnScroll(scrollProgress, 0, 0.5, 1, 1, distance, true)}px,0)`
    }

    /* Pass down showRollover function to child component */
    let textComponent = React.cloneElement(content.text, {
      showRollover: this.showRollover
    });

    return (
      <div className="home-text-block" style={styles}>
        <div className="home-section-title">{content.title}</div>
        {textComponent}
        <div className="home-text-block-rollover"></div>
      </div>
    );
  }
}

export default HomeTextBlock;
