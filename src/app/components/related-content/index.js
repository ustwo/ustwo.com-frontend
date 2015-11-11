'use strict';

import React from 'react';
import get from 'lodash/object/get';

import WorkItem from '../work-item';
import BlogPostListItem from '../blog-post-list-item';

export default class RelatedContent extends React.Component {
  render() {
    return (
      <div className="related-content">
        <h2>More Juice</h2>
        {this.props.content.map(this.renderItem)}
      </div>
    );
  }
  renderItem(data) {
    let item;
    if(data.type === 'post') {
      item = <div className="related-content-item"><BlogPostListItem data={data} /></div>;
    } else {
      let image = get(data, '_embedded.wp:attachment.1');
      item = <div className="related-content-item"><WorkItem data={data} image={image} /></div>;
    }
    return item;
  }
}
