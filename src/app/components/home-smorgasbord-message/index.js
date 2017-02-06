import React, { Component } from 'react';

class HomeSmorgasbordMessage extends Component {
  render() {
    return (
      <h1>
        <span>More </span><span className="home-gradient-text-cold" onMouseEnter={this.props.showRollover('yes')} onMouseLeave={this.props.showRollover('hidden')}>yes</span><br /> <span>More </span><span className="home-gradient-text-lukewarm" onMouseEnter={this.props.showRollover('can')} onMouseLeave={this.props.showRollover('hidden')}>can</span><br /> <span>More </span><span className="home-gradient-text-hot" onMouseEnter={this.props.showRollover('wow')} onMouseLeave={this.props.showRollover('hidden')}>wow</span>
      </h1>
    );
  }
}

export default HomeSmorgasbordMessage;
