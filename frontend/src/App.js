import React, { Component } from "react";
//import Footer from "./components/Footer";
//import Header from "./components/Header";
//import LearnFormik from "./components/LearnFormik";
import EventForm from "./components/EventForm";
//import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <EventForm formName="Create New Event" action="Submit form" />
      </div>
    );
  }
}

export default App;
