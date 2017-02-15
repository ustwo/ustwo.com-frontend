import React, { Component } from 'react';
import classnames from 'classnames';

/*
  Get Scroll Progress:
  Return a range of 0 to 1 to show scroll progress of the component passing throught the viewport.
  Starts when element is halfway on the screen and ends when it is completely off.
  So scroll progress lasts 1.5 * height of the element.
  TODO: More flexibility, e.g. allow start as soon as element comes into view?
*/
function getScrollProgress(top, height, scrollPosition) {
  if (scrollPosition <= top - (height * 0.5)) {
    return 0;
  }
  if (scrollPosition > top - (height * 0.5) && scrollPosition <= top + height) {
    let result = (scrollPosition - (top - (height * 0.5))) / (height * 1.5);
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
    const mousePosition = {
      coordinateX: Math.round((e.clientX / component.state.elementAttributes.width - 0.5) * 200) / 100,
      coordinateY: Math.round((e.clientY / component.state.elementAttributes.height - 0.5) * 200) / 100
    };

    component.setState({ mousePosition });
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
      mousePosition: {}
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props != nextProps) {
      getElementAttributes(this);
    }
  }

  componentDidMount() {
    getElementAttributes(this);

    if (this.props.requireMousePosition) {
      this.scrollWrapper.addEventListener('mousemove', getMousePosition(this));
    }
  }

  componentWillUnmount() {
    if (this.props.requireMousePosition) {
      this.scrollWrapper.removeEventListener('mousemove', getMousePosition(this));
    }
  }

  render() {
    const scrollProgress = getScrollProgress(this.state.elementAttributes.top, this.state.elementAttributes.height, this.props.documentScrollPosition);
    const mousePosition = this.state.mousePosition;

    /* Pass down the above props to the child component */
    const component = React.cloneElement(this.props.component, { scrollProgress, mousePosition });

    const classes = classnames('scroll-wrapper', this.props.className);

    return (
      <div className={classes} ref={(ref) => this.scrollWrapper = ref}>
        <div className="scroll-wrapper-inner">
          {component}
        </div>
      </div>
    );
  }
}

export default ScrollWrapper;
