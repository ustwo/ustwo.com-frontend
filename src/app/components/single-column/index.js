import React from 'react';
import classnames from 'classnames';

export default class SingleColumn extends React.Component {
  render() {
    return (
      <section className={classnames('single-column', this.props.className)} style={{ backgroundColor: this.props.backgroundColour }}>
        <div className="wrapper">
          {this.renderTitle()}
          {this.renderRule()}
          {this.renderContent()}
        </div>
      </section>
    );
  }
  renderTitle = () => {
    let title;
    if(this.props.title && this.props.title.length) {
      title = <h2 className="title" style={{ color: this.props.headingColour }}>{this.props.title}</h2>;
    }
    return title;
  }
  renderRule = () => {
    let rule;
    if((this.props.title && this.props.title.length) && (this.props.children && this.props.children.length)) {
      rule = <hr style={{ borderColor: this.props.ruleColour }} />;
    }
    return rule;
  }
  renderContent = () => {
    let content;
    if(this.props.children && this.props.children.length) {
      content = <div className="content" dangerouslySetInnerHTML={{ __html: this.props.children }} />;
    }
    return content;
  }
}
