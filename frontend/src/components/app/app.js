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
import { getMembers } from "../../helpers/requests";
import { ACCESS_TOKEN } from "../../helpers/constants";
import Alert from "react-s-alert";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";
import "./app.css";
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
   * Lifted state from header
   */
  const [searchQuery, setSearchQuery] = useState("");
  const [hobbies, setHobbies] = useState([]);
  useEffect(() => {
    _isMounted = true;
    console.log(JSON.stringify(searchQuery));
    async function fetchData() {
      if (authenticated) {
        const response = await getCertainHobbies(JSON.stringify(searchQuery))
          .then(data => {
            if (_isMounted) {
              setHobbies(data);
              console.log(data);
            }
          })
          .catch(error => console.error("Error: ", error));
      }
      setLoading(false);
    }
    fetchData();
    console.log(JSON.stringify(hobbies));
    hobbies.map(member => console.log(member));

    return () => {
      _isMounted = false;
    };
  }, [searchQuery]);

  const handleChange = event => {
    setSearchQuery(event.target.value.replace(/[^a-zA-Z ,]/g, ""));
  };

  /*
   * Lifted state from home
   */
  const [members, setMembers] = useState([]);
  useEffect(() => {
    _isMounted = true;
    async function fetchData() {
      if (authenticated) {
        const response = await getMembers()
          .then(data => {
            if (_isMounted) {
              setMembers(data);
              console.log("fuck");
              console.log(data);
            }
          })
          .catch(error => {
            console.error("Error: ", error);
            console.log("log fuc");
          });
      }
      setLoading(false);
    }
    console.log(
      "meeeeeeeeeeeeeeeeeemeeeeeeeeeeeeeeeeeeeeeebeeeeeeeeeeeeeeeeeeeers"
    );
    fetchData();
    return () => {
      _isMounted = false;
    };
  }, []);

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
        searchQuery={searchQuery}
        onLogout={handleLogout}
        hobbies={hobbies}
      />
      <main role="main">
        <div className="app-body">
          <Switch>
            <RouteWithProps
              exact
              path="/"
              authenticated={authenticated}
              currentUser={currentUser}
              members={members}
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
      </main>
      <Footer />
    </Fragment>
  );
};
