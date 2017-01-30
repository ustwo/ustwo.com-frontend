import React, { Component } from 'react';
import classnames from 'classnames';
import Video from 'app/components/video';
import ScrollWrapper from 'app/components/scroll-wrapper';
import Flux from 'app/flux';

import HomeIntro from 'app/components/home-intro';
import HomeTextBlock from 'app/components/home-text-block';
import HomeCarousel from 'app/components/home-carousel';
import HomeWelcomeMessage from 'app/components/home-welcome-message';
import HomeMoreMessage from 'app/components/home-more-message';
import HomeSmorgasbord from 'app/components/home-smorgasbord';

function getViewportDimensions(component) {
  return (e) => {
    let viewportDimensions = {
      width: e.target.visualViewport.clientWidth,
      height: e.target.visualViewport.clientHeight
    };
    component.setState({ viewportDimensions });
  }
}

function getDocumentScrollPosition(component) {
  return (e) => {
    component.setState({ documentScrollPosition: e.target.scrollingElement.scrollTop });
  }
}

class PageHome extends Component {

  constructor(props) {
    super(props);

    this.state = {
      documentScrollPosition: 0,
      viewportDimensions: {},
      venturesActive: false
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', getDocumentScrollPosition(this));
    window.addEventListener('resize', getViewportDimensions(this));
    this.venturesHeight = this.venturesWrapper.getBoundingClientRect().height;
    this.venturesPositionFromTop = this.venturesWrapper.offsetTop - (this.venturesHeight * 0.25);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', getDocumentScrollPosition(this));
    window.removeEventListener('resize', getViewportDimensions(this));
  }

  render() {
    const classes = classnames('page-home', this.props.className, {
      venturesActive: this.state.documentScrollPosition > this.venturesPositionFromTop && this.state.documentScrollPosition < this.venturesPositionFromTop + this.venturesHeight
    });

    // if (this.state.documentScrollPosition > window.innerHeight) {
    //   Flux.hideHomeIntroMenu();
    // }

    return (
      <article className={classes} id="scroll-container">

        <ScrollWrapper
          component={<HomeIntro />}
          documentScrollPosition={this.state.documentScrollPosition}
          viewportDimensions={this.state.viewportDimensions}
          getMousePosition={true}
          className="scroll-wrapper-home-intro"
        />

        <ScrollWrapper
          component={<HomeTextBlock content={textBlockIntro} />}
          documentScrollPosition={this.state.documentScrollPosition}
          viewportDimensions={this.state.viewportDimensions}
          className="scroll-wrapper-home-welcome-message"
        />

        <ScrollWrapper
          component={<HomeCarousel carouselItems={dataProducts} />}
          documentScrollPosition={this.state.documentScrollPosition}
          viewportDimensions={this.state.viewportDimensions}
          getMousePosition={true}
          className="scroll-wrapper-home-carousel-products"
        />

        <div className="home-ventures-wrapper" ref={(ref) => this.venturesWrapper = ref }>

          <div className="home-ventures-wrapper-bg"></div>

          <ScrollWrapper
            component={<HomeTextBlock content={textBlockMore} />}
            documentScrollPosition={this.state.documentScrollPosition}
            viewportDimensions={this.state.viewportDimensions}
            className="scroll-wrapper-home-more-message"
          />

          <ScrollWrapper
            component={<HomeCarousel carouselItems={dataVentures} darkStyle={true} />}
            documentScrollPosition={this.state.documentScrollPosition}
            viewportDimensions={this.state.viewportDimensions}
            getMousePosition={true}
            className="scroll-wrapper-home-carousel-ventures"
          />

        </div>

        <ScrollWrapper
          component={<HomeSmorgasbord />}
          documentScrollPosition={this.state.documentScrollPosition}
          viewportDimensions={this.state.viewportDimensions}
        />

      </article>
    );
  }
};

export default PageHome;

const dataProducts = [{
  title: "Ford GoPark",
  category: "Client Work",
  imageURL: "/images/showcase/ford-gopark.jpg"
},{
  title: "Sky Kids",
  category: "Client Work",
  imageURL: "/images/showcase/sky-kids.jpg"
},{
  title: "Adidas Go",
  category: "Client Work",
  imageURL: "/images/showcase/adidas-go.jpg"
},{
  title: "Google Cardboard ",
  category: "Client Work",
  imageURL: "/images/showcase/google-cardboard.jpg"
},{
  title: "Foursquare",
  category: "Client Work",
  imageURL: "/images/showcase/foursquare.jpg"
},{
  title: "Harvey Nichols",
  category: "Client Work",
  imageURL: "/images/showcase/harvey-nichols.jpg"
},{
  title: "NBC Sprout",
  category: "Client Work",
  imageURL: "/images/showcase/nbc-sprout.jpg"
},{
  title: "Android wear",
  category: "Client Work",
  imageURL: "/images/showcase/android-wear.jpg",
  videoURL: "/images/home/android-wear.mp4"
}];

const dataVentures = [{
  title: "ustwo Games",
  category: "ustwo Venture",
  imageURL: "/images/showcase/ustwo-games.jpg",
  videoURL: "/images/home/monument-valley.mp4"
},{
  title: "Dice",
  category: "ustwo Venture",
  imageURL: "/images/showcase/dice.jpg"
},{
  title: "Moodnotes",
  category: "ustwo Venture",
  imageURL: "/images/showcase/moodnotes.jpg"
},{
  title: "Wayfindr",
  category: "ustwo Venture",
  imageURL: "/images/showcase/wayfindr.jpg"
},{
  title: "Pause",
  category: "ustwo Venture",
  imageURL: "/images/showcase/pause.jpg"
},{
  title: "Watch This",
  category: "ustwo Venture",
  imageURL: "/images/showcase/watch-this.jpg"
}];

const textBlockIntro = {
  title: `Hi. We're ustwo.`,
  text: <HomeWelcomeMessage />
}

const textBlockMore = {
  title: `Want moar?`,
  text: <HomeMoreMessage />
}
