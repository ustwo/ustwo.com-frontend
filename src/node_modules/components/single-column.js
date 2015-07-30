import React from 'react';
import classnames from 'classnames';

export default class SingleColumn extends React.Component {
  render() {
    return (
      <section className={classnames('single-column', this.props.className)} style={{ backgroundColor: this.props.backgroundColour }}>
        <div className="single-column__content">
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
      title = <h2 className="single-column__content__heading" style={{ color: this.props.headingColour }}>{this.props.title}</h2>;
    }
    return title;
  }
  renderRule = () => {
    let rule;
    if((this.props.title && this.props.title.length) && (this.props.children && this.props.children.length)) {
      rule = <hr className="single-column__content__rule" style={{ borderColor: this.props.ruleColour }} />;
    }
    return rule;
  }
  renderContent = () => {
    let content;
    if(this.props.children && this.props.children.length) {
      content = <div className="single-column__content__para" dangerouslySetInnerHTML={{ __html: this.props.children }} />;
    }
    return content;
  }
}
