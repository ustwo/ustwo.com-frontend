import SocialMediaStatistics from './';

const Sandbox = React.createClass({
  render() {
    return <div className="sandbox">
      <SocialMediaStatistics
        facebookShares={34}
        twitterShares={15}
      />
    </div>;
  }
});

export default Sandbox;
