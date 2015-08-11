import React from 'react';

export default class FullImage extends React.Component {
  render() {
    return (
      <section className="full-image" style={{backgroundImage: `url('${this.props.photo}')`}}>
        <img className="full-image__image" src={this.props.photo} />
      </section>
    );
  }
}
