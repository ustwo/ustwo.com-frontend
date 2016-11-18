import React from 'react';

const PageContainer = React.createClass({
  render() {
    const { children, transitionState } = this.props;
    const classNames = 'page-container ' + this.props.extraClasses;
    return (
      <div className={classNames}>
        {React.Children.map(children, (child) => {
          return React.cloneElement(child, { transitionState: transitionState });
        })}
      </div>
    );
  }
});

export default PageContainer;
