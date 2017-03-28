import React from 'react';
import Flux from 'app/flux';
import { DefaultPlayer as Video } from 'react-html5video';

import Subscription from 'app/components/subscription';

function HomeSmorgasbord({ data }) {
  const { event, post } = data;

  return (
    <div className="home-smorgasbord">
      <div className="smorgasbord-block smorgasbord-video">
        <Video
          controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
          poster="/images/ustwo-roadshow-first-frame.jpg"
          onCanPlayThrough={() => {
              // Do stuff
          }}
          preload="none"
        >
          <source src="https://player.vimeo.com/external/189642924.m3u8?s=05fbc96ffb3aa37260ba1db42719232a6ac918d6" type="video/webm" />
        </Video>

      </div>
      <div className="smorgasbord-block-wrapper">

        <div className="smorgasbord-block smorgasbord-events">
          <h4>ustwo Events</h4>
          <div className="smorgasbord-post">
            <div className="smorgasbord-subtitle">{event.studio.name}</div>
            <h3 className="smorgasbord-title">
              <a href={event.uri} onClick={Flux.override(event.uri)}>{event.name}</a>
            </h3>
          </div>
          <button>All Events</button>
        </div>

        <div className="smorgasbord-block smorgasbord-blog">
          <h4>Blog</h4>
          <div className="smorgasbord-post">
            <div className="smorgasbord-subtitle">&nbsp;</div>
            <h3 className="smorgasbord-title">
              <a href={post.uri} onClick={Flux.override(post.uri)}>{post.name}</a>
            </h3>
          </div>
          <button>All Posts</button>
        </div>

      </div>
      <Subscription />
    </div>
  );
}

export default HomeSmorgasbord;
