import React, { Component } from 'react';
import env from 'app/adaptors/server/env';

import Hero from 'app/components/hero';
import Video from 'app/components/video';
// import { DefaultPlayer as Video } from 'react-html5video';

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
      if (nextProps.scrollProgress > 0.5 && env.Modernizr.touchevents) {
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
      src = 'https://player.vimeo.com/external/212009946.sd.mp4?s=f537d6446bb57ac154c6dd9fae12a281c1671686&profile_id=164';
    } else {
      src = 'https://player.vimeo.com/external/212009946.sd.mp4?s=f537d6446bb57ac154c6dd9fae12a281c1671686&profile_id=165';
    }
    Flux.showVideoOverlay(src);
  }

  render() {
    const { isMobile, fixedHeight, scrollProgress } = this.props;

    let fallbackImage, src;
    if (window.innerWidth < 600) {
      fallbackImage = '/images/work-header-fallback.jpg';
      src = 'https://player.vimeo.com/external/212965200.sd.mp4?s=026d651935662354859c3f0929f8fa8153b11d2d&profile_id=165';
    } else {
      fallbackImage = '/images/work-header-fallback.jpg';
      src = 'https://player.vimeo.com/external/209403984.sd.mp4?s=fa5d1e9fcb9e3f78d55423329a605fc7db82541f&profile_id=165';
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
    // const video = (
    //   <Video autoPlay loop muted
    //     play={this.state.playVideo}
    //     controls={[]}
    //     poster={fallbackImage}
    //     onCanPlayThrough={() => {
    //       Flux.heroVideoReady(true);
    //     }}
    //   >
    //     <source src={src} type="video/webm" />
    //   </Video>
    // );

    return (
      <div className="work-hero">
        <Hero
          title="Make things to change things"
          transitionImage={true}
          showDownIndicator={true}
          eventLabel=' '
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
