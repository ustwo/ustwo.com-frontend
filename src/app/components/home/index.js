import React from 'react';
import classnames from 'classnames';
import { get } from 'lodash';

import ScrollWrapper from 'app/components/scroll-wrapper';
import HomeIntro from 'app/components/home-intro';
import HomeTextBlock from 'app/components/home-text-block';
import HomeCarousel from 'app/components/home-carousel';
import HomeWelcomeMessage from 'app/components/home-welcome-message';
import HomeSmorgasbordMessage from 'app/components/home-smorgasbord-message';
import HomeSmorgasbord from 'app/components/home-smorgasbord';
import ContactBlock from 'app/components/contact-block';
import Footer from 'app/components/footer';

function PageHome({ page, documentScrollPosition, viewportDimensions, scrolling, popup, isMobile, loaded, footer, studios, currentPage, fixedHeight, className }) {
  const classes = classnames('page-home-content', className, { loaded });

  // TODO: Do this nicer! Extract content. Perhaps when/if we integrate with CMS
  const textBlockIntro = {
    title: `Hi. We're ustwo`,
    text: <HomeWelcomeMessage />
  }
  const textBlockSmorgasbord = {
    title: `Explore together`,
    text: <HomeSmorgasbordMessage />
  }

  return (
    <article className={classes}>

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
          component={<HomeCarousel carouselItems={dataProducts} isMobile={isMobile} inView={true} loaded={loaded} />}
          documentScrollPosition={documentScrollPosition}
          viewportDimensions={viewportDimensions}
          className="scroll-wrapper-home-carousel-products"
          fixedHeight={fixedHeight}
        />

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
