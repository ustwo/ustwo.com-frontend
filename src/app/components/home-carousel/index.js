import React, { Component } from 'react';
import classnames from 'classnames';
import ScrollWrapper from 'app/components/scroll-wrapper';

const itemsRefreshInterval = 100; /* Value in seconds */

class HomeCarousel extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentStartItem: 0,
      tick: itemsRefreshInterval
    }
  }

  nextItems() {
    this.setState({ tick: 0 });
  }

  ticker() {
    if (this.props.scrollProgress > 0.5 && this.props.scrollProgress < 1) {

      if (this.state.tick === 0) {
        this.setState({ tick: itemsRefreshInterval });

        if (this.state.currentStartItem === this.props.carouselItems.length - 2) {
          this.setState({ currentStartItem: 0 });
        } else {
          this.setState({ currentStartItem: this.state.currentStartItem + 2 });
        }
      }

      this.setState({ tick: this.state.tick - 0.5 });
    }
  }

  componentDidMount() {
    this.timer = setInterval(this.ticker.bind(this), 500);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { scrollProgress, mousePosition } = this.props;

    let showItems = this.props.carouselItems.map((item, i) => {
      let extraClasses = {
        active: i === this.state.currentStartItem || i - 1 === this.state.currentStartItem ? true : false,
        next: i - 2 === this.state.currentStartItem || i - 3 === this.state.currentStartItem ? true : false
      }

      let alignment = i % 2 === 0 ? 'even' : 'odd';
      extraClasses[alignment] = true;

      const classes = classnames('home-carousel-item', extraClasses);

      return (
        <div className={classes}>
          <div className="home-carousel-item-text">
            <div className="home-section-title">{item.category}</div>
            <h2>{item.title}</h2>
          </div>
          <div className="home-carousel-item-image">
            <img src={item.imageURL} alt={item.title} />
          </div>
        </div>
      );
    });

    return (
      <div className="home-carousel">
        {showItems}
        <div className="home-carousel-controls">
          <button className="home-carousel-controls-button" onClick={this.nextItems.bind(this)}></button>
        </div>
      </div>
    );
  }
};

export default HomeCarousel;
