import NavigationOpenOverlayButton from './';

const Sandbox = React.createClass({
  render() {
    return (<div>
      <NavigationOpenOverlayButton
        onOpen={() => alert('opened!')}
      />
    </div>);
  }
});

export default Sandbox;
