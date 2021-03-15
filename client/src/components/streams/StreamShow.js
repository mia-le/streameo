import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchStream } from "../../actions";
import flvjs from "flv.js";

class StreamShow extends Component {
  constructor(props) {
    super(props);
    // manually making ref to access DOM component since normally they are JSX components
    this.videoRef = React.createRef();
  }

  //try to build Player everytime the component mounts and is updated ( after successfully loading stream)
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchStream(id);
    // this.buildPlayer();
  }

  componentDidUpdate() {
    // this.buildPlayer();
  }
  //stop streaming from local server
  componentWillUnmount() {
    // this.player.destroy();
  }

  //only create player once there is a stream and a player has not already been made
  buildPlayer() {
    if (this.player || !this.props.stream) {
      return;
    }
    const { id } = this.props.match.params;
    /* flv reach out to a streaming video and convert it to watchable video on browser, similar to axios with requests */

    this.player = flvjs.createPlayer({
      type: "flv",
      url: `localhost:8000/live/${id}.flv`,
    });

    this.player.attachMediaElement(this.videoRef.current);
    this.player.load();
  }

  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }
    const { title, description } = this.props.stream;
    return (
      <div>
        <p style={{ textAlign: "right" }}>
          Due to hosting limitations, streaming is only available locally. Watch
          a fun video instead!
        </p>
        <iframe
          title="placeholder"
          width="100%"
          height="600"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />
        {/* <video
          poster={`https://picsum.photos/600/300`}
          ref={this.videoRef}
          style={{ width: "100%" }}
          controls
        /> */}
        <div
          style={{
            display: "flex",
            padding: "1em 0em",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <h1 style={{ margin: 0 }}>{title}</h1>
          <h3 style={{ margin: 0, marginLeft: "1em" }}>{description}</h3>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);
