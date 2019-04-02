import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
//import Footer from "./components/Footer";
//import Header from "./components/Header";
//import LearnFormik from "./components/LearnFormik";
import Events from "./components/Events";
import Main from "./components/Main";
import EventForm from "./components/EventForm";

export default () => {
  return (
    <React.Fragment>
      <Router>
        <React.Fragment>
          <Route path="/" exact component={Main} />
          <Route path="/events/" component={Events} />
          <Route path="/event/create/" component={EventForm} />
          <Route path="/event/edit/:id" component={EventForm} />
        </React.Fragment>
      </Router>
    </React.Fragment>
  );
};
