import React, { Component } from 'react';
import classnames from 'classnames';
import SVG from 'app/components/svg';
import Flux from 'app/flux';
import window from 'app/adaptors/server/window';

class TestimonialCarousel extends Component {

  constructor(props) {
    super(props);

    this.state = {
      numberOfItems: this.props.testimonials.length,
      currentItem: 0,
      testimonialsPosition: {},
      fixedHeighttestimonials: 0
    }

    this.getTestimonialsPositionBound = this.getTestimonialsPosition.bind(this);
  }

  nextItem() {
    const { numberOfItems, currentItem } = this.state;

    if (currentItem === numberOfItems - 1) {
      this.setState({ currentItem: 0 })
    } else {
      this.setState({ currentItem: currentItem + 1 });
    }
  }

  getTestimonialsPosition() {
    const { documentScrollPosition, viewportDimensions, type } = this.props;

    // Here type denotes the ustwo-auto colour on the twitter block, meaning it is
    // a lighter colour and therefore we don't want the navigation to know about it
    // as we don't want the nav colour to change when over it - getit?
    if (!type) {
      const testimonialsHeight = this.testimonialsWrapper.getBoundingClientRect().height;

      // Has been some problems relying on the following value.
      // So I've taken lead from the following to get a more robust solution:
      // http://stackoverflow.com/questions/5598743/finding-elements-position-relative-to-the-document
      const box = this.testimonialsWrapper.getBoundingClientRect();
      const body = document.body;
      const scrollTop = window.pageYOffset || body.scrollTop;
      const clientTop = body.clientTop || 0;
      const top = box.top + scrollTop - clientTop;
      const testimonialsPositionFromTop = Math.round(top);

      const testimonialsPosition = {
        from: testimonialsPositionFromTop,
        to: testimonialsPositionFromTop + testimonialsHeight
      }

      const fixedHeightTestimonials = testimonialsHeight;

      Flux.testimonialsPosition(testimonialsPosition);
    }
  }

  renderTestimonials() {
    const { type } = this.props;

    return this.props.testimonials.map((testimonial, i) => {
      const classes = classnames('testimonial-item', {
        active: i === this.state.currentItem
      });

      let icon;
      if (type === 'twitter-auto') {
        icon = (
          <div className="testimonial-icon">
            <SVG
              className="logo"
              title="twitter logo"
              spritemapID="twitter"
            />
          </div>
        );
      }

      return (
        <div key={`testimonial-${i}`} className={classes}>
          {icon}
          <p>&ldquo;{testimonial.testimonial}&rdquo;</p>
          <div className="testimonial-name">{testimonial.source.name}</div>
          <div className="testimonial-smallprint">
            <span className="testimonial-title">{testimonial.source.title}&nbsp;</span>
            <span className="testimonial-company">{testimonial.source.company}</span>
          </div>
        </div>
      );
    });
  }

  componentDidMount() {
    this.getTestimonialsPosition();
    window.addEventListener('resize', this.getTestimonialsPositionBound);
  }

  componentWillUnmount() {
    Flux.testimonialsPosition({});
    window.removeEventListener('resize', this.getTestimonialsPositionBound);
  }

  render() {
    const { fixedHeight, type } = this.props;
    const classes = classnames('testimonial-carousel', {
      twitterAuto: type === 'twitter-auto'
    });

    let styles;
    if (fixedHeight) {
      styles = { height: `${fixedHeight * .9}px` }
    }

    return (
      <section className={classes} style={styles} ref={(ref) => this.testimonialsWrapper = ref }>
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
