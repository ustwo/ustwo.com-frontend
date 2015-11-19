import ScreenBlock from './';
import renderVariations from 'app/lib/sandbox/render-variations';

const Sandbox = React.createClass({
  render() {
    return <div className="sandbox full-width-component">
      {renderVariations({
        'With hex colour': <ScreenBlock
            hexColour="#aabbcc"
            customClass="test-class"
          />,
        'With colour class': <ScreenBlock
            colour="light-blue"
            customClass="test-class"
          />
      })}
    </div>;
  }
});

export default Sandbox;
