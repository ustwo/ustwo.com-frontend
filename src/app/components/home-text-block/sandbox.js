import HomeTextBlock from './';

const Sandbox = React.createClass({
  render() {
    return (<div style={{height: '100%'}}>
      <HomeTextBlock title="Some random title 1">Text block 1</HomeTextBlock>
      <HomeTextBlock title="Some random title 2" colour="red">Text block 2</HomeTextBlock>
      <HomeTextBlock title="Some random title 3" childColour="blue">Text block 3</HomeTextBlock>
    </div>);
  }
});

export default Sandbox;
