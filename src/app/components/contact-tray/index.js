import React from 'react';

import Flux from 'app/flux';
import ContactDetail from 'app/components/contact-detail';
import CloseButton from 'app/components/close-button';
import ModalContentMixin from 'app/lib/modal-content-mixin';

const ContactTray = React.createClass({
  mixins: [ModalContentMixin],
  onClickClose() {
    Flux.closeModal();
  },
  render() {
    const contactData = this.props.contacts;
    return <div className="contact-tray" onClick={this.onClickContent}>
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
