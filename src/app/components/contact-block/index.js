import React from 'react';
import GradientWords from '../gradient-words';
import PaperPlane from 'app/components/paper-plane';
import GradientBackgroundSequence from 'app/components/gradient-background-sequence';

function ContactBlock({ page, screenPosition }) {

  let content;
  if (page === 'auto') {
    content = {
      sectionTitle: 'Make something awesome',
      title: 'Get in touch ',
      email: 'mobility@ustwo.com'
    }
  } else if (page === 'join-us') {
    content = {
      sectionTitle: 'Make change happen',
      title: 'Talk to ustwo ',
      email: 'careers@ustwo.com'
    }
  } else if (page === 'work') {
    content = {
      sectionTitle: 'Make change happen',
      title: 'Talk to ustwo ',
      email: 'work@ustwo.com'
    }
  } else {
    content = {
      sectionTitle: 'Make change happen',
      title: 'Talk to ustwo ',
      email: 'hello@ustwo.com'
    }
  }

  return (
    <div className="contact-block">
      <div className="home-text-block">
        <div className="section-title">{content.sectionTitle}</div>
        <h2>{content.title}<br /><span className="contact-block-email"><GradientWords word={content.email} color={page} /></span></h2>
        <div className="contact-block-image">
          <GradientBackgroundSequence
            tickerFrequency={200}
            timerTotal={8000}
            topColours={['#6114CC', '#009CF3', '#FA7D78', '#6114CC']}
            bottomColours={['#FA7D78', '#A5FAAF', '#FFBF02', '#FA7D78']}
          />
          <div className="contact-block-image-sky" />
          <div className="contact-block-image-buildings" />
          <PaperPlane screenPosition={screenPosition} />
        </div>
      </div>
    </div>
  );
}

export default ContactBlock;
