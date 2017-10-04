import React from 'react';
import classnames from 'classnames';
import Flux from 'app/flux';

export default function({ data, alignright }) {
  const classes = classnames('article-preview', {
    'article-preview-align-right': alignright
  });

  return (
    <div className={classes}>
      <div className="article-preview-image">
        <img src={data.image} alt={`Image of ${data.title}`} />
      </div>
      <div className="article-preview-info">
        <h2>{data.title}</h2>
        {data.subtitle ? <h3>{data.subtitle}</h3> : null}
        {data.author ? <div className="section-title">{data.author}</div> : null}
        <p>{data.excerpt}</p>
        <a href={data.uri} onClick={Flux.override(data.uri)} className="article-preview-button">
          Read Article
        </a>
      </div>
    </div>
  );
}
