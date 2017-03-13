import React, { Component } from 'react';
import classnames from 'classnames';
import SVG from 'app/components/svg';

class TestimonialCarousel extends Component {

  constructor(props) {
    super(props);

    this.state = {
      numberOfItems: this.props.testimonials.length,
      currentItem: 0
    };
  }

  nextItem() {
    const { numberOfItems, currentItem } = this.state;

    if (currentItem === numberOfItems - 1) {
      this.setState({ currentItem: 0 })
    } else {
      this.setState({ currentItem: currentItem + 1 });
    }
  }

  renderTestimonials() {
    return this.props.testimonials.map((testimonial, i) => {
      const classes = classnames('testimonial-item', {
        active: i === this.state.currentItem
      })

      return (
        <div key={`testimonial-${i}`} className={classes}>
          <p>{ testimonial.testimonial }</p>
          <span className="testimonial-name">&#8212; { testimonial.source.name }</span>
          <span>,&nbsp;</span>
          <span className="testimonial-title">{ testimonial.source.title }</span>
          <span>&nbsp;</span>
          <span className="testimonial-company">{ testimonial.source.company }</span>
        </div>
      );
    });
  }

  render() {
    return (
      <section className="testimonial-carousel">
        <div className="testimonial-content">
          {this.renderTestimonials()}
        </div>
        <button className="tesimonial-button-next" onClick={() => this.nextItem()}>
          <SVG spritemapID="shuffle" />
        </button>
      </section>
    );
  }
};

export default TestimonialCarousel;
