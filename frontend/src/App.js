import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
//import Footer from "./components/Footer";
//import Header from "./components/Header";
//import LearnFormik from "./components/LearnFormik";
import Events from "./components/Events";
import Main from "./components/Main";
import EventForm from "./components/EventForm";
//import "./App.css";

export default () => {
  return (
    <React.Fragment>
      <Router>
        <React.Fragment>
          <Route path="/" exact component={Main} />
          <Route path="/Events" component={Events} />
        </React.Fragment>
      </Router>
    </React.Fragment>
  );
};
