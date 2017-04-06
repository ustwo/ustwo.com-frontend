import WorkVerticals from './';

const data = {
  title: 'Areas of Interest',
  introText: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.',
  auto: {
    type: 'Expertise',
    title: 'Auto',
    text: 'The ustwo Auto team explore user experience in the automotive space with client engagements and our own research and experimental projects, building services and products around the connected car.'
  },
  health: {
    type: 'Expertise',
    title: 'Health',
    text: 'ustwo collaborates with clients, healthcare professionals and academic experts to create lasting, meaningful digital health solutions.'
  }
};

const Sandbox = React.createClass({
  render() {
    return (
      <div className="sandbox">
        <WorkVerticals data={data} />
      </div>
    );
  }
});

export default Sandbox;
