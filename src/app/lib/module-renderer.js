import React from 'react';
import { get } from 'lodash';

import SingleColumn from 'app/components/single-column';
import QuoteBlock from 'app/components/quote-block';
import Rimage from 'app/components/rimage';
import Grid from 'app/components/grid';
import Video from 'app/components/video';
import CodeHighlighter from 'app/components/code-highlighter';

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
  const { colours, zebra, categories } = options;
  const heading = get(moduleData, 'attr.heading.value');
  const category = categories ? categories[0].name : null
  return <SingleColumn
    key={`module-header-${heading}-${index}`}
    className='intro'
    title={heading}
    headingType='h1'
    headingColour={get(colours, 'primary')}
    ruleColour={get(colours, 'primary')}
    backgroundColour={getBackgroundColour(options)}
    isInZebraList={zebra}
    category={category}
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
    ruleColour={get(colours, 'primary')}
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
  const videoId = get(moduleData, 'attr.video_id.value');
  const videoFrom = get(moduleData, 'attr.video_from.value');
  const baseURL = videoFrom === 'youtube' ? "https://www.youtube.com/embed/" : "https://player.vimeo.com/video/";

  return (
    <div className="video">
      <iframe
        src={baseURL + videoId}
        width="1280"
        height="720"
        frameBorder="0"
        title="Video"
        allowFullScreen>
      </iframe>
    </div>
  );
}

function renderCode(moduleData, index, options) {
    return <CodeHighlighter code={get(moduleData, 'attr.body.value')} key={`logitem-${index}-${Date.now()}`} />
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
    video: renderVideo,
    code: renderCode
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
