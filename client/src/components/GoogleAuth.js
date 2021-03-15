import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

class GoogleAuth extends Component {
  componentDidMount() {
    //initialize the lib, then have the callback to fill in initialization details
    //https://github.com/google/google-api-javascript-client

    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "568590835476-js9v9okl2fpcr1oludo0d8phorm5d9fp.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  //is called with a boolean element
  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      //action creator
      //this.props is created by mapStateToProps returned object + the action creators as functions
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignInClick} className="ui red google button">
          <i className="google icon" />
          Sign In with Google
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};
//What the three params of connect do
//connects the 'isSignedIn' state to the GoogleAuth component, so everytime this state is changed, the component re-renders
//specifies the two action creators so that the component can call them from props
//calls the function returned by connect(..) with the param GoogleAuth, connecting the state and action creators to GoogleAuth
export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
