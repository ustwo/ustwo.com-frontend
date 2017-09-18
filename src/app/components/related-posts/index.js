import React from 'react';
import { get } from 'lodash';
import WorkItem from 'app/components/work-item';
import BlogPostListItem from 'app/components/blog-post-list-item';

function RelatedPosts({ posts }) {

  const renderItems = posts.map((data, i) => {
    let item;
    if (data.type === 'post') {
      item = <BlogPostListItem data={data} key={`related-post-${i}`} />;
    } else {
      item = <WorkItem data={data} key={`related-post-${i}`} />;
    }
    return item;
  });

  return (
    <div className="card-list related-posts">
      <div className="card-list-inner">
        {renderItems}
      </div>
    </div>
  )
};

export default RelatedPosts;
