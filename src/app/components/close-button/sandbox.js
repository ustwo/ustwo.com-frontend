import CloseButton from './';
import renderVariations from 'app/lib/sandbox/render-variations';

const Sandbox = React.createClass({
  render() {
    return <div className="sandbox">
      {renderVariations({
        '500ms timeout': <CloseButton autoAnim={500} />,
        '1.5s timeout': <CloseButton autoAnim={1500} />,
        'With onClose handler': <CloseButton autoAnim={500} onClose={() => alert('clicked')} />,
        'With styles': <CloseButton autoAnim={500} style={{ fill: 'blue' }} />
      })}
    </div>;
  }
});

export default Sandbox;
