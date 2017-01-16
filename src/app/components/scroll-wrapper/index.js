'use strict';

import React, { Component } from 'react';
import Scroll from 'react-scroll'; /* Animate and scroll to location in document */
import env from 'app/adaptors/server/env';

/* Return a range of 0 to 1 to show scroll progress of the element passing throught the viewport */
/* TODO: increase this range to include as the element is being scrolled in */
function getScrollProgress(top, height, scrollPosition) {
  if (scrollPosition < (top - height)) {
    return 0;
  }
  if (scrollPosition > (top - height) && scrollPosition < (top + height)) {
    return Math.round((scrollPosition - top) / height * 100) / 100;
  }
  if (scrollPosition > (top + height)) {
    return 1;
  }
}

/* Returns coordinates of mouse position inside element with scale -1 to 1 on each axis, (top-left is [-1, -1]) */
function getMousePosition(component) {
  return (e) => {
    let mousePosition = {
      coordinateX: Math.round((e.pageX / component.state.elementAttributes.width - 0.5) * 200) / 100,
      coordinateY: Math.round((e.pageY / component.state.elementAttributes.height - 0.5) * 200) / 100
    };

    component.setState({ mousePosition });
  }
}

function getDeviceRotation(component) {
  return (e) => {
    mousePosition = {
      coordinateX: Math.round((e.accelerationX / component.state.elementAttributes.width - 0.5) * 200) / 100,
      coordinateY: Math.round((e.accelerationY / component.state.elementAttributes.height - 0.5) * 200) / 100
    };

    component.setState({ mousePosition });
  }
}

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
  const element = component.state.elementAttributes;
  let position = element.top + element.height;

  return () => {
    console.log("I'm here");
    Scroll.animateScroll.scrollTo(position);
  };
}

function goToPrevSlide(component) {
  const element = component.state.elementAttributes;
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

    return (
      <div class="scroll-wrapper" ref={(ref) => this.scrollWrapper = ref}>
        {this.props.component({
          scrollProgress,
          mousePosition: this.state.mousePosition,
          handleNextClick: goToNextSlide(this),
          handlePrevClick: goToPrevSlide(this)
        })}
      </div>
    );
  }
}

export default ScrollWrapper;
