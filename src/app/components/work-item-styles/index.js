'use strict';

import React from 'react';
import get from 'lodash/object/get';

import classnames from 'classnames';
import hexRgb from 'hex-rgb';

const WorkItemStyles = React.createClass({
  render() {
    const { data } = this.props;
    const id = data.id;
    const bgColour = get(data, 'colors.bg');
    const primaryColour = get(data, 'colors.primary');
    const secondaryColour = get(data, 'colors.secondary');
    const rgbImageHover = hexRgb(secondaryColour);

    return <style type="text/css" scoped>{`
      .work-item-${id} {
        background-color: ${bgColour};
      }
      .work-item-${id} .details {
        color: ${secondaryColour};
      }
      .work-item-${id} .details .type {
        border-color: ${secondaryColour};
      }
      .work-item-${id} .details h3 {
        color: ${primaryColour}
      }
      .work-item-${id} .details .link {
        border-bottom-color: ${secondaryColour}
      }
      .work-item-${id} .details .link:hover {
        color: ${secondaryColour}
      }
      .work-item-${id} .image .image-hover {
        background: rgba(${rgbImageHover[0]}, ${rgbImageHover[1]}, ${rgbImageHover[2]}, 0.7);
      }
    `}</style>;
  }
});

export default WorkItemStyles;
