import React from "react";
import "./SignIn.css";
import { Redirect } from "react-router-dom";
import { GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL } from "../../../helpers/constants";
import fbLogo from "../../../assets/images/fb-logo.png";
import googleLogo from "../../../assets/images/google-logo.png";

export default props => {
  if (props.authenticated) {
    return (
      <Redirect
        to={{
          pathname: "/",
          state: { from: props.location }
        }}
      />
    );
  }

  return (
    <div className="custom signin-container">
      <br />
      <div className="signin-content">
        <h1 className="signin-title">Sign in to Find In Common</h1>
        <SocialSignIn />
      </div>
    </div>
  );
};

const SocialSignIn = () => (
  <div className="social-signin">
    <button className="btn btn-block btn-light">
      <a className="btn btn-block social-btn google" href={GOOGLE_AUTH_URL}>
        <img src={googleLogo} alt="Google" /> Continue with Google
      </a>
    </button>
    <button className="btn btn-block btn-light">
      <a className="btn btn-block social-btn facebook" href={FACEBOOK_AUTH_URL}>
        <img src={fbLogo} alt="Facebook" /> Continue with Facebook
      </a>
    </button>
  </div>
);
