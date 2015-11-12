import React from 'react';

class BlogCategoryTag extends React.Component {
  render() {
    const { category } = this.props;
    return <div className="blog-category-tag">{category}</div>;
  }
}

export default BlogCategoryTag;
