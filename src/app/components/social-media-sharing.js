'use strict';

import React from 'react';
import classnames from 'classnames';
import he from 'he';

import Flux from '../flux';

export default class SocialMediaSharing extends React.Component {
  render() {
    const props = this.props;
    const facebookIcon = '<use xlink:href="/images/spritemap.svg#facebook" />';
    const twitterIcon = '<use xlink:href="/images/spritemap.svg#twitter" />';

    return (
      <ul className={classnames('social-media-sharing', props.className)}>
        <li className="channel facebook">
          <a target='_blank' href={`https://www.facebook.com/sharer/sharer.php?u=${props.uri}`}>
            <div className='svg-container'><svg className="logo" title="facebook logo" role="img" dangerouslySetInnerHTML={{__html: facebookIcon }} /></div>
            <span>{props.facebookShares}</span>
          </a>
        </li>
        <li className="channel twitter">
          <a target='_blank' href={`https://twitter.com/intent/tweet?text=${`${encodeURIComponent(props.title)} via @ustwo`}&url=${props.uri}`}>
            <div className='svg-container'><svg className="logo" title="twitter logo" role="img" dangerouslySetInnerHTML={{__html: twitterIcon }} /></div>
            <span>{props.twitterShares}</span>
          </a>
        </li>
      </ul>
    );
  }
};
