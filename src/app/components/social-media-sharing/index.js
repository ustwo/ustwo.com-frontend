'use strict';

import React from 'react';
import classnames from 'classnames';
import he from 'he';

import Flux from 'app/flux';

import SVG from 'app/components/svg';

const SocialMediaSharing = React.createClass({
  render() {
    const { uri, className, title } = this.props;
    const facebookLink = `https://www.facebook.com/sharer/sharer.php?u=${uri}`;
    const twitterText = `${encodeURIComponent(title)} via @ustwo`
    const twitterLink = `https://twitter.com/intent/tweet?text=${twitterText}&url=${uri}`;
    const linkedinLink = `https://www.linkedin.com/shareArticle?mini=true&url=${uri}`;

    return <ul className={classnames('social-media-sharing', className)}>
      <li className="channel facebook">
        <a
          target="_blank"
          href={facebookLink}
        >
          <div className="svg-container">
            <SVG className="logo" title="facebook logo" spritemapID="facebook" />
          </div>
        </a>
      </li>
      <li className="channel twitter">
        <a
          target="_blank"
          href={twitterLink}
        >
          <div className="svg-container">
            <SVG className="logo" title="twitter logo" spritemapID="twitter" />
          </div>
        </a>
      </li>
      <li className="channel linkedin">
        <a
          target="_blank"
          href={linkedinLink}
        >
          <div className="svg-container">
            <SVG className="logo" title="linkedin logo" spritemapID="linkedin" />
          </div>
        </a>
      </li>
    </ul>;
  }
});

export default SocialMediaSharing;
