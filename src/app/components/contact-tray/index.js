import React from 'react';

import Flux from '../../flux';
import ContactDetail from '../contact-detail';
import CloseButton from '../close-button';
import { onClickContent } from '../modal';

const ContactTray = React.createClass({
  onClickClose() {
    Flux.closeModal();
  },
  render() {
    const contactData = this.props.contacts;
    return <div className="contact-tray" onClick={onClickContent}>
      <CloseButton onClose={this.onClickClose} autoAnim={500} />
      <div className="content">
        {contactData.map(contactDetail => {
          return <ContactDetail
            key={`contact-detail-${contactDetail.type}`}
            detail={contactDetail}
          />;
        })}
      </div>
    </div>;
  }
});

export default ContactTray;
