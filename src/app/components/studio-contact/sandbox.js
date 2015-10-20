import StudioContact from './';

const studio = {
  id: 26,
  name: "London",
  link: "https://backend/blog/studio/london/",
  address: {
    "street-address": "62 Shoreditch High Street",
    locality: "London",
    "postal-code": "E1 6JJ",
    region: "",
    "country-name": "United Kingdom"
  },
  location: {
    lat: "51.524064",
    long: "-0.07706499999994776",
    elevation: "21.54648208618164"
  },
  color: "#143fcc",
  "recruitment-title": "London",
  "recruitment-desc": "Occupying three floors of The Tea Building in Shoreditch, our UK studio has over 120 talented and driven people. We're dedicated to delivering stand-out work for clients including Barclays, Harvey Nichols and Sky, as well as as our own products including Monument Valley and Moodnotes.",
  featured_image: 8814,
  timezone: {
    id: "Europe/London",
    offset: 1
  }
};

const Sandbox = React.createClass({
  render() {
    return <div className="sandbox">
      <StudioContact
        studio={studio}
        onClick={() => alert('clicked')}
      />
    </div>;
  }
});

export default Sandbox;
