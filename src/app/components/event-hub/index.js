'use strict';

import React from 'react';
import find from 'lodash/collection/find';
import get from 'lodash/object/get';
import map from 'lodash/collection/map';
import filter from 'lodash/collection/filter';
import pluck from 'lodash/collection/pluck';
import includes from 'lodash/collection/includes';
import kebabCase from 'lodash/string/kebabCase';
import spannify from 'app/lib/spannify';

import Navigation from 'app/components/navigation';
import Hero from 'app/components/hero';
import EventHubEventListItem from 'app/components/event-hub-event-list-item';
import Flux from 'app/flux';

const PageEventHub = React.createClass({
  getDummyEvents() {
    const events = [
    {
      id: 1,
      date: "2016-02-02T14:33:52",
      title: "WAR STORIES: INTRODUCING AGILE INTO BIG BUSINESS",
      excerpt: "Is Agile truly the best way to develop great digital products? Beyond the jargon and dogma, the startup lore and hype, we explore how today’s digital products that matter are being developed. What can we learn from when Agile was the right choice or even the wrong choice.",
      slug: "war-stories-introducing-agile-into-big-business",
      location: {
        city: "Sydney"
      },
      "_embedded": {
        "wp:attachment": [
              {
              "id": 8962,
              "date": "2015-09-14T15:15:46",
              "slug": "featured-image",
              "type": "attachment",
              "link": "https://wp-staging.ustwo.com/blog/texting-and-driving-washington-uni/featured-image/",
              "title": {
                "rendered": "driving simulator"
              },
              "author": 4,
              "alt_text": "driving simulator",
              "media_type": "image",
              "source_url": "https://usweb-cdn.ustwo.com/ustwo-production/uploads/2015/05/ustwo_thinks1.jpg",
              "media_details": {
                "width": 3456,
                "height": 2304,
                "file": "2012/09/featured-image.jpg",
                "sizes": {
                  "thumbnail": {
                    "file": "featured-image-300x300.jpg",
                    "width": 300,
                    "height": 300,
                    "mime-type": "image/jpeg",
                    "source_url": "https://usweb-cdn.ustwo.com/ustwo-production/uploads/2015/09/F2B9159-300x300.jpg"
                  },
                  "medium": {
                    "file": "featured-image-1024x683.jpg",
                    "width": 1024,
                    "height": 683,
                    "mime-type": "image/jpeg",
                    "source_url": "https://usweb-cdn.ustwo.com/ustwo-production/uploads/2015/09/F2B9159-1800x1200.jpg"
                  },
                  "large": {
                    "file": "featured-image-1800x1200.jpg",
                    "width": 1800,
                    "height": 1200,
                    "mime-type": "image/jpeg",
                    "source_url": "https://usweb-cdn.ustwo.com/ustwo-production/uploads/2015/09/F2B9159-1800x1200.jpg"
                  },
                  "small": {
                    "file": "featured-image-640x427.jpg",
                    "width": 640,
                    "height": 427,
                    "mime-type": "image/jpeg",
                    "source_url": "https://usweb-cdn.ustwo.com/ustwo-production/uploads/2015/09/F2B9159-640x427.jpg"
                  },
                  "small_crop": {
                    "file": "featured-image-640x480.jpg",
                    "width": 640,
                    "height": 480,
                    "mime-type": "image/jpeg",
                    "source_url": "https://usweb-cdn.ustwo.com/ustwo-production/uploads/2015/09/F2B9159-640x480.jpg"
                  },
                  "medium_crop": {
                    "file": "featured-image-1024x768.jpg",
                    "width": 1024,
                    "height": 768,
                    "mime-type": "image/jpeg",
                    "source_url": "https://usweb-cdn.ustwo.com/ustwo-production/uploads/2015/09/F2B9159-1024x768.jpg"
                  },
                  "large_crop": {
                    "file": "featured-image-1800x1200.jpg",
                    "width": 1800,
                    "height": 1200,
                    "mime-type": "image/jpeg",
                    "source_url": "https://usweb-cdn.ustwo.com/ustwo-production/uploads/2015/09/F2B9159-1800x1200.jpg"
                  }
                },
                "image_meta": {
                  "aperture": 0,
                  "credit": "",
                  "camera": "",
                  "caption": "",
                  "created_timestamp": 0,
                  "copyright": "",
                  "focal_length": 0,
                  "iso": 0,
                  "shutter_speed": 0,
                  "title": "",
                  "orientation": 0
                }
              }
            }
        ]
      }
    },{
      id: 2,
      date: "2016-03-11T14:33:52",
      title: "Why Products Fail",
      excerpt: "Test Excerpt 2",
      slug: "why-product-fails",
      location: {
        city: "Sydney"
      },
      "_embedded": {
        "wp:attachment": [
              {
              "id": 8962,
              "date": "2015-09-14T15:15:46",
              "slug": "featured-image",
              "type": "attachment",
              "link": "https://wp-staging.ustwo.com/blog/texting-and-driving-washington-uni/featured-image/",
              "title": {
                "rendered": "driving simulator"
              },
              "author": 4,
              "alt_text": "driving simulator",
              "media_type": "image",
              "source_url": "https://usweb-cdn.ustwo.com/ustwo-production/uploads/2012/09/featured-image.jpg",
              "media_details": {
                "width": 3456,
                "height": 2304,
                "file": "2012/09/featured-image.jpg",
                "sizes": {
                  "thumbnail": {
                    "file": "featured-image-300x300.jpg",
                    "width": 300,
                    "height": 300,
                    "mime-type": "image/jpeg",
                    "source_url": "https://usweb-cdn.ustwo.com/ustwo-production/uploads/2012/09/featured-image-300x300.jpg"
                  },
                  "medium": {
                    "file": "featured-image-1024x683.jpg",
                    "width": 1024,
                    "height": 683,
                    "mime-type": "image/jpeg",
                    "source_url": "https://usweb-cdn.ustwo.com/ustwo-production/uploads/2012/09/featured-image-1024x683.jpg"
                  },
                  "large": {
                    "file": "featured-image-1800x1200.jpg",
                    "width": 1800,
                    "height": 1200,
                    "mime-type": "image/jpeg",
                    "source_url": "https://usweb-cdn.ustwo.com/ustwo-production/uploads/2012/09/featured-image-1800x1200.jpg"
                  },
                  "small": {
                    "file": "featured-image-640x427.jpg",
                    "width": 640,
                    "height": 427,
                    "mime-type": "image/jpeg",
                    "source_url": "https://usweb-cdn.ustwo.com/ustwo-production/uploads/2012/09/featured-image-640x427.jpg"
                  },
                  "small_crop": {
                    "file": "featured-image-640x480.jpg",
                    "width": 640,
                    "height": 480,
                    "mime-type": "image/jpeg",
                    "source_url": "https://usweb-cdn.ustwo.com/ustwo-production/uploads/2012/09/featured-image-640x480.jpg"
                  },
                  "medium_crop": {
                    "file": "featured-image-1024x768.jpg",
                    "width": 1024,
                    "height": 768,
                    "mime-type": "image/jpeg",
                    "source_url": "https://usweb-cdn.ustwo.com/ustwo-production/uploads/2012/09/featured-image-1024x768.jpg"
                  },
                  "large_crop": {
                    "file": "featured-image-1800x1200.jpg",
                    "width": 1800,
                    "height": 1200,
                    "mime-type": "image/jpeg",
                    "source_url": "https://usweb-cdn.ustwo.com/ustwo-production/uploads/2012/09/featured-image-1800x1200.jpg"
                  }
                },
                "image_meta": {
                  "aperture": 0,
                  "credit": "",
                  "camera": "",
                  "caption": "",
                  "created_timestamp": 0,
                  "copyright": "",
                  "focal_length": 0,
                  "iso": 0,
                  "shutter_speed": 0,
                  "title": "",
                  "orientation": 0
                }
              }
            }
        ]
      }
    },{
      id: 3,
      date: "2016-07-08T14:33:52",
      title: "CoderDojo",
      excerpt: "Test Excerpt 2",
      slug: "event-3",
      location: {
        city: "Sydney"
      },
      "_embedded": {
        "wp:attachment": [
              {
              "id": 8962,
              "date": "2015-09-14T15:15:46",
              "slug": "featured-image",
              "type": "attachment",
              "link": "https://wp-staging.ustwo.com/blog/texting-and-driving-washington-uni/featured-image/",
              "title": {
                "rendered": "driving simulator"
              },
              "author": 4,
              "alt_text": "driving simulator",
              "media_type": "image",
              "source_url": "https://usweb-cdn.ustwo.com/ustwo-production/uploads/2015/09/F2B9159.jpg",
              "media_details": {
                "width": 3456,
                "height": 2304,
                "file": "2012/09/featured-image.jpg",
                "sizes": {
                  "thumbnail": {
                    "file": "featured-image-300x300.jpg",
                    "width": 300,
                    "height": 300,
                    "mime-type": "image/jpeg",
                    "source_url": "https://usweb-cdn.ustwo.com/ustwo-production/uploads/2015/09/F2B9159-300x300.jpg"
                  },
                  "medium": {
                    "file": "featured-image-1024x683.jpg",
                    "width": 1024,
                    "height": 683,
                    "mime-type": "image/jpeg",
                    "source_url": "https://usweb-cdn.ustwo.com/ustwo-production/uploads/2015/09/F2B9159-1800x1200.jpg"
                  },
                  "large": {
                    "file": "featured-image-1800x1200.jpg",
                    "width": 1800,
                    "height": 1200,
                    "mime-type": "image/jpeg",
                    "source_url": "https://usweb-cdn.ustwo.com/ustwo-production/uploads/2015/09/F2B9159-1800x1200.jpg"
                  },
                  "small": {
                    "file": "featured-image-640x427.jpg",
                    "width": 640,
                    "height": 427,
                    "mime-type": "image/jpeg",
                    "source_url": "https://usweb-cdn.ustwo.com/ustwo-production/uploads/2015/09/F2B9159-640x427.jpg"
                  },
                  "small_crop": {
                    "file": "featured-image-640x480.jpg",
                    "width": 640,
                    "height": 480,
                    "mime-type": "image/jpeg",
                    "source_url": "https://usweb-cdn.ustwo.com/ustwo-production/uploads/2015/09/F2B9159-640x480.jpg"
                  },
                  "medium_crop": {
                    "file": "featured-image-1024x768.jpg",
                    "width": 1024,
                    "height": 768,
                    "mime-type": "image/jpeg",
                    "source_url": "https://usweb-cdn.ustwo.com/ustwo-production/uploads/2015/09/F2B9159-1024x768.jpg"
                  },
                  "large_crop": {
                    "file": "featured-image-1800x1200.jpg",
                    "width": 1800,
                    "height": 1200,
                    "mime-type": "image/jpeg",
                    "source_url": "https://usweb-cdn.ustwo.com/ustwo-production/uploads/2015/09/F2B9159-1800x1200.jpg"
                  }
                },
                "image_meta": {
                  "aperture": 0,
                  "credit": "",
                  "camera": "",
                  "caption": "",
                  "created_timestamp": 0,
                  "copyright": "",
                  "focal_length": 0,
                  "iso": 0,
                  "shutter_speed": 0,
                  "title": "",
                  "orientation": 0
                }
              }
            }
        ]
      }
    }];
    return events;
  },
  getSelectedStudio(studioSlugFromUrl, studioSlugs) {
    let selected = 'all-studios';
    if(includes(studioSlugs, studioSlugFromUrl)) {
      selected = studioSlugFromUrl;
    }
    return selected;
  },
  getStudios() {
    return [{
      name: 'All studios'
    }].concat(this.props.studios);
  },
  renderStudioTabs(selectedStudioSlug) {
    return map(this.getStudios(), studio => {
      const studioSlug = kebabCase(studio.name);
      const studioName = spannify(studio.name);
      const uri = this.generateStudioUri(studioSlug);
      return <li
        key={`tab-${studioSlug}`}
        className={studioSlug}
        aria-selected={studioSlug === selectedStudioSlug}
      ><a href={uri} onClick={Flux.overrideNoScroll(uri)}>{studioName}</a></li>;
    });
  },
  generateStudioUri(studio) {
    const uri = studio !== 'all-studios' ? '?studio='+studio : '';
    return `/events${uri}`;
  },
  getEventsForStudio() {
    return this.getDummyEvents();
  },
  renderEvents(selectedStudioSlug) {
    const events = this.getEventsForStudio();
    let output;
    if (events) {
      if (events.length) {
        output = events.map((eventData, index) => {
          return <EventHubEventListItem
            className="event-hub-event-list"
            featured={index === 0}
            data={eventData}
          />;
        });
      } else {
        output = <h3 className="message">No Events found</h3>;
      }
    }
    return output;
  },
  render() {
    const { page, currentParams, studios } = this.props;
    const studioSlugFromUrl = get(currentParams, 'lid');
    const studioSlugs = map(pluck(studios, 'name'), kebabCase);
    const selectedStudioSlug = this.getSelectedStudio(studioSlugFromUrl, studioSlugs);

    return <article className="page-events-hub">
      <Hero
        title={get(page, 'display_title')}
        transitionImage={true}
        eventLabel="events"
        showDownChevron={false} >
      </Hero>
      <section className="event-hub-event-list">
        <nav className="event-hub-studio-tabs">
          {this.renderStudioTabs(selectedStudioSlug)}
        </nav>
        {this.renderEvents(selectedStudioSlug)}
      </section>
    </article>;
  }
});

export default PageEventHub;