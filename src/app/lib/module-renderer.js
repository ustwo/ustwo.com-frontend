import React from 'react';
import get from 'lodash/object/get';

import SingleColumn from '../components/single-column';
import QuoteBlock from '../components/quote-block';
import Rimage from '../components/rimage';
import Grid from '../components/grid';

export default (moduleData, index, getZebra) => {
  const { colours } = moduleData;
  let module;
  let heading;
  switch(moduleData.name) {
    case 'header':
      heading = get(moduleData, 'attr.heading.value');
      module = <SingleColumn
        key={`module-header-${heading}-${index}`}
        className="intro"
        title={heading}
        headingColour={get(colours, 'primary')}
        ruleColour={get(colours, 'secondary')}
        backgroundColour={get(colours, 'bg')}
        isInZebraList={!!getZebra}
      >
        {get(moduleData, 'attr.subheading.value')}
      </SingleColumn>;
      break;
    case 'text':
      heading = get(moduleData, 'attr.heading.value');
      module = <SingleColumn
        key={`module-text-${heading}-${index}`}
        title={heading}
        headingColour={get(colours, 'primary')}
        ruleColour={get(colours, 'secondary')}
        backgroundColour={getZebra && !getZebra() && get(colours, 'bg')}
        isInZebraList={!!getZebra}
      >
        {get(moduleData, 'attr.body.value')}
      </SingleColumn>;
      break;
    case 'image':
      const image = get(moduleData, 'attr.image.value.0');
      module = <Rimage
        key={`module-image-${get(image, 'id')}-${index}`}
        sizes={get(image, 'sizes')}
        altText={get(image, 'alt')}
      />;
      break;
    case 'blockquote':
      module = <QuoteBlock
        key={`module-quote-${index}`}
        source={get(moduleData, 'attr.source.value')}
        backgroundColour={get(colours, 'primary')}
      >
        {get(moduleData, 'attr.text.value')}
      </QuoteBlock>;
      break;
    case 'grid':
      module = <Grid
        key={`module-grid-${index}`}
        cells={get(moduleData, 'attr.grid_cells.value')}
        video={get(moduleData, 'attr.grid_video.value')}
        images={get(moduleData, 'attr.grid_image.value.0.sizes')}
      />;
      break;
  }
  return module;
}
