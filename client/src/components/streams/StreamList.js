import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchStreams } from "../../actions";

//use class component because we want to render list in componentDidMount
//so that the list is only rendered one time

class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchStreams();
  }

  renderAdmin(stream) {
    if (stream.userId === this.props.currentUserId) {
      return (
        <div
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            marginBottom: "0.25em",
          }}
        >
          <Link
            to={`/streams/edit/${stream.id}`}
            className="ui button"
            style={{
              backgroundColor: "#9374ee",
              color: "white",
            }}
          >
            EDIT
          </Link>
          <Link
            to={`/streams/delete/${stream.id}`}
            className="ui button negative"
          >
            DELETE
          </Link>
        </div>
      );
    }
  }

  renderCreate() {
    if (this.props.isSignedIn) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            padding: "3em 0em 6em 0em",
          }}
        >
          <div
            style={{
              fontFamily: `"Courier New", monospace`,
              fontSize: "5em",
              fontWeight: "bold",
            }}
          >
            Go Live?
          </div>
          <Link
            to="/streams/new"
            style={{
              fontSize: "2em",
              fontWeight: "bold",
              padding: "1.0em 1.2em",
              background: "#9374ee",
              color: "white",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            Create Stream
          </Link>
        </div>
      );
    }
  }

  renderList() {
    return this.props.streams.map((stream, index) => {
      return (
        <div data-stream={stream.title} key={stream.id}>
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "14em",
              background: `url('https://picsum.photos/seed/image-${
                index + 1
              }/400')`,
              backgroundSize: "cover",
              borderRadius: "6px",
              backgroundPosition: "50% 50%",
            }}
            alt=""
          >
            {this.renderAdmin(stream)}
          </div>
          <div style={{ padding: "2em 0.5em" }}>
            <Link
              to={`/streams/${stream.id}`}
              style={{
                fontSize: "2em",
              }}
            >
              {stream.title} #{index + 1}
            </Link>
            <div
              style={{
                marginTop: "0.5em",
                fontSize: "1.4em",
              }}
            >
              {stream.description}
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div style={{ paddingTop: "2em" }}>
        {this.renderCreate()}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(20em, 1fr))",
            gap: "2em",
          }}
        >
          {this.renderList()}
        </div>
      </div>
    );
  }
}

//need this to have list of streams as props
const mapStateToProps = (state) => {
  //leave it as object in React store for easy modification/access
  //but turn it into array so that we can extract list elements
  //by using Object.values
  return {
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, { fetchStreams })(StreamList);
