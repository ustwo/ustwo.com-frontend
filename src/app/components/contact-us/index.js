import React from 'react';
import Footer from 'app/components/footer';
import HeroNoVideo from 'app/components/hero-no-video';
import ScrollWrapper from 'app/components/scroll-wrapper';
import ContactBlock from 'app/components/contact-block';
import ContentWrapper from 'app/components/content-wrapper';
import GradientWords from 'app/components/gradient-words';
import kebabCase from 'lodash/string/kebabCase';
import Flux from 'app/flux';

function renderContacts(contacts) {
  const items = contacts.map(item => {
    const { studio, name, title, email } = item;

    return (
      <li>
        <h4 className="contact-contacts-studio"><GradientWords word={studio} color={kebabCase(studio)} /></h4>
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

function contactGoToJoin() {
  return (e) => {
    e.preventDefault();
    Flux.navigate('/join-us');
  }
}

function pageContactUs({ page, currentParams, studios, currentPage, footer, modal, isMobile, fixedHeight, documentScrollPosition, viewportDimensions }) {
  return (
    <article className="page-contact-us">
      <div className="home-pinned-header-wrapper">
        <div className="home-pinned-header-inner">
          <ScrollWrapper
            component={<HeroNoVideo pageName="contact-us" modal={modal} isMobile={isMobile} fixedHeight={fixedHeight} title="Say Hello" />}
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
          {renderContacts(contactContent.newBusiness)}
          <div className="content-wrapper-statement content-wrapper-presence">
            <p>We also have a presence in:</p>
          </div>
          {renderContacts(contactContent.morePresence)}
        </ContentWrapper>

        <ContentWrapper className="content-wrapper-contact-more">
          <div className="content-wrapper-statement">
            <h2>Other Contacts</h2>
            <hr className="hr hr-contact" />
            <h5>Media Enquiries</h5>
            <p>We're eager to add to conversations around design, development and business. Please reach out to <a href="mailto:press@ustwo.com">press@ustwo.com</a> for media requests, interviews or speaking opportunities.</p>
            <h5>General Enquiries</h5>
            <p>Feel free to get in touch at <a href="mailto:hello@ustwo.com">hello@ustwo.com</a> with other opportunities, questions or feedback. We're a curious lot and would love to hear from you.</p>
          </div>
        </ContentWrapper>

        <ContentWrapper className="content-wrapper-contact-jobs">
          <div className="content-wrapper-statement">
            <h2>Looking for a job?</h2>
            <hr className="hr hr-contact" />
            <p>You can find our latest job openings from across our studios on our <a href="/join-us" onClick={contactGoToJoin()}>join us</a> page. </p>
          </div>
        </ContentWrapper>

        <ScrollWrapper
          component={<ContactBlock page={page ? page.slug : 'home'} />}
          documentScrollPosition={documentScrollPosition}
          viewportDimensions={viewportDimensions}
          requireScreenPosition={true}
          className="scroll-wrapper-contact-block"
        />
        <Footer data={footer} studios={studios} currentPage={currentPage}/>
      </div>
    </article>
  )
}

export default pageContactUs;

const contactContent = {
  newBusiness: [{
    studio: 'London',
    name: 'Cameron Day',
    title: 'New Business Partner',
    email: 'londonbd@ustwo.com',
  },{
    studio: 'Malmo',
    name: 'Anders Rörgren',
    title: 'Business Development Lead',
    email: 'malmobd@ustwo.com',
  },{
    studio: 'New York',
    name: 'Justin Pike',
    title: 'Business Development Lead',
    email: 'newyorkbd@ustwo.com',
  },{
    studio: 'Sydney',
    name: 'Luke Hankinson',
    title: 'Business Development Lead',
    email: 'sydneybd@ustwo.com',
  }],
  morePresence: [{
    studio: 'Los Angeles',
    name: 'Lee Simpson',
    title: 'BD, TV & Entertainment',
    email: 'email@ustwo.com',
  },{
    studio: 'Tokyo',
    name: 'Mayu Nakamura',
    title: 'Senior Interaction Designer',
    email: 'email@ustwo.com',
  }]
}
