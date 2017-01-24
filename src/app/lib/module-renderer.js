import React from 'react';
import get from 'lodash/object/get';

import SingleColumn from 'app/components/single-column';
import QuoteBlock from 'app/components/quote-block';
import Rimage from 'app/components/rimage';
import Grid from 'app/components/grid';
import Video from 'app/components/video';

function getBackgroundColour(options) {
  const { colours, zebra, getStripe } = options;
  let backgroundColour;
  if (zebra) {
    backgroundColour = getStripe() ? get(colours, 'bg') : '';
  } else {
    backgroundColour = get(colours, 'bg');
  }
  return backgroundColour;
}

function renderHeader(moduleData, index, options) {
  const { colours, zebra } = options;
  const heading = get(moduleData, 'attr.heading.value');
  return <SingleColumn
    key={`module-header-${heading}-${index}`}
    className='intro'
    title={heading}
    headingType='h1'
    headingColour={get(colours, 'primary')}
    ruleColour={get(colours, 'secondary')}
    backgroundColour={getBackgroundColour(options)}
    isInZebraList={zebra}
  >
    {get(moduleData, 'attr.subheading.value')}
  </SingleColumn>;
}

function renderText(moduleData, index, options) {
  const { colours, zebra } = options;
  const heading = get(moduleData, 'attr.heading.value');
  return <SingleColumn
    key={`module-text-${heading}-${index}`}
    title={heading}
    headingColour={get(colours, 'primary')}
    ruleColour={get(colours, 'secondary')}
    backgroundColour={getBackgroundColour(options)}
    isInZebraList={zebra}
  >
    {get(moduleData, 'attr.body.value')}
  </SingleColumn>;
}

function renderImage(moduleData, index, options) {
  const image = get(moduleData, 'attr.image.value.0');
  return <Rimage
    key={`module-image-${get(image, 'id')}-${index}`}
    sizes={get(image, 'sizes')}
    altText={get(image, 'alt')}
  />;
}

function renderBlockquote(moduleData, index, options) {
  const { colours } = options;
  return <QuoteBlock
    key={`module-quote-${index}`}
    source={get(moduleData, 'attr.source.value')}
    backgroundColour={get(colours, 'secondary')}
  >
    {get(moduleData, 'attr.text.value')}
  </QuoteBlock>;
}

function renderGrid(moduleData, index, options) {
  return <Grid
    key={`module-grid-${index}`}
    cells={get(moduleData, 'attr.grid_cells.value')}
    video={get(moduleData, 'attr.grid_video.value')}
    images={get(moduleData, 'attr.grid_image.value.0.sizes')}
  />;
}

function renderPlaceholder(moduleData, index, options) {
  const { placeholderContents } = options;
  const placeholderType = moduleData.attr.keyword.value;
  const contentRenderer = placeholderContents[placeholderType];

  if (contentRenderer) {
    return contentRenderer();
  }
}

function renderVideo(moduleData, index, options) {
  return  <Video
    videoId={get(moduleData, 'attr.video_id.value')}
    videoFrom={get(moduleData, 'attr.video_from.value')}
  />;
}

function renderModules(options) {
  const { modules, zebra } = options;

  const renderMethodMap = {
    header: renderHeader,
    text: renderText,
    image: renderImage,
    blockquote: renderBlockquote,
    grid: renderGrid,
    placeholder: renderPlaceholder,
    video: renderVideo
  };

  let isStripe;

  if (zebra) {
    isStripe = true;
    options = Object.assign(options, {
      getStripe() {
        const stripeValue = isStripe;
        isStripe = !isStripe;
        return stripeValue;
      }
    });
  }

  return modules
    .map((moduleData, index) => {
      const renderMethod = renderMethodMap[moduleData.name];
      return renderMethod && renderMethod(moduleData, index, options);
    });
}

export default renderModules;
