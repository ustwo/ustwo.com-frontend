import React from 'react';
import GradientWords from '../gradient-words';
import PaperPlane from 'app/components/paper-plane';
import GradientBackgroundSequence from 'app/components/gradient-background-sequence';
import Flux from 'app/flux';
import classnames from 'classnames';

function contactBlockOnClick() {
  return (e) => {
    e.preventDefault();
    Flux.navigate('/contact-us');
  }
}

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
      sectionTitle: 'Get in touch',
      title: 'WE’D LOVE TO HEAR FROM YOU',
      email: "hello@ustwo.com",
      link: true
    }
  } else if (page === 'work') {
    content = {
      sectionTitle: 'WANT TO LEARN MORE?',
      title: 'WE’D LOVE TO HEAR FROM YOU',
      link: true
    }
  } else if (page === 'home') {
    content = {
      sectionTitle: 'Get in touch',
      title: 'WE’D LOVE TO HEAR FROM YOU',
      email: "hello@ustwo.com",
      link: true
    }
  } else if (page === 'blog') {
    content = {
      sectionTitle: 'Got something in mind?',
      title: 'WE’D LOVE TO HEAR FROM YOU',
      link: true
    }
  } else if (page === 'about-us') {
    content = {
      sectionTitle: 'KEEN TO JUMP IN?',
      title: 'WE’D LOVE TO HEAR FROM YOU',
      link: true
    }
  } else {
    content = {
      sectionTitle: 'Make change happen',
      title: 'WE’D LOVE TO HEAR FROM YOU',
      email: 'hello@ustwo.com'
    }
  }

  const classes = classnames('contact-block', {
    'contact-block-link': content.link
  })

  return (
    <div className={classes} onClick={content.link ? contactBlockOnClick() : null}>
      <div className="home-text-block">
        <div className="section-title">{content.sectionTitle}</div>
        <h2>
          {content.title}<br />
          <span className="contact-block-email">
            <GradientWords word={content.email} color={page} />
          </span>
        </h2>
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
