import DownChevron from './';
import renderVariations from '../../lib/render-variations';

const Sandbox = React.createClass({
  render() {
    return <div className="sandbox">
      {renderVariations({
        '500ms timeout': <DownChevron autoAnim={500} />,
        '1.5s timeout': <DownChevron autoAnim={1500} />,
        'With onClick handler': <DownChevron autoAnim={500} onClick={() => alert('clicked')} />
      })}
    </div>;
  }
});

export default Sandbox;
