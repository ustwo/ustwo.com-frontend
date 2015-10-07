import BoldHeader from './';

const Sandbox = React.createClass({
  render() {
    return (<div style={{height: '100%'}}>
      <BoldHeader>Here is a test title</BoldHeader>
      <BoldHeader customClass="testClass">Here is a test title</BoldHeader>
      <BoldHeader colour="testColour">Here is a test title</BoldHeader>
      <BoldHeader subtitle="Here is a test subtitle">Here is a test title</BoldHeader>
    </div>);
  }
});

export default Sandbox;
