import Video from './';

const Sandbox = React.createClass({
  render() {
    return <div className="sandbox full-width-component">
      <style>{`
        .sandbox {
          height: 100vh;
        }
      `}</style>
      <Video src="https://fpdl.vimeocdn.com/vimeo-prod-skyfire-std-us/01/3728/5/143640008/432195184.mp4?token=56463c99_0xac1f9ad3a918cd24b729acf12a518fb79c75524b" />
    </div>;
  }
});

export default Sandbox;
