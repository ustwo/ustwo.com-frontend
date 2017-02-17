import React, { Component } from 'react';
import classnames from 'classnames';
import Flux from 'app/flux';

import ScrollWrapper from 'app/components/scroll-wrapper';
import HomeIntro from 'app/components/home-intro';
import HomeTextBlock from 'app/components/home-text-block';
import HomeCarousel from 'app/components/home-carousel';
import HomeWelcomeMessage from 'app/components/home-welcome-message';
import HomeMoreMessage from 'app/components/home-more-message';
import HomeSmorgasbordMessage from 'app/components/home-smorgasbord-message';
import HomeSmorgasbord from 'app/components/home-smorgasbord';
import HomeLoader from 'app/components/home-loader';
import ContactBlock from 'app/components/contact-block';

class PageHome extends Component {

  constructor(props) {
    super(props);

    this.state = {
      viewportDimensions: {},
      venturesActive: false,
      contentLoaded: false
    }
  }

  /* Used in the resize listener */
  getViewportDimensions() {
    return (e) => {
      const viewportDimensions = {
        width: e.target.visualViewport.clientWidth,
        height: e.target.visualViewport.clientHeight
      };
      this.setState({ viewportDimensions });
    }
  }

  componentDidMount() {

    /*
      Sets home-loader to be seen for a fixed time
      TODO: Work out strategy here. It is a loader but ALSO an intro animation. We will want a minimum
      time for it to be seen but also allow for the video and home content to load before we hide it.
    */
    setTimeout(() => {
      this.setState({ contentLoaded: true });
    }.bind(this), 5000);

    /* Make sure that if the viewport is resized we update accordingly othewise scrolls/mousePositions will be out of sync */
    window.addEventListener('resize', this.getViewportDimensions());

    /*
      The following are calculations for the ventures (dark background) section so we know when it
      comes into view and we can show/hide it accordingly.
    */
    this.venturesHeight = this.venturesWrapper.getBoundingClientRect().height;
    this.venturesPositionFromTop = this.venturesWrapper.offsetTop - (this.venturesHeight * 0.35);
    const whereIsVentures = {
      from: this.venturesPositionFromTop,
      to: this.venturesPositionFromTop + this.venturesHeight
    }
    Flux.whereIsVentures(whereIsVentures);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.getViewportDimensions());
  }

  render() {
    const classes = classnames('page-home', this.props.className, {
      /* venturesActive shows or hides the dark background depending on when it falls in/out of view */
      venturesActive: this.props.documentScrollPosition > this.venturesPositionFromTop && this.props.documentScrollPosition < this.venturesPositionFromTop + this.venturesHeight,
      /* when 'loaded', hide home-loader */
      loaded: this.state.contentLoaded
    });

    /*
      Text block contents
      TODO: Do this nicer! Extract content. Perhaps when/if we integrate with CMS.
    */
    const textBlockIntro = {
      title: `Hi. We're ustwo.`,
      text: <HomeWelcomeMessage />
    }

    const textBlockMore = {
      title: `Still hungry?`,
      text: <HomeMoreMessage />
    }

    const textBlockSmorgasbord = {
      title: `Want moar?`,
      text: <HomeSmorgasbordMessage />
    }

    return (
      <article className={classes}>

        <HomeLoader loaded={this.state.contentLoaded} />

        <ScrollWrapper
          component={<HomeIntro scrolling={this.props.scrolling} loaded={this.state.contentLoaded} />}
          documentScrollPosition={this.props.documentScrollPosition}
          viewportDimensions={this.state.viewportDimensions}
          requireMousePosition={true}
          className="scroll-wrapper-home-intro"
        />

        <ScrollWrapper
          component={<HomeTextBlock content={textBlockIntro} />}
          documentScrollPosition={this.props.documentScrollPosition}
          viewportDimensions={this.state.viewportDimensions}
          className="scroll-wrapper-home-welcome-message"
        />

        <ScrollWrapper
          component={<HomeCarousel carouselItems={dataProducts} />}
          documentScrollPosition={this.props.documentScrollPosition}
          viewportDimensions={this.state.viewportDimensions}
          requireMousePosition={true}
          className="scroll-wrapper-home-carousel-products"
        />

        <div className="home-ventures-wrapper" ref={(ref) => this.venturesWrapper = ref }>

          <div className="home-ventures-wrapper-bg"></div>

          <ScrollWrapper
            component={<HomeTextBlock content={textBlockMore} />}
            documentScrollPosition={this.props.documentScrollPosition}
            viewportDimensions={this.state.viewportDimensions}
            className="scroll-wrapper-home-more-message"
          />

          <ScrollWrapper
            component={<HomeCarousel carouselItems={dataVentures} darkStyle={true} />}
            documentScrollPosition={this.props.documentScrollPosition}
            viewportDimensions={this.state.viewportDimensions}
            requireMousePosition={true}
            className="scroll-wrapper-home-carousel-ventures"
          />

        </div>

        <ScrollWrapper
          component={<HomeTextBlock content={textBlockSmorgasbord} />}
          documentScrollPosition={this.props.documentScrollPosition}
          viewportDimensions={this.state.viewportDimensions}
          className="scroll-wrapper-home-smorgasbord-message"
        />

        <ScrollWrapper
          component={<HomeSmorgasbord />}
          className="scroll-wrapper-home-smorgasbord"
        />

        <ContactBlock />

      </article>
    );
  }
};

export default PageHome;

/*
  Hard coded data
  TODO: Integrate with CMS
*/
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
  imageURL: "/images/showcase/foursquare.jpg",
  videoURL: "/images/home/foursquare.mp4"
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
  category: "Venture",
  imageURL: "/images/showcase/ustwo-games.jpg",
  videoURL: "/images/home/monument-valley.mp4"
},{
  title: "Dice",
  category: "Venture",
  imageURL: "/images/showcase/dice.jpg"
},{
  title: "Moodnotes",
  category: "Venture",
  imageURL: "/images/showcase/moodnotes.jpg",
  videoURL: "/images/home/moodnotes.mp4"
},{
  title: "Wayfindr",
  category: "Venture",
  imageURL: "/images/showcase/wayfindr.jpg"
},{
  title: "Pause",
  category: "Venture",
  imageURL: "/images/showcase/pause.jpg",
  videoURL: "/images/home/pause.mp4"
},{
  title: "Watch This",
  category: "Venture",
  imageURL: "/images/showcase/watch-this.jpg"
}];
