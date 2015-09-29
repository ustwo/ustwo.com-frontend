import React from 'react';
import classnames from 'classnames';
import moment from 'moment';
import he from 'he';
import get from 'lodash/object/get';
import kebabCase from 'lodash/string/kebabCase';
import getFeaturedImage from '../../lib/get-featured-image';
import getAuthor from '../../lib/get-author';

import Flux from '../../flux';

import SocialMediaStatistics from '../social-media-statistics';
import Rimage from '../rimage';

export default class SearchResultListItem extends React.Component {
  render() {
    const { data: post } = this.props;
    const category = get(post, '_embedded.wp:term.0.0.name', 'category');
    const imageURL = get(post, '_embedded.wp:attachment.1.source_url');
    const uri = `/blog/${get(post, 'slug')}`;
    const image = getFeaturedImage(post);

    return (
      <li key={get(post, 'slug')} className={classnames('search-result-list-item', `blog-label-${kebabCase(category)}`)}>
        <Rimage wrap='div' className='image' href={uri} sizes={get(image, 'media_details.sizes')} />
        <div className='content'>
          <div className='blog-category'>{category}</div>
          <h2 className='title'>
            <a href={uri} onClick={Flux.override(uri)}>{he.decode(get(post, 'title.rendered'))}</a>
          </h2>
          <p className='meta'>By {getAuthor(post)} - <span className='date'>{moment(get(post, 'date')).format('D MMMM YYYY')}</span></p>
          <SocialMediaStatistics facebookShares={get(post, 'facebookShares')} twitterShares={get(post, 'twitterShares')} />
          <div className='tail'>
            <a href={uri} onClick={Flux.override(uri)}>Read more</a>
          </div>
        </div>
      </li>
    );
  }
}
