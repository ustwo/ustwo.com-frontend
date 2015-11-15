import Video from './';

const Sandbox = React.createClass({
  render() {
    return <div className="sandbox full-width-component">
      <style>{`
        .sandbox {
          height: 100vh;
        }
      `}</style>
      <Video src="https://player.vimeo.com/external/143640008.sd.mp4?s=c2766105f03ee623f8b53fc274a33b563d30067d&profile_id=112" />
    </div>;
  }
});

export default Sandbox;
