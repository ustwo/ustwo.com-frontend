import React, { Component } from 'react';
import blendColours from 'app/lib/blend-colours';
import goToNextIteration from 'app/lib/next-iteration';

class GradientBackgroundSequence extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      tick: this.props.timerTotal,
      iterate: 0
    }
  }

  ticker() {
    if (this.state.tick === 0) {
      goToNextIteration(this, this.props.timerTotal, this.props.topColours.length);
    }
    this.setState({ tick: this.state.tick - this.props.tickerFrequency });
  }

  componentDidMount() {
    setTimeout(() => {
      this.timer = setInterval(this.ticker.bind(this), this.props.tickerFrequency);
    }.bind(this), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }


  render() {
    const { topColours, bottomColours, timerTotal } = this.props;
    const { tick, iterate } = this.state;
    const progress = Math.round(((timerTotal - tick) / timerTotal) * 100) / 100;

    const topColour = blendColours(topColours[iterate], topColours[iterate + 1], progress);
    const bottomColour = blendColours(bottomColours[iterate], bottomColours[iterate + 1], progress);


    const backgroundStyles = {
      background: `linear-gradient(to bottom, #${topColour}, #${bottomColour})`
    }

    return (
      <div className="gradient-background-sequence" style={backgroundStyles} />
    );
  }
}

export default GradientBackgroundSequence;
