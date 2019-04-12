import React, { Fragment, useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import "./header.css";
import Loader from "../../templates/loader";

let _isMounted;
export default props => {
  /*  const [loading, setLoading] = useState(true);

  if (loading) {
    return (
      <main role="main" style={{ textAlign: "center" }}>
        <Loader />
      </main>
    );
  }
*/
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
                  <NavLink className="nav-link" to="/myHobbies">
                    Hobbies
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/myConversations">
                    Conversations
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/user/events">
                    Events
                  </NavLink>
                </li>
                <li className="nav-item">
                  <a className="nav-link" onClick={props.onLogout}>
                    Logout
                  </a>
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
                  Search by hobbies:
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
                {/*<button
                className="btn btn-outline-success my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>*/}
              </form>
              )
            </Fragment>
          ) : (
            <ul className="navbar-nav ml-auto">
              <li className="flaot-right">
                <NavLink className="nav-link" to="/signin">
                  Sign in
                </NavLink>
              </li>
            </ul>
          )}
        </div>
      </nav>
      <div>{JSON.stringify(props)}</div>
    </header>
  );
};
