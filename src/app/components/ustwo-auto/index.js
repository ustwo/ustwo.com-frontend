import React from 'react';
import window from 'app/adaptors/server/window';

import ScrollWrapper from 'app/components/scroll-wrapper';
import Hero from 'app/components/hero';
import ContactBlock from 'app/components/contact-block';
import Footer from 'app/components/footer';

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

        Text here

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
