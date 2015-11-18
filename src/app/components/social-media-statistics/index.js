'use strict';

import React from 'react';

import SVG from 'app/components/svg';

const SocialMediaStatistics = React.createClass({
  render() {
    const { facebookShares, twitterShares } = this.props;
    return <div className="social-media-statistics">
      <div className="channel facebook">
        <div className="logo">
          <SVG className="facebook-icon" spritemapID="facebook" />
        </div>
        <span>{facebookShares}</span>
      </div>
      <div className="channel twitter">
        <div className="logo">
          <SVG className="twitter-icon" spritemapID="twitter" />
        </div>
        <span>{twitterShares}</span>
      </div>
    </div>;
  }
});

export default SocialMediaStatistics;
