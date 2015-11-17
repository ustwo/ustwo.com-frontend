'use strict';

import React from 'react';
import get from 'lodash/object/get';

import classnames from 'classnames';

const WorkItemStyles = React.createClass({
  render() {
    const { data } = this.props;
    const id = data.id;
    const bgColour = get(data, 'colors.bg');
    const primaryColour = get(data, 'colors.primary');
    const secondaryColour = get(data, 'colors.secondary');

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
    `}</style>;
  }
});

export default WorkItemStyles;
