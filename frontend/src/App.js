import React from "react";
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
        </React.Fragment>
      </Router>
    </React.Fragment>
  );
};
