import React from 'react';
import Footer from 'app/components/footer';
import HeroNoVideo from 'app/components/hero-no-video';
import ScrollWrapper from 'app/components/scroll-wrapper';
import ContactBlock from 'app/components/contact-block';
import ContentWrapper from 'app/components/content-wrapper';
import GradientWords from 'app/components/gradient-words';
import kebabCase from 'lodash/string/kebabCase';

function renderNewBusinessContacts() {
  const items = contactContent.newBusiness.map(item => {
    const { studio, name, title, email } = item;

    return (
      <li>
        <h4 className="contact-new-business-studio"><GradientWords word={studio} color={kebabCase(studio)} /></h4>
        <h5 className="contact-new-business-name">{name}</h5>
        <p className="contact-new-business-title">{title}</p>
        <p className="contact-new-business-email"><a href={`mailto:${email}`}>{email}</a></p>
      </li>
    );
  });

  return (
    <ul className="contact-new-business-contacts">
      {items}
    </ul>
  )
}

function pageContact({ page, currentParams, studios, currentPage, footer, modal, isMobile, fixedHeight, documentScrollPosition, viewportDimensions }) {
  return (
    <article className="page-contact">
      <div className="home-pinned-header-wrapper">
        <div className="home-pinned-header-inner">
          <ScrollWrapper
            component={<HeroNoVideo pageName="contact" modal={modal} isMobile={isMobile} fixedHeight={fixedHeight} title="Say Hello" />}
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
          {renderNewBusinessContacts()}
        </ContentWrapper>

        <ContentWrapper className="content-wrapper-contact-more">
          <div className="content-wrapper-single-column">
            <h4>Media Enquiries</h4>
            <p>We're eager to add to conversations around design, development and business. Please reach out to press@ustwo.com for media requests, interviews or speaking opportunities.</p>
            <h4>Jobs</h4>
            <p>You can find our latest job openings from across our studios on our join us page. </p>
            <h4>General Enquiries</h4>
            <p>Feel free to get in touch at <a href="mailto:hello@ustwo.com">hello@ustwo.com</a> with other opportunities, questions or feedback. We're a curious lot and would love to hear from you.</p>
          </div>
        </ContentWrapper>

        <ScrollWrapper
          component={<ContactBlock />}
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

export default pageContact;

const contactContent = {
  newBusiness: [{
    studio: 'London',
    name: 'Cameron Day',
    title: 'New Business Partner',
    email: 'cameron@ustwo.com',
  },{
    studio: 'Malmo',
    name: 'Anders Rörgren',
    title: 'Business Development Lead',
    email: 'gottfrid@ustwo.com',
  },{
    studio: 'New York',
    name: 'Justin Pike',
    title: 'Business Development Lead',
    email: 'justin@ustwo.com',
  },{
    studio: 'Sydney',
    name: 'Luke',
    title: 'Business Development Lead',
    email: 'luke@ustwo.com',
  }]
}
