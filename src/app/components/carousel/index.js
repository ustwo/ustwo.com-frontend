import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import ReactSwipe from 'react-swipe';

const Carousel  = React.createClass({

  getInitialState() {
    return {
      activeItem: 0,
      direction: null
    }
  },

  next() {
    this.refs.carousel.next();
    this.setState({
      activeItem: this.refs.carousel.getPos(),
      direction: 'next'
    });
  },

  prev() {
    this.refs.carousel.prev();
    this.setState({
      activeItem: this.refs.carousel.getPos(),
      direction: 'prev'
    });
  },

  isNextItem(i, totalItems) {
    return i - 1 === this.state.activeItem || (totalItems === this.state.activeItem && i === 0);
  },

  isPrevItem(i, totalItems) {
    return i + 1 === this.state.activeItem || (this.state.activeItem === 0 && i === totalItems);
  },

  renderItems() {
    const carouselItems = this.props.data.map((item, i) => {

      const totalItems = this.props.data.length - 1;
      const classes = classnames('carousel-item', {
        active: this.state.activeItem === i,
        next: this.isNextItem(i, totalItems),
        prev: this.isPrevItem(i, totalItems)
      });

      return (
        <div className={classes}>
          <div className="carousel-item-inner">
            <div className="carousel-control carousel-control-next" onClick={this.next.bind(this)}></div>
            <div className="carousel-content">
              <img src={item.image} alt={`Image of ${item.title}`} />
              <h2>{item.title}</h2>
              <p>{item.text}</p>
            </div>
            <div className="carousel-control carousel-control-prev" onClick={this.prev.bind(this)}></div>
          </div>
        </div>
      );
    });
    return carouselItems;
  },

  render() {
    const swipeOptions = {
      speed: this.props.slideDuration,
      disableScroll: false,
      stopPropagation: false,
      continuous: true
    };

    const carouselStyle = {
      wrapper: { width: "100%" }
    }

    return (
      <div className="carousel-wrapper" style={this.props.styles}>
        <ReactSwipe
          ref="carousel"
          className={`carousel ${this.state.direction}-direction`}
          swipeOptions={swipeOptions}
          style={carouselStyle}>
          {this.renderItems()}
        </ReactSwipe>
      </div>
    );
  }
});

Carousel.propTypes = {
  data: React.PropTypes.array.isRequired,
  slideDuration: React.PropTypes.number
}

Carousel.defaultProps = {
  slideDuration: 300
}

export default Carousel;
