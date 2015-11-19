import EntranceTransition from './';
import renderVariations from 'app/lib/sandbox/render-variations';

const Sandbox = React.createClass({
  render() {
    return <div className="sandbox">
      <style>{`
        .entrance-transition {
          transition: opacity 0.5s ease-in-out;
        }
        .delayed {
          transition-delay: 1.5s;
        }
      `}</style>
      <div className="js">
        {renderVariations({
          'Default': <EntranceTransition>Content to show</EntranceTransition>,
          '1.5s delay': <EntranceTransition className="delayed">Content to show</EntranceTransition>
        })}
      </div>
      <div>
        {renderVariations({
          'No JS': <EntranceTransition>Content to show</EntranceTransition>
        })}
      </div>
    </div>;
  }
});

export default Sandbox;
