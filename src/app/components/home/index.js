'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';

import SVG from 'app/components/svg';

const rainbowColours = ['#ED0082', '#E60C29', '#FF5519', '#FFBF02', '#96CC29', '#14C04D', '#16D6D9', '#009CF3', '#143FCC', '#6114CC', '#111111'];

/* Returns coordinates of mouse position inside element with scale -1 to 1 on each axis, (top-left is [-1, -1]) */
function introElementMousePosition(component) {
  return (e) => {
    let mousePosition = {
      coordinateX: Math.round((e.pageX / component.state.introElementDimensions.width - 0.5) * 200) / 100,
      coordinateY: Math.round((e.pageY / component.state.introElementDimensions.height - 0.5) * 200) / 100
    }
    component.setState({ introElementMousePosition: mousePosition });
  }
}

class PageHome extends Component {

  constructor(props) {
    super(props);

    this.state = {
      introElementDimensions: {},
      introElementMousePosition: {}
    }
  }

  componentDidMount() {
    /* Get dimensions of the element */
    let introElementDimensions = {
      width: this.introElement.scrollWidth,
      height: this.introElement.scrollHeight
    };
    this.setState({ introElementDimensions });

    /* Assign position of mouse inside element to state */
    this.introElement.addEventListener('mousemove', introElementMousePosition(this));
  }

  componentWillUnmount() {
    this.introElement.removeEventListener('mousemove', introElementMousePosition(this));
  }

  render() {
    const { page } = this.props;
    const classes = classnames('page-home', this.props.className);

    return (
      <article className={classes}>

        {this.renderIntroElement()}

      </article>
    );
  }

  renderIntroElement() {
    const logoLayers = rainbowColours.map((colour, i) => {
      let modifier = 2 * ((rainbowColours.length - i) * (rainbowColours.length - i) * 0.2);
      let styles = {
        transform: `translate(${this.state.introElementMousePosition.coordinateX * modifier}px, ${this.state.introElementMousePosition.coordinateY * modifier}px)`,
        fill: colour
      }
      return (<SVG title="ustwo logo" spritemapID="ustwologo" style={styles} />);
    });

    return (
      <div className="home-intro" ref={(element) => this.introElement = element }>

        <div className="home-intro-logo">
          {logoLayers}
        </div>

      </div>
    );
  }

};

export default PageHome;
