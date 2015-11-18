import SingleColumn from './';
import renderVariations from 'app/lib/sandbox/render-variations';

const Sandbox = React.createClass({
  render() {
    return <div className="sandbox full-width-component">
      {renderVariations({
        'With title': <SingleColumn
            title="Test Title"
            backgroundColour="#A5E1FF"
            headingColour="black"
            ruleColour="#009CF3"
          >Some content with title</SingleColumn>,
        'With no title': <SingleColumn
            backgroundColour="#A5E1FF"
            headingColour="black"
            ruleColour="green"
          >Some content with no title</SingleColumn>
      })}
    </div>;
  }
});

export default Sandbox;
