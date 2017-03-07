import React, { Component } from 'react';
import classnames from 'classnames';
import Scroll, { Link, Element } from 'react-scroll'; /* Animate and scroll to location in document */
import Flux from 'app/flux';
import window from 'app/adaptors/server/window';

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

function isVenturesInView(component) {
  return (component.props.documentScrollPosition > component.venturesPositionFromTop) &&
         (component.props.documentScrollPosition < component.venturesPositionFromTop + component.venturesHeight)
}

class PageHome extends Component {

  constructor(props) {
    super(props);

    this.state = {
      viewportDimensions: {},
      venturesActive: false,
      contentLoaded: false,
      isMobile: null
    }
  }

  /* Used in the resize listener */
  getViewportDimensions() {
    const viewportDimensions = {
      width: window.innerWidth,
      height: window.innerHeight
    };
    this.setState({
      viewportDimensions,
      isMobile: window.innerWidth < 480 ? true : false
    });
  }

  whereIsVentures() {
    /*
      For the ventures (dark background) section so we know when it
      comes into view and we can show/hide it accordingly.
    */
    this.venturesHeight = this.venturesWrapper.getBoundingClientRect().height;
    /* Remove some height from the offsetTop here so the bg is activated as the content comes into view */
    this.venturesPositionFromTop = this.venturesWrapper.offsetTop - (this.state.viewportDimensions.height * 0.5);
    const whereIsVentures = {
      from: this.venturesPositionFromTop,
      to: this.venturesPositionFromTop + this.venturesHeight
    }
    Flux.whereIsVentures(whereIsVentures);
  }

  componentWillMount() {
    this.getViewportDimensions();
  }

  componentDidMount() {

    /*
      Sets home-loader to be seen for a fixed time
      TODO: Work out strategy here. It is a loader but ALSO an intro animation. We will want a minimum
      time for it to be seen but also allow for the video and home content to load before we hide it.
    */
    setTimeout(() => {
      this.setState({ contentLoaded: true });
    }.bind(this), 5500);

    /* Make sure that if the viewport is resized we update accordingly othewise scrolls/mousePositions will be out of sync */
    window.addEventListener('resize', () => {
      this.getViewportDimensions();
      this.whereIsVentures();
    });


    this.whereIsVentures();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.getViewportDimensions());
  }

  render() {
    const { isMobile } = this.state;
    const classes = classnames('page-home-content', this.props.className, {
      /* venturesActive shows or hides the dark background depending on when it falls in/out of view */
      venturesActive: isVenturesInView(this),
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
      title: `More yes, more can, more wow`,
      text: <HomeSmorgasbordMessage />
    }

    return (
      <article className={classes}>

        <HomeLoader loaded={this.state.contentLoaded} />

        <Link to="homeTextBlock" smooth={true} duration={1000} className="home-intro-link">
          <ScrollWrapper
            component={<HomeIntro scrolling={this.props.scrolling} loaded={this.state.contentLoaded} isMobile={isMobile} />}
            documentScrollPosition={this.props.documentScrollPosition}
            viewportDimensions={this.state.viewportDimensions}
            requireMousePosition={true}
            className="scroll-wrapper-home-intro"
          />
        </Link>

        <Element name="homeTextBlock">
          <ScrollWrapper
            component={<HomeTextBlock content={textBlockIntro} />}
            documentScrollPosition={this.props.documentScrollPosition}
            viewportDimensions={this.state.viewportDimensions}
            className="scroll-wrapper-home-welcome-message"
          />
        </Element>

        <ScrollWrapper
          component={<HomeCarousel carouselItems={dataProducts} isMobile={isMobile} />}
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
            component={<HomeCarousel carouselItems={dataVentures} isMobile={isMobile}m darkStyle={true} />}
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
  imageURL: "/images/home/ford-gopark.jpg"
},{
  title: "Android wear",
  category: "Client Work",
  imageURL: "/images/home/android-wear.jpg",
  videoURL: "/images/home/android-wear.mp4"
},{
  title: "Foursquare",
  category: "Client Work",
  imageURL: "/images/home/foursquare.jpg",
  videoURL: "/images/home/foursquare.mp4"
},{
  title: "Adidas Go",
  category: "Client Work",
  imageURL: "/images/home/adidas-go.jpg"
},{
  title: "Google Cardboard ",
  category: "Client Work",
  imageURL: "/images/home/google-cardboard.jpg"
},{
  title: "Harvey Nichols",
  category: "Client Work",
  imageURL: "/images/home/harvey-nichols.jpg",
  videoURL: "/images/home/harvey-nichols.mp4"
},{
  title: "Sky Kids",
  category: "Client Work",
  imageURL: "/images/home/sky-kids.jpg",
  videoURL: "/images/home/sky-kids.mp4"
},{
  title: "NBC Sprout",
  category: "Client Work",
  imageURL: "/images/home/nbc-sprout.jpg"
}];

const dataVentures = [{
  title: "ustwo Games",
  category: "Venture",
  imageURL: "/images/home/ustwo-games.jpg",
  videoURL: "/images/home/monument-valley.mp4"
},{
  title: "Dice",
  category: "Venture",
  imageURL: "/images/home/dice.jpg"
},{
  title: "Moodnotes",
  category: "Venture",
  imageURL: "/images/home/moodnotes.jpg",
  videoURL: "/images/home/moodnotes.mp4"
},{
  title: "Wayfindr",
  category: "Venture",
  imageURL: "/images/home/wayfindr.jpg"
},{
  title: "Pause",
  category: "Venture",
  imageURL: "/images/home/pause.jpg",
  videoURL: "/images/home/pause.mp4"
},{
  title: "Watch This",
  category: "Venture",
  imageURL: "/images/home/watch-this.jpg"
}];
