import QuoteBlock from './';

const Sandbox = React.createClass({
  render() {
    return <div className="sandbox">
      <QuoteBlock
        backgroundColour="grey"
        source="The Original Source"
      >Some quote text</QuoteBlock>
      <div className="blog-label-product">
        <QuoteBlock
          backgroundColour=""
          source="Hollandaise Source"
        >Quote in a blog post</QuoteBlock>
      </div>
    </div>;
  }
});

export default Sandbox;
