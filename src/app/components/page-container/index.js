import React from 'react';

const PageContainer = React.createClass({
  render() {
    const { children } = this.props;
    const classNames = 'page-container ' + this.props.extraClasses;

    return (
      <div className={classNames}>
        {React.Children.map(children, (child) => React.cloneElement(child))}
      </div>
    );
  }
});

export default PageContainer;
