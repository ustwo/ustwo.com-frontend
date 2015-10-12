import NavigationLink from './';

const Sandbox = React.createClass({
  render() {
    return (<div>
      <NavigationLink
        selected={false}
        url="link1"
      >Link 1</NavigationLink>
      <NavigationLink
        selected={true}
        url="link2"
      >Link 2</NavigationLink>
      <NavigationLink
        url="clickMe"
        onClick={() => alert('clicked')}
      >Click me</NavigationLink>
    </div>);
  }
});

export default Sandbox;
