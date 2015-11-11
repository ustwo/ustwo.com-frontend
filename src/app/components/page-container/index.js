import React from 'react';

const PageContainer = React.createClass({
  render() {
    const { children, transitionState } = this.props;
    return <div className="page-container">
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, { transitionState: transitionState });
      })}
    </div>;
  }
});

export default PageContainer;
