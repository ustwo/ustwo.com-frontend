import QuoteBlock from './';

const Sandbox = React.createClass({
  render() {
    return <div className="sandbox">
      <QuoteBlock
        backgroundColor="grey"
        source="The Original Source"
      >Some quote text</QuoteBlock>
    </div>;
  }
});

export default Sandbox;
