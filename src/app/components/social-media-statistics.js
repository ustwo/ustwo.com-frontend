'use strict';

import React from 'react';
import classnames from 'classnames';

export default class SocialMediaStatistics extends React.Component {
  render() {
    const props = this.props;
    const facebookLogo = '<use xlink:href="/images/spritemap.svg#facebook" />';
    const twitterLogo = '<use xlink:href="/images/spritemap.svg#twitter" />';

    return (
      <ul className={classnames('social-media-statistics', props.className)}>
        <li className="channel facebook">
          <div className='svg-container'><svg className="logo" title="facebook logo" role="img" dangerouslySetInnerHTML={{__html: facebookLogo }} /></div>
          <span>{props.facebookShareCount}</span>
        </li>
        <li className="channel twitter">
          <div className='svg-container'><svg className="logo" title="twitter logo" role="img" dangerouslySetInnerHTML={{__html: twitterLogo }} /></div>
          <span>{props.twitterShareCount}</span>
        </li>
      </ul>
    );
  }
};
