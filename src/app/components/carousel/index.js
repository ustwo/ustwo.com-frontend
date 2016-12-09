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
    return i - 1 === this.state.activeItem || (totalItems - 1 === this.state.activeItem && i === 0);
  },

  isPrevItem(i, totalItems) {
    return i + 1 === this.state.activeItem || (this.state.activeItem === 0 && i === totalItems - 1);
  },

  renderItems() {
    const carouselItems = this.props.data.map((item, i) => {

      const totalItems = this.props.data.length;
      const classes = classnames('carousel-item', `carousel-item-${item.name}`, {
        active: this.state.activeItem === i,
        next: this.isNextItem(i, totalItems),
        prev: this.isPrevItem(i, totalItems)
      });

      const styles = {
        backgroundImage: `url(${item.image})`
      }

      return (
        <div className={classes}>
          <div className="carousel-item-inner" style={styles}>
            <div className="carousel-content">
              <div className="carousel-number">
                {i+1} / {totalItems}
              </div>
              <h2>{item.title}</h2>
              <p>{item.text}</p>
            </div>
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
        <div className="carousel-control carousel-control-next" onClick={this.next.bind(this)}></div>
        <ReactSwipe
          ref="carousel"
          className={`carousel ${this.state.direction}-direction`}
          swipeOptions={swipeOptions}
          style={carouselStyle}>
          {this.renderItems()}
        </ReactSwipe>
        <div className="carousel-control carousel-control-prev" onClick={this.prev.bind(this)}></div>
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
