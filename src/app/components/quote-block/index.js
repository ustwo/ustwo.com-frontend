import React from 'react';

import SVG from '../svg';

export default class QuoteBlock extends React.Component {
  render() {
    return (
      <section className="quote-block" style={{ backgroundColor: this.props.backgroundColour }}>
        <div className="quote-mark">
          <SVG role="presentation" spritemapID='quotemark' />
        </div>
        <div className="quote" dangerouslySetInnerHTML={{ __html: this.props.children }}></div>
        <p className="source">{this.props.source}</p>
      </section>
    );
  }
}
