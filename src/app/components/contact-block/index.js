import React, { Component } from 'react';
import GradientWords from '../gradient-words';
import blendColours from 'app/lib/blend-colours';
import goToNextIteration from 'app/lib/next-iteration';
import env from 'app/adaptors/server/env';

const tickerFrequency = 200;
const timerTotal = 8000;
const topColours = ['#6114CC', '#009CF3', '#FA7D78', '#6114CC'];
const bottomColours = ['#FA7D78', '#A5FAAF', '#FFBF02', '#FA7D78'];
// const coloursLighter = ['#ccb1cf', '#b5deda', '#f3cba1', '#ccb1cf'];

class ContactBlock extends Component {

  constructor(props) {
    super(props);

    this.state = {
      show: false,
      tick: timerTotal,
      iterate: 0
    }
  }

  ticker() {
    if (this.state.tick === 0) {
      goToNextIteration(this, timerTotal, topColours.length);
    }
    this.setState({ tick: this.state.tick - tickerFrequency });
  }

  componentDidMount() {
    setTimeout(() => {
      this.timer = setInterval(this.ticker.bind(this), tickerFrequency);
    }.bind(this), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const progress = Math.round(((timerTotal - this.state.tick) / timerTotal) * 100) / 100;
    const topColour = blendColours(topColours[this.state.iterate], topColours[this.state.iterate + 1], progress);
    const bottomColour = blendColours(bottomColours[this.state.iterate], bottomColours[this.state.iterate + 1], progress);
    const backgroundStyles = {
      background: `linear-gradient(to bottom, #${topColour}, #${bottomColour})`
    }

    const planeShape = (
      <svg viewBox="0 0 114 50">
        <g>
          <polygon className="cls-1" points="1.25 1.25 110.13 1.25 1.25 36.25 1.25 1.25" />
        </g>
      </svg>
    );

    const plane = (
      <div className="paper-plane">
        <div className="right-wing">
          {planeShape}
        </div>
        <div className="left-wing">
          {planeShape}
        </div>
        <div className="right-fuselage">
          {planeShape}
        </div>
        <div className="left-fuselage">
          {planeShape}
        </div>
        <div className="trail" />
      </div>
    );

    const modifier = env.Modernizr.touchevents ? 5 : 1;

    let interactiveStyles;
    if (this.props.screenPosition) {
      interactiveStyles = {
        transform: `rotateY(${Math.round((this.props.screenPosition.coordinateX * -8) * modifier)}deg) rotateX(${Math.round(((this.props.screenPosition.coordinateY * -12) + 5) * modifier)}deg)`
      }
    }

    return (
      <div className="contact-block">
        <div className="home-text-block">
          <div className="section-title">Make change happen</div>
          <h2>Talk to ustwo <br /><span className="contact-block-email"><GradientWords word="hello@ustwo.com" color="hot" reverse={true} /></span></h2>
          <div className="contact-block-image">
            <div className="contact-block-image-background" style={backgroundStyles} />
            <div className="contact-block-image-sky" />
            <div className="contact-block-image-buildings" />
            <div className="contact-block-image-plane-wrapper">
              <div className="contact-block-image-plane" style={interactiveStyles}>
                {plane}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ContactBlock;
