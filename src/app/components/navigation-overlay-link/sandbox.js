import NavigationOverlayLink from './';

const Sandbox = React.createClass({
  render() {
    return (<div>
      <NavigationOverlayLink
        selected={false}
        url="link1"
      >Link 1</NavigationOverlayLink>
      <NavigationOverlayLink
        selected={true}
        url="link2"
      >Link 2</NavigationOverlayLink>
      <NavigationOverlayLink
        url="clickMe"
        onClick={() => alert('clicked')}
      >Click me</NavigationOverlayLink>
    </div>);
  }
});

export default Sandbox;
