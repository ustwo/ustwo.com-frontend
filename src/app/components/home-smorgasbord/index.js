import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Flux from 'app/flux';
import window from 'app/adaptors/server/window';
import { DefaultPlayer as Html5Video } from 'react-html5video';

import Subscription from 'app/components/subscription';

class HomeSmorgasbord extends Component {

  constructor(props) {
    super(props);

    this.state = {
      videoPlaying: false
    }
  }

  clickVideo() {
    this.setState({
      videoPlaying: this.state.videoPlaying ? false : true
    });
  }

  render() {
    const { data, loaded } = this.props;

    let src;
    if (window.innerWidth < 600) {
      src= 'https://player.vimeo.com/external/212009946.sd.mp4?s=f537d6446bb57ac154c6dd9fae12a281c1671686&profile_id=164';
    } else {
      src= 'https://player.vimeo.com/external/212009946.sd.mp4?s=f537d6446bb57ac154c6dd9fae12a281c1671686&profile_id=165';
    }

    let moreJuiceStyle, blogBlockStyle, eventBlockStyle, videoPoster, renderEvent, renderPost;
    if (loaded) {
      moreJuiceStyle = {
        backgroundImage: `url('/images/juicy-icon-loop.gif')`
      }
      blogBlockStyle = {
        backgroundImage: `url('/images/squiggle.png'), linear-gradient(225deg, #53baf3, #009CF3)`
      }
      eventBlockStyle = {
        backgroundImage: `url('/images/bg-pattern.png')`
      }
      videoPoster = '/images/ustwo-roadshow-first-frame.jpg';
    }

    if (data && data.event.length > 0) {
      const eventUri = `/events/${data.event.slug}`;

      renderEvent = (
        <div className="smorgasbord-block smorgasbord-events" style={eventBlockStyle}>
          <h4>ustwo Events</h4>
          <div className="smorgasbord-post">
            <div className="smorgasbord-subtitle">{data.event.studio.name}</div>
            <h3 className="smorgasbord-title">
              <a href={eventUri} onClick={Flux.override(eventUri)}>{data.event.name}</a>
            </h3>
          </div>
          <button onClick={Flux.override('/events')}>More Events</button>
        </div>
      );
    }

    if (data && data.post.length > 0) {
      const postUri = `/blog/${data.post.slug}`;

      renderPost = (
        <div className="smorgasbord-block smorgasbord-blog" style={blogBlockStyle}>
          <h4>Blog</h4>
          <div className="smorgasbord-post">
            <div className="smorgasbord-subtitle">{data.post.categories[0].name}</div>
            <h3 className="smorgasbord-title">
              <a href={postUri} onClick={Flux.override(postUri)}>{data.post.name}</a>
            </h3>
          </div>
          <button onClick={Flux.override('/blog')}>More Blog</button>
        </div>
      );
    }

    const classes = classnames('smorgasbord-block', 'smorgasbord-video', {
      playing: this.state.videoPlaying
    });

    return (
      <div className="home-smorgasbord">
        <div className={classes}>
          <h2>What we do</h2>
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
        </div>
        <div className="smorgasbord-block-wrapper">

          {renderEvent}
          {renderPost}
          <Subscription loaded={loaded} />

        </div>

        <div className="more-juice" style={moreJuiceStyle}></div>
      </div>
    );
  }
}

export default HomeSmorgasbord;
