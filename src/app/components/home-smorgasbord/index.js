import React, { Component } from 'react';
import classnames from 'classnames';

import Subscription from 'app/components/subscription';

class HomeSmorgasbord extends Component {

  constructor(props) {
    super(props);

  }

  render() {
    //<h1 className="smorgasbord-video-title">Inside ustwo</h1>

    return (
      <div className="home-smorgasbord">
        <div className="smorgasbord-block smorgasbord-video">
          <iframe src="https://player.vimeo.com/video/189642924?color=ED0082&byline=0&portrait=0" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
      </div>
        <div className="smorgasbord-block-wrapper">
          <div className="smorgasbord-block smorgasbord-event">
            <h5>ustwo Events</h5>
            <div className="smorgasbord-post">
              <div className="smorgasbord-subtitle">LONDON</div>
              <div className="smorgasbord-title">Yo Illo Talks: Going viral</div>
            </div>
            <button>All Events</button>
          </div>
          <div className="smorgasbord-block smorgasbord-blog">
            <h5>Blog</h5>
            <div className="smorgasbord-post">
              <div className="smorgasbord-subtitle">Culture</div>
              <div className="smorgasbord-title">How to break up with your team</div>
            </div>
            <button>All Posts</button>
          </div>
        </div>
        <Subscription />
      </div>
    );
  }
}

export default HomeSmorgasbord;
