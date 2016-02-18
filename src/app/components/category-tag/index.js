import React from 'react';

class CategoryTag extends React.Component {
  render() {
    const { category } = this.props;
    return <div className="category-tag">{category}</div>;
  }
}

export default CategoryTag;
