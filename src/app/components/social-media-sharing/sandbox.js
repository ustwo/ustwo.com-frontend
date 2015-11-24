import SocialMediaSharing from './';

const Sandbox = React.createClass({
  render() {
    return <div className="sandbox">
      <SocialMediaSharing
        className="test-class"
        title="Blog post title"
        uri="/blog/blog-post-title"
      />
    </div>;
  }
});

export default Sandbox;
