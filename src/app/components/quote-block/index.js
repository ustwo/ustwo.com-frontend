import React from 'react';

import SVG from 'app/components/svg';

const QuoteBlock = React.createClass({
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
    <p className="source">{source}</p>
    </div>;
  }
});

export default QuoteBlock;
