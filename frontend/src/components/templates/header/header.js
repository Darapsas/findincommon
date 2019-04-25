import React, { Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
import "./header.css";
import Loader from "../../templates/loader";

export default props => {
  if (props.loading) {
    return (
      <main role="main" style={{ textAlign: "center" }}>
        <Loader />
      </main>
    );
  }
  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <Link to="/" className="navbar-brand app-title">
          Find In Common
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          {props.authenticated ? (
            <Fragment>
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/profile">
                    Profile
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/user/hobbies">
                    Hobbies
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/user/groups">
                    Groups
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/user/conversations">
                    Conversations
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/user/events">
                    Events
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/sign-in"
                    onClick={props.onLogout}
                  >
                    Logout
                  </NavLink>
                </li>
              </ul>
              <form className="form-inline mt-2 mt-md-0">
                <label
                  className="app-title"
                  style={{
                    color: "white",
                    marginRight: "10px"
                  }}
                >
                  Search:
                </label>
                <input
                  className="form-control mr-sm-2"
                  type="text"
                  placeholder="skiing, training, fifa..."
                  aria-label="Search"
                  name="searchQuery"
                  onChange={props.handleChange}
                  value={props.searchQuery}
                />
              </form>
            </Fragment>
          ) : (
            <ul className="navbar-nav ml-auto">
              <li className="flaot-right">
                <NavLink className="nav-link" to="/sign-in">
                  Sign in
                </NavLink>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </header>
  );
};
