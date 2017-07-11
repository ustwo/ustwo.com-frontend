import React from 'react';
import Flux from 'app/flux';

function FeaturedCaseStudy({ content }) {
  const { colours, image, imageAlt, title, excerpt, linkURI, linkText, latest } = content;

  let styles;
  if (colours.length > 1) {
    styles = {
      backgroundImage: `linear-gradient(212deg, ${colours[0]}, ${colours[1]})`
    }
  } else {
    styles = {
      backgroundColor: colours[0]
    }
  }

  return (
    <div className="featured-case-study" style={styles}>
      <div className="featured-case-study-inner">
        <div className="featured-case-study-image">
          <img src={image} alt={imageAlt} />
        </div>
        <div className="featured-case-study-content">
          <div className="section-title">{latest ? 'Latest' : 'Featured Work'}</div>
          <h2 className="title">{title}</h2>
          <p>{excerpt}</p>
          <button onClick={Flux.override(linkURI)}>{linkText ? linkText : 'View Case Study'}</button>
        </div>
      </div>
    </div>
  );
}

export default FeaturedCaseStudy;
