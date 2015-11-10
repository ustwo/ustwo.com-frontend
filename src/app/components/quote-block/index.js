import React from 'react';

import SVG from '../svg';

class QuoteBlock extends React.Component {
  render() {
    const { backgroundColour, children, source } = this.props;
    return <div
      className="quote-block"
      style={{ backgroundColor: backgroundColour }}
    >
      <div className="quote-mark">
        <SVG role="presentation" spritemapID="quotemark" />
      </div>
      <div
        className="quote"
        dangerouslySetInnerHTML={{ __html: children }}
      />
    <p className="source">By {source}</p>
    </div>;
  }
}

export default QuoteBlock;
