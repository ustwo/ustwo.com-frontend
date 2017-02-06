import React, { Component } from 'react';

class HomeWelcomeMessage extends Component {
  render() {
    return (
      <h1>
        <span>We make digital </span><span className="home-gradient-text-cold" onMouseEnter={this.props.showRollover('products')} onMouseLeave={this.props.showRollover('hidden')}>products</span><span> and </span><span className="home-gradient-text-lukewarm" onMouseEnter={this.props.showRollover('services')} onMouseLeave={this.props.showRollover('hidden')}>services</span><span> for the smartest </span><span className="home-gradient-text-hot" onMouseEnter={this.props.showRollover('brands')} onMouseLeave={this.props.showRollover('hidden')}>brands</span>
      </h1>
    );
  }
}

export default HomeWelcomeMessage;
