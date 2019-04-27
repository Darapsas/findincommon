import React, { Fragment, useState, useEffect, useRef } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "../templates/header";
import Footer from "../templates/footer";
import NotFound from "../templates/notFound";
import PrivateRoute from "../templates/private-route";
import RouteWithProps from "../templates/route-with-props";
import Loader from "../templates/loader";
import Home from "../home/home";
import SignIn from "../user/signIn/sign-in";
import Profile from "../user/profile/profile";
import ProfileForm from "../user/profile/profile-form";
import OAuth2RedirectHandler from "../user/oAuth2/o-auth-2-redirect-handler";
import { getCertainHobbies } from "../../helpers/requests";
import { getCurrentUser } from "../../helpers/requests";
import { getMembersByHobbies } from "../../helpers/requests";
import { ACCESS_TOKEN } from "../../helpers/constants";
import Alert from "react-s-alert";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";
import "./app.css";
import GroupInfo from "../group/group-info";
import GroupForm from "../group/group-form";
import Groups from "../group";
import EventInfo from "../event/event-info";
import EventForm from "../event/event-form";
import Events from "../event";
import ConversationInAction from "../conversation/conversation-in-action";
import ConversationForm from "../conversation/conversation-form";
import Conversations from "../conversation";
import Hobby from "../hobby/hobby";

// interval hook was borrowed from: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

let _isMounted;
export default props => {
  const [authenticated, setAuthenticated] = useState(false);
  const [hobbiesListChanged, setHobbiesListChanged] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);

  useInterval(() => {
    setCount(count + 1);
  }, 3000);

  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    setAuthenticated(false);
    setCurrentUser(null);
    Alert.success("You're safely logged out!");
  };

  const handleAccountDeletion = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    setAuthenticated(false);
    setCurrentUser(null);
    Alert.success("Your account was deleted!");
  };

  useEffect(() => {
    _isMounted = true;
    setLoading(true);

    getCurrentUser()
      .then(response => {
        if (_isMounted) {
          setCurrentUser(response);
          setAuthenticated(true);
          setLoading(false);
        }
      })
      .catch(error => {
        setLoading(false);
      });

    return () => {
      _isMounted = false;
    };
  }, []);

  /*
   * ---------------------------------------------------------------------------------
   * Update user information after adding or removing hobbies from user
   * ---------------------------------------------------------------------------------
   */
  useEffect(() => {
    _isMounted = true;
    async function fetchData() {
      await getCurrentUser()
        .then(data => {
          if (_isMounted) {
            setCurrentUser(data);
          }
        })
        .catch(error => console.error("Error: ", error));
      setHobbiesListChanged(false);
    }
    fetchData();

    return () => {
      _isMounted = false;
    };
  }, [hobbiesListChanged, count]);

  const handleHobbiesListChange = () => {
    setHobbiesListChanged(true);
  };

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
        await getCertainHobbies(JSON.stringify(searchQuery))
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
        await getMembersByHobbies(JSON.stringify(searchQuery))
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
  }, [authenticated, searchQuery, count]);

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
            exact
            path="/profile"
            authenticated={authenticated}
            handleAccountDeletion={handleAccountDeletion}
            currentUser={currentUser}
            component={Profile}
          />
          <PrivateRoute
            exact
            path="/profile/edit"
            authenticated={authenticated}
            currentUser={currentUser}
            component={ProfileForm}
            handleHobbiesListChange={handleHobbiesListChange}
          />
          <PrivateRoute
            path="/user/:userId/profile"
            authenticated={authenticated}
            component={Profile}
          />

          <PrivateRoute
            path="/user/groups/:group/info"
            authenticated={authenticated}
            currentUser={currentUser}
            component={GroupInfo}
          />
          <PrivateRoute
            path="/user/groups/:group/edit"
            authenticated={authenticated}
            currentUser={currentUser}
            searchQuery={searchQuery}
            members={members}
            hobbies={hobbies}
            component={GroupForm}
          />
          <PrivateRoute
            path="/user/groups/group/create"
            authenticated={authenticated}
            currentUser={currentUser}
            searchQuery={searchQuery}
            members={members}
            hobbies={hobbies}
            component={GroupForm}
          />
          <PrivateRoute
            path="/user/groups"
            authenticated={authenticated}
            currentUser={currentUser}
            component={Groups}
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
            searchQuery={searchQuery}
            members={members}
            hobbies={hobbies}
            component={EventForm}
          />
          <PrivateRoute
            path="/user/events/event/create"
            authenticated={authenticated}
            currentUser={currentUser}
            searchQuery={searchQuery}
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
            path="/user/conversations/:conversation/edit"
            authenticated={authenticated}
            currentUser={currentUser}
            searchQuery={searchQuery}
            members={members}
            hobbies={hobbies}
            component={ConversationForm}
          />
          <PrivateRoute
            path="/user/conversations/conversation/create"
            authenticated={authenticated}
            currentUser={currentUser}
            searchQuery={searchQuery}
            members={members}
            hobbies={hobbies}
            component={ConversationForm}
          />
          <PrivateRoute
            path="/user/conversations/:conversation/in-action"
            authenticated={authenticated}
            currentUser={currentUser}
            members={members}
            component={ConversationInAction}
          />
          <PrivateRoute
            path="/user/conversations"
            authenticated={authenticated}
            currentUser={currentUser}
            component={Conversations}
          />
          <PrivateRoute
            path="/user/hobbies"
            authenticated={authenticated}
            currentUser={currentUser}
            hobbies={hobbies}
            component={Hobby}
            handleHobbiesListChange={handleHobbiesListChange}
          />
          <Route
            path="/sign-in"
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
