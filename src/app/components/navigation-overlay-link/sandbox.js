import NavigationOverlayLink from './';
import renderVariations from 'app/lib/sandbox/render-variations';

const Sandbox = React.createClass({
  render() {
    return <div className="sandbox">
      {renderVariations({
        'Not selected': <NavigationOverlayLink
            selected={false}
            url="link1"
          >Link 1</NavigationOverlayLink>,
        'Selected': <NavigationOverlayLink
            selected={true}
            url="link2"
          >Link 2</NavigationOverlayLink>,
        'With onClick handler': <NavigationOverlayLink
            url="clickMe"
            onClick={() => alert('clicked')}
          >Click me</NavigationOverlayLink>
      })}
    </div>;
  }
});

export default Sandbox;
