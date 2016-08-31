'use strict';

import React from 'react';
import map from 'lodash/collection/map';
import SVG from 'app/components/svg';
import TransitionManager from 'react-transition-manager';

const TestimonialCarousel = React.createClass({
  getInitialState() {
    const testimonials = this.props.testimonials;
    const index = 0;
    const testimonial = testimonials[index];
    
    return {
      index: index,
      testimonial: this.renderTestimonial(testimonial)
    };
  },
  onClickPrev() {
    const testimonials = this.props.testimonials;
    const index = (testimonials.length + this.state.index - 1) % testimonials.length
    const testimonial = testimonials[index];

    this.setState({
      index: index,
      testimonial: this.renderTestimonial(testimonial)
    });
  },
  onClickNext() {
    const testimonials = this.props.testimonials;
    const index = (testimonials.length + this.state.index + 1) % testimonials.length
    const testimonial = testimonials[index];

    this.setState({
      index: index,
      testimonial: this.renderTestimonial(testimonial)
    });
  },
  renderTestimonial(testimonial) {
    return <div>
        <p>{ testimonial.testimonial }</p>
        <span>&#8212; { testimonial.source }</span>
      </div>
  },
  renderTestimonials() {
    const testimonialSlug = `testimonial-${this.state.index}`;
    return (
      <div className={this.props.className}>
        <TransitionManager component="div" duration={1500}>
          <div key={testimonialSlug} className={`testimonial ${testimonialSlug}`}>{ this.state.testimonial }</div>
        </TransitionManager>
      </div>
    );
  },
  render() {
    return <section className="testimonials">
      <div className="wrapper">
        <button className="button-prev" onClick={this.onClickPrev}>
          <SVG role="presentation" spritemapID="arrow" />
        </button>
        <div className="testimonial-carousel">
          <div className="quote-mark-top">
            <SVG role="presentation" spritemapID="quotemark" />
          </div>
          { this.renderTestimonials() }
          <div className="quote-mark-bottom">
            <SVG role="presentation" spritemapID="quotemark" />
          </div>
        </div>
        <button className="button-next"  onClick={this.onClickNext}>
          <SVG role="presentation" spritemapID="arrow" />
        </button>
      </div>
    </section>
  }
});

export default TestimonialCarousel;
