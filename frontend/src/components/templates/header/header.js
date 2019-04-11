import React, { Fragment, useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import "./header.css";
import { getCertainHobbies } from "../../../helpers/requests";
import Loader from "../../templates/loader";

let _isMounted;
export default props => {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [hobbies, setHobbies] = useState([]);
  useEffect(() => {
    _isMounted = true;
    async function fetchData() {
      if (props.authenticated) {
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

  if (loading) {
    return (
      <main role="main" style={{ textAlign: "center" }}>
        <Loader />
      </main>
    );
  }

  const handleChange = event => {
    setSearchQuery(event.target.value.replace(/[^a-zA-Z ,]/g, ""));
  };
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
                  onChange={handleChange}
                  value={searchQuery}
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
    </header>
  );
};
