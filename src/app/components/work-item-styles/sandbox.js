import WorkItemStyles from './';

const data = {
  "id": 1,
  "name": "Moodnotes",
  "slug": "moodnotes",
  "type": "Venture",
  "excerpt": "<p>This is a description of the case study.</p>",
  "featured_image": 1,
  "colors": {
    "bg": "#f2ede4",
    "primary": "#34b6b6",
    "secondary": "#f1b039"
  }
}

const Sandbox = React.createClass({
  render() {
    return <div className="sandbox">
      <p>Please inspect the page and check that the `style` element has been initialised with the correct data</p>
      <p>Colours:</p>
      <ul>
        <li>Background: {data.colors.bg}</li>
        <li>Primary: {data.colors.primary}</li>
        <li>Secondary: {data.colors.secondary}</li>
      </ul>

      <WorkItemStyles data={data} />
    </div>;
  }
});

export default Sandbox;
