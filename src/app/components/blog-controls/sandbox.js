import BlogControls from './';
import renderVariations from 'app/lib/sandbox/render-variations';

const Sandbox = React.createClass({
  render() {
    return <div className="sandbox">
      <style>{`
        body {
          background: #ccc;
        }
        .sandbox {
          height: 100vh;
        }
        .sandbox-component {
          position: relative;
          height: inherit;
        }
      `}</style>
      {renderVariations({
        'Default': <BlogControls />,
        'With selected category': <BlogControls blogCategory="design" />
      })}
    </div>;
  }
});

export default Sandbox;
