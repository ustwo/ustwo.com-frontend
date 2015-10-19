import SingleColumn from './';
import renderVariations from '../../lib/render-variations';

const Sandbox = React.createClass({
  render() {
    return (<div className="sandbox full-width-component">
      {renderVariations({
        'With title': <SingleColumn
            title="Test Title"
            backgroundColour="pink"
            headingColour="black"
            ruleColour="green"
          >Some content with title</SingleColumn>,
        'With no title': <SingleColumn
            backgroundColour="pink"
            headingColour="black"
            ruleColour="green"
          >Some content with no title</SingleColumn>
      })}
    </div>);
  }
});

export default Sandbox;
