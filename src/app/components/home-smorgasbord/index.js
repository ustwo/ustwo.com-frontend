import React, { PropTypes } from 'react';
import Flux from 'app/flux';
import window from 'app/adaptors/server/window';
import { DefaultPlayer as Video } from 'react-html5video';

import Subscription from 'app/components/subscription';

function HomeSmorgasbord({ data, loaded }) {
  const { event, post } = data;

  let src;
  if (window.innerWidth < 600) {
    src= 'https://player.vimeo.com/external/189642924.sd.mp4?s=2dafa1fb7c8ef594412e9fa7fd4be182163d7f71&profile_id=164';
  } else {
    src= 'https://player.vimeo.com/external/189642924.sd.mp4?s=2dafa1fb7c8ef594412e9fa7fd4be182163d7f71&profile_id=165';
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

  if (event.slug) {
    const eventUri = `/events/${event.slug}`;

    renderEvent = (
      <div className="smorgasbord-block smorgasbord-events" style={eventBlockStyle}>
        <h4>ustwo Events</h4>
        <div className="smorgasbord-post">
          <div className="smorgasbord-subtitle">{event.studio.name}</div>
          <h3 className="smorgasbord-title">
            <a href={eventUri} onClick={Flux.override(eventUri)}>{event.name}</a>
          </h3>
        </div>
        <button>More Events</button>
      </div>
    );
  }

  if (post.slug) {
    const postUri = `/blog/${post.slug}`;

    renderPost = (
      <div className="smorgasbord-block smorgasbord-blog" style={blogBlockStyle}>
        <h4>Blog</h4>
        <div className="smorgasbord-post">
          <div className="smorgasbord-subtitle">{post.categories[0].name}</div>
          <h3 className="smorgasbord-title">
            <a href={postUri} onClick={Flux.override(postUri)}>{post.name}</a>
          </h3>
        </div>
        <button>More Blog</button>
      </div>
    );
  }

  return (
    <div className="home-smorgasbord">
      <div className="smorgasbord-block smorgasbord-video">
        <Video
          controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
          preload="none"
          poster={videoPoster}
        >
          <source src={src} type="video/mp4" />
        </Video>

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

HomeSmorgasbord.propTypes = {
  data: PropTypes.shape({
    event: {
      name: PropTypes.string,
      uri: PropTypes.string,
      studio: {
        name: PropTypes.string
      }
    },
    post: {
      name: PropTypes.string,
      uri: PropTypes.string,
    }
  })
};

HomeSmorgasbord.defaultProps = {
  data: {
    event: {
      name: '',
      uri: '',
      studio: {
        name: ''
      }
    },
    post: {
      name: '',
      uri: '',
    }
  }
};

export default HomeSmorgasbord;
