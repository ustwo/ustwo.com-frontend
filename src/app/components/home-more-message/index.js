import React, { Component } from 'react';

class HomeMoreMessage extends Component {
  render() {
    return (
      <h1>
        <span>We build and </span><span className="home-gradient-text-cold" onMouseEnter={this.props.showRollover('invest')} onMouseLeave={this.props.showRollover('hidden')}>invest</span><span> in new </span><span className="home-gradient-text-lukewarm" onMouseEnter={this.props.showRollover('ventures')} onMouseLeave={this.props.showRollover('hidden')}>ventures</span><span> that make a </span><span className="home-gradient-text-hot" onMouseEnter={this.props.showRollover('difference')} onMouseLeave={this.props.showRollover('hidden')}>difference</span>
      </h1>
    );
  }
}

export default HomeMoreMessage;
