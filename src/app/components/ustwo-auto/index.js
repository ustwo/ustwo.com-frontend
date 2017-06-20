import React from 'react';
import window from 'app/adaptors/server/window';

import ScrollWrapper from 'app/components/scroll-wrapper';
import Hero from 'app/components/hero';
import ContactBlock from 'app/components/contact-block';
import ContactButton from 'app/components/contact-button';
import Footer from 'app/components/footer';
import WorkProcess from 'app/components/work-process';

function UstwoAuto({ documentScrollPosition, viewportDimensions, footer, studios, currentPage, isMobile, fixedHeight, scrollProgress }) {

  let styles;
  if (documentScrollPosition > window.innerHeight + 100) {
    styles = { position: `relative` }
  }

  return (
    <div className="work-ustwo-auto">

      <div className="home-pinned-header-wrapper">
        <div className="home-pinned-header-inner" style={styles}>
          <ScrollWrapper
            component={
              <Hero
                title="auto"
                transitionImage={true}
                showDownIndicator={true}
                eventLabel=''
                fixedHeight={fixedHeight}
                isMobile={isMobile}
                scrollProgress={scrollProgress}
                heroImage={true}
              />
            }
            documentScrollPosition={documentScrollPosition}
            viewportDimensions={viewportDimensions}
          />
        </div>
      </div>

      <div className="home-main-content-wrapper">

        <div className="work-whatwedo-wrapper">
          <div className="work-whatwedo">
            <div className="work-intro">
              <p className="work-intro-statement">
                {ustwoAutoData.intro}
              </p>
            </div>
          </div>

          <WorkProcess data={ustwoAutoData.items} isMobile={isMobile}  />

          <div className="work-contact">
            <ContactButton />
          </div>
        </div>

        <ScrollWrapper
          component={<ContactBlock />}
          documentScrollPosition={documentScrollPosition}
          viewportDimensions={viewportDimensions}
          requireScreenPosition={true}
          className="scroll-wrapper-contact-block"
        />
        <Footer data={footer} studios={studios} currentPage={currentPage}/>

      </div>

    </div>
  );
}

export default UstwoAuto;

const ustwoAutoData = {
  intro: 'ustwo Auto is dedicated to exploring user experience challenges and opportunities in the mobility space. We work with selected clients and conduct research and experiments, often in collaboration with academic partners around the world. Recent projects and experiments have focussed on these areas:',
  items: [{
    title: 'Smart Mobility',
    image: '/images/auto/smart-mobility.svg',
    text: "Creating new services to help people navigate the world more easily"
  },{
    title: 'Connected Car',
    image: '/images/auto/connected-car.svg',
    text: 'Enhancing the ownership experience by connecting the car to people’s lifestyles and expectations'
  },{
    title: 'Contextual HMI',
    image: '/images/auto/contextual-hmi.svg',
    text: 'Making the in-car experience more personal and situational'
  },{
    title: 'Humanising Autonomy',
    image: '/images/auto/humanising-autonomy.svg',
    text: 'Looking beyond the technology and focussing on new human behaviours and opportunities'
  }]
}
