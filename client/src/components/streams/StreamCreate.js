import React, { Component } from "react";
import { connect } from "react-redux";
import { createStream } from "../../actions";
import StreamForm from "./StreamForm";

class StreamCreate extends Component {
  //call the action creator createStream
  onSubmit = (formValues) => {
    this.props.createStream(formValues);
  };

  render() {
    return (
      <div style={{ maxWidth: "500px", padding: "2em 0em", margin: "0 auto" }}>
        <h1 style={{ marginBottom: "1em", textAlign: "center" }}>
          Create a Stream
        </h1>
        <StreamForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(null, { createStream })(StreamCreate);
