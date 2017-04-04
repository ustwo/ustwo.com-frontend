import React, { Component } from 'react';
import { DefaultPlayer as Video } from 'react-html5video';
import CloseButton from 'app/components/close-button';
import Flux from 'app/flux';

class VideoOverlay extends Component {

  onClickClose() {
    Flux.closeModal();
  }

  render() {
    return (
      <div className="video-overlay">
        <Video
          autoPlay
          controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
          preload="metadata"
        >
          <source src={this.props.src} type="video/mp4" />
        </Video>
        <CloseButton onClose={this.onClickClose} autoAnim={500} />
      </div>
    );
  }
}

export default VideoOverlay
