import React, { Component } from 'react';
import GradientWords from '../gradient-words';
import blendColours from 'app/lib/blend-colours';
import goToNextIteration from 'app/lib/next-iteration';

const tickerFrequency = 200;
const timerTotal = 8000;
const topColours = ['#6114CC', '#009CF3', '#FA7D78', '#6114CC'];
const bottomColours = ['#FA7D78', '#A5FAAF', '#FFBF02', '#FA7D78'];

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

    return (
      <div className="contact-block">
        <div className="home-text-block">
          <div className="section-title">Make something awesome</div>
          <h2>Get in touch <br /><span className="contact-block-email"><GradientWords word="work@ustwo.com" color="hot" reverse={true} /></span></h2>
          <div className="contact-block-image">
            <div className="contact-block-image-background" style={backgroundStyles} />
            <div className="contact-block-image-sky" />
            <div className="contact-block-image-buildings" />
            <div className="contact-block-image-plane" />
          </div>
        </div>
      </div>
    );
  }
}

export default ContactBlock;
