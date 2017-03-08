import React, { Component } from 'react';
import classnames from 'classnames';

class HomeSmorgasbord extends Component {

  constructor(props) {
    super(props);

  }

  render() {
    //<h1 className="smorgasbord-video-title">Inside ustwo</h1>

    return (
      <div className="home-smorgasbord">
        <div className="smorgasbord-block smorgasbord-video">
          <video
            ref="smorgasbordVideo"
            src="https://player.vimeo.com/external/189642924.sd.mp4?s=2dafa1fb7c8ef594412e9fa7fd4be182163d7f71&profile_id=164"
            poster="/images/temp/smorgs-video.jpg"
          ></video>
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
        <div className="smorgasbord-block smorgasbord-studios"></div>
      </div>
    );
  }
}

export default HomeSmorgasbord;
