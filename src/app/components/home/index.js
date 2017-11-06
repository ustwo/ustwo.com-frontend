import React, { Component } from 'react';
import classnames from 'classnames';
import Flux from 'app/flux';
import window from 'app/adaptors/server/window';
import { get } from 'lodash';

import ScrollWrapper from 'app/components/scroll-wrapper';
import HomeIntro from 'app/components/home-intro';
import HomeTextBlock from 'app/components/home-text-block';
import HomeCarousel from 'app/components/home-carousel';
import HomeWelcomeMessage from 'app/components/home-welcome-message';
import HomeMoreMessage from 'app/components/home-more-message';
import HomeSmorgasbordMessage from 'app/components/home-smorgasbord-message';
import HomeSmorgasbord from 'app/components/home-smorgasbord';
import ContactBlock from 'app/components/contact-block';
import Footer from 'app/components/footer';

class PageHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      venturesPosition: {},
      fixedHeightVentures: 0
    }

    this.getVenturesPositionBound = this.getVenturesPosition.bind(this);
  }

  // We need to find out viewportDimensions and if ventures is active (therefore know where it is)
  // Update all of it if we resize
  getVenturesPosition() {
    const { documentScrollPosition, viewportDimensions } = this.props;

    const venturesHeight = this.venturesWrapper.getBoundingClientRect().height;

    // Has been some problems relying on the following value.
    // So I've taken lead from the following to get a more robust solution:
    // http://stackoverflow.com/questions/5598743/finding-elements-position-relative-to-the-document
    const box = this.venturesWrapper.getBoundingClientRect();
    const body = document.body;
    const scrollTop = window.pageYOffset || body.scrollTop;
    const clientTop = body.clientTop || 0;
    const top = box.top + scrollTop - clientTop;
    const venturesPositionFromTop = Math.round(top);

    const venturesPosition = {
      from: venturesPositionFromTop,
      to: venturesPositionFromTop + venturesHeight
    }

    const fixedHeightVentures = venturesHeight;

    this.setState({ venturesPosition, fixedHeightVentures });
    Flux.venturesPosition(venturesPosition);
  }

  componentDidMount() {
    this.getVenturesPosition();

    // Make sure that if the viewport is resized we update accordingly othewise scrolls/mousePositions will be out of sync
    window.addEventListener('resize', this.getVenturesPositionBound);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.getVenturesPositionBound);
  }

  render() {
    const { page, documentScrollPosition, viewportDimensions, scrolling, popup, isMobile, loaded, footer, studios, currentPage, fixedHeight } = this.props;
    const { venturesPosition, fixedHeightVentures } = this.state;

    const venturesActive = documentScrollPosition > venturesPosition.from - (viewportDimensions.height * .5) && documentScrollPosition < venturesPosition.to - (viewportDimensions.height * .5);

    const classes = classnames('page-home-content', this.props.className, { venturesActive, loaded });

    // TODO: Do this nicer! Extract content. Perhaps when/if we integrate with CMS
    const textBlockIntro = {
      title: `Hi. We're ustwo`,
      text: <HomeWelcomeMessage />
    }
    const textBlockMore = {
      title: `Do more, to learn more`,
      text: <HomeMoreMessage />
    }
    const textBlockSmorgasbord = {
      title: `Explore together`,
      text: <HomeSmorgasbordMessage />
    }

    const venturesBgStyles = {
      height: `${fixedHeightVentures + 100}px`
    }

    return (
      <article className={classes} ref={(ref) => this.homeContent = ref}>

        <div className="home-pinned-header-wrapper">
          <div className="home-pinned-header-inner">
            <ScrollWrapper
              component={<HomeIntro viewportDimensions={viewportDimensions} scrolling={scrolling} loaded={loaded} isMobile={isMobile} popup={popup} fixedHeight={fixedHeight} />}
              documentScrollPosition={documentScrollPosition}
              viewportDimensions={viewportDimensions}
              requireScreenPosition={true}
              className="scroll-wrapper-home-intro"
            />
          </div>
        </div>

        <div className="home-main-content-wrapper">
          <ScrollWrapper
            component={<HomeTextBlock content={textBlockIntro} />}
            documentScrollPosition={documentScrollPosition}
            viewportDimensions={viewportDimensions}
            className="scroll-wrapper-home-welcome-message"
            fixedHeight={fixedHeight}
          />

          <ScrollWrapper
            component={<HomeCarousel carouselItems={dataProducts} isMobile={isMobile} inView={!venturesActive} loaded={loaded} />}
            documentScrollPosition={documentScrollPosition}
            viewportDimensions={viewportDimensions}
            className="scroll-wrapper-home-carousel-products"
            fixedHeight={fixedHeight}
          />

          <div className="home-ventures-wrapper" ref={(ref) => this.venturesWrapper = ref }>

            <div className="home-ventures-wrapper-bg" style={venturesBgStyles}></div>

            <ScrollWrapper
              component={<HomeTextBlock content={textBlockMore} />}
              documentScrollPosition={documentScrollPosition}
              viewportDimensions={viewportDimensions}
              className="scroll-wrapper-home-more-message"
              fixedHeight={fixedHeight}
            />

            <ScrollWrapper
              component={<HomeCarousel carouselItems={dataVentures} isMobile={isMobile} darkStyle={true} inView={venturesActive} loaded={loaded} />}
              documentScrollPosition={documentScrollPosition}
              viewportDimensions={viewportDimensions}
              className="scroll-wrapper-home-carousel-ventures"
              fixedHeight={fixedHeight}
            />

          </div>

          <ScrollWrapper
            component={<HomeTextBlock content={textBlockSmorgasbord} />}
            documentScrollPosition={documentScrollPosition}
            viewportDimensions={viewportDimensions}
            className="scroll-wrapper-home-smorgasbord-message"
            fixedHeight={fixedHeight}
          />

          <ScrollWrapper
            component={<HomeSmorgasbord data={get(page, 'featured_content')} loaded={loaded} />}
            className="scroll-wrapper-home-smorgasbord"
          />
        </div>

        <ScrollWrapper
          component={<ContactBlock />}
          documentScrollPosition={documentScrollPosition}
          viewportDimensions={viewportDimensions}
          requireScreenPosition={true}
          className="scroll-wrapper-contact-block"
        />

        <Footer data={footer} studios={studios} currentPage={currentPage}/>

      </article>
    );
  }
};

