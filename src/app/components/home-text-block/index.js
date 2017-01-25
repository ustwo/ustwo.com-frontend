import React from 'react';
import transitionOnScroll from 'app/lib/transition-on-scroll';

const distance = '100'; /* pixels */

function HomeTextBlock({ scrollProgress, content }) {

  let styles = {
    opacity: transitionOnScroll(scrollProgress, 0, 0.2, 0.77, 1),
    transform: `translate3d(0,${transitionOnScroll(scrollProgress, 0, 0.5, 1, 1, distance, true)}px,0)`
  }

  return (
    <div className="home-text-block" style={styles}>
      <div className="home-section-title">{content.title}</div>
      {content.text}
    </div>
  );
}

module.exports = HomeTextBlock;
