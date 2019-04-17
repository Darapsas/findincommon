import React, { Fragment, useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "../templates/header";
import Footer from "../templates/footer";
import NotFound from "../templates/notFound";
import PrivateRoute from "../templates/privateRoute";
import RouteWithProps from "../templates/routeWithProps";
import Loader from "../templates/loader";
import Home from "../home/home";
import SignIn from "../user/signin/SignIn";
import Profile from "../user/profile/Profile";
import OAuth2RedirectHandler from "../user/oauth2/OAuth2RedirectHandler";
import { getCertainHobbies } from "../../helpers/requests";
import { getCurrentUser } from "../../helpers/requests";
import { getMembersByHobbies } from "../../helpers/requests";
import { ACCESS_TOKEN } from "../../helpers/constants";
import Alert from "react-s-alert";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";
import "./app.css";
import EventInfo from "../event/event-info";
import EventForm from "../event/event-form";
import Events from "../event";

let _isMounted;
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

  /*
   * ---------------------------------------------------------------------------------
   * Lifted state from header
   * ---------------------------------------------------------------------------------
   */
  const [headingIsLoading, setHeadingIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [hobbies, setHobbies] = useState([]);
  useEffect(() => {
    _isMounted = true;
    async function fetchData() {
      if (authenticated) {
        const response = await getCertainHobbies(JSON.stringify(searchQuery))
          .then(data => {
            if (_isMounted) {
              setHobbies(data);
            }
          })
          .catch(error => console.error("Error: ", error));
      }
      setHeadingIsLoading(false);
    }
    fetchData();

    return () => {
      _isMounted = false;
    };
  }, [searchQuery]);

  const handleChange = event => {
    setSearchQuery(event.target.value.replace(/[^a-zA-Z ,]/g, ""));
  };

  /*
   * ---------------------------------------------------------------------------------
   * Lifted state from home page
   * ---------------------------------------------------------------------------------
   */
  const [homeIsLoading, setHomeIsLoading] = useState(true);
  const [members, setMembers] = useState([]);
  useEffect(() => {
    _isMounted = true;
    async function fetchData() {
      if (authenticated) {
        const response = await getMembersByHobbies(JSON.stringify(searchQuery))
          .then(data => {
            if (_isMounted) {
              setMembers(data);
            }
          })
          .catch(error => {
            console.error("Error: ", error);
          });
      }
      setHomeIsLoading(false);
    }
    fetchData();
    return () => {
      _isMounted = false;
    };
  }, [authenticated, searchQuery]);

  if (loading) {
    return (
      <main role="main" style={{ textAlign: "center" }}>
        <Loader />
      </main>
    );
  }

  return (
    <Fragment>
      <Header
        authenticated={authenticated}
        handleChange={handleChange}
        loading={headingIsLoading}
        searchQuery={searchQuery}
        onLogout={handleLogout}
        hobbies={hobbies}
      />
      <main role="main" className="justify-content-center">
        <Switch>
          <RouteWithProps
            exact
            path="/"
            authenticated={authenticated}
            currentUser={currentUser}
            loading={homeIsLoading}
            members={members}
            hobbies={hobbies}
            component={Home}
          />
          <PrivateRoute
            path="/profile"
            authenticated={authenticated}
            currentUser={currentUser}
            component={Profile}
          />
          <PrivateRoute
            path="/user/events/:event/info"
            authenticated={authenticated}
            currentUser={currentUser}
            component={EventInfo}
          />
          <PrivateRoute
            path="/user/events/:event/edit"
            authenticated={authenticated}
            currentUser={currentUser}
            members={members}
            hobbies={hobbies}
            component={EventForm}
          />
          <PrivateRoute
            path="/user/events/event/create"
            authenticated={authenticated}
            currentUser={currentUser}
            members={members}
            hobbies={hobbies}
            component={EventForm}
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
        <Alert
          stack={{ limit: 3 }}
          timeout={3000}
          position="top-right"
          effect="slide"
          offset={65}
        />
      </main>
      <Footer />
    </Fragment>
  );
};
