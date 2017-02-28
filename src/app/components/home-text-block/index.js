import React from 'react';
import window from 'app/adaptors/server/window';
import transitionOnScroll from 'app/lib/transition-on-scroll';
import Flux from 'app/flux';

const distance = '100';

function showPopup(name) {
  return () => {
    Flux.showPopup(name);
  }
}

function HomeTextBlock({ children, scrollProgress, content }) {
  /* Parallax */
  let styles = {};
  if (window.innerWidth > 768) {
    styles = {
      transform: `translate3d(0,${transitionOnScroll(scrollProgress, 0, 0.5, 1, 1, distance, true)}px,0)`
    }
  }

  /* Pass down showPopup function to child component */
  let textComponent = React.cloneElement(content.text, { showPopup });

  return (
    <div className="home-text-block" style={styles}>
      <div className="home-section-title">{content.title}</div>
      {textComponent}
    </div>
  );
}

export default HomeTextBlock;
