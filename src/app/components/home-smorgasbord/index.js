
import React, { Component } from 'react';
import classnames from 'classnames';

class HomeSmorgasbord extends Component {

  constructor(props) {
    super(props);

    this.state = {
      videoPlaying: false
    }
  }

  toggleVideo() {
    return () => {
      if (this.state.videoPlaying) {
        this.refs.video.pause();
        this.setState({ videoPlaying: false })
      } else {
        this.refs.video.play();
        this.setState({ videoPlaying: true })
      }
    }
  }

  render() {
    const videoControlClasses = classnames('smorgasbord-video-controls', { videoPlaying: this.state.videoPlaying });

    return (
      <div className="home-smorgasbord">
        <div className="smorgasbord-block smorgasbord-video">
          <div className={videoControlClasses} onClick={this.toggleVideo()}></div>
          <video
            ref="video"
            src="https://player.vimeo.com/external/189642924.sd.mp4?s=2dafa1fb7c8ef594412e9fa7fd4be182163d7f71&profile_id=164"
            poster="/images/temp/smorgs-video.jpg"
          ></video>
        </div>
        <div className="smorgasbord-block-wrapper">
          <div className="smorgasbord-block smorgasbord-event">
            <h3>Event</h3>
            <div className="smorgasbord-subtitle">16 January</div>
            <div className="smorgasbord-title">#ANGSTFEST – MISERY LOVES COMPANY</div>
            <button>View details</button>
          </div>
          <div className="smorgasbord-block smorgasbord-blog">
            <h3>Blog</h3>
            <div className="smorgasbord-subtitle">Culture</div>
            <div className="smorgasbord-title">How to break up with your team</div>
            <button>View details</button>
          </div>
        </div>
        <div className="smorgasbord-block smorgasbord-studios"></div>
      </div>
    );
  }
}

export default HomeSmorgasbord;
