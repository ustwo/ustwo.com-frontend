import React, { Component } from 'react';
import ReactSwipe from 'react-swipe';
import { kebabCase } from 'lodash';

class WorkProcess extends Component {

  constructor(props) {
    super(props);

    this.state = {
      numberOfSlides: 0,
      currentSlide: 0
    }
  }

  componentDidMount() {
    if (this.props.isMobile) {
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
    if (isMobile) {
      const swipeOptions = {
        speed: 300,
        disableScroll: true,
        continuous: true,
        transitionEnd: function(index, elem) {
          this.setState({
            currentSlide: this.carousel.getPos()
          });
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

      renderContent = (
        <div className="work-process">
          <ReactSwipe key={3} callback={this.onSlide} className="carousel" id='carouselId' ref={(ref) => this.carousel = ref} swipeOptions={{continuous: false}}>
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
