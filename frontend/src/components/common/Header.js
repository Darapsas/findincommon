import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";

export default props => (
  <header className="app-header">
    <div className="container">
      <div className="app-branding">
        <Link to="/" className="app-title">
          Find In Common
        </Link>
      </div>
      <div className="app-options">
        <nav className="app-nav">
          {props.authenticated ? (
            <ul>
              <li>
                <NavLink to="/myHobbies">Hobbies</NavLink>
              </li>
              <li>
                <NavLink to="/myEvents">Events</NavLink>
              </li>
              <li>
                <NavLink to="/myConversations">Conversations</NavLink>
              </li>
              <li>
                <NavLink to="/profile">Profile</NavLink>
              </li>
              <li>
                <a onClick={props.onLogout}>Logout</a>
              </li>
            </ul>
          ) : (
            <ul>
              <li>
                <NavLink to="/signin">Sign in</NavLink>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </div>
  </header>
);
