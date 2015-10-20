import NavigationOpenOverlayButton from './';

const Sandbox = React.createClass({
  render() {
    return <div className="sandbox">
      <NavigationOpenOverlayButton
        onOpen={() => alert('opened!')}
      />
    </div>;
  }
});

export default Sandbox;
