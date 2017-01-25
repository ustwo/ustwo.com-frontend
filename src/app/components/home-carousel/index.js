import React, { Component } from 'react';
import classnames from 'classnames';
import ScrollWrapper from 'app/components/scroll-wrapper';
import TimerUI from 'app/components/timer-ui';

const itemsRefreshInterval = 5000;
const tickerFrequency = 50;

function goToNextItems(component) {
  component.setState({ tick: itemsRefreshInterval });

  if (component.state.currentStartItem === component.props.carouselItems.length - 2) {
    component.setState({ currentStartItem: 0 });
  } else {
    component.setState({ currentStartItem: component.state.currentStartItem + 2 });
  }
}

function goToPrevItems(component) {
  component.setState({ tick: itemsRefreshInterval });

  if (component.state.currentStartItem === 0) {
    component.setState({ currentStartItem: component.props.carouselItems.length - 2 });
  } else {
    component.setState({ currentStartItem: component.state.currentStartItem - 2 });
  }
}

function pauseCarousel(component) {
  component.setState({ paused: component.state.paused ? false : true })
}

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
    if (this.props.scrollProgress > 0.5 && this.props.scrollProgress < 1) {

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
      let extraClasses = {
        active: i === this.state.currentStartItem || i - 1 === this.state.currentStartItem ? true : false,
        next: i - 2 === this.state.currentStartItem || i - 3 === this.state.currentStartItem ? true : false
      }

      let alignment = i % 2 === 0 ? 'even' : 'odd';
      extraClasses[alignment] = true;

      let classes = classnames('home-carousel-item', extraClasses);

      let styles;
      if (alignment === 'even') {
        let x = (mousePosition.coordinateX - 0.5) * ((mousePosition.coordinateX * 2) * (mousePosition.coordinateX * 2));
        let y = (mousePosition.coordinateY - 0.5) * ((mousePosition.coordinateY * 2) * (mousePosition.coordinateY * 2));

        styles = {
          transform: `translate3d(${x}px,${y}px,0)`
        }
      } else {
        let x = (mousePosition.coordinateX + 0.5) * ((mousePosition.coordinateX * 2) * (mousePosition.coordinateX * 2));
        let y = (mousePosition.coordinateY + 0.5) * ((mousePosition.coordinateY * 2) * (mousePosition.coordinateY * 2));

        styles = {
          transform: `translate3d(${x}px,${y}px,0)`
        }
      }

      return (
        <div className={classes}>
          <div className="home-carousel-item-text">
            <div className="home-section-title">{item.category}</div>
            <h2>{item.title}</h2>
          </div>
          <div className="home-carousel-item-image">
            <img src={item.imageURL} style={styles} alt={item.title} />
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
          <button className="home-carousel-controls-button" onClick={() => pauseCarousel(this)}>
            <TimerUI timer={ticker} paused={this.state.paused} darkStyle={this.props.darkStyle} />
          </button>
        </div>
        <button className="home-carousel-controls-next" onClick={() => goToNextItems(this)}></button>
        <button className="home-carousel-controls-prev" onClick={() => goToPrevItems(this)}></button>
      </div>
    );
  }
};

export default HomeCarousel;
