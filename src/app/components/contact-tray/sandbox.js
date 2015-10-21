import ContactTray from './';

const contacts = [{
  "title": "Work with us",
  "desc": "Have a project or an idea you’d like to collaborate with ustwo on? Let’s talk.",
  "type": "work",
  "methods": [{
    "type": "email",
    "text": "work@ustwo.com",
    "uri": "mailto:work@ustwo.com"
  }]
}, {
  "title": "Press enquiries",
  "desc": "We love a good story. For all press opportunities, please reach out to our team.",
  "type": "press",
  "methods": [{
    "type": "email",
    "text": "press@ustwo.com",
    "uri": "mailto:press@ustwo.com"
  }]
}, {
  "title": "Looking for your next job?",
  "desc": "We’re always on the lookout for the most talented designers, engineers and business people. If that’s you, why didn’t you say earlier?",
  "type": "jobs",
  "methods": [{
    "type": "email",
    "text": "Check out our jobs listings",
    "uri": "/join-us"
  }]
}, {
  "title": "General enquiry",
  "desc": "Questions? Comments? Smart remarks? Shoot us an email.",
  "type": "general",
  "methods": [{
    "type": "email",
    "text": "hello@ustwo.com",
    "uri": "mailto:hello@ustwo.com"
  }]
}];

const Sandbox = React.createClass({
  render() {
    return <div className="sandbox">
      <style>{`
        body {
          background: #ccc;
        }
      `}</style>
      <ContactTray contacts={contacts} />
    </div>;
  }
});

export default Sandbox;
