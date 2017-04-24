'use strict';

import React from 'react';
import classnames from 'classnames';
import { get } from 'lodash';
import map from 'lodash/collection/map';
import pluck from 'lodash/collection/pluck';
import includes from 'lodash/collection/includes';
import kebabCase from 'lodash/string/kebabCase';
import spannify from 'app/lib/spannify';
import Flux from 'app/flux';

const EventsControls = React.createClass({
  getStudios() {
    const { studios } = this.props;
    if(studios) {
      return [{
        name: 'All studios'
      }].concat(studios);
    } else {
      return [{
        name: 'All studios'
      }];
    }
  },
  getSelectedStudio(studioSlugFromUrl, studioSlugs) {
    let selected = 'all-studios';
    if(includes(studioSlugs, studioSlugFromUrl)) {
      selected = studioSlugFromUrl;
    }
    return selected;
  },
  generateStudioUri(studio) {
    const uri = studio !== 'all-studios' ? '?studio='+studio : '';
    return `/events${uri}`;
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
  render() {
    const { currentParams, studios } = this.props;
    const studioSlugFromUrl = get(currentParams, 'studio');
    const studioSlugs = map(pluck(studios, 'name'), kebabCase);
    const selectedStudioSlug = this.getSelectedStudio(studioSlugFromUrl, studioSlugs);
    return <nav className="events-controls">
        {this.renderStudioTabs(selectedStudioSlug)}
      </nav>;
  }
});

export default EventsControls;
