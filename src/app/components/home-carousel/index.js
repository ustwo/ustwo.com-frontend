import React, { Component } from 'react';
import classnames from 'classnames';
import ScrollWrapper from 'app/components/scroll-wrapper';

const itemsRefreshInterval = 5; /* Value in seconds */

class HomeCarousel extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentStartItem: 0,
      tick: 0
    }
  }

  ticker() {
    if (this.props.scrollProgress > 0.5) {
      this.setState({ tick: this.state.tick + 1 });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props != nextProps) {
      this.timer;
    }
  }

  componentDidMount() {
    this.timer = setInterval(this.ticker.bind(this), 1000);
    // TODO: Where does this go?
    // if (this.state.tick === itemsRefreshInterval) {
    //   this.setState({
    //     currentStartItem: this.state.currentStartItem + 2
    //   });
    // }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { scrollProgress, mousePosition } = this.props;
    console.log(this.props.scrollProgress)
    console.log(this.state.tick);

    // const itemsTotal = this.props.carouselItems.length();

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
          <div className="home-section-title">{item.category}</div>
          <h2>{item.title}</h2>
          <div className="home-carousel-item-image"></div>
        </div>
      );
    });

    return (
      <div className="home-carousel">
        {showItems}
      </div>
    );
  }
};

export default HomeCarousel;
