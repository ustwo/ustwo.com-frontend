import BlogControls from './';
import renderVariations from '../../lib/render-variations';

const Sandbox = React.createClass({
  render() {
    return (<div className="sandbox" style={{height: '100%'}}>
      <style>{`
        .sandbox-component {
          position: relative;
          height: 100%;
        }
      `}</style>
      {renderVariations({
        'Default': <BlogControls />,
        'With class name': <BlogControls className="test" />,
        'With selected category': <BlogControls blogCategory="design" />
      })}
    </div>);
  }
});

export default Sandbox;
