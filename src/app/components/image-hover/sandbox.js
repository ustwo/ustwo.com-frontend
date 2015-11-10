import ImageHover from './';
import renderVariations from '../../lib/sandbox/render-variations';

const Sandbox = React.createClass({
  render() {
    return <div className="sandbox">
      <style>{`
        body {
          background: #666;
        }
      `}</style>
      {renderVariations({
        '500ms timeout': <ImageHover autoAnim={500} />,
      '1.5s timeout': <ImageHover autoAnim={1500} />,
    'With onClick handler': <ImageHover autoAnim={500} onClick={() => alert('clicked')} />
      })}
    </div>;
  }
});

export default Sandbox;
