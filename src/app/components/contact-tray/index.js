import React from 'react';

import Flux from '../../flux';
import ContactDetail from '../contact-detail';
import CloseButton from '../close-button';
import {onClickContent} from '../modal';

export default class ContactTray extends React.Component {
  render() {
    const contactData = this.props.contacts;
    return (
      <div className="contact-tray" onClick={onClickContent}>
        <CloseButton onClose={this.onClickClose} autoAnim={500} />
        <div className="content">
          {contactData.map(contactDetail => <ContactDetail key={`contact-detail-${contactDetail.type}`} detail={contactDetail}/>)}
        </div>
      </div>
    );
  }
  onClickClose() {
    Flux.closeModal();
  }
}
