/*import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
//import Footer from "./components/Footer";
//import Header from "./components/Header";
//import LearnFormik from "./components/LearnFormik";
import Events from "./components/Events";
import Main from "./components/Main";
import EventForm from "./components/EventForm";
import Hobbies from "./components/Hobbies";
import HobbyForm from "./components/HobbyForm";
import Reminders from "./components/Reminders";
import ReminderForm from "./components/ReminderForm";
import ConversationsList from "./components/ConversationsList";
import Conversation from "./components/Conversation";
// https://medium.com/@Charles_Stover/optimal-file-structure-for-react-applications-f3e35ad0a145
export default () => {
  return (
    <React.Fragment>
      <Router>
        <React.Fragment>
          <Route path="/" exact component={Main} />

          <Route path="/events/" component={Events} />
          <Route path="/event_create/" component={EventForm} />
          <Route path="/event_edit/:id" component={EventForm} />

          <Route path="/hobbies/" component={Hobbies} />
          <Route path="/hobby_create/" component={HobbyForm} />
          <Route path="/hobby_edit/:id" component={HobbyForm} />

          <Route path="/reminders/" component={Reminders} />
          <Route path="/reminder_create/" component={ReminderForm} />
          <Route path="/reminder_edit/:id" component={ReminderForm} />

          <Route path="/conversations/" component={ConversationsList} />
          <Route path="/conversation/:id" component={Conversation} />
        </React.Fragment>
      </Router>
    </React.Fragment>
  );
};
*/

import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "../common/Header";
import Home from "../home/Home";
import SignIn from "../user/signin/SignIn";
import Profile from "../user/profile/Profile";
import OAuth2RedirectHandler from "../user/oauth2/OAuth2RedirectHandler";
import NotFound from "../common/NotFound";
import LoadingIndicator from "../common/LoadingIndicator";
import { getCurrentUser } from "../../helpers/requests";
import { ACCESS_TOKEN } from "../../helpers/constants";
import PrivateRoute from "../common/PrivateRoute";
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
    <div className="app">
      <div className="app-top-box">
        <Header authenticated={authenticated} onLogout={handleLogout} />
      </div>
      <div className="app-body">
        <Switch>
          <Route exact path="/" component={Home} />
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
    </div>
  );
};
