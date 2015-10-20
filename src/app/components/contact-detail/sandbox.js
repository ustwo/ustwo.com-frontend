import ContactDetail from './';

const detail = {
  "title": "Work with us",
  "desc": "Have a project or an idea you’d like to collaborate with ustwo on? Let’s talk.",
  "type": "work",
  "methods": [{
    "type": "email",
    "text": "work@ustwo.com",
    "uri": "mailto:work@ustwo.com"
  }]
};

const Sandbox = React.createClass({
  render() {
    return <div className="sandbox">
      <ContactDetail detail={detail} />
    </div>;
  }
});

export default Sandbox;
