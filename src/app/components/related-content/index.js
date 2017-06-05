'use strict';

import React from 'react';
import { get } from 'lodash';

import WorkItem from 'app/components/work-item';
import BlogPostListItem from 'app/components/blog-post-list-item';

export default class RelatedContent extends React.Component {
  render() {
    return (
      <div className="related-content">
        <div className="wrapper">
          <h2 className="more-juice-title">More Juice</h2>
          <div className="related-content-cards">
            {this.props.content.map(this.renderItem)}
          </div>
        </div>
      </div>
    );
  }
  renderItem(data) {
    let item;
    if(data.type === 'post') {
      item = <div className="related-content-item" key={data.id}><BlogPostListItem data={data} /></div>;
    } else {
      let image = get(data, '_embedded.wp:attachment.1');
      item = <div className="related-content-item" key={data.id}><WorkItem data={data} image={image} /></div>;
    }
    return item;
  }
}
