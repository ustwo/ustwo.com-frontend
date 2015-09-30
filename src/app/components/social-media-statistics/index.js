'use strict';

import React from 'react';

import SVG from '../svg';

export default class SocialMediaStatistics extends React.Component {
  render() {
    return (
      <div className="social-media-statistics">
        <div className="channel facebook">
          <div className='logo'><SVG className='facebook-icon' spritemapID='facebook' /></div>
          <span>{this.props.facebookShares}</span>
        </div>
        <div className="channel twitter">
          <div className='logo'><SVG className='twitter-icon' spritemapID='twitter' /></div>
          <span>{this.props.twitterShares}</span>
        </div>
      </div>
    );
  }
};
