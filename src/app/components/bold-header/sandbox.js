import BoldHeader from './';
import renderVariations from '../../lib/render-variations';

const Sandbox = React.createClass({
  render() {
    return (<div className="sandbox">
      {renderVariations({
        'Default': <BoldHeader>Here is a test title</BoldHeader>,
        'With colour': <BoldHeader colour="white">Here is a test title</BoldHeader>,
        'With subtitle': <BoldHeader subtitle="Here is a test subtitle">Here is a test title</BoldHeader>
      })}
    </div>);
  }
});

export default Sandbox;
