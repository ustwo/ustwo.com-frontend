import React, { Component } from 'react';
import Hero from 'app/components/hero';
import SVG from 'app/components/svg';
import window from 'app/adaptors/server/window';

class JoinUsHero extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { fixedHeight, isMobile, scrollProgress, title } = this.props;

    return (
      <div className="join-us-hero">
        <Hero
          title={title}
          transitionImage={true}
          eventLabel='join-us'
          showDownIndicator={true}
          fixedHeight={fixedHeight}
          isMobile={isMobile}
          scrollProgress={scrollProgress}
          heroImage={true}
        />
      </div>
    )
  }
}

export default JoinUsHero;
