import BoldHeader from './';
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
        'Default': <BoldHeader>Here is a test title</BoldHeader>,
        'With colour': <BoldHeader colour="white">Here is a test title</BoldHeader>,
        'With subtitle': <BoldHeader subtitle="Here is a test subtitle">Here is a test title</BoldHeader>
      })}
    </div>;
  }
});

export default Sandbox;
