import React from 'react';

export default class QuoteBlock extends React.Component {
  render() {
    const QuoteMark = '<use xlink:href="/images/spritemap.svg#quotemark" />';
    return (
      <section className="quote-block" style={{ backgroundColor: this.props.backgroundColour }}>
        <div className="quote-block__quote-mark">
          <svg className="quote-block__quote-mark__quote" role="presentation" dangerouslySetInnerHTML={{__html: QuoteMark }} />
        </div>
        <div className="quote-block__quote" dangerouslySetInnerHTML={{ __html: this.props.children }}></div>
        <p className="quote-block__source">{this.props.source}</p>
      </section>
    );
  }
}
