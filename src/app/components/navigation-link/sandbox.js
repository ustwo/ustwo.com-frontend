import NavigationLink from './';
import renderVariations from 'app/lib/sandbox/render-variations';

const Sandbox = React.createClass({
  render() {
    return <div className="sandbox">
      <style>{`
        body {
          background: #ccc;
        }
      `}</style>
      {renderVariations({
        'Not selected': <NavigationLink
            selected={false}
            url="link1"
          >Link 1</NavigationLink>,
        'Selected': <NavigationLink
            selected={true}
            url="link2"
          >Link 2</NavigationLink>,
        'With onClick handler': <NavigationLink
            url="clickMe"
            onClick={() => alert('clicked')}
          >Click me</NavigationLink>
      })}
    </div>;
  }
});

export default Sandbox;
