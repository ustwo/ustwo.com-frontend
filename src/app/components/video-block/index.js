import React, { Component } from 'react';
import classnames from 'classnames';
import { DefaultPlayer as Html5Video } from 'react-html5video';

class VideoBlock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videoPlaying: false
    }
  }

  render() {
    const { title, videoPoster, src, description } = this.props;
    const classes = classnames('video-block', {
      playing: this.state.videoPlaying
    });

    return (
      <div className={classes}>
        {title ? <h2>{title}</h2> : null}
        <Html5Video
          controls={['Time', 'Seek', 'Volume', 'Fullscreen']}
          preload="none"
          poster={videoPoster}
          onPlay={() => {
            this.setState({
              videoPlaying: true
            });
          }}
          onPause={() => {
            this.setState({
              videoPlaying: false
            });
          }}
        >
          <source src={src} type="video/mp4" />
        </Html5Video>
        {description ? <p>{description}</p> : null}
      </div>
    );
  }
}

export default VideoBlock;
