import React, { Component } from 'react';
import classnames from 'classnames';
import transitionOnScroll from 'app/lib/transition-on-scroll';

import ScrollWrapper from 'app/components/scroll-wrapper';
import TimerUI from 'app/components/timer-ui';
import Video from 'app/components/video';

const itemsRefreshInterval = 5000;
const tickerFrequency = 50;
const transitionDuration = 300;
const distance = 60;
const numberOfItemsInView = 2;

function goToNextItems(component) {
  component.setState({ tick: itemsRefreshInterval });

  if (component.state.currentStartItem === component.props.carouselItems.length - numberOfItemsInView) {
    component.setState({ currentStartItem: 0 });
  } else {
    component.setState({ currentStartItem: component.state.currentStartItem + numberOfItemsInView });
  }
}

class HomeCarousel extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentStartItem: 0,
      tick: itemsRefreshInterval,
      paused: false,
      otherIsHovered: false
    }
  }

  ticker() {
    /* Start the ticker when half of the carousel comes into view and stop it when it's off out */
    if (this.props.scrollProgress >= 0.25 && this.props.scrollProgress <= 0.75) {

      if (this.state.tick === 0) {
        goToNextItems(this);
      }

      if (!this.state.paused) {
        this.setState({ tick: this.state.tick - tickerFrequency });
      }
    }
  }

  itemHoverEnter(alignment, isActive) {
    return () => {
      if (alignment === 'odd' && isActive) {
        this.setState({ otherIsHovered: true })
      }
    }
  }

  itemHoverLeave(alignment, isActive) {
    return () => {
      if (alignment === 'odd' && isActive) {
        this.setState({ otherIsHovered: false })
      }
    }
  }

  componentDidMount() {
    this.timer = setInterval(this.ticker.bind(this), tickerFrequency);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { scrollProgress, mousePosition } = this.props;

    const showItems = this.props.carouselItems.map((item, i) => {

      /* Determine all the classes to be added */
      let isPrevious = false;
      if (this.state.currentStartItem === 0 && (i === this.props.carouselItems.length - numberOfItemsInView || i === this.props.carouselItems.length - 1)
          || i === this.state.currentStartItem - numberOfItemsInView || i === this.state.currentStartItem - 1) {
        isPrevious = true;
      }

      let isActive = i === this.state.currentStartItem || i - 1 === this.state.currentStartItem ? true : false;
      let alignment = i % 2 === 0 ? 'even' : 'odd';

      let extraClasses = {
        active: isActive,
        previous: isPrevious,
        otherIsHovered: this.state.otherIsHovered && isActive && alignment === 'even' ? true : false
      }

      extraClasses[alignment] = true;

      const classes = classnames('home-carousel-item', extraClasses);

      /* Move the images according to mouse position */
      // const modifier = 3;
      // let x, y;
      // if (alignment === 'even') {
      //   x = (mousePosition.coordinateX - 0.5) * ((mousePosition.coordinateX * modifier) * (mousePosition.coordinateX * modifier));
      //   y = (mousePosition.coordinateY - 0.5) * ((mousePosition.coordinateY * modifier) * (mousePosition.coordinateY * modifier));
      // } else {
      //   x = (mousePosition.coordinateX + 0.5) * ((mousePosition.coordinateX * modifier) * (mousePosition.coordinateX * modifier));
      //   y = (mousePosition.coordinateY + 0.5) * ((mousePosition.coordinateY * modifier) * (mousePosition.coordinateY * modifier));
      // }
      // const imageStyles = {
      //   transform: `translate3d(${x}px,${y}px,0)`
      // }

      /* Parallax */
      const textStyles = {
        transform: `translate3d(0,${transitionOnScroll(scrollProgress, 0, 0.33, 0.33, 1, distance, true)}px,0)`
      }

      /* Show either an image or video depending on if there is a videoURL */
      let visualContent;
      if (item.videoURL) {
        visualContent = <Video src={item.videoURL} isVideoBackground={true} imageCSS={item.imageURL} />
      } else {
        visualContent = <img src={item.imageURL} alt={item.title} />
      }

      return (
        <div className={classes} key={`carousel-item-${i}`} onMouseEnter={this.itemHoverEnter(alignment, isActive)} onMouseLeave={this.itemHoverLeave(alignment, isActive)}>
          <div className="home-carousel-item-text" style={textStyles}>
            <div className="home-section-title">{item.category}</div>
            <h2>{item.title}</h2>
          </div>
          <div className="home-carousel-item-image">
            <div className="home-carousel-visual-content">
              {visualContent}
            </div>
          </div>
        </div>
      );
    });

    /* Pass down the ticker props in degree value for the circular timer */
    const ticker = this.state.tick / itemsRefreshInterval * 360;

    const classes = classnames('home-carousel', {
      darkStyle: this.props.darkStyle
    });

    return (
      <div className={classes}>
        <div className="home-carousel-items">
          {showItems}
          <button className="home-carousel-shuffle" onClick={() => goToNextItems(this)}>
            <TimerUI timer={ticker} darkStyle={this.props.darkStyle} />
          </button>
        </div>
      </div>
    );
  }
};

export default HomeCarousel;
