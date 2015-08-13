import React from 'react';
import get from 'lodash/object/get';

import SingleColumn from '../components/single-column';
import QuoteBlock from '../components/quote-block';
import FullImage from '../components/full-image';

export default (moduleData, colours, getZebra) => {
  let module;
  switch(moduleData.name) {
    case 'header':
      module = <SingleColumn className="intro" title={get(moduleData, 'attr.heading.value')} headingColour={get(colours, 'primary')} ruleColour={get(colours, 'secondary')}
    backgroundColour={get(colours, 'bg')}>{get(moduleData, 'attr.subheading.value')}</SingleColumn>;
      break;
    case 'text':
      module = <SingleColumn title={get(moduleData, 'attr.heading.value')} headingColour={get(colours, 'primary')} ruleColour={get(colours, 'secondary')}
      backgroundColour={!getZebra() && get(colours, 'bg')}>{get(moduleData, 'attr.body.value')}</SingleColumn>;
      break;
    case 'image':
      module = <FullImage photo={get(moduleData, 'attr.image.value.0.sizes.large.url')} />;
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
  }
  return module;
}
