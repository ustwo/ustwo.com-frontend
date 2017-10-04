import React from 'react';
import Flux from 'app/flux';

function FeaturedCaseStudy({ content }) {
  const { colours, image, imageAlt, title, excerpt, slug, linkText, latest, imageBackground, additionalImage, className } = content;

  let styles, inlineImage;
  if (colours) {
    if (colours.length > 1) {
      styles = {
        backgroundImage: `linear-gradient(212deg, ${colours[0]}, ${colours[1]})`
      }
    } else {
      styles = {
        backgroundColor: colours
      }
    }
  }
  if (imageBackground) {
    styles = {
      background: `url(${image}) no-repeat left 50%`,
      backgroundSize: `cover`
    }
  } else {
    inlineImage = (<img src={image} alt={imageAlt} />);
  }
  if (additionalImage) {
    inlineImage = (<img src={additionalImage} alt={imageAlt} />);
  }

  let renderLink;
  if (linkText && slug) {
    renderLink = <button onClick={Flux.override(slug)}>{linkText}</button>;
  }

  return (
    <div className={`featured-case-study ${className}`} style={styles}>
      <div className="featured-case-study-inner">
        <div className="featured-case-study-image">
          {inlineImage}
        </div>
        <div className="featured-case-study-content">
          <div className="section-title">{latest ? 'Latest' : 'Featured Work'}</div>
          <h2 className="title">{title}</h2>
          <p>{excerpt}</p>
          {renderLink}
        </div>
      </div>
    </div>
  );
}

export default FeaturedCaseStudy;
