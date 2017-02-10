import React, { Component } from 'react';

class HomeSmorgasbord extends Component {

  constructor(props) {
    super(props);

    /* TODO: All sorts. This will be a more complex component. Or at least will house more complex components. */
  }

  render() {
    return (
      <div className="home-smorgasbord">
        <div className="smorgasbord-block smorgasbord-video"></div>
        <div className="smorgasbord-block-wrapper">
          <div className="smorgasbord-block smorgasbord-event"></div>
          <div className="smorgasbord-block smorgasbord-blog"></div>
        </div>
        <div className="smorgasbord-block smorgasbord-studios"></div>
      </div>
    );
  }
}

export default HomeSmorgasbord;
