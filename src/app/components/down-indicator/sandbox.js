import DownIndicator from './';
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
        '500ms timeout': <DownIndicator />,
        '1.5s timeout': <DownIndicator />,
        'With onClick handler': <DownIndicator autoAnim={500} onClick={() => alert('clicked')} />
      })}
    </div>;
  }
});

export default Sandbox;
