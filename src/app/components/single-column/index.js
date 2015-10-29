import React from 'react';
import classnames from 'classnames';

export default class SingleColumn extends React.Component {
  render() {
    const { className, isInZebraList, backgroundColour } = this.props;
    const classes = classnames('single-column', className, {
      'in-zebra-list': isInZebraList
    });
    return (
      <section
        className={classes}
        style={{ backgroundColor: backgroundColour }}
      >
        <div className="wrapper">
          {this.renderTitle()}
          {this.renderRule()}
          {this.renderContent()}
        </div>
      </section>
    );
  }
  renderTitle() {
    const { title, headingColour } = this.props;
    let output;
    if (title && title.length) {
      output = <h2
        className="title"
        style={{ color: headingColour }}
      >
        {title}
      </h2>;
    }
    return output;
  }
  renderRule() {
    const { title, children, ruleColour } = this.props;
    let rule;
    if ((title && title.length) && (children && children.length)) {
      rule = <hr style={{ borderColor: ruleColour }} />;
    }
    return rule;
  }
  renderContent() {
    const { children } = this.props;
    let content;
    if (children && children.length) {
      content = <div
        className="content"
        dangerouslySetInnerHTML={{ __html: children }}
      />;
    }
    return content;
  }
}
