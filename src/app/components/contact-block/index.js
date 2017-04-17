import React, { Component } from 'react';
import GradientWords from '../gradient-words';
import blendColours from 'app/lib/blend-colours';
import goToNextIteration from 'app/lib/next-iteration';

const tickerFrequency = 200;
const timerTotal = 8000;
const topColours = ['#6114CC', '#009CF3', '#FA7D78', '#6114CC'];
const bottomColours = ['#FA7D78', '#A5FAAF', '#FFBF02', '#FA7D78'];
const topColoursLighter = ['#ccb1cf', '#b5deda', '#f3cba1', '#ccb1cf'];
const bottomColoursLighter = ['#ccb1cf', '#b5deda', '#f3cba1', '#ccb1cf'];


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

    // Bigger shape
    // const planeShape = (
    //   <svg viewBox="0 0 114 50">
    //     <g>
    //       <polygon className="cls-1" points="1.25 1.25 110.13 1.25 1.25 47 1.25 1.25"/>
    //       <path className="cls-2" d="M20,27H128.88l-0.33-2.46L33.06,64.67,19.67,70.29l1.58,1.21V25.75a1.25,1.25,0,0,0-2.5,0V71.5a1.26,1.26,0,0,0,1.58,1.21l95.49-40.12L129.21,27c1.21-.51,1.2-2.46-0.33-2.46H20A1.25,1.25,0,0,0,20,27Z" transform="translate(-18.75 -24.5)"/>
    //     </g>
    //   </svg>
    // );

    const planeShape = (
      <svg viewBox="0 0 114 50">
        <g>
          <polygon className="cls-1" points="1.25 1.25 110.13 1.25 1.25 36.25 1.25 1.25" style={{ fill: `#${blendColours(bottomColoursLighter[this.state.iterate], bottomColoursLighter[this.state.iterate + 1], progress)}`}} />
          <path className="cls-2" d="M20,27H128.88l-0.33-2.46L33.26,55.17,19.67,59.54l1.58,1.21v-35a1.25,1.25,0,0,0-2.5,0v35A1.26,1.26,0,0,0,20.33,62l95.28-30.63L129.21,27a1.26,1.26,0,0,0-.33-2.46H20A1.25,1.25,0,0,0,20,27Z" transform="translate(-18.75 -24.5)"/>
        </g>
      </svg>
    );

    const bottomShape = (
      <svg viewBox="0 0 114 50">
        <g>
          <polygon className="cls-1" points="1.25 1.25 110.13 1.25 1.25 36.25 1.25 1.25" style={{ fill: `#${blendColours(topColoursLighter[this.state.iterate], topColoursLighter[this.state.iterate + 1], progress)}`}} />
          <path className="cls-2" d="M20,27H128.88l-0.33-2.46L33.26,55.17,19.67,59.54l1.58,1.21v-35a1.25,1.25,0,0,0-2.5,0v35A1.26,1.26,0,0,0,20.33,62l95.28-30.63L129.21,27a1.26,1.26,0,0,0-.33-2.46H20A1.25,1.25,0,0,0,20,27Z" transform="translate(-18.75 -24.5)"/>
        </g>
      </svg>
    )

    const plane = (
      <div className="plane">

        <div className="right">
          {planeShape}
        </div>
        <div className="left">
          {planeShape}
        </div>
        <div className="bottom1">
          {bottomShape}
        </div>
        <div className="bottom2">
          {bottomShape}
        </div>

      </div>
    );

    const interactiveStyles = {
      transform: `rotateY(${(this.props.screenPosition.coordinateX * -10)}deg) rotateX(${10 + (this.props.screenPosition.coordinateY * -15)}deg)`
    }

    return (
      <div className="contact-block">
        <div className="home-text-block">
          <div className="section-title">Make something awesome</div>
          <h2>Get in touch <br /><span className="contact-block-email"><GradientWords word="work@ustwo.com" color="hot" reverse={true} /></span></h2>
          <div className="contact-block-image">
            <div className="contact-block-image-background" style={backgroundStyles} />
            <div className="contact-block-image-sky" />
            <div className="contact-block-image-buildings" />
            <div className="contact-block-image-plane" style={interactiveStyles}>{plane}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default ContactBlock;
