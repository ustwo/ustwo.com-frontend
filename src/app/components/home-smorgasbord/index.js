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
        this.refs.smorgasbordVideo.pause();
        this.setState({ videoPlaying: false })
      } else {
        this.refs.smorgasbordVideo.play();
        this.setState({ videoPlaying: true })
      }
    }
  }

  render() {
    const videoControlClasses = classnames('smorgasbord-video-controls', { videoPlaying: this.state.videoPlaying });
    const videoTitleClasses = classnames('smorgasbord-video-title', { videoPlaying: this.state.videoPlaying });

    return (
      <div className="home-smorgasbord">
        <div className="smorgasbord-block smorgasbord-video">
          <div className={videoControlClasses} onClick={this.toggleVideo()}></div>
          <video
            ref="smorgasbordVideo"
            src="https://player.vimeo.com/external/189642924.sd.mp4?s=2dafa1fb7c8ef594412e9fa7fd4be182163d7f71&profile_id=164"
            poster="/images/temp/smorgs-video.jpg"
          ></video>
          <h1 className={videoTitleClasses}>Inside ustwo</h1>
        </div>
        <div className="smorgasbord-block-wrapper">
          <div className="smorgasbord-block smorgasbord-event">
            <h3>ustwo Events</h3>
            <div className="smorgasbord-post">
              <div className="smorgasbord-subtitle">LONDON</div>
              <div className="smorgasbord-title">Yo Illo Talks: Going viral</div>
            </div>
            <button>All Events</button>
          </div>
          <div className="smorgasbord-block smorgasbord-blog">
            <h3>Blog</h3>
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
