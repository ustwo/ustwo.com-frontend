import SingleColumn from './';

const Sandbox = React.createClass({
  render() {
    return (<div className="sandbox">
      <SingleColumn
        className="content-title"
        title="Test Title"
        backgroundColour="pink"
        headingColour="black"
        ruleColour="green"
      >Some content with title</SingleColumn>
      <SingleColumn
        className="content"
        backgroundColour="pink"
        headingColour="black"
        ruleColour="green"
      >Some content with no title</SingleColumn>
      <SingleColumn
        className="nothing"
        backgroundColour="pink"
        headingColour="black"
        ruleColour="green"
      />
    </div>);
  }
});

export default Sandbox;
