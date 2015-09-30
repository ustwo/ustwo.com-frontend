'use strict';

import React from 'react';
import classnames from 'classnames';
import he from 'he';

import Flux from '../../flux';

import SVG from '../svg';

export default class SocialMediaSharing extends React.Component {
  render() {
    const props = this.props;

    return (
      <ul className={classnames('social-media-sharing', props.className)}>
        <li className="channel facebook">
          <a target='_blank' href={`https://www.facebook.com/sharer/sharer.php?u=${props.uri}`}>
            <div className='svg-container'><SVG className='logo' title='facebook logo' spritemapID='facebook' /></div>
            <span>{props.facebookShares}</span>
          </a>
        </li>
        <li className="channel twitter">
          <a target='_blank' href={`https://twitter.com/intent/tweet?text=${`${encodeURIComponent(props.title)} via @ustwo`}&url=${props.uri}`}>
            <div className='svg-container'><SVG className='logo' title='twitter logo' spritemapID='twitter' /></div>
            <span>{props.twitterShares}</span>
          </a>
        </li>
      </ul>
    );
  }
};
