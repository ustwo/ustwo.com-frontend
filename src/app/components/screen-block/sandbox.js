import ScreenBlock from './';

const Sandbox = React.createClass({
  render() {
    return (<div className="sandbox">
      <ScreenBlock
        hexColour="#aabbcc"
        customClass="test-class"
      >Block with hexcolour</ScreenBlock>
      <ScreenBlock
        colour="light-blue"
        customClass="test-class"
      >Block with colour class</ScreenBlock>
    </div>);
  }
});

export default Sandbox;
