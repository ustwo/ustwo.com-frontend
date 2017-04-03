import React, { Component } from 'react';
import ReactSwipe from 'react-swipe';
import classnames from 'classnames';
import { kebabCase } from 'lodash';
import env from 'app/adaptors/server/env';

class WorkProcess extends Component {

  constructor(props) {
    super(props);

    this.state = {
      numberOfSlides: 0,
      currentSlide: 0
    }
  }

  componentDidMount() {
    if (env.Modernizr.touchevents) {
      this.setState({
        numberOfSlides: this.carousel.getNumSlides(),
        currentSlide: this.carousel.getPos()
      });
    }
  }

  onSlide() {
    return () => {
      this.setState({
        currentSlide: this.carousel.getPos()
      });
    }
  }

  render() {
    const { data, isMobile } = this.props;

    const workProcess = data.map(item => {
      return (
        <div className={`work-process-item ${kebabCase(item.title)}`}>
          <img src={item.image} alt={`${item.title} icon`} />
          <h2>{item.title}</h2>
          <p>{item.text}</p>
        </div>
      );
    });

    let renderContent;
    if (env.Modernizr.touchevents) {

      const swipeOptions = {
        speed: 300,
        disableScroll: true,
        continuous: false,
        callback: () => {
          console.log('swipe')
        },
        transitionEnd: (i) => {
          this.setState({ currentSlide: i })
        }
      };

      const carouselStyle = {
        wrapper: { width: "100%" }
      }

      let paginationItems = [];
      for (let i = 0; i < this.state.numberOfSlides; i++) {
        const classes = i === this.state.currentSlide ? 'active' : null;

        paginationItems.push(
          <li className={classes} key={`slide-${i}`}></li>
        );
      }

      const classes = classnames('work-process', {
        touchDevice: env.Modernizr.touchevents
      });

      renderContent = (
        <div className={classes}>
          <ReactSwipe key={3} callback={this.onSlide} className="carousel" id='carouselId' ref={(ref) => this.carousel = ref} swipeOptions={swipeOptions}>
            {workProcess}
          </ReactSwipe>
          <ul className="work-process-pagination">
            {paginationItems}
          </ul>
        </div>
      );
    } else {
      renderContent = (
        <div className="work-process">
          {workProcess}
        </div>
      );
    }

    return renderContent;
  }
}

export default WorkProcess;
