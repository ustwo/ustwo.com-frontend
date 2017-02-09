import React, { Component } from 'react';
import classnames from 'classnames';
import ScrollWrapper from 'app/components/scroll-wrapper';
import TimerUI from 'app/components/timer-ui';
import transitionOnScroll from 'app/lib/transition-on-scroll';
import Video from 'app/components/video';

const itemsRefreshInterval = 500000;
const tickerFrequency = 50;
const transitionDuration = 300;
const distance = 60;

function goToNextItems(component) {
  component.setState({ tick: itemsRefreshInterval });

  if (component.state.currentStartItem === component.props.carouselItems.length - 2) {
    component.setState({ currentStartItem: 0 });
  } else {
    component.setState({ currentStartItem: component.state.currentStartItem + 2 });
  }
}

// function pauseCarousel(component) {
//   component.setState({ paused: component.state.paused ? false : true })
// }

class HomeCarousel extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentStartItem: 0,
      tick: itemsRefreshInterval,
      paused: false
    }
  }

  ticker() {
    if (this.props.scrollProgress >= 0.25 && this.props.scrollProgress <= 0.75) {

      if (this.state.tick === 0) {
        goToNextItems(this);
      }

      if (!this.state.paused) {
        this.setState({ tick: this.state.tick - tickerFrequency });
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

    let showItems = this.props.carouselItems.map((item, i) => {

      let isPrevious = false;
      if (this.state.currentStartItem === 0 && (i === this.props.carouselItems.length - 2 || i === this.props.carouselItems.length - 1)
          || i === this.state.currentStartItem - 2 || i === this.state.currentStartItem - 1) {
        isPrevious = true;
      }

      let extraClasses = {
        active: i === this.state.currentStartItem || i - 1 === this.state.currentStartItem ? true : false,
        previous: isPrevious
      }

      let alignment = i % 2 === 0 ? 'even' : 'odd';
      extraClasses[alignment] = true;

      let modifier = 3;

      let classes = classnames('home-carousel-item', extraClasses);

      let x, y;
      if (alignment === 'even') {
        x = (mousePosition.coordinateX - 0.5) * ((mousePosition.coordinateX * modifier) * (mousePosition.coordinateX * modifier));
        y = (mousePosition.coordinateY - 0.5) * ((mousePosition.coordinateY * modifier) * (mousePosition.coordinateY * modifier));
      } else {
        x = (mousePosition.coordinateX + 0.5) * ((mousePosition.coordinateX * modifier) * (mousePosition.coordinateX * modifier));
        y = (mousePosition.coordinateY + 0.5) * ((mousePosition.coordinateY * modifier) * (mousePosition.coordinateY * modifier));
      }
      let textStyles = {
        transform: `translate3d(0,${transitionOnScroll(scrollProgress, 0, 0.33, 0.33, 1, distance, true)}px,0)`
      }
      let imageStyles = {
        transform: `translate3d(${x}px,${y}px,0)`
      }

      let visualContent;
      if (item.videoURL) {
        visualContent = <Video src={item.videoURL} isVideoBackground={true} imageCSS={item.imageURL} />
      } else {
        visualContent = <img src={item.imageURL} alt={item.title} />
      }

      return (
        <div className={classes} key={`carousel-item-${i}`}>
          <div className="home-carousel-item-text" style={textStyles}>
            <div className="home-section-title">{item.category}</div>
            <h2>{item.title}</h2>
          </div>
          <div className="home-carousel-item-image">
            <div className="home-carousel-visual-content" style={imageStyles}>
              {visualContent}
            </div>
          </div>
        </div>
      );
    });

    let ticker = this.state.tick / itemsRefreshInterval * 360;

    let classes = classnames('home-carousel', {
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
