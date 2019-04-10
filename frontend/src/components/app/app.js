import React, { Fragment, useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "../common/header";
import Footer from "../common/footer";
import Home from "../home/home";
import SignIn from "../user/signin/SignIn";
import Profile from "../user/profile/Profile";
import OAuth2RedirectHandler from "../user/oauth2/OAuth2RedirectHandler";
import NotFound from "../common/NotFound";
import LoadingIndicator from "../common/LoadingIndicator";
import { getCurrentUser } from "../../helpers/requests";
import { ACCESS_TOKEN } from "../../helpers/constants";
import PrivateRoute from "../common/privateRoute";
import RouteWithProps from "../common/routeWithProps";
import Alert from "react-s-alert";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";
import "./app.css";
import Events from "../event";

export default props => {
  const [authenticated, setAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadCurrentlyLoggedInUser = () => {
    setLoading(true);

    getCurrentUser()
      .then(response => {
        setCurrentUser(response);
        setAuthenticated(true);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    setAuthenticated(false);
    setCurrentUser(null);
    Alert.success("You're safely logged out!");
  };

  useEffect(() => {
    loadCurrentlyLoggedInUser();
  }, []);

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <Fragment>
      <Header authenticated={authenticated} onLogout={handleLogout} />
      <div className="app-body">
        <Switch>
          <RouteWithProps
            exact
            path="/"
            authenticated={authenticated}
            currentUser={currentUser}
            component={Home}
          />
          <PrivateRoute
            path="/profile"
            authenticated={authenticated}
            currentUser={currentUser}
            component={Profile}
          />
          <PrivateRoute
            path="/user/events"
            authenticated={authenticated}
            currentUser={currentUser}
            component={Events}
          />
          <PrivateRoute
            path="/myConversations"
            authenticated={authenticated}
            currentUser={currentUser}
            component={Profile}
          />
          <PrivateRoute
            path="/myHobbies"
            authenticated={authenticated}
            currentUser={currentUser}
            component={Profile}
          />
          <Route
            path="/signin"
            render={props => (
              <SignIn authenticated={authenticated} {...props} />
            )}
          />
          <Route path="/oauth2/redirect" component={OAuth2RedirectHandler} />
          <Route component={NotFound} />
        </Switch>
      </div>
      <Alert
        stack={{ limit: 3 }}
        timeout={3000}
        position="top-right"
        effect="slide"
        offset={65}
      />
      <Footer />
    </Fragment>
  );
};
