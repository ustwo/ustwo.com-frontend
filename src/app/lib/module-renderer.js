import React from 'react';
import get from 'lodash/object/get';

import SingleColumn from '../components/single-column';
import QuoteBlock from '../components/quote-block';
import Rimage from '../components/rimage';
import Grid from '../components/grid';

function getBackgroundColour(moduleData) {
  const { colours, zebra, isStripe } = moduleData;
  let backgroundColour;
  if (zebra) {
    backgroundColour = isStripe() ? get(colours, 'bg') : '';
  } else {
    backgroundColour = get(colours, 'bg');
  }
  return backgroundColour;
}

function renderHeader(moduleData, index) {
  const { colours, zebra } = moduleData;
  const heading = get(moduleData, 'attr.heading.value');
  return <SingleColumn
    key={`module-header-${heading}-${index}`}
    className='intro'
    title={heading}
    headingColour={get(colours, 'primary')}
    ruleColour={get(colours, 'secondary')}
    backgroundColour={getBackgroundColour(moduleData)}
    isInZebraList={zebra}
  >
    {get(moduleData, 'attr.subheading.value')}
  </SingleColumn>;
}

function renderText(moduleData, index) {
  const { colours, zebra } = moduleData;
  const heading = get(moduleData, 'attr.heading.value');
  return <SingleColumn
    key={`module-text-${heading}-${index}`}
    title={heading}
    headingColour={get(colours, 'primary')}
    ruleColour={get(colours, 'secondary')}
    backgroundColour={getBackgroundColour(moduleData)}
    isInZebraList={zebra}
  >
    {get(moduleData, 'attr.body.value')}
  </SingleColumn>;
}

function renderImage(moduleData, index) {
  const image = get(moduleData, 'attr.image.value.0');
  return <Rimage
    key={`module-image-${get(image, 'id')}-${index}`}
    sizes={get(image, 'sizes')}
    altText={get(image, 'alt')}
  />;
}

function renderBlockquote(moduleData, index) {
  const { colours } = moduleData;
  return <QuoteBlock
    key={`module-quote-${index}`}
    source={get(moduleData, 'attr.source.value')}
    backgroundColour={get(colours, 'secondary')}
  >
    {get(moduleData, 'attr.text.value')}
  </QuoteBlock>;
}

function renderGrid(moduleData, index) {
  return <Grid
    key={`module-grid-${index}`}
    cells={get(moduleData, 'attr.grid_cells.value')}
    video={get(moduleData, 'attr.grid_video.value')}
    images={get(moduleData, 'attr.grid_image.value.0.sizes')}
  />;
}

function renderModules(options) {
  const { modules, colours, zebra } = options;
  let isStripe;

  if (zebra) {
    isStripe = true;
  }

  function getStripe() {
    const stripeValue = isStripe;
    isStripe = !isStripe;
    return stripeValue;
  }

  return modules
    .map(moduleData => {
      return Object.assign(moduleData, {
        colours: colours,
        zebra: zebra,
        isStripe: getStripe
      });
    })
    .map((moduleData, index) => {
      const renderMethod = {
        header: renderHeader,
        text: renderText,
        image: renderImage,
        blockquote: renderBlockquote,
        grid: renderGrid
      }[moduleData.name];
      return renderMethod && renderMethod(moduleData, index);
    });
}

export default renderModules;
