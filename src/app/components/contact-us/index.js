import React from 'react';
import Footer from 'app/components/footer';
import HeroNoVideo from 'app/components/hero-no-video';
import ScrollWrapper from 'app/components/scroll-wrapper';
import ContactBlock from 'app/components/contact-block';
import ContentWrapper from 'app/components/content-wrapper';
import Flux from 'app/flux';
import SVG from 'app/components/svg';

function renderContacts(contacts) {
  const items = contacts.map(item => {
    const { studio, name, title, email } = item;

    return (
      <li>
        <h5 className="contact-contacts-name">{name}</h5>
        <p className="contact-contacts-email"><a href={`mailto:${email}`}>{email}</a></p>
      </li>
    );
  });

  return (
    <ul className="contact-contacts">
      {items}
    </ul>
  )
}

function renderRegion(region) {
  return (
    <div className="content-triple-column">
      <h4>{region.title}</h4>
      {renderContacts(region.contacts)}
    </div>
  );
}

function contactGoToJoin() {
  return (e) => {
    e.preventDefault();
    Flux.navigate('/join-us');
  }
}

function pageContactUs({ page, currentParams, studios, currentPage, footer, modal, isMobile, fixedHeight, documentScrollPosition, viewportDimensions }) {
  const gradientSequence = {
    tickerFrequency: 200,
    timerTotal: 8000,
    topColours: ['#14C04D', '#009CF3', '#14C04D'],
    bottomColours: ['#F5E664', '#A5FAAF', '#F5E664']
  }

  return (
    <article className="page-contact-us">
      <div className="home-pinned-header-wrapper">
        <div className="home-pinned-header-inner">
          <ScrollWrapper
            component={<HeroNoVideo pageName="contact-us" modal={modal} isMobile={isMobile} fixedHeight={fixedHeight} title="Say Hello" gradientSequence={gradientSequence} />}
            documentScrollPosition={documentScrollPosition}
            viewportDimensions={viewportDimensions}
            requireScreenPosition={true}
            className="scroll-wrapper-contact-hero"
          />
        </div>
      </div>

      <div className="home-main-content-wrapper">

        <ContentWrapper className="content-wrapper-contact-intro">
          <div className="content-wrapper-statement">
            <h2>New Business</h2>
            <hr className="hr hr-contact" />
            <p>Have a project or an idea you'd like to collaborate with ustwo on? Interested in what ustwo can do for you?</p>
            <p>Speak to one of our client business team from the region or studio nearest to you:</p>
          </div>
        </ContentWrapper>

        <ContentWrapper className="content-wrapper-contact-new-business">
          <div className="content-triple-columns">
            {renderRegion(contactContent.ukEurope)}
            {renderRegion(contactContent.americas)}
            {renderRegion(contactContent.asia)}
          </div>
        </ContentWrapper>

        <ContentWrapper className="content-wrapper-contact-more">
          <div className="content-triple-columns">
            <div className="content-triple-column">
              <h5>General Enquiries</h5>
              <p>Feel free to get in touch at <a href="mailto:hello@ustwo.com">hello@ustwo.com</a> with other opportunities, questions or feedback. We're a friendly lot and would love to hear from you.</p>
            </div>
            <div className="content-triple-column">
              <h5>Media Enquiries</h5>
              <p>We're eager to add to conversations around design, development and business. Please reach out to <a href="mailto:press@ustwo.com">press@ustwo.com</a> for media requests, interviews or speaking opportunities.</p>
            </div>
            <div className="content-triple-column">
              <h5>GAMES AND MONUMENT VALLEY ENQUIRIES</h5>
              <p>The ustwo Games studio has their very own website <a href="https://ustwogames.co.uk/">ustwogames.co.uk</a> or you can get in touch with them directly at <a href="mailto:hello@ustwogames.co.uk">hello@ustwogames.co.uk</a>.</p>
            </div>
          </div>
        </ContentWrapper>

        <ContentWrapper className="content-wrapper-contact-jobs">
          <div className="content-wrapper-statement">
            <SVG spritemapID="iconGenius" />
            <h2>Looking for a job?</h2>
            <a href="/join-us" onClick={contactGoToJoin()} className="contact-jobs-button">join us</a>
          </div>
        </ContentWrapper>

        <ContentWrapper className="content-wrapper-contact-find">
          <h2>Find our Studios</h2>
        </ContentWrapper>

        <Footer data={footer} studios={studios} currentPage={currentPage}/>
      </div>
    </article>
  )
}

export default pageContactUs;

const contactContent = {
  ukEurope: {
    title: 'UK & Europe',
    contacts: [{
      studio: 'London',
      name: 'Cameron Day',
      title: 'New Business Partner',
      email: 'hello.london@ustwo.com',
    },{
      studio: 'Malmo',
      name: 'Anders Rörgren',
      title: 'Business Development Lead',
      email: 'hello.europe@ustwo.com',
    }]
  },
  americas: {
    title: 'North America',
    contacts: [{
      studio: 'New York',
      name: 'Justin Pike',
      title: 'Business Development Lead',
      email: 'hello.newyork@ustwo.com',
    },{
      studio: 'Los Angeles',
      name: 'Lee Simpson',
      title: 'BD, TV & Entertainment',
      email: 'hello.losangeles@ustwo.com',
    }]
  },
  asia: {
    title: 'Asia/Pacific',
    contacts: [{
      studio: 'Sydney',
      name: 'Luke Hankinson',
      title: 'Business Development Lead',
      email: 'hello.sydney@ustwo.com',
    },{
      studio: 'Tokyo',
      name: 'Mayu Nakamura',
      title: 'Senior Interaction Designer',
      email: 'hello.tokyo@ustwo.com',
    }]
  }
}
