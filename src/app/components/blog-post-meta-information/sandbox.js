import BlogPostMetaInformation from './';

const Sandbox = React.createClass({
  render() {
    return <div className="sandbox">
      <BlogPostMetaInformation
        author="Princess Ida"
        date="2015-11-06T12:57:02"
      />
    </div>;
  }
});

export default Sandbox;
