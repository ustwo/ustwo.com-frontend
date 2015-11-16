'use strict';

import React from 'react';
import get from 'lodash/object/get';

import classnames from 'classnames';

const WorkItemStyles = React.createClass({
  render() {
    console.log(this.props)
    const { data,  } = this.props;
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
      .work-item-${id} .detail .link:hover {
        color: ${primaryColour}
      }
    `}</style>;
  }
});

export default WorkItemStyles;
