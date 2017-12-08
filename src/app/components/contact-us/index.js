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
        <p className="contact-contacts-title">{title}</p>
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
            <p>Is there a business problem you are looking to solve? Contact us to find out how we can help <a href="mailto:work@ustwo.com">work@ustwo.com</a> </p>
            <p>You can also contact the new business team from each of our studios directly. Find a rep from the studio near you below and say hi: </p>
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
              <p>Feel free to get in touch at <a href="mailto:hello@ustwo.com">hello@ustwo.com</a> with other opportunities, questions or feedback. We're a curious lot and would love to hear from you.</p>
            </div>
            <div className="content-triple-column">
              <h5>Media Enquiries</h5>
              <p>We're eager to add to conversations around design, development and business. Please reach out to <a href="mailto:press@ustwo.com">press@ustwo.com</a> for media requests, interviews or speaking opportunities.</p>
            </div>
            <div className="content-triple-column">
              <h5>Games Enquiries</h5>
              <p>INSERT COPY</p>
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
          <h2>Find our Studios:</h2>
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
      email: 'londonbd@ustwo.com',
    },{
      studio: 'Malmo',
      name: 'Anders Rörgren',
      title: 'Business Development Lead',
      email: 'malmobd@ustwo.com',
    }]
  },
  americas: {
    title: 'The Americas',
    contacts: [{
      studio: 'New York',
      name: 'Justin Pike',
      title: 'Business Development Lead',
      email: 'newyorkbd@ustwo.com',
    },{
      studio: 'Los Angeles',
      name: 'Lee Simpson',
      title: 'BD, TV & Entertainment',
      email: 'email@ustwo.com',
    }]
  },
  asia: {
    title: 'Asia/Pacific',
    contacts: [{
      studio: 'Sydney',
      name: 'Luke Hankinson',
      title: 'Business Development Lead',
      email: 'sydneybd@ustwo.com',
    },{
      studio: 'Tokyo',
      name: 'Mayu Nakamura',
      title: 'Senior Interaction Designer',
      email: 'email@ustwo.com',
    }]
  }
}
