import React from 'react';
import { get } from 'lodash';
import Rimage from 'app/components/rimage';
import getFeaturedImage from 'app/lib/get-featured-image';
import kebabCase from 'lodash/string/kebabCase';

function StudioBlock({ studio, align }) {
  const studioRecruitmentDescription = get(studio, 'recruitment-desc');
  const image = getFeaturedImage(studio);
  const name = kebabCase(studio.name);
  const classes = `studio-block studio-${name} studio-block-${align}`

  return (
    <div className={classes}>
      <div className="studio-block-info">
        <h3>{get(studio, 'recruitment-title')}</h3>
        <p className="studio-block-blurb" dangerouslySetInnerHTML={{__html: studioRecruitmentDescription}}></p>
      </div>
      <Rimage
        className="studio-block-photo"
        wrap="div"
        sizes={get(image, 'media_details.sizes')}
        altText={get(image, 'alt_text')}
      />
    </div>
  )
}

export default StudioBlock;
