'use strict';

import React, { Component } from 'react';
import classnames from 'classnames';
import Scroll from 'react-scroll'; /* Animate and scroll to location in document */
import env from 'app/adaptors/server/env';

/* Get Scroll Progress:
   Return a range of 0 to 1 to show scroll progress of the element passing throught the viewport.
   Starts when element is halfway on the screen and ends when it is halfway off.
   So scroll progress lasts the height of the element.
   As an example, you could utilise children of element parallaxing in for 0 to 0.33, hold position,
   then parallax out from 0.67 to 1. */
function getScrollProgress(top, height, scrollPosition) {
  if (scrollPosition < top - (height * 0.5)) {
    return 0;
  }
  if (scrollPosition > top - (height * 0.5) && scrollPosition < top + (height * 0.5)) {
    let result = (scrollPosition - (top - (height * 0.5))) / height;
    return Math.round(result * 100) / 100;
  }
  if (scrollPosition > top + (height * 0.5)) {
    return 1;
  }
}

/* Returns coordinates of mouse position inside element with scale -1 to 1 on each axis, (top-left is [-1, -1]) */
function getMousePosition(component) {
  return (e) => {
    let mousePosition = {
      coordinateX: Math.round((e.clientX / component.state.elementAttributes.width - 0.5) * 200) / 100,
      coordinateY: Math.round((e.clientY / component.state.elementAttributes.height - 0.5) * 200) / 100
    };

    component.setState({ mousePosition });
  }
}

// function getDeviceRotation(component) {
//   return (e) => {
//     mousePosition = {
//       coordinateX: Math.round((e.accelerationX / component.state.elementAttributes.width - 0.5) * 200) / 100,
//       coordinateY: Math.round((e.accelerationY / component.state.elementAttributes.height - 0.5) * 200) / 100
//     };
//
//     component.setState({ mousePosition });
//   }
// }

/* Save the element dimensions and offset to viewport to state */
function getElementAttributes(component) {
  let rect = component.scrollWrapper.getBoundingClientRect();
  let elementAttributes = {
    width: rect.width,
    height: rect.height,
    top: component.scrollWrapper.offsetTop
  };
  component.setState({ elementAttributes });
}

function goToNextSlide(component) {
  let element = component.state.elementAttributes;
  let position = element.top + element.height;

  return () => {
    Scroll.animateScroll.scrollTo(position);
  };
}

function goToPrevSlide(component) {
  let element = component.state.elementAttributes;
  /* TODO: using element.height here is not strictly speaking accurate. What we need is the
           previous element's height but it will have to do for now */
  let position = element.top - element.height;

  return () => {
    Scroll.animateScroll.scrollTo(position);
  };
}

class ScrollWrapper extends Component {

  constructor(props) {
    super(props);

    this.state = {
      elementAttributes: {},
      mousePosition: {}
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props != nextProps) {
      getElementAttributes(this);
    }
  }

  // shouldComponentUpdate(nextProps, nextState) {
    // Stop it
    // return nextProps.documentScrollPosition >= 0;
  // }

  componentDidMount() {
    getElementAttributes(this);

    if (this.props.getMousePosition && !env.Modernizr.touchevents) {
      this.scrollWrapper.addEventListener('mousemove', getMousePosition(this));
    }
    // if (this.props.getMousePosition && env.Modernizr.touchevents) {
    //   this.scrollWrapper.addEventListener('devicemotion', getDeviceRotation(this));
    // }
  }

  componentWillUnmount() {
    if (this.props.getMousePosition) {
      this.introRef.removeEventListener('mousemove', getMousePosition(this));
    }
  }

  render() {
    let scrollProgress = getScrollProgress(this.state.elementAttributes.top, this.state.elementAttributes.height, this.props.documentScrollPosition);

    let component = React.cloneElement(this.props.component, {
      scrollProgress,
      mousePosition: this.state.mousePosition
    });

    let classes = classnames('scroll-wrapper', {
      fullWidth: this.props.fullWidth
    });

    return (
      <div className={classes} ref={(ref) => this.scrollWrapper = ref}>
        <div className="scroll-wrapper-inner">
          {component}
        </div>
        <div className="home-prev-slide" onClick={goToPrevSlide(this)}></div>
        <div className="home-next-slide" onClick={goToNextSlide(this)}></div>
      </div>
    );
  }
}

export default ScrollWrapper;