export default PageHome;

// Hard coded data, TODO: Integrate with CMS
const dataProducts = [{
  title: "Ford GoPark",
  category: "Client Work",
  imageURL: "/images/home/ford-gopark.jpg",
  description: "A smart parking service tackling congestion in one of London’s busiest boroughs",
  slug: "/work/ford-gopark"
},{
  title: "Android wear",
  category: "Client Work",
  imageURL: "/images/home/android-wear.jpg",
  videoURL: "/images/home/android-wear.mp4",
  description: "An evolving creative partnership setting the standard for watch face design",
  slug: "/work/android-wear-digital-watch-faces"
},{
  title: "Foursquare",
  category: "Client Work",
  imageURL: "/images/home/foursquare.jpg",
  videoURL: "/images/home/foursquare.mp4",
  description: "A fresh business customer portal experience designed to showcase the enterprise offering",
  slug: "/work/foursquare-enterprise"
},{
  title: "Adidas Go",
  category: "Client Work",
  imageURL: "/images/home/adidas-go.jpg",
  description: "A music app designed to track, enhance and improve your running performance",
  slug: "/work/adidas-go"
},{
  title: "Google Cardboard ",
  category: "Client Work",
  imageURL: "/images/home/google-cardboard.jpg",
  description: "An accessible go-to how-to guide for VR design principles",
  slug: "/work/google-cardboard"
},{
  title: "Harvey Nichols",
  category: "Client Work",
  imageURL: "/images/home/harvey-nichols.jpg",
  videoURL: "/images/home/harvey-nichols.mp4",
  description: "A unique consumer-centred loyalty experience built to engage and reward",
  slug: "/work/harvey-nichols"
},{
  title: "Sky Kids",
  category: "Client Work",
  imageURL: "/images/home/sky-kids.jpg",
  videoURL: "/images/home/sky-kids.mp4",
  description: "Creating a new product, brand and audience - loved by kids and trusted by parents",
  slug: "/work/sky-kids"
},{
  title: "NBC Sprout",
  category: "Client Work",
  imageURL: "/images/home/nbc-sprout.jpg",
  description: "A fun, colourful and exploratory game for Terrific Trucks",
  slug: "/work/nbc-sprout-playground-terrific-trucks"
}];

const dataVentures = [{
  title: "Humanising Autonomy",
  category: "Book Launch",
  imageURL: "/images/home/humanising-autonomy.jpg",
  description: "In our latest book, we explore creating a human approach to autonomy that actually works.",
  slug: "/auto/humanisingautonomy"
},{
  title: "ustwo Games",
  category: "Business",
  imageURL: "/images/home/ustwo-games-2.jpg",
  videoURL: "/images/home/ustwo-games.mp4",
  description: "An award-winning mobile games studio making the most beautiful interactive entertainment",
  slug: "/work/monument-valley-2"
},{
  title: "Dice",
  category: "Business",
  imageURL: "/images/home/dice.jpg",
  description: "Search, browse and buy tickets with the fastest growing live music discovery app",
  slug: "/work/dice"
},{
  title: "Moodnotes",
  category: "Venture",
  imageURL: "/images/home/moodnotes.jpg",
  videoURL: "/images/home/moodnotes.mp4",
  description: "Scientifically grounded in CBT making it simple to manage emotional wellbeing over time",
  slug: "/work/moodnotes"
},{
  title: "Wayfindr",
  category: "Venture",
  imageURL: "/images/home/wayfindr.jpg",
  description: "Empowering vision impaired people to navigate the world independently",
  slug: "/work/wayfindr-2"
},{
  title: "Sway",
  category: "Venture",
  imageURL: "/images/home/sway.jpg",
  description: "A scientifically validated interactive meditation app designed for mindfulness on the move",
  slug: "/work/sway"
}];
