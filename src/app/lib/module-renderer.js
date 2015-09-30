import React from 'react';
import get from 'lodash/object/get';

import SingleColumn from '../components/single-column';
import QuoteBlock from '../components/quote-block';
import FullImage from '../components/full-image';
import Grid from '../components/grid';

export default (moduleData, colours, getZebra) => {
  let module;
  switch(moduleData.name) {
    case 'header':
      module = <SingleColumn key={`module-header-${get(moduleData, 'attr.heading.value')}`} className="intro" title={get(moduleData, 'attr.heading.value')} headingColour={get(colours, 'primary')} ruleColour={get(colours, 'secondary')} backgroundColour={get(colours, 'bg')}>{get(moduleData, 'attr.subheading.value')}</SingleColumn>;
      break;
    case 'text':
      module = <SingleColumn key={`module-text-${get(moduleData, 'attr.heading.value')}`} title={get(moduleData, 'attr.heading.value')} headingColour={get(colours, 'primary')} ruleColour={get(colours, 'secondary')} backgroundColour={!getZebra() && get(colours, 'bg')}>{get(moduleData, 'attr.body.value')}</SingleColumn>;
      break;
    case 'image':
      module = <FullImage key={`module-image-${get(moduleData, 'attr.image.value.0.id')}`} sizes={get(moduleData, 'attr.image.value.0.sizes')} />;
      break;
    case 'blockquote':
      module = (
        <QuoteBlock
            source={get(moduleData, 'attr.source.value')}
            backgroundColour={get(colours, 'primary')}
          >
            {get(moduleData, 'attr.text.value')}
        </QuoteBlock>
      )
      break;
    case 'grid':
      module = <Grid
        key='module-grid'
        cells={get(moduleData, 'attr.grid_cells.value')}
        video={get(moduleData, 'attr.grid_video.value')}
        images={get(moduleData, 'attr.grid_image.value.0.sizes')}
      />;
      break;
  }
  return module;
}
