import React from 'react';

import SVG from '../elements/svg';

export default class QuoteBlock extends React.Component {
  render() {
    return (
      <section className="quote-block" style={{ backgroundColor: this.props.backgroundColour }}>
        <div className="quote-block__quote-mark">
          <SVG className="quote-block__quote-mark__quote" role="presentation" spritemapID='quotemark' />
        </div>
        <div className="quote-block__quote" dangerouslySetInnerHTML={{ __html: this.props.children }}></div>
        <p className="quote-block__source">{this.props.source}</p>
      </section>
    );
  }
}
