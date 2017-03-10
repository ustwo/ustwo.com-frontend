import React, { Component } from 'react';
import classnames from 'classnames';
import env from 'app/adaptors/server/env';

/*
  Get Scroll Progress:
  Return a range of 0 to 1 to show scroll progress of the component passing throught the viewport.
  Starts when element is halfway on the screen and ends when it is completely off.
  So scroll progress lasts 1.5 * height of the element.
  TODO: More flexibility, e.g. allow start as soon as element comes into view?
*/
function getScrollProgress(top, height, scrollPosition) {
  if (scrollPosition <= top - height) {
    return 0;
  }
  if (scrollPosition > top - height && scrollPosition <= top + height) {
    let result = (scrollPosition - (top - height)) / (height * 2);
    return Math.round(result * 100) / 100;
  }
  if (scrollPosition > top + height) {
    return 1;
  }
}

/*
  Get Mouse Position:
  Return coordinates of mouse position inside element: -1 to 1 on each axis,
  e.g. top-left is [-1, -1]
  TODO: Extend/Change component to cater for touch devices, i.e. use accelerometre
*/
function getMousePosition(component) {
  return (e) => {
    const screenPosition = {
      coordinateX: Math.round((e.clientX / component.state.elementAttributes.width - 0.5) * 200) / 100,
      coordinateY: Math.round((e.clientY / component.state.elementAttributes.height - 0.5) * 200) / 100
    };

    component.setState({ screenPosition });
  }
}

function getGyroscopePosition(component) {
  return (e) => {
    const screenPosition = {
      coordinateX: Math.round((e.gamma / 90) * 100) / 100,
      coordinateY: Math.round((e.beta / 90) * 100) / 100
    }

    // console.log('X: ' + screenPosition.coordinateX);
    // console.log('Y: ' + screenPosition.coordinateY);

    component.setState({ screenPosition });
  }
}

/*
  Get Element Attributes:
  Return element dimensions and offset from top
*/
function getElementAttributes(component) {
  const rect = component.scrollWrapper.getBoundingClientRect();
  const elementAttributes = {
    width: rect.width,
    height: rect.height,
    top: component.scrollWrapper.offsetTop
  };
  component.setState({ elementAttributes });
}

class ScrollWrapper extends Component {

  constructor(props) {
    super(props);

    this.state = {
      elementAttributes: {},
      screenPosition: {}
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props != nextProps) {
      getElementAttributes(this);
    }
  }

  componentDidMount() {
    getElementAttributes(this);

    if (this.props.requireScreenPosition) {
      if (env.Modernizr.touchevents) {
        window.addEventListener('deviceorientation', getGyroscopePosition(this), true);
      } else {
        this.scrollWrapper.addEventListener('mousemove', getMousePosition(this));
      }
    }
  }

  componentWillUnmount() {
    if (this.props.requireScreenPosition) {
      this.scrollWrapper.removeEventListener('mousemove', getMousePosition(this));
    }
  }

  render() {
    const { screenPosition, elementAttributes } = this.state;
    const { component, className, documentScrollPosition } = this.props;
    const scrollProgress = getScrollProgress(elementAttributes.top, elementAttributes.height, documentScrollPosition);

    /* Pass down the above props to the child component */
    const renderComponent = React.cloneElement(component, { scrollProgress, screenPosition, className });

    const classes = classnames('scroll-wrapper', className);

    return (
      <div className={classes} ref={(ref) => this.scrollWrapper = ref}>
        <div className="scroll-wrapper-inner">
          {renderComponent}
        </div>
      </div>
    );
  }
}

export default ScrollWrapper;
