import React, { Component } from 'react';
import Hero from 'app/components/hero';
import Video from 'app/components/video';
import SVG from 'app/components/svg';
import window from 'app/adaptors/server/window';

class WorkHero extends Component {

  constructor(props) {
    super(props);

    this.state = {
      playVideo: false
    }
  }

  componentDidMount() {
    const { loaded, scrollProgress } = this.props;

    this.setState({
      playVideo: loaded
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loaded) {
      this.setState({
        playVideo: !(nextProps.modal === 'videoOverlay')
      });
      if (nextProps.scrollProgress > 0.5) {
        this.setState({ playVideo: false })
      }
    } else {
      this.setState({
        playVideo: false
      });
    }
  }

  onClickVideo() {
    let src;
    if (window.innerWidth < 600) {
      src = 'https://player.vimeo.com/external/209403984.sd.mp4?s=fa5d1e9fcb9e3f78d55423329a605fc7db82541f&profile_id=164';
    } else {
      src = 'https://player.vimeo.com/external/209403984.hd.mp4?s=f3eb84f4b6d45960e28df740875cddd9605b8cf6&profile_id=174';
    }
    Flux.showVideoOverlay(src);
  }

  render() {
    const { isMobile, fixedHeight, scrollProgress } = this.props;

    let fallbackImage, src;
    if (window.innerWidth < 600) {
      fallbackImage = '/images/work-header-fallback.jpg';
      src = 'https://player.vimeo.com/external/209403984.sd.mp4?s=fa5d1e9fcb9e3f78d55423329a605fc7db82541f&profile_id=164';
    } else {
      fallbackImage = '/images/work-header-fallback.jpg';
      src = 'https://player.vimeo.com/external/209403984.hd.mp4?s=f3eb84f4b6d45960e28df740875cddd9605b8cf6&profile_id=174';
    }

    const hide = scrollProgress === 1;

    const video = (
      <Video
        src={src}
        isVideoBackground={true}
        play={this.state.playVideo}
        heroVideo={true}
        imageCSS={fallbackImage}
        isMobile={isMobile}
        fixedHeight={fixedHeight}
        hide={hide}
      />
    );

    return (
      <div className="work-hero">
        <Hero
          title="We build products and services that make a difference"
          transitionImage={true}
          eventLabel='work'
          showDownIndicator={true}
          video={video}
          fixedHeight={fixedHeight}
          isMobile={isMobile}
          scrollProgress={scrollProgress}
        >
          <button onClick={this.onClickVideo} className="work-video-link">
            <div className="section-title">How we work</div>
            <div className="work-video-link-play"><SVG spritemapID="iconPlay" /></div>
          </button>
        </Hero>
      </div>
    )
  }
}

export default WorkHero;
