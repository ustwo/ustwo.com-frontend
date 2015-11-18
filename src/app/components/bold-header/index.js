'use strict';

import React from 'react';
import classnames from 'classnames';

import BoldHeaderSubtitle from 'app/components/bold-header-subtitle';

const BoldHeader = React.createClass({
  render() {
    const { colour, customClass, subtitle, children } = this.props;
    const titleClass = classnames(colour && `u-text-${colour}`);
    let subtitleMarkup;
    if (subtitle) {
      subtitleMarkup = <BoldHeaderSubtitle>{subtitle}</BoldHeaderSubtitle>;
    }
    return <header className={classnames('bold-header', customClass)}>
      <h1 className={titleClass} ref="title">{children}</h1>
      {subtitleMarkup}
    </header>;
  }
});

export default BoldHeader;
