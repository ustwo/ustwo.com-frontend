import SocialMediaSharing from './';

const Sandbox = React.createClass({
  render() {
    return (<div className="sandbox">
      <SocialMediaSharing
        className="test-class"
        title="Blog post title"
        uri="/blog/blog-post-title"
        facebookShares={34}
        twitterShares={15}
      />
    </div>);
  }
});

export default Sandbox;
