import React from 'react';
import moment from 'moment';

const BlogPostMetaInformation = React.createClass({
  render() {
    const { author, date } = this.props;
    const formattedDate = moment(date).format('D MMMM YYYY');
    return <p className="meta">
      By {author} - <span className="date">{formattedDate}</span>
    </p>;
  }
});

export default BlogPostMetaInformation;
