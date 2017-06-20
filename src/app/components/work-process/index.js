import React, { Component } from 'react';
// import ReactSwipe from 'react-swipe';
import classnames from 'classnames';
import { kebabCase } from 'lodash';
import env from 'app/adaptors/server/env';
import goToCapability from 'app/lib/go-to-capability';

class WorkProcess extends Component {

  // constructor(props) {
  //   super(props);
  //
  //   this.state = {
  //     numberOfSlides: 0,
  //     currentSlide: 0
  //   }
  // }

  // componentDidMount() {
  //   if (env.Modernizr.touchevents) {
  //     this.setState({
  //       numberOfSlides: this.carousel.getNumSlides(),
  //       currentSlide: this.carousel.getPos()
  //     });
  //   }
  // }
  //
  // onSlide() {
  //   return () => {
  //     this.setState({
  //       currentSlide: this.carousel.getPos()
  //     });
  //   }
  // }

  render() {
    const { data, isMobile } = this.props;

    const workProcess = data.map(item => {
      let link, title;
      if (item.name) {
        title = (<h2 onClick={() => goToCapability(item.name)} className="work-process-link">{item.title}</h2>);
        link = (<button onClick={() => goToCapability(item.name)} className="work-process-item-button">Read More</button>);
      } else {
        title = (<h2>{item.title}</h2>);
      }

      return (
        <div className={`work-process-item ${kebabCase(item.title)}`} key={item.name}>
          <img src={item.image} alt={`${item.title} icon`} />
          {title}
          <p>{item.text}</p>
          {link}
        </div>
      );
    });


    // TURNED OFF REACT SWIPE ON MOBILE AS TOO MANY BUGS FOR NOW
    // let renderContent;
    // if (env.Modernizr.touchevents) {
    //
    //   const swipeOptions = {
    //     speed: 300,
    //     disableScroll: true,
    //     continuous: false,
    //     callback: () => {
    //       console.log('swipe')
    //     },
    //     transitionEnd: (i) => {
    //       this.setState({ currentSlide: i })
    //     }
    //   };
    //
    //   const carouselStyle = {
    //     wrapper: { width: "100%" }
    //   }
    //
    //   let paginationItems = [];
    //   for (let i = 0; i < this.state.numberOfSlides; i++) {
    //     const classes = i === this.state.currentSlide ? 'active' : null;
    //
    //     paginationItems.push(
    //       <li className={classes} key={`slide-${i}`}></li>
    //     );
    //   }
    //
    //   const classes = classnames('work-process', {
    //     touchDevice: env.Modernizr.touchevents
    //   });
    //
    //   renderContent = (
    //     <div className={classes}>
    //       <ReactSwipe key={3} callback={this.onSlide} className="carousel" id='carouselId' ref={(ref) => this.carousel = ref} swipeOptions={swipeOptions}>
    //         {workProcess}
    //       </ReactSwipe>
    //       <ul className="work-process-pagination">
    //         {paginationItems}
    //       </ul>
    //     </div>
    //   );
    // } else {
      // renderContent = (
      //   <div className="work-process">
      //     <div className="work-process-wrapper">
      //       {workProcess}
      //     </div>
      //   </div>
      // );
    // }

    return (
      <div className="work-process">
        <div className="work-process-wrapper">
          {workProcess}
        </div>
      </div>
    );
  }
}

export default WorkProcess;
