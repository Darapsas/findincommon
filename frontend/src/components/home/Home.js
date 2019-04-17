import React, { Fragment } from "react";
import "./home.css";
import Fake from "./fake";
import Member from "./member";
import Loader from "../templates/loader";

export default props => {
  if (props.loading) {
    return (
      <main role="main" style={{ textAlign: "center" }}>
        <Loader />
      </main>
    );
  }

  return (
    <Fragment>
      <div
        className="container w-50"
        style={{ marginTop: "92px", textAlign: "center" }}
      >
        {props.authenticated ? (
          <Fragment>
            {props.hobbies.length !== 0 ? (
              <Fragment>
                <h5>
                  You are currently searching for people who have these
                  interests:
                </h5>
                {props.hobbies.map(hobby => (
                  <button className="btn btn-outline-success" key={hobby.id}>
                    {hobby.name}
                  </button>
                ))}
              </Fragment>
            ) : (
              <h1>Welcome and enjoy!</h1>
            )}
          </Fragment>
        ) : (
          <Fragment>
            <h1>Find In Common</h1>
            <p className="lead text-muted">
              If you have some ideas for an event or you simply just want to do
              something, but youd don't have anyone to do it with. Well, try
              this web application - it will help you to find people who think
              like you or at least have same hobbies as you.
            </p>
            <p>
              <a href="/signin" className="btn btn-primary my-2 btn-block">
                Join us now, it's free
              </a>
            </p>
          </Fragment>
        )}
      </div>

      <div className="album py-5">
        <div className="container">
          {props.authenticated ? (
            <div className="row">
              {props.members.length !== 0 &&
                props.members.map(
                  member =>
                    props.currentUser.id !== member.id && (
                      <Member key={member.id} member={member} />
                    )
                )}
            </div>
          ) : (
            <div className="row blur">
              <Fake />
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};
